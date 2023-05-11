import request from '@/utils/request.js'



/**
 * 注册用户数据
 */

export let GetUploadCard = (data) => {
    return request(`/release/filte`, 'post', data)
}