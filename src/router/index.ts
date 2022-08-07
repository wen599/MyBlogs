import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes:Readonly<RouteRecordRaw[]> = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: () => import('@/views/Home.vue') },
  { path: '/login', component: () => import('@/views/Login.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
