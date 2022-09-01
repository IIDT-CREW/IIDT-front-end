// lib/axios.ts
import axios from 'axios'
import { refresh } from './auth'
import { decryptWithAES, encryptWithAES } from 'utils/crypto'
import { API_CODE, API_URL } from 'config/constants/api'
import { STORAGE_NAME } from 'config/constants/api'
import { useDispatch } from 'react-redux'
const asyncLocalStorage = {
  setItem: function (key, value) {
    return Promise.resolve().then(function () {
      localStorage.setItem(key, value)
    })
  },
  getItem: function (key) {
    return Promise.resolve().then(function () {
      return localStorage.getItem(key)
    })
  },
}
// Create axios instance.
const axiosInstance = axios.create({
  // baseURL: 'http://localhost:3031',
  baseURL: API_URL,
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await asyncLocalStorage.getItem('accessToken')
    //const accessToken = localStorage.getItem('accessToken')
    const addConfigHeaders: any = {}
    if (accessToken) {
      addConfigHeaders.Authorization = accessToken ? `Bearer ${accessToken}` : ''
    }

    const newConfig = { ...config, headers: { ...config.headers, ...addConfigHeaders } }
    console.log('[AXIOS] INTERCEPTORS[REQ] = ', newConfig)
    return newConfig
  },
  (error) => {
    console.log('error ', error)
    // 요청 에러 처리를 작성합니다.
    return Promise.reject(error)
  },
)

// axios.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   async (error) => {
//     const {
//       config,
//       response: { status },
//     } = error
//     const originalRequest = config
//     console.log('error!! ')
//     if (status === 401) {
//       if (!isTokenRefreshing) {
//         // isTokenRefreshing이 false인 경우에만 token refresh 요청
//         isTokenRefreshing = true
//         const refreshToken = await AsyncStorage.getItem('refreshToken')
//         const { data } = await axios.post(
//           `http://localhost:3000/refresh/token`, // token refresh api
//           {
//             refreshToken,
//           },
//         )
//         // 새로운 토큰 저장
//         const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data
//         await AsyncStorage.multiSet([
//           ['accessToken', newAccessToken],
//           ['refreshToken', newRefreshToken],
//         ])
//         isTokenRefreshing = false
//         axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`
//         // 새로운 토큰으로 지연되었던 요청 진행
//         onTokenRefreshed(newAccessToken)
//       }
//       // token이 재발급 되는 동안의 요청은 refreshSubscribers에 저장
//       const retryOriginalRequest = new Promise((resolve) => {
//         addRefreshSubscriber((accessToken) => {
//           originalRequest.headers.Authorization = 'Bearer ' + accessToken
//           resolve(axios(originalRequest))
//         })
//       })
//       return retryOriginalRequest
//     }
//     return Promise.reject(error)
//   },
// )

axiosInstance.interceptors.response.use(
  async (response) => {
    console.log('[AXIOS] INTERCEPTORS[RES] response= ', response)
    /*
      http status가 200인 경우
    응답 바로 직전에 대해 작성합니다.
      .then() 으로 이어집니다.
    */
    if (response.config.url !== '/api/oauth/refresh' && response.data.code === API_CODE.CREDENTIAL_EXPIRED) {
      const token_response = await refresh()
      if (token_response.status !== 200 || token_response.data.code !== API_CODE.SUCCESS) {
        return Promise.reject(
          new Error(
            `Failed Request Refresh Token ${
              token_response.data
                ? `${token_response.data.result} ${token_response.data.reason}`
                : token_response.status
            }`,
          ),
        )
      }

      console.log('[AXIOS] INTERCEPTORS[RES] = token_response.data = ', token_response.data)
      /* refresh 토큰 및 access_token 저장  */
      const { accessToken } = token_response.data.result
      localStorage.setItem('accessToken', accessToken)
      asyncLocalStorage.setItem('accessToken', accessToken).then(() => {
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        // eslint-disable-next-line no-param-reassign
        response.config.headers.Authorization = `Bearer ${accessToken}`
        return axiosInstance(response.config)
      })
    }

    // console.log('response.data = ', response.data)
    // return Promise.resolve(response)
    switch (response.data.code) {
      case API_CODE.SUCCESS: // 정상
        console.log('[AXIOS] INTERCEPTORS[RES] success!!')
        return Promise.resolve(response)
      case API_CODE.FAILURE_USER_AUTH:
      case API_CODE.INVALID_TOKEN: // 유효하지 않은 토큰 키
      case API_CODE.INVALID_SIGNATURE: // 사용할 수 없는 토큰입니다.
      case API_CODE.BLACKLIST_TOKEN:
      case API_CODE.BAD_USER_STATUS: // 정지된 사용자
        return Promise.reject(
          new Error(`${response.data ? `[${response.data.result}] ${response.data.reason}` : response.status}`),
        )
      case API_CODE.INVALID_USER: // 사용자 정보가 존재하지 않음
      case API_CODE.BAD_CREDENTIAL: // 아이디나 비밀번호가 맞지 않습니다. 다시 확인해 주십시오
      case API_CODE.ACCOUNT_DISABLED: // 계정이 비활성화 되었습니다. 관리자에게 문의하세요
      //then으로 보내기
      default: {
        //catch로 보내기
        return Promise.reject(
          new Error(`${response.data ? `[${response.data.result}] ${response.data.reason}` : response.status}`),
        )
      }
    }
  },

  (error) => {
    console.log('error= ', error)
    /*
      http status가 200이 아닌 경우
      응답 에러 처리를 작성합니다.
      .catch() 으로 이어집니다.
    */
    return Promise.reject(error)
  },
)

export default axiosInstance
