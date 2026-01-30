import { API_CODE, STORAGE_NAME } from '@/config/constants/api'
import { decryptWithAES, encryptWithAES } from '@/utils/crypto'
import type { ApiResponse, FetchOptions, FetchError } from './types'

const BASE_URL = '/api'

async function getAccessToken(): Promise<string | null> {
  if (typeof window === 'undefined') return null

  const storageData = localStorage.getItem(STORAGE_NAME.USER)
  if (!storageData) return null

  try {
    const decrypted = decryptWithAES(storageData)
    if (!decrypted) return null
    const parsed = JSON.parse(decrypted)
    return parsed.accessToken || null
  } catch {
    return null
  }
}

async function setAccessToken(token: string): Promise<void> {
  const storageData = localStorage.getItem(STORAGE_NAME.USER)
  if (!storageData) return

  try {
    const decrypted = decryptWithAES(storageData)
    if (!decrypted) return
    const parsed = JSON.parse(decrypted)
    const updated = { ...parsed, accessToken: token }
    const encrypted = encryptWithAES(JSON.stringify(updated))
    localStorage.setItem(STORAGE_NAME.USER, encrypted)
  } catch {
    // Silent fail
  }
}

async function refreshToken(): Promise<string | null> {
  const accessToken = await getAccessToken()

  const response = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  })

  const data: ApiResponse<{ accessToken: string }> = await response.json()

  if (data.code === API_CODE.SUCCESS && data.result?.accessToken) {
    await setAccessToken(data.result.accessToken)
    return data.result.accessToken
  }

  return null
}

function isAuthError(code: string): boolean {
  return [
    API_CODE.FAILURE_USER_AUTH,
    API_CODE.INVALID_TOKEN,
    API_CODE.INVALID_SIGNATURE,
    API_CODE.BLACKLIST_TOKEN,
    API_CODE.BAD_USER_STATUS,
  ].includes(code)
}

function clearAuthStorage(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_NAME.USER)
    sessionStorage.removeItem(STORAGE_NAME.USER)
  }
}

function createFetchError(data: ApiResponse<unknown>, status: number): FetchError {
  const error = new Error(`[${data.code}] ${data.reason || 'Unknown error'}`) as FetchError
  error.code = data.code
  error.status = status
  error.reason = data.reason
  return error
}

export async function fetchClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const { body, params, timeout = 30000, retry = true, ...init } = options

  // Build URL with query params
  const url = new URL(endpoint, window.location.origin)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value))
      }
    })
  }

  // Build headers
  const headers = new Headers(init.headers)

  const accessToken = await getAccessToken()
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`)
  }

  // Build request options
  const requestInit: RequestInit = {
    ...init,
    headers,
    credentials: 'include',
  }

  if (body && !(body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
    requestInit.body = JSON.stringify(body)
  } else if (body instanceof FormData) {
    requestInit.body = body
  }

  // Create abort controller for timeout
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  requestInit.signal = controller.signal

  try {
    const response = await fetch(url.toString(), requestInit)
    clearTimeout(timeoutId)

    const data: ApiResponse<T> = await response.json()

    // Handle token expired - attempt refresh and retry
    if (data.code === API_CODE.CREDENTIAL_EXPIRED && retry) {
      const newToken = await refreshToken()
      if (newToken) {
        return fetchClient<T>(endpoint, { ...options, retry: false })
      }
      clearAuthStorage()
      throw createFetchError(data, response.status)
    }

    // Handle auth errors
    if (isAuthError(data.code)) {
      clearAuthStorage()
      throw createFetchError(data, response.status)
    }

    // Handle success
    if (data.code === API_CODE.SUCCESS) {
      return data
    }

    // Handle other errors
    throw createFetchError(data, response.status)
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout')
    }
    throw error
  }
}
