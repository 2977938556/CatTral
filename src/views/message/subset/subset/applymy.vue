<template>
    <div class="apply">
        <div class="apply-content">
            <div class="apply-center" v-if="ApplyLiat.length">

                <Popupnotification v-if="vavle" v-model="vavle" @closeCallback="closeCallback" @subCallback="subCallback">
                    <template #title>
                        <p>{{ catType == 'ok' ? '删除确认' : '修改' }}</p>
                    </template>
                    <template #content v-if="catType == 'ok'">
                        <div class="input-message">
                            <p>请确认是否需要删除该申请,太久没消息,或者可以私聊该用户</p>
                            <!-- <textarea v-model="message"></textarea> -->
                        </div>
                    </template>
                    <template #content v-if="catType != 'ok'">
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
                        <SubmitBUtton :apply="item" @okCat="ok" @noCat="no" left="修改" right="删除" />
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
                        <UserMessage :user_message="item.user_content" title="主人留言" />
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
import { GetApplyCat, PushApplyDelete } from '@/api/message.js'
import MessageJs from '@/components/libray/CarMessage.js'
import CatPromptJS from '@/components/libray/CatPrompt.js'




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
        let { result } = await GetApplyCat({ _id: userData._id, Statusis: 2 })
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


// // 控制显示弹窗的
let vavle = ref(false)

// 控制是同意还是不同意类型的
let catType = ref('no')

// 控制是哪个用户提交的
let Appluy_user_item = ref(null)

// 收集留言
let message = ref('')



// 删除按钮
let ok = ({ vavles, item }) => {
    // console.log(vavles, item);
    vavle.value = true
    catType.value = 'ok'
    Appluy_user_item.value = item
}

// 修改留言按钮
let no = ({ vavles, item }) => {
    // console.log(vavles, item);
    vavle.value = true
    catType.value = 'no'
    Appluy_user_item.value = item
    message.value = item.content
}


// 弹窗的确认模块
let subCallback = async (s) => {
    try {
        let { result } = await PushApplyDelete({ _id: Appluy_user_item.value.cat_id._id, statuss: catType.value, message: message.value, user_id: userData._id })

        // 获取索引值
        let index = ApplyLiat.value.findIndex((item) => item._id === Appluy_user_item.value._id)

        // console.log(index, "测试模块");

        // 这里是修改留言的
        if (catType.value == 'no') {
            ApplyLiat.value[index].content = message.value

            CatPromptJS({ text: "修改留言成功", type: "success" })
        } else if (catType.value == 'ok') {

            if (index !== -1) {
                ApplyLiat.value.splice(index, 1)
            }
            CatPromptJS({ text: "删除成功", type: "success" })
        }


    } catch ({ response: { data } }) {
        CatPromptJS({ text: data.message || "错误", type: "error" })
    }






}

// 取消
let closeCallback = (s) => {

}









</script>






<style lang="less" scoped>
// 留言
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