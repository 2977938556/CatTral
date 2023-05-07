export default {
    namespaced: true,
    state: () => {
        return {
            // 用户信息
            profile: {
                id: '',
                avatar: '',
                nickname: '',
                account: '',
                mobile: '',
                token: '',
                time: '',
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


