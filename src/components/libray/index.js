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
    }
}