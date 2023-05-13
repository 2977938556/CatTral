import request from "@/utils/request";


// 获取首页banner的数据
export const GetHomePageBanner = () => {
    return request('/home/banner', 'get')
}



// 获取首页推荐的数据
export const GetHomePageTuiJian = (data) => {
    return request('/home/recommend', 'post', data)
}