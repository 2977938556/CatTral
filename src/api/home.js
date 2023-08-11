import request from "@/utils/request";


// 获取首页banner的数据
export const GetHomePageBanner = (data) => {
    return request('/home/banner', 'post', data)
}



// 获取首页推荐的数据
export const GetHomePageTuiJian = (data) => {
    return request('/home/recommend', 'post', data)
}



// 获取活动的数据
export const GetBgData = (data) => {
    return request('/home/mjhddata', 'post', data)
}


// 基于id获取活动的数据
export const GetMjhdDeatil = (_id) => {
    return request(`/home/mjgsdetail?_id=${_id}`, 'get')
}


// 参加活动
export const PushMjhdSubmit = (data) => {
    return request("/home/mjhdsubmit", 'post', data)
}

//基于活动获取数据
export const GetMjhdSubmit = (_id) => {
    return request(`/home/mjhdsubmit?_id=${_id}`, 'get')
}

// 获取排行榜的数据
export const GetPhbDAta = (data) => {
    return request("/home/lyphlist", 'post', data)
}
