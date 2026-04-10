export interface ApiResponse<T = unknown> {
  code: string
  reason: string
  result: T
}

export interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: unknown
  params?: Record<string, string | number | boolean | undefined>
  timeout?: number
}

export interface FetchError extends Error {
  code: string
  status: number
  reason: string
}
