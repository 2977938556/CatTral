<template>
    <div class="setups">
        <CartStatusBav :isstyle="false">
            <template #left>
                <CatReturn />
            </template>
            <template #center>
                <p class="tltes">私聊设置</p>
            </template>

        </CartStatusBav>


        <!-- 设置菜单 -->
        <div class="setup-content">
            <div class="setup-center">
                <div class="setup-item">
                    <div class="left">
                        <img src="../../../assets/image/cat-detail-dz.png" alt="">
                        <p>拉黑该用户</p>
                    </div>
                    <div class="right">
                        <div class="switch"
                            :style="{ backgroundColor: isOn ? 'rgba(255, 124, 0, 1)' : 'rgba(242, 242, 242, 1)' }"
                            @click="toggleSwitch">
                            <div class="switch-inner" :class="{ 'switch-on': isOn }"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>






<script setup>
// name: MessageSetup;
import { ref, watch, computed } from 'vue';
import { socket } from '@/utils/socket.js'
import { useRoute, useRouter, } from 'vue-router'
import { useStore } from 'vuex'

let route = useRoute()
let store = useStore()



const isOn = ref(false);
socket.emit('blackMessage', { user_id: store.state.user.profile._id, fuser_id: route.params.id, flage: "B" });

socket.on('black_detai', async ({ messages, data }) => {
    if (data != null) {
        isOn.value = true
    } else {
        isOn.value = false
    }
})


// 控制是否拉黑
function toggleSwitch() {
    isOn.value = !isOn.value;
}

watch(isOn, (newVal, olVal) => {
    socket.emit('black_user', { user_id: store.state.user.profile._id, fuser_id: route.params.id, flage: newVal })

})













</script>





<style lang="less" scoped>
.setups {
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
        transform: translateX(100%);
        background: rgb(255, 255, 255);
    }
}
</style>
