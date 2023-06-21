import request from '@/utils/request.js'



// 上传故事模块
export const PushStoryData = (data) => {
    return request('/release/story', 'post', data)
}




// 获取故事模块
export const GetStoryData = (data) => {
    return request('/release/storylist', 'post', data)
}