<template>
    <div class="space">
        <!-- 头状态栏 -->
        <CartStatusBav :isstyle="false">
            <!-- 左边内容插槽 -->
            <template #left>
                <!-- 返回 -->
                <CatReturn></CatReturn>
            </template>
            <!-- 中间内容插槽 -->
            <template #center>
                <p>ta的空间</p>
            </template>
        </CartStatusBav>

        <div class="space-content">

            <!-- 用户信息模块 -->
            <div class="space-user" v-if="UserObj">
                <img class="bg-user" :src="UserObj.bgimgUrl" alt="">
                <div class="space-user-top">
                    <div class="top">
                        <p>{{ gz <= 0 ? '还没人关注呢' : gz }}</p>
                    </div>
                    <div class="center">
                        <span>
                            <img :src="UserObj.bgimgUrl" alt="">
                        </span>
                        <h1>{{ UserObj.username }}</h1>
                        <h3>{{ timeFormat(UserObj.created_at) }}号加入猫迹</h3>
                    </div>
                    <div class="bottom">
                        <ul>
                            <li @click="cancellationUser">
                                <img v-if="userFool" src="../../assets/image/cat-space-gz-icon.png" alt="">
                                <img v-else src="../../assets/image/cat-space-gz-no-icon.png" alt="">
                                <p>{{ userFool ? '取消关注' : '关注' }}</p>
                            </li>
                            <li @click="openMessage">
                                <img src="../../assets/image/cat-details-message.png" alt="">
                                <p>私信</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


            <!-- 菜单模块 -->
            <div class="menu-content">
                <div class="menu-center">

                    <div class="menu">
                        <ul>
                            <li @click="SwitchMenu('MyPublishing')">
                                <img v-if="MenuItem == 'MyPublishing'" src="../../assets/image/user-fabu-active02-icon.png"
                                    alt="">
                                <img v-if="MenuItem != 'MyPublishing'" src="../../assets/image/user-fabu-noactive-icon.png"
                                    alt="">
                                <p :class="[{ 'active': MenuItem == 'MyPublishing' }]">ta的发布</p>
                            </li>
                            <li @click="SwitchMenu('MyCollection')">
                                <img v-if="MenuItem == 'MyCollection'" src="../../assets/image/user-shoc-active-icon.png"
                                    alt="">
                                <img v-if="MenuItem !== 'MyCollection'" src="../../assets/image/user-shoc-noactive-icon.png"
                                    alt="">
                                <p :class="[{ 'active': MenuItem == 'MyCollection' }]">ta的收藏</p>
                            </li>
                            <li @click="SwitchMenu('Myadoption')">
                                <img v-if="MenuItem == 'Myadoption'" src="../../assets/image/user-wdly-icon.png" alt="">
                                <img v-if="MenuItem != 'Myadoption'" src="../../assets/image/user-wdly-noactive-icon.png"
                                    alt="">
                                <p :class="[{ 'active': MenuItem == 'Myadoption' }]">ta的领养</p>
                            </li>
                        </ul>
                    </div>

                    <div class="content">
                        <template v-if="goodsitem.length != 0">
                            <CarGoodsItem :goodsitem="goodsitem"></CarGoodsItem>
                        </template>
                    </div>
                </div>
                <!-- loding加载效果 -->
                <CatLoding :loading="loading" :finished="finished" />

            </div>
        </div>
    </div>
</template>


<script setup>


import { ref, reactive, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import CatPromptJS from '@/components/libray/CatPrompt.js'
import { timeFormat } from '@/utils/timeFilter.js'

// 获取数据
import { GetCatData, GetUserData, GetGzMax } from '@/api/user.js'
import { GetFollow, PushFollow } from '@/api/detail.js'




// webSocket
import { socket } from '@/utils/socket.js'




let store = useStore()
let route = useRoute()
let router = useRouter()
let loading = ref(false)
let finished = ref(false)

// 获取空间用户的id
let _id = route.params.id


if (_id == store.state.user.profile._id) {
    router.push({
        path: '/user'
    })
}




socket.emit('join', store.state.user.profile._id);


// 01 获取用户三个模块的数据

// 需要渲染的数据
let goodsitem = computed(() => store.state.user.space) || []

let MenuItem = ref('MyPublishing') // 状态
let SwitchMenu = (val) => {
    MenuItem.value = val
    fromOtion.types = val
}


// 发起请求的参数
let fromOtion = reactive({
    customertype: 1,// 对内
    _id: _id,// 当前登录的用户id
    types: "MyPublishing",// 获取为我的发布模块数据
})



// 请求获取数据
function GetSpageData() {
    loading.value = true
    finished.value = false

    // 清空数据
    store.commit('user/SetSpace', [])

    GetCatData(fromOtion).then(({ result }) => {
        loading.value = false
        finished.value = true
        if (fromOtion.types == "MyPublishing") {
            store.commit('user/SetSpace', result.data)
        } else if (fromOtion.types == "MyCollection") {
            store.commit('user/SetSpace', result.data.bookmarks.map(item => item.cat_id))
        } else if (fromOtion.types == "Myadoption") {
            store.commit('user/SetSpace', result.data.map(item => item.cat_id))
        }
    }).catch(({ response }) => {
        loading.value = false
        finished.value = true
        CatPromptJS({ text: response.data.message || '获取数据失败', type: 'error', timeout: 1000 })
    })
}

// 监听函数
watch(MenuItem, (newVal, olVal) => {
    if (newVal != olVal) {
        GetSpageData()
    }
}, { immediate: true })





// 02 获取用户数据

// 用户数据
let UserObj = ref(null)
// 获取用户数据
GetUserData(route.params.id).then(({ result: { data } }) => {
    UserObj.value = data
}).catch(({ response }) => {
    CatPromptJS({ text: response.data.message.length > 10 ? '获取用户信息失败' : '获取数据失败', type: 'error', timeout: 1000 })
})




// 03 关注模块
let userFool = ref(false)

// 获取数据并初始化
GetFollow().then(({ result: { data } }) => {
    if (data.follow.length == 0) {
        userFool.value = false
    } else if (data.follow.findIndex(item => item.follow_id == _id) >= 0) {
        userFool.value = true
    }
}).catch((err) => {
    console.log(err);
    CatPromptJS({ text: '获取数据失败', type: 'error', timeout: 1000 })
})



//04 关注模块
let cancellationUser = () => {
    PushFollow({ user_id: store.state.user.profile._id, follow_id: _id }).then(({ result: { data } }) => {
        console.log(data)
        // if (data?.follow == null) {
        //     return userFool.value = false
        // }
        if (data === null) {
            CatPromptJS({ text: '不能关注自己', type: 'error', timeout: 1000 })
        } else if (data.follow.length == 0) {
            userFool.value = false
        } else if (data.follow.findIndex(item => item.follow_id == _id) >= 0) {
            userFool.value = true
        }
    }).catch((err) => {
        console.log(err);
        CatPromptJS({ text: '操作失败', type: 'error', timeout: 1000 })
    })
}




//05 私信模块
let openMessage = () => {
    if (UserObj.value.configuration_information.private_letter == true) {
        return CatPromptJS({ text: store.state.user.profile._id == _id ? '你开启了禁止私聊' : '用户已经开了禁止私聊', type: "error" })
    } else {
        if (store.state.user.profile._id == _id) {
            return CatPromptJS({ text: '不能私聊自己', type: "error" })
        } else {
            socket.emit('frienMessage', { user_id: store.state.user.profile._id, friends: _id })

            // 这里是监听私聊按钮的模块 如果合格那么就可以私聊否则不行
            socket.on('frienMessage_isok', ({ vavle, friends }) => {
                if (vavle) {
                    router.push(`/message/detail/${friends}`)
                } else {
                    CatPromptJS({ text: "系统错误", type: "error" })
                }
            })





        }

    }
}



let gz = ref(0)




// 06 获取关注总数据
let gzMax = () => {
    GetGzMax({ _id }).then(({ result: { data } }) => {
        gz.value = data
    })
}

gzMax()




</script>



<style lang="less" scoped>
.active {
    color: #FF7C00 !important;
}

.space {

    .space-content {
        width: 100%;
        height: 100%;

        // 用户头部内容
        .space-user {
            width: 375px;
            height: 250px;
            overflow: hidden;
            position: relative;
            border-radius: 0px 0px 20px 20px;

            // 背景图片
            .bg-user {
                width: 375px;
                height: 254px;
                object-fit: cover;
                filter: blur(4px);
                position: absolute;
                z-index: -1;
            }


            // 内容区域
            .space-user-top {
                display: flex;
                flex-direction: column;

                .top {
                    height: 24px;
                    width: 100%;

                    p {
                        font-size: 8px;
                        font-weight: 500;
                        letter-spacing: 0px;
                        line-height: 11.58px;
                        color: rgb(243, 130, 0);
                        text-align: right;
                        line-height: 24px;
                        padding: 0px 20px 0px 0px;
                    }
                }

                .center {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);



                    span {
                        display: block;
                        width: 66px;
                        height: 66px;
                        border-radius: 100px;
                        overflow: hidden;
                        border: 4px solid rgba(255, 255, 255, 1);

                        img {
                            width: 66px;
                            height: 66px;
                            object-fit: cover;
                        }
                    }

                    h1 {
                        font-size: 18px;
                        font-weight: 900;
                        letter-spacing: 0px;
                        line-height: 26.06px;
                        color: rgba(255, 255, 255, 1);
                    }

                    h3 {
                        font-size: 12px;
                        font-weight: 900;
                        letter-spacing: 0px;
                        line-height: 17.38px;
                        color: rgba(255, 255, 255, 1);
                    }

                }

                .bottom {
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    ul {
                        display: flex;
                        width: 30%;
                        justify-content: space-between;

                        li {
                            display: flex;

                            img {
                                width: 15px;
                                height: 15px;
                                object-fit: cover;

                            }

                            p {
                                font-size: 12px;
                                font-weight: 500;
                                letter-spacing: 0px;
                                line-height: 17.38px;
                                color: rgba(255, 255, 255, 1);
                                text-align: left;
                                vertical-align: top;
                            }
                        }

                    }
                }


            }

        }



        // 菜单 和 内容模块
        .menu-content {
            width: 375px;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            top: -30px;

            .menu-center {
                width: 345px;
                height: 100%;

                // 菜单
                .menu {
                    width: 100%;
                    height: 84px;
                    box-shadow: 0px 12px 10px rgba(255, 124, 0, 0.05);
                    border-radius: 10px;
                    background: rgb(255, 255, 255);

                    ul {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100%;

                        img {
                            width: 34px;
                            height: 34px;
                            margin: 6px;
                            object-fit: cover;
                        }

                        p {
                            font-size: 10px;
                            font-weight: 500;
                            color: rgba(0, 0, 0, 1);
                        }

                        li {
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                        }
                    }
                }


                // 内容区域
                .content {
                    width: 100%;
                    height: 100%;
                    // min-height: 300px;

                    p {
                        text-align: center;
                        line-height: 100px;
                        font-size: 12px;
                        color: #FF7C00;
                    }
                }




            }



        }



    }




}
</style>