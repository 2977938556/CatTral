import { createStore } from 'vuex'


// 持久化插件
import createPersistedstate from 'vuex-persistedstate'

// 导入模块
import home from '@/store/modules/home.js'
import message from '@/store/modules/message.js'
import search from '@/store/modules/search.js'
import user from '@/store/modules/user.js'

let store = createStore({
    modules: {
        home,
        message,
        search,
        user
    },

    // 持久化配置
    plugins: [
        createPersistedstate({
            key: 'erabbit-client-pc-store',
            paths: ['user']
        })
    ]
})


export default store