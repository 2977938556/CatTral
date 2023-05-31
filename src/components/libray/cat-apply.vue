<template>
    <span class="btn" @click="submitCat">申请领养</span>
</template>

<script>


import CatPromptJS from '@/components/libray/CatPrompt.js'
import { useRouter } from 'vue-router'


export default {
    name: "CatApply",
    props: {
        DetailData: {
            type: Object,
            default: {}
        }
    },
    setup(props, { emit }) {
        let router = useRouter()
        // 这里是提交判断是否被领养了如果被领养了那么就需要设置一个id传递给申请组件，否则就提示猫咪已经被领养了
        let submitCat = () => {
            if (props.DetailData.Successful_adoption == false) {
                router.push(`/comment/applyfor/${props.DetailData._id}`)
            } else {
                CatPromptJS({ text: "猫猫已被领养", type: 'warn' })
            }
        }
        return { submitCat }
    }
}
</script>




<style lang="less" scoped>
// 按钮样式
.btn {
    display: block;
    width: 62px;
    height: 26px;
    background: @primary-color;
    text-align: center;
    line-height: 26px;
    color: @white-color;
    /** 文本1 */
    font-size: @heading3-font-size;
    font-weight: 500;
    border-radius: 50px;

    &:hover {
        background: @transition-color;
        font-weight: 900;
    }
}
</style>