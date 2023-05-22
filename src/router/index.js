import { createRouter, createWebHashHistory } from 'vue-router'


import Home from '@/views/home/index.vue'// 首页
import Search from '@/views/search/index.vue'//搜索
import Message from '@/views/message/index.vue'//消息
import User from '@/views/user/index.vue'//个人中心
import CatLogin from '@/views/login/index.vue'//登录
import CatRegister from '@/views/register/index.vue'// 注册
import Release from '@/views/release/index.vue'// 发布页面


// 四个首页子模块
import CatMjgsPage from '@/views/home/subset/cat-mjgs-page.vue'
import CatMjsdPage from '@/views/home/subset/cat-mjsd-page.vue'
import CatMjznPage from '@/views/home/subset/cat-mjzn-page.vue'
import CatMjhdPage from '@/views/home/subset/cat-mjhd-page.vue'


// 个人中心的功能模块
import History from '@/views/user/subset/cat-history-page.vue'

// 流浪猫详情组件
import CatDetail from '@/views/cat-details/index.vue'
import CommentDetail from '@/views/cat-details/subset/cat-commentDeatil-page.vue'
import CatAppluyFor from '@/views/cat-details/subset/cat-applyfor-page.vue'


// 404错误对象
import CatError from '@/views/error/index.vue'

const routes = [
  // 首页模块功能路由
  { path: "/", redirect: '/home', },
  { path: "/home", component: Home }, // 开启路由缓存 },// 首页,
  { path: '/home/mjgs', component: CatMjgsPage },//猫迹故事
  { path: '/home/mjsd', component: CatMjsdPage },// 猫迹商店
  { path: '/home/mjzn', component: CatMjznPage },// 猫迹指南
  { path: '/home/mjhd', component: CatMjhdPage },// 猫迹活动
  { path: '/user/release', component: Release },// 发布帖子

  // 消息模块
  { path: "/message", component: Message, },

  // 搜索模块
  { path: "/search", component: Search, },

  // 详情模块
  { path: '/catdetail/:id', component: CatDetail },//流浪猫详情组件
  { path: '/comment/detail/:id', component: CommentDetail },//流浪猫评论详情组件
  { path: '/comment/applyfor', component: CatAppluyFor },// 申请组件



  // 我的模块功能
  { path: "/user", component: User },
  { path: '/user/history', component: History },// 历史记录



  // 登录与注册
  { path: '/login', component: CatLogin },
  { path: '/register', component: CatRegister },


  { path: '/error', component: CatError },


]


const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}




// 创建路由实例
const router = createRouter({
  // 使用hash方式实现路由
  history: createWebHashHistory(),
  // 配置路由规则，写法和之前一样
  routes,
  scrollBehavior
})



// 优化路由守卫
router.beforeEach((to, from, next) => {
  // const token = localStorage.getItem('token');
  let whiteList = ['/login', '/register'];
  let token = JSON.parse(localStorage.getItem('user-store'))?.user?.profile?.token || false

  // 用户已登录，跳转至首页
  if (token) {
    // 用户有token并且跳转的是登录与注册那么就回首页
    if (whiteList.includes(to.path)) {
      next('/');
    } else {
      // 用户有token 并且跳转的是非登录与注册那么就下一步
      next();
    }
  } else {
    // 用户未登录
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next('/login');
    }
  }
});











export default router