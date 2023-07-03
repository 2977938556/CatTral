export default {
    namespaced: true,
    state: () => {
        return {
            StoryList: [],// 加载的数据,
            Maxloding: true,// 加载的第几页
        }
    },
    mutations: {
        AddStoryList(state, playload) {
            state.StoryList.push(...playload)
        },
        SetMaxloding(state, playload) {
            state.Maxloding = playload
        }
    },
    actions: {


    },
    getters: {

    }
}

