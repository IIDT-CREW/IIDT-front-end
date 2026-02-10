import type { ApiResponse, FetchOptions, FetchError } from './types'

const BASE_URL = '/api'

function createFetchError(data: ApiResponse<unknown>, status: number): FetchError {
  const error = new Error(`[${data.code}] ${data.reason || 'Unknown error'}`) as FetchError
  error.code = data.code
  error.status = status
  error.reason = data.reason
  return error
}

export async function fetchClient<T>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> {
  const { body, params, timeout = 30000, ...init } = options

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

    if (data.code === '0000') {
      return data
    }

    throw createFetchError(data, response.status)
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout')
    }
    throw error
  }
}
