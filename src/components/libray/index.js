// 状态栏组件 因为每一个页面都需要注册所以需要全局注册
import CatStatusNav from './cat-status-bar.vue'
// 导航栏组件
import CatNavBar from './cat-nav-bar.vue'
// 首页banner组件
import CatBannner from './cat-banner.vue'
// 骨架屏单个加载
import CatLodingItem from './cat-loading-item.vue'
// 单个卡片详情组件
import CarGoodsItem from './cat-goods-item.vue'
// 推荐bar 
import CatRecommendBar from './cat-recommend-bar.vue'
// 固定推荐bar
import CatRecommendBarSkice from './cat-recommend-bar-skice.vue'
// 底部加载效果
import CatLoding from './cat-loding.vue'
// 返回模块
import CatReturn from './cat-return.vue'
// 提示组件
import CatMessage from './cat-message.vue'
// 提示组件的js使用
import MessageJs from './CarMessage.js'
// 地区组件
import CatAddrs from './cat-addrs.vue'
// 推荐标题组件
import RecenGood from './cat-remind-tj.vue'
// 评论详情
import CatComment from './cat-comment.vue'
// 弹窗选择地区组件
import CatOpenCity from './cat-open-city.vue'
// 确认组件[js]
import CatConfire from './CatConfire.js'
// 弹窗组件【vue】
import CatConfires from './cat-confire.vue'
// 发布组件
import CatRegisterLoding from './cat-register-loding.vue'
// 查看图片全屏组件
import CatFullImg from './cat-full-img.vue'
// 详情页面的加载骨架
import CatDetailLoding from './cat-detail-loding.vue'
// 全局小提示组件
import CatPrompt from './cat-prompt.vue'
// 全局小提示组件 js版本
import CatPromptJS from './CatPrompt.js'
// 申请按钮
import CatApply from './cat-apply.vue'
// 用户信息模块
import CarUserInfo from './cat-user-info.vue'
// 用户提交的按钮
import CatSubmit from './cat-submit.vue'
// 评论模块
import CarCommentCommponent from './cat-comment-component.vue'

export default {
    install(app) {
        app.component(CatStatusNav.name, CatStatusNav)
        app.component(CatNavBar.name, CatNavBar)
        app.component(CatBannner.name, CatBannner)
        app.component(CatLodingItem.name, CatLodingItem)
        app.component(CarGoodsItem.name, CarGoodsItem)
        app.component(CatRecommendBar.name, CatRecommendBar)
        app.component(CatRecommendBarSkice.name, CatRecommendBarSkice)
        app.component(CatLoding.name, CatLoding)
        app.component(CatReturn.name, CatReturn)
        app.component(CatMessage.name, CatMessage)
        app.config.globalProperties.$MessageJs = MessageJs// 原型函数挂在提示组件
        app.component(CatAddrs.name, CatAddrs)
        app.component(RecenGood.name, RecenGood)
        app.component(CatComment.name, CatComment)
        app.component(CatOpenCity.name, CatOpenCity)
        app.config.globalProperties.$CatConfire = CatConfire// 原型函数挂在提示组件
        app.component(CatConfires.name, CatConfires)
        app.component(CatRegisterLoding.name, CatRegisterLoding)
        app.component(CatFullImg.name, CatFullImg)
        app.component(CatDetailLoding.name, CatDetailLoding)
        app.component(CatPrompt.name, CatPrompt)
        app.config.globalProperties.$CatPromptJS = CatPromptJS // 小提示组件挂载全局js版本
        app.component(CatApply.name, CatApply)
        app.component(CarUserInfo.name, CarUserInfo)
        app.component(CatSubmit.name, CatSubmit)
        app.component(CarCommentCommponent.name, CarCommentCommponent)


    }
}

