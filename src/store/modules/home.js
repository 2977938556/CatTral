export default {
    namespaced: true,
    state: () => {
        return {
            CatRecommendBar: "B",// 控制选择那个模式
            cityAddrs: JSON.parse(localStorage.getItem('user-store'))?.home.cityAddrs, // 地区数据
            goodsitem: JSON.parse(localStorage.getItem('user-store'))?.home?.goodsitem || [],
            HomeBanner: JSON.parse(localStorage.getItem('user-store'))?.home.HomeBanner || []
        }
    },
    mutations: {
        // 设置控制模式的数据
        Modify(state, payload) {
            state.CatRecommendBar = payload
        },
        // 设置地区的数据
        SetcityAddrs(state, payload) {
            state.cityAddrs = payload
        },
        // 设置首页推荐最新和关注的数据
        SetGoodsitem(state, payload) {
            payload.map(item => {
                let index = state.goodsitem.findIndex(items => items?._id === item?._id)
                if (index < 0) {
                    state.goodsitem.push(item)
                }
            })

        },
        // 清空推荐等数据
        DeleteGoodsitem(state, payload) {
            state.goodsitem = payload
        },
        // 设置banner的数据
        SetHomeBanner(state, payload) {
            state.HomeBanner = payload
        }
    },
    actions: {

    },
    getters: {
        GetIdGoods: (state) => (id) => {
            // console.log(state);
            // return state.goodsitem.find((item) => item.cat_id === id);
            return JSON.parse(localStorage.getItem("user-store")).home?.goodsitem.find((item) => item.cat_id === id);
        },

    }
}


