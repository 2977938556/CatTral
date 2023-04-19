import { createRouter, createWebHashHistory } from 'vue-router'

// 首页
import Home from '@/views/home/index.vue'
import Search from '@/views/search/index.vue'
import Message from '@/views/message/index.vue'
import User from '@/views/user/index.vue'


const routes = [
  {
    path: "/", component: Home,
  },
  {
    path: "/search", component: Search,
  },
  {
    path: "/message", component: Message,
  },
  {
    path: "/user", component: User,
  }
]

// 创建路由实例
const router = createRouter({
  // 使用hash方式实现路由
  history: createWebHashHistory(),
  // 配置路由规则，写法和之前一样
  routes
})

export default router