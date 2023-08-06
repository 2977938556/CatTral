import { createRouter, createWebHashHistory } from 'vue-router'


// import Home from '@/views/home/index.vue'// 首页
// import Search from '@/views/search/index.vue'//搜索
// import CatLogin from '@/views/login/index.vue'//登录
// import CatRegister from '@/views/register/index.vue'// 注册
// import Release from '@/views/release/index.vue'// 发布页面



const Home = () => import('@/views/home/index.vue')// 首页
const Search = () => import('@/views/search/index.vue')//搜索
const CatLogin = () => import('@/views/login/index.vue')//登录
const CatRegister = () => import('@/views/register/index.vue')// 注册
const Release = () => import('@/views/release/index.vue')// 发布页面


// 首页功能模块
import CatMjgsPage from '@/views/home/subset/cat-mjgs-page.vue'// 猫迹故事
import CatStoryFromPage from '@/views/home/subset/mjgs/cat-story-from-page.vue'// 故事分享
import CatMjsdDetail from '@/views/home/subset/mjgs/cat-mjgs-detail.vue'// 详情页面


import CatMjsdPage from '@/views/home/subset/cat-mjsd-page.vue'// 猫迹商店



import CatMjznPage from '@/views/home/subset/cat-mjzn-page.vue'// 猫迹指南
import CatMjznDetail from '@/views/home/subset/mjzn/cat-mjzn-detail.vue'// 猫迹指南

import CatMjhdPage from '@/views/home/subset/cat-mjhd-page.vue'// 猫迹活动
import CarMjhdDetail from '@/views/home/subset/mjhd/cat-mjhd-detail-page.vue'// 活动详情页面
import CatMjhdAppfor from '@/views/home/subset/mjhd/cat-mjhd-applyfor-page.vue'// 报名页面
import CatParticipate from '@/views/home/subset/mjhd/cat-mjhd-participate-page.vue'// 我参与的活动



// 个人中心的功能模块
import User from '@/views/user/index.vue'//个人中心
import History from '@/views/user/subset/cat-history-page.vue'// 历史记录
import SetUser from '@/views/user/subset/cat-setuser-page.vue'// 设置用户名称

import MyRelase from '@/views/user/subset/cat-relase-page.vue'// 我的发布
import MyLove from '@/views/user/subset/cat-love-page.vue'// 我的收藏
import MyApply from '@/views/user/subset/cat-apply-page.vue'// 我的领养
import SocialPrivacy from '@/views/user/subset/cat-socialprivacy-page.vue'// 社交隐私模块
import MoreFunction from '@/views/user/subset/cat-morefunction-page.vue'// 更多功能
import Aboutus from '@/views/user/subset/cat-aboutus-page.vue'// 关于我们









// 消息页面
import Message from '@/views/message/index.vue'
import MesageDetail from '@/views/message/subset/message-detail.vue'// 聊天消息页面
import MessageSetup from '@/views/message/subset/message-setup.vue'// 私聊设置页面
import MessageApplyFor from '@/views/message/subset/message-applyfor.vue'// 申请页面







// 流浪猫详情组件
import CatDetail from '@/views/cat-details/index.vue'// 详情组件
import CommentDetail from '@/views/cat-details/subset/cat-commentDeatil-page.vue' //评论组件
import CatAppluyFor from '@/views/cat-details/subset/cat-applyfor-page.vue'// 申请页面
import Apply from '@/views/message/subset/subset/apply.vue'
import ApplyMy from '@/views/message/subset/subset/applymy.vue'


// 评论详情的通用组件
import CatCommentDetailsDomponent from '@/components/libray/cat-comment-details-domponent.vue'
import CatCommentDetail from '@/views/home/subset/mjgs/car-mjgs-comment.vue'

// 404错误对象
import CatError from '@/views/error/index.vue'

const routes = [
  // 首页模块功能路由
  { path: "/", redirect: '/home', },
  { path: "/home", component: Home }, ,// 首页,

  { path: '/home/mjgs', component: CatMjgsPage },//猫迹故事
  { path: '/home/mjgs/storyfrom', component: CatStoryFromPage },// 发布模块
  { path: "/home/mjgs/detai/:id", component: CatMjsdDetail },// 帖子详情模块
  { path: '/home/mjsd', component: CatMjsdPage },// 猫迹商店
  { path: '/home/mjgs/comment/:id', component: CatCommentDetail },// 通用的详情模块


  { path: '/home/mjzn', component: CatMjznPage },// 猫迹指南
  { path: '/home/mjzn/:id', component: CatMjznDetail },// 猫迹指南详情


  { path: '/home/mjhd', component: CatMjhdPage },// 猫迹活动
  { path: '/home/mjhd/:id', component: CarMjhdDetail },// 猫迹活动详情页面
  { path: '/home/mjhd/appfor/:id', component: CatMjhdAppfor },//报名活动
  { path: '/home/mjhd/participate', component: CatParticipate },//我参与的




  { path: '/user/release', component: Release },// 发布帖子

  // 消息模块
  { path: "/message", component: Message, },// 消息页面
  { path: '/message/detail/:id', component: MesageDetail },// 聊天页面
  { path: '/message/setup/:id', component: MessageSetup },// 私聊设置页面
  {
    path: '/message/applyfor/', component: MessageApplyFor, children: [
      { path: "", redirect: "/message/applyfor/apply" },
      { path: 'apply', name: "apply", component: Apply },// 申请页面
      { path: 'applymy', name: "applymy", component: ApplyMy },// 我的申请页面
    ]
  },// 申请页面


  // 搜索模块
  { path: "/search", component: Search, },

  // 详情模块
  { path: '/catdetail/:id', component: CatDetail },//流浪猫详情组件
  { path: '/comment/detail/:id', component: CommentDetail },//流浪猫评论详情组件
  { path: '/comment/applyfor/:id', component: CatAppluyFor },// 申请组件



  // 我的模块功能
  { path: "/user", component: User },// 个人中心模块
  { path: '/user/history', component: History },// 历史记录
  { path: '/user/setuser', component: SetUser },// 修改个人用户数据的模块

  { path: '/user/myrelase', component: MyRelase },// 修改个人用户数据的模块
  { path: '/user/mylove', component: MyLove },// 修改个人用户数据的模块
  { path: '/user/myapply', component: MyApply },// 修改个人用户数据的模块
  { path: '/user/social', component: SocialPrivacy },// 社交隐私模块
  { path: '/user/morefunction', component: MoreFunction },// 社交隐私模块
  { path: '/user/aboutus', component: Aboutus },// 关于我们模块



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