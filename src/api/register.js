import request from '@/utils/request.js'



/**
 * 注册用户数据
 * @param {String} data - 第三方登录唯一标识
 * @param {Integer} source - 来源 1为pc，2为webapp，3为微信小程序，4为Android，5为ios,6为qq,7为微信
 * @returns Promise
 */

export let GetUserRegister = (data) => {
    return request(`/user/register`, 'post', data)
}



/**
  * 参数手机号
*/
export let GetUserRegisterCode = (mobild) => {
    return request('/user/registercode', 'post', mobild)
}

