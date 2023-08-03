import request from "@/utils/request";
// 格式胡数据
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



// 获取申请我的列表
export const GetApplyCat = (data) => {
    return request('/message/apply', 'post', data)
}


// 同意或者不同意模块
export const PushApplyCat = (data) => {
    return request('/message/applupush', 'post', data)
}


// 删除或者修改留言
export const PushApplyDelete = (data) => {
    return request('/message/myapplypush', 'post', data)
}