<template>
    <div class="apply">
        <div class="apply-content">
            <div class="apply-center" v-if="ApplyLiat.length">
                <!-- <CatConfires/> -->
                <Popupnotification v-if="vavle" v-model="vavle" @closeCallback="closeCallback" @subCallback="subCallback">
                    <template #title>
                        <p>{{ catType == 'ok' ? '同意确认' : '不同意确认' }}</p>
                    </template>
                    <template #content>
                        <div class="input-message">
                            <p>留言</p>
                            <textarea v-model="message"></textarea>
                        </div>
                    </template>

                </Popupnotification>
                <template v-for="(item, index) in  ApplyLiat" :key="item._id">
                    <!-- 单个的模块 -->
                    <div class="apply-item" v-if="item.to_examine === 'examine'">
                        <!-- 头部组件 -->
                        <ApplyCarUserInfo :user="item.user_id" :time="item.created_at" />
                        <!-- 猫帖子组件 -->
                        <CatInfor :cat="item.cat_id" />
                        <!-- 留言 -->
                        <Message :message="item.content" />
                        <!-- 提交按钮 -->
                        <SubmitBUtton :apply="item" @okCat="ok" @noCat="no" />

                    </div>

                    <div class="apply-item" v-if="item.to_examine === 'ok' || item.to_examine === 'nopass'">
                        <!-- 头部组件 -->
                        <ApplyCarUserInfo :user="item.user_id" :time="item.created_at" />
                        <!-- 猫帖子组件 -->
                        <CatInfor :cat="item.cat_id" />
                        <!-- 留言 -->
                        <Message :message="item.content" />
                        <!-- 提交按钮 -->
                        <!-- <SubmitBUtton :apply="item" @okCat="ok" @noCat="no" /> -->
                        <!-- 我的留言 -->
                        <UserMessage :user_message="item.user_content" title="我的留言" />
                        <!--  状态 -->
                        <CatStatus :to_examine="item.to_examine" />
                    </div>




                </template>

            </div>
            <CatLoding :loading="loading" :finished="finished" />
        </div>
    </div>
</template>

<script  setup>
import ApplyCarUserInfo from '../component/user-infor.vue'//头部组件
import CatInfor from '../component/cat-infor.vue'//猫帖子组件
import Message from '../component/message.vue'//留言
import SubmitBUtton from '../component/submit-button.vue'//提交按钮
import UserMessage from '../component/user-message.vue'//我的留言
import CatStatus from '../component/cat-status.vue'//状态
import { GetApplyCat, PushApplyCat } from '@/api/message.js'
import MessageJs from '@/components/libray/CarMessage.js'


import CatPromptJS from '@/components/libray/CatPrompt.js'// 弹出框

import Popupnotification from '../component/pop-upnotification.vue'


import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'


let store = useStore()

let userData = store.state.user.profile

let loading = ref(false)
let finished = ref(false)


let ApplyLiat = ref([])

// Api 获取数据
try {
    let GetApplyList = async () => {
        loading.value = true
        let { result } = await GetApplyCat({ _id: userData._id })
        loading.value = false
        if (result.data.length == 0) {
            finished.value = true;
            loading.value = false
        }
        ApplyLiat.value = result.data
        finished.value = true
    }
    GetApplyList()

} catch (err) {
    CatPromptJS({ text: "出错了哦", type: "error" })
}


// 控制显示弹窗的
let vavle = ref(false)

// 控制是同意还是不同意类型的
let catType = ref('no')

// 控制是哪个用户提交的
let Appluy_user_item = ref(null)

// 收集留言
let message = ref('谢谢你')



// 同意按钮
let ok = ({ vavles, item }) => {
    vavle.value = true
    catType.value = 'ok'
    Appluy_user_item.value = item
}

// 不同意按钮
let no = ({ vavles, item }) => {
    vavle.value = true
    catType.value = 'no'
    Appluy_user_item.value = item
}




// 弹窗的确认模块
let subCallback = async (s) => {
    try {
        let { result } = await PushApplyCat({ _id: Appluy_user_item.value._id, statuss: catType.value, message: message.value })

        let index = ApplyLiat.value.findIndex((item) => item._id === Appluy_user_item.value._id)

        if (index !== -1) {
            ApplyLiat.value.splice(index, 1, result.data);
        }
        CatPromptJS({ text: result.message, type: "success" })

    } catch ({ response: { data } }) {
        CatPromptJS({ text: data.message || "错误", type: "success" })
    }
}

// 取消
let closeCallback = (s) => {

}









</script>






<style lang="less" scoped>
.input-message {
    width: 100%;
    height: 100px;

    p {
        // padding-bottom: 10px;
    }

    textarea {
        background: @background-color;
        width: 100%;
        height: 100%;
        border-radius: 6px;
        border: none;
        padding: 10px;
        outline: none;

    }



}

.apply {
    width: 100%;

    padding-bottom: 100%;
    .apply-content {
        width: 375px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .apply-center {
            width: 345px;
            height: 100%;

            .apply-item {
                width: 345px;
                height: 100%;
                background: @white-color;
                border-radius: 10px;
                overflow: hidden;
                padding-bottom: 10px;
                margin-bottom: 20px;
            }

        }
    }



}
</style>