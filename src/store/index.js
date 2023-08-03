import { createStore } from 'vuex'


// 持久化插件
import createPersistedstate from 'vuex-persistedstate'

// 导入模块
import home from '@/store/modules/home.js'
import message from '@/store/modules/message.js'
import search from '@/store/modules/search.js'
import user from '@/store/modules/user.js'
import detail from '@/store/modules/detail.js'
import mjgs from '@/store/modules/mjgs.js'
import mjhd from '@/store/modules/mjhd.js'
import mjzn from '@/store/modules/mjzn.js'
import websocket from '@/store/modules/websocket.js'

let store = createStore({
    modules: {
        home,
        message,
        search,
        user,
        detail,
        mjgs,
        mjhd,
        mjzn,
        websocket
    },

    // 持久化配置
    plugins: [
        createPersistedstate({
            key: 'user-store',
            paths: ['user', 'home', 'websocket']
        }, {
            key: 'mjgs-store',
            paths: ['mjgs']
        }, {
            key: 'mjgs-store',
            paths: ['websocket']
        })
    ]
})


export default store