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

    }
}