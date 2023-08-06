import request from "@/utils/request";


// 修改用户名称和头像
// 这里看是否需要传递数据
export let PushModifyUsers = (data) => {
    return request('/user/modifyusers', 'post', data)
}


// 获取用户的数据
export let GetUserData = (id) => {
    return request(`/user/userData?_id=${id}`, 'get')
}








// 获取 
// 这里基于类型获取不同的数据
// 用户 cat的数据 我的收藏 我的领养 搜索的数据(用户，流浪猫) 我发布的 


//  types：类型  state：用于判断需要哪些数据  customertype  可选参数 0表示对内 1表示对内 _id:当前用户或者其他用户
//  
//  MyPublishing  我的发布 state = noapply(未领养) 默认 yesapply(已领养)
//  MyCollection  我的收藏 
//  Myadoption    我的领养 
//  searchfor     搜索内容 state = cat(猫帖子) 默认 user(用户)

export let GetCatData = (data) => {
    return request(`/user/catdata`, 'post', data)
}


// 删除收藏的内容
export let DeleteCatLove = (data) => {
    return request(`/user/lovedelete`, 'post', data)
}


// 清空历史记录
export let DeleteHistory = (data) => {
    return request('/user/deletehistory', 'post', data)
}


// 隐私设置
export let SetPrivacy = (data) => {
    return request('/user/setprivacy', 'post', data)
}