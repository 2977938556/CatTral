export default {
    namespaced: true,
    state: () => {
        return {
            GoodList: [],
            Maxloding: true,// 判断是否加载完全部的数据了
            CartConfig: {
                page: 1,
                pageSize: 3,
                total: 0,
            }

        }
    },
    mutations: {
        // 添加数据
        AddGooList(state, playload) {
            if (playload.length == 0) {
                state.GoodList = playload
            }
            state.GoodList.push(...playload)
            state.CartConfig.page++
        },
        //  设置是否全部加载完毕数据了
        SetMaxloding(state, payload) {
            state.Maxloding = payload
        },
        // 设置查询参数的模块
        SetCartConfig(state, { page, total, pageSize }) {
            console.log(payload);
            // for (const key in state.CartConfig) {
            //     state.CartConfig[key] = payload[key]
            //     if (key in payload) {
            //         console.log(payload[key]);

            //         state.CartConfig[key] = payload[key];
            //         console.log(state.CartConfig);
            //     }
            // }
            if (page) {
                state.FromData.page = page
            } else if (total) {
                state.FromData.total = total
            } else if (pageSize) {
                state.FromData.pageSize = total
            }
        },
        SetCartConfigdefault(state, playlaod) {
            if (playlaod == null) {
                state.CartConfig = {
                    page: 1,
                    pageSize: 3,
                    total: 0,
                }
            }
        }


    },
    actions: {},
    getters: {}
}


