<template>
    <span class="btn" @click="submitCat">{{ mes }}</span>
</template>

<script>


import CatPromptJS from '@/components/libray/CatPrompt.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'


export default {
    name: "CatApply",
    props: {
        DetailData: {
            type: Object,
            default: {}
        }
    },
    setup(props, { emit }) {
        let mes = ref("申请领养")
        let router = useRouter()
        let store = useStore()

        // 这里是提交判断是否被领养了如果被领养了那么就需要设置一个id传递给申请组件，否则就提示猫咪已经被领养了
        if (props.DetailData.Successful_adoption == false && props.DetailData.to_examine != "ok") {
            mes.value = "申请领养"
        } else {
            mes.value = "已被领养"
        }



        // 点击提交的模块
        let submitCat = () => {
            if (store.state.user.profile._id === props.DetailData.user_id._id) {
                return CatPromptJS({ text: "不可以领养自己猫猫", type: 'warn' })
            }

            // 这里判断是是状态
            if (props.DetailData.Successful_adoption == false && props.DetailData.to_examine != "ok") {
                router.push(`/comment/applyfor/${props.DetailData._id}`)
            } else {
                CatPromptJS({ text: "猫猫已被领养", type: 'warn' })
            }
        }
        return { submitCat, mes }
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