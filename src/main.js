import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store/index.js'

let app = createApp(App)


// 重置样式
import 'normalize.css'

// 导入重置样式
// import '@/assets/styeles/default.less'
// import '@/assets/styeles/rule.less'


// 注册全局插件
import UI from '@/components/libray/index.js'
app.use(UI)



// 注册mockjs
import '@/mock/index.js'



app.use(router)
app.use(store)



app.mount('#app')
