import { fetchClient } from '@/lib/fetch'
import type { Will, Meta, InsertWillParams, DeleteWillParams } from '@/api/will/types'

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
      body: data as unknown as Record<string, unknown>,
    })
    return response.result
  },

  async updateWill(data: InsertWillParams) {
    const response = await fetchClient<Will>(`/api/will/${data.will_id}`, {
      method: 'PUT',
      body: data as unknown as Record<string, unknown>,
    })
    return response.result
  },

  async deleteWill(willId: string) {
    const response = await fetchClient<void>(`/api/will/${willId}`, {
      method: 'DELETE',
    })
    return response.result
  },
}
