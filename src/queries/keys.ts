import type { GetMyWillParams } from '@/api/will/types'

export const queryKeys = {
  // Auth domain
  auth: {
    all: ['auth'] as const,
    userInfo: () => [...queryKeys.auth.all, 'userInfo'] as const,
    refresh: () => [...queryKeys.auth.all, 'refresh'] as const,
    checkNickname: (nickname: string) => [...queryKeys.auth.all, 'checkNickname', nickname] as const,
  },

  // Will domain
  will: {
    all: ['will'] as const,
    lists: () => [...queryKeys.will.all, 'list'] as const,
    list: (filters: { pageNo: number; pageSize: number }) =>
      [...queryKeys.will.lists(), filters] as const,
    details: () => [...queryKeys.will.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.will.details(), id] as const,
    count: () => [...queryKeys.will.all, 'count'] as const,
    my: (params: Omit<GetMyWillParams, 'pageNo' | 'pageSize'> & { pageNo: number; pageSize: number }) =>
      [...queryKeys.will.all, 'my', params] as const,
  },
} as const

export type QueryKeys = typeof queryKeys
