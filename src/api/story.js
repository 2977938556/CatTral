import request from '@/utils/request.js'

function GetUrl(dfUrl, params) {
    const urlParams = new URLSearchParams();
    // 这里是动态的遍历参数然后添加进去
    Object.entries(params).forEach(([key, value]) => {
        if (value) {
            urlParams.append(key, value);
        }
    });


    return `${dfUrl}?${urlParams.toString()}`;
}


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


// 发布评论
export const PushStoryReplay = (data) => {
    return request(`/mjgs/detail/replay`, 'post', data)
}



// 获取分页模块的评论数据
export const GetStoryComment = (params) => {
    return request(GetUrl('/mjgs/detail/comment', params), 'get');
}

// 增加回复模块
export const PushStoryHfCommment = (data) => {
    return request('/mjgs/detail/hfreplay', 'post', data)
}

// 点赞
// 需要传递一个当前评论的id
// 传递当前的用户模块
export const PushStoryLike = (data) => {
    return request('/mjgs/detail/PushStoryLike', 'post', data)
}


// 基于id和type查询出评论
export const GetCommentDetail = (params) => {
    return request(GetUrl('/comment/detail', params), 'get');
}


// 基于id查找父级的回复的评论数据
export const GetCommentReplay = (params) => {
    return request(GetUrl('/replay/detail', params), 'get');
}


