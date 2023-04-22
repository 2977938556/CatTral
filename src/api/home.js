import request from "@/utils/request";


// 获取首页banner的数据
export const GetHomePageBanner = () => {
    return request('/home/banner', 'get')
}



// 获取首页推荐的数据
export const GetHomePageTuiJian = () => {
    return request('/home/recommend', 'get')
}