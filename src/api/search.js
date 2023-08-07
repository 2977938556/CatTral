import request from '@/utils/request.js'




// 搜索内容
export let GetUserRegister = (data) => {
    return request(`/search/main`, 'post', data)
}



// 获取搜索的历史记录
export let GetHistoryData = (data) => {
    return request('/search/historyall', 'post', data)
}

// 清空历史记录
export let DeleteHistory = (data) => {
    return request('/search/deletahistory', 'post', data)
}