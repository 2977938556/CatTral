
export default {
    namespaced: true,
    state: () => {
        return {
            CommentDat: [],
            showComment: false,
        }
    },
    mutations: {
        // 添加数据
        SetCommentDat(state, playload) {
            state.CommentDat = playload
        },
        // 点赞
        AddCommentData(state, { addupId, commenter }) {
            state.CommentDat.map(item => {
                // 这里是找到用户点击的评论
                if (item._id == addupId) {
                    // 这里是判断点赞人员中是否有当前用户点击的评论
                    let index = item.addup.findIndex(items => items == commenter)
                    console.log(index);
                    if (index < 0) {
                        item.addup.push(commenter)
                    } else {
                        item.addup.splice(index, 1)
                    }
                }

                return item
            })
        },

        // 添加评论
        IncreaseComment(state, playload) {
            state.CommentDat.unshift(playload)
        },
        // 关闭评论
        SetShowComment(state, playload) {
            state.showComment = !state.showComment
        }
    },
    actions: {

    },
    getters: {

    }
}

