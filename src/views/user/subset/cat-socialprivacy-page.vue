<template>
    <div class="socialprivacy">
        <!--  头部 -->
        <CartStatusBav :isstyle="false">
            <!-- 左边内容插槽 -->
            <template #left>
                <CatReturn></CatReturn>
            </template>
            <!-- 中间内容插槽 -->
            <template #center>
                社交隐私
            </template>
        </CartStatusBav>

        <!-- 设置菜单 -->
        <div class="setup-content">
            <div class="setup-center">
                <div class="setup-item" v-for="(item, index) in settings" :key="item.label">
                    <div class="left">
                        <img v-if="item.label == '禁止私聊我'" src="../../../assets/image/cat-message-notselect.png" alt="">
                        <img v-if="item.label == '停止历史记录'" src="../../../assets/image/cat-user-lsjl-icon.png" alt="">
                        <img v-if="item.label == '禁止查看我的收藏'" src="../../../assets/image/cat-user-sc-no-icon.png" alt="">
                        <p>{{ item.label }}</p>
                    </div>
                    <div class="right">
                        <div class="switch"
                            :style="{ backgroundColor: item.value ? 'rgba(255, 124, 0, 1)' : 'rgba(242, 242, 242, 1)' }"
                            @click="ChanegSwitch(index)">
                            <div class="switch-inner" :class="{ 'switch-on': item.value }"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
// name: MessageSetup;
import { ref, watch, computed, reactive } from 'vue';
import { useRoute, useRouter, } from 'vue-router'
import { useStore } from 'vuex'
import { SetPrivacy } from '@/api/user.js'
import CatPromptJS from '@/components/libray/CatPrompt.js'




let route = useRoute()
let store = useStore()


const isOn = ref(false);



let settings = reactive([
    { label: "禁止私聊我", value: true, name: 'private_letter' },
    { label: "停止历史记录", value: false, name: 'History' },
    { label: "禁止查看我的收藏", value: false, name: 'view_favorites' }
])




let userData = computed(() => store.state.user.profile)


watch(() => userData.value.configuration_information, (newVal, olVal) => {
    settings[0].value = newVal.private_letter
    settings[1].value = newVal.History
    settings[2].value = newVal.view_favorites

}, {
    immediate: true
})


let ChanegSwitch = (index) => {
    // 这里是需要发送请求
    // console.log();
    SetPrivacy({ _id: userData.value._id, name: settings[index].name, value: settings[index].value }).then(({ result }) => {
        store.commit('user/SetUser', result.data)

    }).catch(({ }) => {
        CatPromptJS({ text: data?.message || "设置失败", type: 'error' })
    })
}
















</script>




<style lang="less" scoped>
.socialprivacy {
    width: 100%;
    height: 812px;
    background: rgba(242, 242, 242, 1);

    .setup-content {
        width: 375px;
        height: 100%;
        display: flex;
        justify-content: center;

        .setup-center {
            width: 345px;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            .setup-item {
                width: 345px;
                height: 60px;
                display: flex;
                margin-top: 20px;
                border-radius: 11px;
                background: rgba(255, 255, 255, 1);
                justify-content: space-between;

                .left {
                    // border: 1px solid red;
                    display: flex;
                    align-items: center;
                    padding-left: 20px;

                    img {
                        width: 20px;
                        height: 20px;
                        object-fit: cover;
                    }

                    p {
                        padding-left: 5px;
                        font-size: 14px;
                        font-weight: 700;
                        letter-spacing: 0px;
                        line-height: 37px;
                        color: rgba(38, 38, 38, 1);
                        text-align: left;
                        vertical-align: top;
                    }
                }

                .right {
                    padding-right: 20px;
                    display: flex;
                    align-items: center;
                    // border: 1px solid red;
                }
            }

        }
    }
}




.switch {
    display: inline-block;
    width: 60px;
    height: 30px;
    border-radius: 15px;
    background-color: #ccc;
    position: relative;
    cursor: pointer;

    .active {
        display: inline-block;
        width: 60px;
        height: 30px;
        border-radius: 15px;
        background: rgba(255, 124, 0, 1);
        position: relative;
        cursor: pointer;
    }


    .switch-inner {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(255, 124, 0, 1);
        position: absolute;
        top: 0;
        left: 0;
        transition: transform 0.2s;

    }

    .switch-on {
        background: rgb(255, 255, 255);
        transition: transform 0.2s;
        transform: translateX(100%);
    }
}
</style>
