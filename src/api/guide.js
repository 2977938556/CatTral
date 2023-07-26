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


// 获取列表数据
export const GetGuideList = (data) => {
    return request(GetUrl('/ymzn/guide', data), 'get')
}



export const GetGuideDetail = (data) => {
    return request(GetUrl('/ymzn/guidedetail', data), 'get')
}