export interface ApiResponse<T = unknown> {
  code: string
  reason: string
  result: T
}

export interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: Record<string, unknown> | FormData
  params?: Record<string, string | number | boolean | undefined>
  timeout?: number
  retry?: boolean
}

export interface FetchError extends Error {
  code: string
  status: number
  reason: string
}
