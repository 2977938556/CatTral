<template>
    <div class="applyfor">
        <CartStatusBav>
            <template #left>
                <CatReturn />
            </template>
            <template #center>
                评论详情
            </template>
        </CartStatusBav>


        <div class="applyfro-content">
            <div class="applyfor-content-center">
                <div class="applyfor-title">
                    <h1>申请内容</h1>
                </div>
                <div class="applyfor-text">
                    <textarea v-model="message" placeholder="请填写你的申请吧，领养替代购买"></textarea>
                </div>
                <div class="applyfor-btn">
                    <div class="btn">
                        <button @click="sub">提交</button>
                    </div>
                    <div class="zysx">
                        <p>
                            <input type="checkbox" v-model="agreement">
                            <span>隐私协议</span>
                        </p>
                        <p>
                            注意事项
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup>
import MessageJs from '@/components/libray/CarMessage.js'
import { PushCatApply } from '@/api/detail.js'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'
import CatPromptJS from '@/components/libray/CatPrompt.js'

name: "CatAppluyFor";



let router = useRouter()
let route = useRoute()
let store = useStore()


// 数据双向绑定
let agreement = ref(true)
let message = ref("我很喜欢你的猫我是学生请给我")



// 提交事件
let sub = async () => {

    if (agreement.value == false) {
        return MessageJs({ type: "error", text: "隐私协议", timeout: 1000 })
    } else if (message.value == "") {
        return MessageJs({ type: "error", text: "留言内容不能为空", timeout: 1000 })
    }

    // 这里就是去提交数据了
    try {
        let { result } = await PushCatApply({ _id: route.params.id, message: message.value })
        CatPromptJS({ text: result.message, type: 'warn' })
        router.go(-1)
    } catch ({ response: { data } }) {
        CatPromptJS({ text: data.message, type: 'warn' })
    }
}


</script>


<style lang="less" scoped>
.applyfor {
    width: 100%;
    height: auto;
    background: white;
    padding-bottom: 100%;


    .applyfor-content-center {
        width: 345px;
        height: auto;
        margin: 0 auto;
        padding-top: 40px;

        // 标题
        .applyfor-title {

            h1 {
                font-size: 16px;
                font-weight: 700;
                letter-spacing: 0px;
                line-height: 23.17px;
                color: rgba(38, 38, 38, 1);
                text-align: left;
                vertical-align: top;
            }

        }

        // 申请内容
        .applyfor-text {
            padding-top: 10px;

            textarea {
                width: 345px;
                height: 162px;
                opacity: 1;
                border-radius: 10px;
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                padding: 10px 10px 10px 10px;
                background: @background-color;
                border: none;



                font-size: @heading2-font-size;
                font-weight: 500;
                color: @heading-color;
            }




        }


        // 提交按钮
        .applyfor-btn {
            width: 345px;
            height: 140px;
            display: flex;
            flex-direction: column;
            align-items: baseline;
            justify-content: flex-end;

            .btn {
                width: 345px;
                display: flex;
                align-items: center;
                justify-content: center;

                button {
                    width: 245px;
                    height: 36px;
                    border-radius: 73px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: none;
                    font-size: 16px;
                    font-weight: 700;
                    color: @white-color;
                    text-align: center;
                    vertical-align: top;
                    background: @transition-color;

                    &:hover {
                        background: @primary-color;
                    }
                }



            }

            .zysx {
                width: 245px;
                display: flex;
                margin: 0 auto;
                justify-content: space-between;
                align-items: center;


                p:nth-child(1) {
                    input {
                        width: 10px;
                        height: 10px;
                        opacity: 1;
                        border-radius: 3px;
                        background: @white-color;
                        border: 1px solid @body-color;
                        background: red;

                    }

                    span {
                        font-size: @body-font-size;
                        font-weight: 500;
                        color: @body-color;
                    }

                }

                p:nth-child(2) {
                    font-size: @body-font-size;
                    font-weight: 500;
                    color: @body-color;

                }

            }

        }


    }
}
</style>