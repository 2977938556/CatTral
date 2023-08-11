export default {
    namespaced: true,
    state: () => {
        return {
            CartConfig: {
                page: 1,
                pageSize: 3,
                total: 0,
            },
            StoryList: [],// 加载的数据,
            Maxloding: true,// 加载的第几页
            StoryDetail: {},// 故事详情模块的数据
            StoryComment: [],// 故事评论数据,
            CommentRefyData: [],// 故事评论列表
            MaxCommentLodinf: true,// 设置是否可以加载数据
            FromData: {
                _id: "",
                page: 1,
                pageSize: 3,
                sort: 1,
                total: 0,
            }
        }
    },
    mutations: {
        // 添加故事
        AddStoryList(state, playload) {
            if (playload.length == 0) {
                state.StoryList = playload
            }
            state.StoryList.push(...playload)
            state.CartConfig.page++
        },
        SetCartConfig(state) {
            state.CartConfig = {
                page: 1,
                pageSize: 3,
                total: 0,
            }
        },
        // 设置是否加载完毕了
        SetMaxloding(state, playload) {
            state.Maxloding = playload
        },
        // 设置故事详情的模块数据
        AddStoryDetail(state, playload) {
            state.StoryDetail = playload
        },
        // 设置故事评论的数据
        AddStoryComment(state, playload) {
            if (playload.length == 0) {
                state.StoryComment = playload
            }
            state.StoryComment.push(...playload)
            state.FromData.page++
        },
        // 设置FromDat
        SetFromData(state, { _id, page, total }) {
            if (_id) {
                state.FromData._id = _id
            } else if (page) {
                state.FromData.page = page
            } else {
                state.FromData.total = total
            }
        },
        SetFromDataDefault(state, playlaod) {
            state.FromData = {
                _id: "",
                page: 1,
                pageSize: 3,
                sort: 1,
                total: 0,
            }
        },
        // SetFromDataDefault()
        // 本地添加数据
        AddStoryComments(state, playload) {
            state.StoryComment.unshift(...playload)
        },
        // 基于id查询出当前需要添加回复的数据并且添加进去
        AddStoryCommentRefly(state, { commentId, playload }) {
            let datas = state.StoryComment.find(item => item._id === commentId)
            if (datas) {
                datas.replies.push(playload)
                // console.log("添加成功");
            }
        },
        // 点赞模块的数据
        // 需要提供点击的评论id和用户id
        AddStoryComment_Up(state, { commentId, userId }) {
            // 这里我们是先查询出需要点赞的模块
            const targetComment = state.StoryComment.find(item => item._id === commentId);

            //这里进行判断是否有有数据
            if (targetComment) {
                // 这里是查询是否有点赞如果有那么就会返回索引值
                const index = targetComment.addup.findIndex(item => item === userId);

                // 通过索引值我们进行判断是否有进行增删
                if (index < 0) {
                    targetComment.addup.push(userId);
                } else {
                    targetComment.addup.splice(index, 1);
                }
            }
        },
        // 设置回复模块的数据
        SetMaxCommentLodinf(state, playload) {
            state.MaxCommentLodinf = playload
        }
    },
    actions: {
    },
    getters: {

    }
}

