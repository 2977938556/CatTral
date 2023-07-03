

export default {
    namespaced: true,
    state: () => {
        return {
            MjhdData: [],// 猫迹活动的数据
            Maxloding: true,// 加载的第几页
        }
    },
    mutations: {
        //  设置猫迹的数据
        SetMjhdData(state, payload) {
            if (payload.length != 0) {
                payload.map(item => {
                    let index = state.MjhdData.findIndex(items => items?._id === item?._id)
                    if (index < 0) {
                        state.MjhdData.push(item)
                    }
                })
            } else {
                state.MjhdData = []
            }
        },
        //  page的数据
        SetMaxloding(state, payload) {
            state.Maxloding = payload
        }


    },
    actions: {

    },
    getters: {
    }
}


