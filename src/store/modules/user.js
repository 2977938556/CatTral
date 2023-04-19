export default {
    namespaced: true,
    state: () => {
        return {
            // 用户信息
            profile: {
                id: '1',
                avatar: '2',
                nickname: '3',
                account: '4',
                mobile: '5',
                token: '6'
            }
        }
    },
    mutations: {
        // 修改用户数据
        SetUser(state, payload) {
            state.profile = payload
        }
    },
    actions: {

    },
    getters: {

    }
}


