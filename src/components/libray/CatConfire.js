import { createVNode, render } from 'vue'
import CatConfires from './cat-confire.vue'

// 准备容器
let div = document.createElement('div')
// 添加类名
div.setAttribute('class', 'message-app')
// 渲染到body中
document.body.appendChild(div)



// 这里是传递的值
export default ({ title = "提示标题", text = "默认内容" }) => {
    return new Promise((resolve, reject) => {
        // 由于需要进行交互所以可以传递一个函数
        let subCallback = () => {
            render(null, div)
            resolve()
        }
        let closeCallback = () => {
            render(null, div)
            reject(new Error('点击取消'))
        }
        // 生成虚拟节点
        let ven = createVNode(CatConfires, { title, text, subCallback, closeCallback })
        // 渲染再容器内部
        render(ven, div)
    })

}