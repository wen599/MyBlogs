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

type Create={
  content:string,
  time:number,
  name:string
}
// 新增文章请求
const createArticle = async (data:Create) => {
  const { data: res } = await request({
    method: 'POST',
    url: 'api/create',
    data
  })
  return res
}
// 查询所有文章请求
const findAllArticle = async (limit?:number) => {
  const { data: res } = await request({
    method: 'GET',
    url: 'public/findAllArticle',
    params: {
      limit
    }
  })
  return res
}

// 删除指定文章
const deleteArticle = async (id:number) => {
  const { data: res } = await request({
    method: 'POST',
    url: 'api/deleteArticle',
    data: {
      id
    }
  })
  return res
}

// 获取指定文章的内容
const getArticleContent = async (id:number) => {
  const { data: res } = await request({
    method: 'GET',
    url: 'public/getContent',
    params: {
      id
    }
  })
  return res
}
type Update={
  id:number,
  name:string,
  content:string
}
// 修改指定文章
const updateArticle = async (data:Update) => {
  const { data: res } = await request({
    method: 'POST',
    url: 'api/update',
    data
  })
  return res
}

// 按名称或内容查询文章
const findKeyword = async (keyword:string) => {
  const { data: res } = await request({
    method: 'GET',
    url: 'api/findKeyword',
    params: {
      keyword
    }
  })
  return res
}

export { loginRequest, checkingRequest, findKeyword, createArticle, findAllArticle, deleteArticle, getArticleContent, updateArticle }
export type { Create, Update }
