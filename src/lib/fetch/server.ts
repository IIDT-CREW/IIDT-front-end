import type { ApiResponse, FetchOptions } from './types'

const EXTERNAL_API_URL =
  process.env.NODE_ENV === 'production' ? 'https://if-i-die-tomorrow.com' : 'http://localhost:3031'

export async function fetchServer<T>(
  endpoint: string,
  options: FetchOptions & { accessToken?: string } = {}
): Promise<ApiResponse<T>> {
  const { body, params, accessToken, timeout = 30000, ...init } = options

  // Build URL
  const url = new URL(endpoint, EXTERNAL_API_URL)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value))
      }
    })
  }

  // Build headers
  const headers = new Headers(init.headers)
  headers.set('Content-Type', 'application/json')

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`)
  }

  const requestInit: RequestInit = {
    ...init,
    headers,
  }

  if (body && !(body instanceof FormData)) {
    requestInit.body = JSON.stringify(body)
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  requestInit.signal = controller.signal

  try {
    const response = await fetch(url.toString(), requestInit)
    clearTimeout(timeoutId)
    return await response.json()
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}
