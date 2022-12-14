import axiosDefault from 'axios'
import authAxios from '../'
import { API_URL } from 'config/constants/api'
import { GetWillCount, GetWill, GetMyWill, GetMyWillParams, InsertWillParams, DeleteWillParams } from './types'
const url = API_URL

// Create axios instance.
export const axiosInstance = axiosDefault.create({
  baseURL: url,
  // withCredentials: true,
})

export const getWill = async (will_id: string) => {
  const response = await axiosInstance.get<GetWill>('api/will/getWill', {
    params: {
      will_id,
    },
  })
  return response.data
}

export const getMyWill = async ({ memIdx, pageNo, pageSize }: GetMyWillParams) => {
  const response = await authAxios.get<GetMyWill>('api/will/getMyWill', {
    params: {
      memIdx,
      pageNo,
      pageSize,
    },
  })
  return response.data
}

export const getWillList = async ({ pageNo, pageSize }) => {
  const response = await authAxios.get('api/will/getWillList', {
    params: {
      pageNo,
      pageSize,
    },
  })
  return response.data
}

export const getWillCount = async () => {
  const response = await axiosInstance.get<GetWillCount>('api/will/getWillCount')
  return response.data
}

export const insertWill = (data: InsertWillParams) => {
  return authAxios.post('api/will/insertWill', data)
}

export const deleteWill = (data: DeleteWillParams) => {
  return authAxios.post('api/will/deleteWill', data)
}

export const updateWill = (data: InsertWillParams) => {
  return authAxios.post('api/will/updateWill', data)
}
