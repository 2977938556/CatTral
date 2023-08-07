import store from '@/store'
import router from '@/router'




// 这个是退出的模块
export const OutUserFn = () => {
    // console.log("准备退出了");
    store.commit('user/SetUser', {})// 清空用户数据
    store.commit('home/Modify', "B")//清空默认的状态
    store.commit('home/DeleteGoodsitem', {})// 清空推荐数据
    store.commit('home/SetHomeBanner', {})// 清空banner的数据

    router.push('/login')
}