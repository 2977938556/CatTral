import request from '@/utils/request.js'



// 上传故事模块
export const PushStoryData = (data) => {
    return request('/mjgs/storysubmit', 'post', data)
}

// 获取故事模块
export const GetStoryData = (data) => {
    return request('/mjgs/storylist', 'post', data)
}


// 基于id获取故事详情
export const GetStoryDetail = (id) => {
    return request(`/mjgs/storydetail?_id=${id}`, 'get')
}