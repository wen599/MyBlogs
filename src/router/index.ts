import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { checkingRequest } from '@/request/request'

const routes:Readonly<RouteRecordRaw[]> = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: () => import('@/views/Home.vue') },
  { path: '/login', component: () => import('@/views/Login.vue') },
  { path: '/manage', component: () => import('@/views/Manage.vue') },
  { path: '/article', component: () => import('@/views/Article.vue') },
  { path: '/about', component: () => import('@/views/About.vue') },
  { path: '/create', component: () => import('@/views/Create.vue') },
  { path: '/edit', component: () => import('@/views/Edit.vue') },
  { path: '/detail', component: () => import('@/views/Detail.vue') },
  { path: '/read', component: () => import('@/views/ArticleDetail.vue') }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const publicRouterList = ['/login', '/home', '/article', '/about', '/read']

router.beforeEach((to, from, next) => {
  if (publicRouterList.find((item) => item === to.path)) {
  //  公开路由不需要权限
    return next()
  } else { //  非公开路由需要权限
    const token = sessionStorage.getItem('MyBlogsToken')
    if (token === null) return next('/login')
    checkingRequest().then((res:{status:number, message:any}) => {
      console.log(res)
      if (res.status === 401) {
        console.log(res.message)
        return next('/login')
      }
      next()
    })
  }
})

export default router
