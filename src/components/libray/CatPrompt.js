import { createVNode, render } from "vue"



// 导入全局微提示组件
import CatPrompt from './cat-prompt.vue'


// 准备容器
let div = document.createElement('div')
div.setAttribute('class', 'message-app')
document.body.appendChild(div)




let time = null
export default ({ type, text, timeout = 3000 }) => {
    // 创建虚拟节点
    let vndom = createVNode(CatPrompt, { type, text })
    // 准备dom容器
    // 将虚拟节点插入dom容器·中
    render(vndom, div)
    // 开启定时器让提示消失
    clearTimeout(time)
    time = setTimeout(() => {
        render(null, div)
    }, timeout)
}
