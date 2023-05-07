import Mock from 'mockjs'
import { baseURL } from '@/utils/request.js'


Mock.setup({
    timeout: '500-1000'
})


// 模拟banner的数据
// Mock.mock(`${baseURL}/home/banner`, 'get', {
//     code: 200,
//     message: "ok", result: [{
//         id: 1,
//         title: '轮播图1',
//         imgUrl: 'https://n.sinaimg.cn/edu/transform/20161129/vFH5-fxycika9082742.jpg'
//     },
//     {
//         id: 2,
//         title: '轮播图2',
//         imgUrl: 'https://mobile-img-baofun.zhhainiao.com/pcwallpaper_ugc_mobile/static/6e5ac7fde3e7e67b5eb8b1aa470124cc.jpg?x-oss-process=image%2Fresize%2Cm_lfit%2Cw_640%2Ch_1138'
//     },
//     {
//         id: 3,
//         title: '轮播图3',
//         imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn_9ltm95qVWV0e1Qa-IVBFb7WdR2xcmIgQ4fLrAfjYfWxZ6sdN4zFTrionvvp8NRRRzg&usqp=CAU'
//     },
//     {
//         id: 4,
//         title: '轮播图4',
//         imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtMvPQkm-JLz_JTtBcJSQPA2Rm2EBSQGCtcw&usqp=CAU'
//     },
//     {
//         id: 5,
//         title: '轮播图5',
//         imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRerelBBiyL8B9YtcIrH90tjszGIqzUy9569Q&usqp=CAU'
//     }]
// })

let tuij = []

for (let i = 0; i < 20; i++) {
    tuij.push({
        usetName: `${i + 1}`,
        slogan: "领养代替购买",
        id: `${i + 1}`,// 这个id用于查找当前的评论数据
        title: "有需要领奖猫猫的吗，个人因为工作的原因，不方便养猫了。。",
        image: [
            "https://example.com/banner2.jpg",
            "https://example.com/banner2.jpg",
        ],
        label: ["金渐层", "个人"],
        area: "赣州",
        releaceTime: "时间戳",
        page: 1,
        pageSize: 10,
        tatol: 2000,
    })
}




// 模拟首页的数据
Mock.mock(`${baseURL}/home/recommend`, 'get', { msg: "获取数据成功2推荐", result: tuij })




// 获取验证码
Mock.mock(`${baseURL}/user/registercode`, 'post', {
    code: 201, msg: "获取验证码成功", result: {
        code: "001001",
    }
})







