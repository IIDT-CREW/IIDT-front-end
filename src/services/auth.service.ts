import { fetchClient, ApiResponse } from '@/lib/fetch'
import type { checkDuplicateNicknameResponse } from '@/api/auth/types'

export interface UserInfo {
  memIdx: number
  email: string
  name: string
  nickname: string
  cooperation: string
}

export interface LoginResult {
  accessToken: string
  name: string
  email: string
  nickname: string
  userid: string
  memIdx: number
}

export const authService = {
  async getUserInfo() {
    const response = await fetchClient<UserInfo>('/api/auth/user-info')
    return response.result
  },

  async logout() {
    const response = await fetchClient('/api/auth/logout')
    return response.result
  },

  async refresh() {
    const response = await fetchClient<{ accessToken: string }>('/api/auth/refresh')
    return response.result
  },

  async checkDuplicateNickname(nickname: string) {
    const response = await fetchClient<checkDuplicateNicknameResponse['result']>(
      '/api/auth/check-nickname',
      { params: { mem_nickname: nickname } }
    )
    return response.result
  },

  async signup(params: { provider: string; code?: string; accessToken?: string; nickname?: string }) {
    const { provider, code, accessToken, nickname } = params
    const response = await fetchClient<LoginResult>(`/api/auth/signup/${provider}`, {
      params: {
        code,
        access_token: accessToken,
        nickname,
      },
    })
    return response
  },

  async socialLogin(params: { provider: string; code: string }) {
    const { provider, code } = params
    const response = await fetchClient<LoginResult>(`/api/auth/callback/${provider}`, {
      params: { code },
    })
    return response
  },
}
