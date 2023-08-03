<template>
    <div class="message">
        <CartStatusBav :isstyle="false">
            <template #center>
                <p class="tltes">消息</p>
            </template>
        </CartStatusBav>

        <div class="message-conent">
            <div class="message-item">
                <router-link to="/message/applyfor">
                    <div class="message-item-center">
                        <!-- 头像 -->
                        <div class="message-user-img">
                            <div>
                                <img src="../../assets/image/cat-message-tz.png" alt="领养通知">
                            </div>
                            <span v-if="yd">{{ ApplyList.length || 1 }}</span>
                        </div>
                        <!-- 信息 -->
                        <div class="message-xiaoxi">
                            <div class="xiaoxi-center">
                                <p class="title">申请通知</p>
                                <p class="content">{{ ApplyList[0]?.content || "暂无申请通知" }}</p>
                            </div>
                        </div>
                        <!-- 时间 -->
                        <div class="message-time">
                            <p>{{ timeFormat(ApplyList[0]?.created_at) == "暂无时间" ? '' : '' }}</p>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="message-item" v-for="(item, index) in userList" :key="index">
                <router-link :to="`/message/detail/${item.fuser_id._id}`">
                    <div class="message-item-center">
                        <!-- 头像 -->
                        <div class="message-user-img">
                            <span v-if="item.unread.length">{{ item.unread.length }}</span>
                            <div>
                                <img class="user" :src="item.fuser_id.bgimgUrl" alt="头像">
                            </div>
                            <!-- <span>9</span> -->
                        </div>
                        <!-- 信息 -->
                        <div class="message-xiaoxi">
                            <div class="xiaoxi-center">
                                <p class="title">{{ item.fuser_id.username }}</p>
                                <p class="content">{{ item.message[item.message.length - 1]?.neiron }}</p>
                            </div>
                        </div>
                        <!-- 时间 -->
                        <div class="message-time">
                            <p>{{ timeFormat(item.created_at) }}</p>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>


        <cat-loding></cat-loding>

    </div>
</template>



<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { timeFormat } from '@/utils/timeFilter.js'
import { ref, computed } from 'vue'
import { socket } from '@/utils/socket.js'
import { GetApplyCat, PushApplyCat } from '@/api/message.js'



// import { io } from 'socket.io-client';

// window
let store = useStore()
let route = useRoute()
let router = useRouter()


socket.emit('join', store.state.user.profile._id);


// 这里是获取用户的私信
let userList = computed(() => store.state.websocket.friends)





// 收集申请的数据
let ApplyList = ref([])
// 判断是否需要显示圆点
let yd = ref(false)


// 这里是获取申请通知
GetApplyCat({ _id: store.state.user.profile._id }).then(({ result }) => {
    // 这里查询出是否有待申请的
    let s = result.data.filter(item => item.to_examine === 'examine')

    // 如果没有申请的那么就不显示圆点,并且将所有的申请数据赋值给他
    if (s.length === 0) {
        ApplyList.value = result.data
        yd.value = false

        // 否则就需要显示圆点并且将需要显示的数据赋值
    } else {
        yd.value = true
        ApplyList.value = s
    }
})










</script>


<style lang="less" scoped>
.message-conent {
    width: 100%;
    height: 100%;
    // border: 1px solid red;

    .message-item {
        width: 375px;
        height: 76px;
        // border: 1px solid red;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid @background-color;

        // 主体内容区域
        .message-item-center {
            width: 345px;
            height: 64px;
            // background: red;
            display: flex;
            justify-content: space-between;


            // 头像区域
            .message-user-img {
                width: 68px;
                height: 63px;
                display: flex;
                align-items: center;
                position: relative;


                div {
                    width: 48px;
                    height: 48px;
                    background: @transition-color;
                    border-radius: 100px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;


                    img {
                        object-fit: cover;
                        width: 25px;
                        height: 30px;
                    }

                    .user {
                        object-fit: cover;
                        width: 100%;
                        height: 100%;
                    }

                }

                span {
                    display: block;
                    background: @primary-color;
                    width: auto;
                    width: 20px;
                    line-height: 20px;
                    height: 20px;
                    position: absolute;
                    right: 13px;
                    border-radius: 10px;
                    top: 1px;
                    font-size: @body-font-size;
                    font-weight: 500;
                    letter-spacing: 0px;
                    color: @background-color;
                    text-align: center;
                }


            }

            // 消息区域
            .message-xiaoxi {
                width: 250px;
                height: 63px;
                // border: 1px solid red;
                display: flex;
                align-items: center;
                justify-content: center;

                .title {
                    font-size: 12px;
                    font-weight: 500;
                    letter-spacing: 0px;
                    color: @heading-color;
                }

                .xiaoxi-center {
                    // border: 1px solid red;
                    width: 250px;
                    height: 40px;

                    .content {
                        font-size: @body-font-size;
                        font-weight: 500;
                        letter-spacing: 0px;
                        color: @secondary-text-color;
                        vertical-align: top;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }


            }

            // 时间区域
            .message-time {
                width: 32px;
                height: 63px;
                // border: 1px solid red;

                p {
                    font-size: 8px;
                    font-weight: 500;
                    letter-spacing: 0px;
                    color: @heading-color;
                    text-align: right;
                }

            }


        }
    }
}
</style>
