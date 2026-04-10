import { fetchClient } from '@/lib/fetch'
import type { Will, Meta, InsertWillParams } from '@/api/will/types'

export interface WillListResult {
  list: Will[]
  meta: Meta
}

export const willService = {
  async getWill(willId: string) {
    const response = await fetchClient<Will>(`/api/will/${willId}`)
    return response.result
  },

  async getWillList(params: { pageNo: number; pageSize: number }) {
    const response = await fetchClient<WillListResult>('/api/will', {
      params: {
        pageNo: params.pageNo,
        pageSize: params.pageSize,
      },
    })
    return response.result
  },

  async getMyWill(params: { memIdx: string; pageNo: number; pageSize: number }) {
    const response = await fetchClient<WillListResult>('/api/will/my', {
      params: {
        memIdx: params.memIdx,
        pageNo: params.pageNo,
        pageSize: params.pageSize,
      },
    })
    return response.result
  },

  async getWillCount() {
    const response = await fetchClient<number>('/api/will/count')
    return response.result
  },

  async createWill(data: InsertWillParams) {
    const response = await fetchClient<Will>('/api/will', {
      method: 'POST',
      body: data,
    })
    return response.result
  },

  async updateWill(data: InsertWillParams) {
    const response = await fetchClient<Will>(`/api/will/${data.will_id}`, {
      method: 'PUT',
      body: data,
    })
    return response.result
  },

  async deleteWill(willId: string, guestPassword?: string) {
    const response = await fetchClient<void>(`/api/will/${willId}`, {
      method: 'DELETE',
      ...(guestPassword ? { body: { guest_password: guestPassword } } : {}),
    })
    return response.result
  },

  async verifyGuestPassword(willId: string, password: string) {
    const response = await fetchClient<{ verified: boolean }>(`/api/will/${willId}/verify-password`, {
      method: 'POST',
      body: { password },
    })
    return response.result
  },
}
