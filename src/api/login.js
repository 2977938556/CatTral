import request from '@/utils/request.js'



/**
 * 注册用户数据
 * @param {String} username - 第三方登录唯一标识
 * @param {String} password - 第三方登录唯一标识
 * @returns Promise
 */

export let GetUserLogin = (data) => {
    return request(`/user/login`, 'post', data)
}