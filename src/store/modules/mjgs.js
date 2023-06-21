export default {
    namespaced: true,
    state: () => {
        return {
            StoryList: []
        }
    },
    mutations: {
        AddStoryList(state, playload) {
            state.StoryList.push(...playload)
        }
    },
    actions: {


    },
    getters: {

    }
}

