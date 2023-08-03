
export default {
    namespaced: true,
    state: () => {
        return {
            friends: [],
            black: {
                messages: "",
                data: null,
            },
        }


    },
    mutations: {
        AddFriends(state, playload) {
            state.friends = playload
        },
        AddBlack(state, playload) {
            state.black = playload
        }
    },
    actions: {

    },
    getters: {
        getFriendById: (state) => (id) => {
            // 使用箭头函数返回一个接受 id 参数的函数
            return state.friends.find((item) => item.fuser_id._id === id);
        }
    }
}

