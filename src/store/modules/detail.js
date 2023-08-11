
export default {
    namespaced: true,
    state: () => {
        return {
            CommentDat: [],// 评论数据
            showComment: false,// 控制评论是否显示隐藏
            DetailData: {},// 帖子的数据
            CommentDetail: {},// 评论详情的数据
        }
    },
    mutations: {
        SetDetailData(state, playload) {
            state.DetailData = playload
        },
        // 添加数据评论的数据
        SetCommentDat(state, playload) {
            state.CommentDat = playload
        },
        // 点赞的添加与删除
        AddCommentData(state, { addupId, commenter }) {

            state.CommentDat.map(item => {
                // 这里是找到用户点击的评论
                if (item._id == addupId) {
                    // 这里是判断点赞人员中是否有当前用户点击的评论
                    let index = item.addup.findIndex(items => items == commenter)
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
        },
        // 添加回复
        // 通过回复的id进行查询并添加回复的信息
        SetReplies(state, { refId, playload }) {
            // state.showComment = !state.showComment
            state.CommentDat.map(item => {
                // 这里是找到用户点击的评论
                if (item._id == refId) {
                    // // 这里是判断点赞人员中是否有当前用户点击的评论
                    item.replies.push(playload)
                }

                return item
            })


        },
        // 添加评论详情的数据
        SetCommentDetail(state, playload) {
            state.CommentDetail = playload
        },
        // 评论详情中的点赞与取消
        AddCommentDetail(state, { addupId, commenter }) {
            let index = state.CommentDetail.addup.findIndex(item => item == commenter)
            // console.log(index);
            if (index < 0) {
                state.CommentDetail.addup.push(commenter)
            } else {
                state.CommentDetail.addup.splice(index, 1)
            }
        },
        // 评论详情中的回复模块
        SetCommentDetailData(state, playload) {
            state.CommentDetail.replies.unshift(playload)
        }

    },
    actions: {

    },
    getters: {
        GetCommenTetails: (state) => (id) => {
            return state.CommentDat.filter(item => item._id == id) || []
        }

    }
}

