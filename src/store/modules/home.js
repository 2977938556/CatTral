export default {
    namespaced: true,
    state: () => {
        return {
            CatRecommendBar: "B",// 控制选择那个模式
            cityAddrs: null,// 地区数据
        }
    },
    mutations: {
        // 设置控制模式数据
        Modify(state, payload) {
            state.CatRecommendBar = payload
        },
        SetcityAddrs(state, payload) {
            state.cityAddrs = payload
        },
    },
    actions: {

    },
    getters: {

    }
}


