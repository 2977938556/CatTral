import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store/index.js'

let app = createApp(App)


// 重置样式
import 'normalize.css'


app.use(router)
app.use(store)



app.mount('#app')
