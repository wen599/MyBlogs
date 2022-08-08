import axios from 'axios'
import { requestBaseURL } from '@/config'

const request = axios.create({
  baseURL: requestBaseURL
})

type UserData={
  userName:string,
  password:string
}
request.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('MyBlogsToken')
  if (token !== null) {
    (config as any).headers.Authorization = token
  }
  return config
})
// 登录请求
const loginRequest = async (data:UserData) => {
  const { data: res } = await request({
    method: 'POST',
    url: '/user/login',
    data
  })
  return res
}

// 验证token请求
const checkingRequest = async () => {
  const { data: res } = await request({
    method: 'POST',
    url: '/api/checking'
  })
  return res
}

export { loginRequest, checkingRequest }
