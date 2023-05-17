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