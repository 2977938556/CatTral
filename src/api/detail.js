import request from '@/utils/request.js'




/**
 * 获取页面详情数据 
 * @param {string} id 
 * @returns {promsie} 
 */
export const GetDEtailCat = (id) => {
    return request(`/detail/cate?id=${id}`, 'get')
}



/**
 * 获取收藏的数据
 * @param {string} id 用户id
 * @returns {promsie} 
 */
export const GetCollect = (id) => {
    return request(`/detail/collect?user_id=${id}`, 'get')
}



/**
 * 获取收藏的数据
 * @param {string} id 用户id
 * @param {Boolean} collectFlage 是否收藏true表示收藏了false表示没有收藏
 * @returns {promsie} 
 */
export const GetcollectObje = (data) => {
    return request(`/detail/collect`, 'post', data)
}




/**
 * 用户推荐的数据
 * @returns {promsie} 
 */
export const GetRemmed = (data) => {
    return request(`/detail/recommend`, 'get')
}





/**
 * @param {string} cat_id 帖子id
 * @param {string} user_id 用户id
 * @param {string} comment 发布的内容
 * @returns {promsie} 
 * 
 * 发布评论模块
 */
export const PushCommentData = (data) => {
    return request(`/detail/comment`, 'post', data)
}






/**
 * @param {string} cat_id 帖子id
 * @returns {promsie} 
 * 获取评论模块
 */
export const GetCommentData = (data) => {
    return request(`/detail/comment?cat_id=${data}`, 'get')
}






/**
 * @param {string} cat_id 帖子id
 * @param {string} user_id 点赞的用户id
 * @returns {promsie} 
 * 获取评论模块
 */
export const PushAddUp = (body) => {
    return request(`/detail/addup`, 'post', body)
}





/**
 * @param {string} content 回复内容
 * @param {string} replier 回复者的id
 * @param {string} parentId 回复的帖子id
 * @returns {promsie} replier
 * 获取评论模块
 */
export const PushReply = (body) => {
    return request(`/detail/reply`, 'post', body)
}








/**
 * @param {string} id 评论id
 * @returns {promsie} replier
 * 获取评论模块
 */
export const CommentDetail = (id) => {
    return request(`/detail/commentdetail?id=${id}`, 'get')
}




/**
 * @returns {promsie} replier
 * 获取评论模块
 */
export const GetFollow = () => {
    return request(`/detail/follows`, 'get')
}





/**
 * @returns {promsie} replier
 * 获取评论模块
 */
export const PushFollow = (data) => {
    return request(`/detail/follows`, 'post', data)
}











