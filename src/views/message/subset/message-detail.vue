<template>
    <div class="message-deatil">
        <CartStatusBav :isstyle="true">
            <template #left>
                <CatReturn />
            </template>
            <template #center>
                <!-- <p class="tltes">{{ messageList[0]?.fuser_id.username }}</p> -->
                <p v-if="Us">{{ Us.username.length > 5 ? Us.username.slice(0, 5) + '..' : Us.username }}</p>
            </template>
            <template #right>
                <router-link :to="`/message/setup/${route.params.id}`"><img style="width: 20px;height: 16px;"
                        src="../../../assets/image/cat-message-shezhi-icon.png">
                </router-link>
            </template>
        </CartStatusBav>

        <div class="message-content" ref="contents">
            <!-- 内容区域 -->
            <div class="message-center" v-if="messageList">
                <div v-for="(item, index) in messageList" :key="index">
                    <div class="message-right margins" v-if="item?.user_id._id == store.state.user.profile._id">
                        <div class="right">
                            <div class="time">
                                <p>2023.8.5.66</p>
                            </div>
                            <div class="neire">
                                <p>
                                    {{ item.neiron }}
                                </p>
                            </div>
                        </div>
                        <div class="left">
                            <a href="#">
                                <span>
                                    <img :src="item.user_id.bgimgUrl" alt="#">
                                </span>
                            </a>
                        </div>
                    </div>

                    <div class="message-left margins" v-else>
                        <div class="left">
                            <a href="#">
                                <span>
                                    <img :src="item.user_id.bgimgUrl" alt="#">
                                </span>
                            </a>
                        </div>
                        <div class="right">
                            <div class="time">
                                <p>2023.8.5.66</p>
                            </div>
                            <div class="neire">
                                <p>
                                    {{ item.neiron }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="input">
                <input type="text" v-model="message">
                <button @click="messagePush">发送</button>
            </div>
        </div>
    </div>
</template>






<script setup>
import { ref, onMounted, nextTick, computed } from 'vue';

import { useRoute, useRouter, } from 'vue-router'
import { useStore } from 'vuex'
import { socket } from '@/utils/socket.js'
import { GetUserData } from '@/api/user.js'
import CatPromptJS from '@/components/libray/CatPrompt.js'


let route = useRoute()
let store = useStore()


// 滚动元素
let contents = ref(null)



// 进入聊天界面那么就清空掉未读信息
socket.emit('delete_unread', { user_id: store.state.user.profile._id, fuser_id: route.params.id });

let userData = ref(null)


GetUserData(route.params.id).then(({ result }) => {
    userData.value = result.data
}).catch(err => { })






// 存储当前用户
let Us = ref(null)

// 存储信息列表
let messageList = ref([])


// 这里基于id上传上去 获取所有的数据
socket.emit('getmessage_detail', { user_id: store.state.user.profile._id, fuser_id: route.params.id });


// 这个是监听多个信息并push到数组里面
socket.on('getmessage_deatil_data', (result, user) => {
    Us.value = user || null
    messageList.value.push(...result.message)
    let tiem = setTimeout(() => {
        contents.value.scrollTop = contents.value.scrollHeight - contents.value.clientHeight + 10;
    }, 10)

    clearTimeout(tiem)
})


// 这里是监听单个信息pus到数组里面
socket.on('getmessage_deatil_data_item', (res) => {
    // console.log(res);
    messageList.value.push(res)

    let tiem = setTimeout(() => {
        contents.value.scrollTop = contents.value.scrollHeight - contents.value.clientHeight + 10;
    }, 10)
})

socket.emit('join', store.state.user.profile._id);

// 这里是需要获取数据
let message = ref("hellow")



// 发送私聊数据
let messagePush = () => {
    if (userData.value.configuration_information.private_letter == true) {
        return CatPromptJS({ text: store.state.user.profile._id == userData.value._id ? '你开启了禁止私聊' : '用户已经开了禁止私聊', type: "error" })
    }
    // 先解绑之前的事件处理程序
    socket.off('black_detai');
    // 这里我们先发送一个请求验证是否被拉黑了
    socket.emit('blackMessage', { user_id: store.state.user.profile._id, fuser_id: route.params.id, flage: "A" });

    // socket.off('black_detai');
    socket.on('black_detai', async ({ messages, data }) => {
        // console.log("调用了");
        if (data != null) {
            return CatPromptJS({ text: messages, type: "error" })
        } else {
            // console.log("无数据");
            // 分别发送信息内容,发送者,接收者
            socket.emit('pushMessage', { message: message.value, user_id: store.state.user.profile._id, fuser_id: route.params.id });

            // 这里就是添加本地数据
            messageList.value.push({
                user_id: store.state.user.profile,
                fuser_id: route.params.id,
                neiron: message.value,
                created_at: new Date()
            })

            // 这里我们需要设置一个滚动到底部的模块
            let tiem = setTimeout(() => {
                contents.value.scrollTop = contents.value.scrollHeight - contents.value.clientHeight + 10;
            }, 0)
        }
    })






}


</script>






<style scoped lang="less">
.message-deatil {
    width: 100%;
    height: 100%;
    // padding-top:100px ;


    .message-content {
        width: 375px;
        height: 700px;
        display: flex;
        // background: red;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        overflow: auto;
        // overflow: hidden;

        // 评论内容区域
        .message-center {
            width: 325px;
            height: 100%;
            padding-bottom: 80px;

            .margins {
                margin-bottom: 20px;
            }

            // 左边的
            .message-left {
                width: 100%;
                height: 100%;
                display: flex;
                // margin-bottom: 20px;

                // justify-content: space-between;

                .left {
                    width: 45px;
                    height: 100%;


                    a {
                        span {
                            border-radius: 100%;
                            display: block;
                            width: 45px;
                            height: 45px;
                            overflow: hidden;

                            img {
                                width: 45px;
                                height: 45px;
                            }
                        }
                    }
                }

                .right {
                    padding-left: 15px;

                    .time {
                        p {
                            font-size: 14px;
                            font-weight: 400;
                            letter-spacing: 0px;
                            line-height: 17.38px;
                            color: rgba(127, 127, 127, 1);
                            text-align: left;

                        }
                    }

                    .neire {
                        width: auto;
                        height: auto;
                        background: rgba(255, 143, 36, 1);
                        border-radius: 0px 12px 12px 12px;

                        p {
                            max-width: 265px;
                            padding: 10px;
                            font-size: 12px;
                            font-weight: 500;
                            letter-spacing: 0px;
                            line-height: 17.38px;
                            color: rgba(255, 255, 255, 1);
                            text-align: left;
                            word-wrap: break-word;
                            /* 使用 word-wrap 属性实现自动换行 */

                        }
                    }

                }
            }


            //右边的

            .message-right {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: flex-end;

                .left {
                    width: 45px;
                    height: 100%;

                    a {
                        span {
                            border-radius: 100%;
                            display: block;
                            width: 45px;
                            height: 45px;
                            overflow: hidden;

                            img {
                                width: 45px;
                                height: 45px;
                            }
                        }
                    }
                }

                .right {
                    padding-right: 15px;
                    // width: 100%;


                    .time {

                        // width: 100%;
                        p {
                            height: 100%;
                            font-size: 14px;
                            font-weight: 400;
                            letter-spacing: 0px;
                            line-height: 17.38px;
                            color: rgba(127, 127, 127, 1);
                            text-align: right;
                        }
                    }

                    .neire {
                        max-width: 265px;
                        background: rgba(255, 170, 66, 1);
                        border-radius: 12px 0px 12px 12px;

                        p {
                            max-width: 265px;
                            padding: 10px;
                            font-size: 12px;
                            font-weight: 500;
                            letter-spacing: 0px;
                            // line-height: 17.38px;
                            color: rgba(255, 255, 255, 1);
                            text-align: left;
                            word-wrap: break-word;
                            /* 使用 word-wrap 属性实现自动换行 */
                        }
                    }

                }
            }








        }



        //  // 评论
        .input {
            width: 100%;
            height: 72px;
            position: fixed;
            bottom: 0px;
            left: 0px;
            display: flex;
            box-shadow: @default-showdow;
            background: @white-color;
            justify-content: space-around;
            align-items: center;
            z-index: 1000000;
            padding: 0px 10px 0px 10px;



            input {
                width: 100%;
                margin: 10px;
                height: 42px;
                opacity: 1;
                background: @background-color;
                border-radius: 6px;
                // padding-left: 10px;
            }

            button {
                width: 48px;
                height: 40px;
                border-radius: 9px;
                border: none;
                color: #000;
            }

        }


    }


    .mkdir {
        width: 375px;
        height: 72px;
        // position: absolute;
        // background: blue;
        // bottom: 0px;
    }
}
</style>


