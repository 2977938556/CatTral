import request from "@/utils/request";


// 修改用户名称和头像
// 这里看是否需要传递数据
export let PushModifyUsers = (data) => {
    return request('/user/modifyusers', 'post', data)
}


