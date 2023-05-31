import request from "@/utils/request";


// 获取首页banner的数据
export const PushUerImg = (data) => {
    return request('/user/upload', 'post', data)
}
