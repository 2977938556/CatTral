<template>
    <div class="catmjhd">
        <!-- 头状态栏 -->
        <CartStatusBav :isstyle="false">
            <!-- 左边内容插槽 -->
            <template #left>
                <!-- 返回 -->
                <CatReturn></CatReturn>
            </template>
            <!-- 中间内容插槽 -->
            <template #center>
                <p>猫迹活动</p>
            </template>

            <template #right>
                <span class="shengq" @click="Appfor">申请</span>
            </template>
        </CartStatusBav>


        <!-- 内容区域 -->
        <div class="mjhd">
            <div class="mjhd-center">
                <!--活动卡片区域 -->
                <ul>
                    <li class="mjhd-item" v-if="MjHddatail">
                        <!-- <router-link to="/home/mjhd/321u312ui4y"> -->
                        <!-- 头部活动图片区域 -->
                        <div class="mjhd-item-top">
                            <span class="mjsd-item-tag" style="background: #rFF7C00ed;"
                                v-if="MjHddatail.to_examine === 'progress'">活动报名中</span>
                            <span class="mjsd-item-tag" style="background: rgb(148, 148, 148);"
                                v-if="MjHddatail.to_examine === 'end'">活动结束了</span>
                            <span class=" mjsd-item-tag" style="background: rgb(88, 88, 88);"
                                v-if="MjHddatail.to_examine === 'cancellation'">活动已经取消了</span>
                            <img v-for="(mitem, index) in MjHddatail.imageUrl" :key="index" :src="mitem" alt="">
                        </div>
                        <!-- 底部内容区域 -->
                        <div class="mjhd-item-bottom">
                            <div class="mjhd-item-bottom-top">
                                <h4>{{ MjHddatail.title }}</h4>
                            </div>
                            <div class="mjhd-item-bottom-center">
                                <p>
                                    {{ MjHddatail.content }}
                                </p>
                            </div>
                            <div class="mjhd-item-bottom-bottom">
                                <div class="top">
                                    <p>已经报名:{{ `${MjHddatail.people}/${MjHddatail.participant.length}` }}</p>
                                </div>
                                <div class="bottom">
                                    <p>地区:{{ MjHddatail.adds }}</p>
                                    <p>{{ `${FromTimeArrat(MjHddatail.time[0])}-${FromTimeArrat(MjHddatail.time[1])}` }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <!-- </router-link> -->
                    </li>

                </ul>
            </div>
        </div>
    </div>
</template>


<script>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { GetMjhdDeatil } from '@/api/home.js'
import { FromTimeArrat } from '@/utils/timeFilter.js'
import { RoleFm } from '@/utils/userRole.js'
import { useStore } from 'vuex'
import { GetUserData } from '@/api/user.js'
import CatPromptJS from '@/components/libray/CatPrompt.js'


export default {
    name: "CatMjhdPage",

    setup() {
        let router = useRouter()
        let route = useRoute()
        const store = useStore()

        let userData = store.state.user.profile


        // 判断条件是否封禁是存在当前账户
        // 判断当前活动是否合法
        let Appfor = () => {
            GetUserData(userData._id).then(({ result: { data } }) => {
                if (data.role === "ban") {
                    return CatPromptJS({ text: "当前账户封禁中", type: "error" })
                } else if (data.role === "delete") {
                    return CatPromptJS({ text: "当前报名账户不存在", type: "error" })
                } else {
                    // 这里需要进行判断活动是否过期了或者判断是否结束了
                    if (MjHddatail.value.to_examine == "end") {
                        return CatPromptJS({ text: "活动已经结束了哦", type: "error" })
                    } else if (MjHddatail.value.to_examine == "cancellation") {
                        return CatPromptJS({ text: "活动已经取消了哦", type: "error" })
                    } else if (MjHddatail.value.to_examine == "delete") {
                        return CatPromptJS({ text: "活动已经被管理员删除", type: "error" })
                    } else {
                        // 合法的话那么就跳转页面
                        router.push(`/home/mjhd/appfor/${MjHddatail.value._id}`)
                    }
                }
            }).catch(err => {
                return CatPromptJS({ text: "申请失败", type: "error" })
            })
        }


        let MjHddatail = ref(null)


        // 基于当传递的id进行判断
        watch(() => route.path, (newVal, olVal) => {
            GetMjhdDeatil(route.params.id).then(({ result }) => {
                MjHddatail.value = result.data
            }).catch(err => {
                CatPromptJS({ text: "获取当前帖子详情失败", type: "error" })
                router.push('/error')
            })

        }, { immediate: true })

        return { Appfor, MjHddatail, FromTimeArrat }
    }




}



</script>

<style scoped lang="less">
// 申请按钮
.shengq {
    display: block;
    width: 48px;
    height: 20px;
    background: rgba(255, 124, 0, 1);

    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    border-radius: 10px;
}



.mjhd {
    width: 100%;
    height: 100%;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    // background: red;
    padding-bottom: 10px;

    .mjhd-center {
        width: 345px;
        height: 100%;
        min-height: 400px;
        padding-bottom: 20px;

        // 卡片区域
        ul {
            width: 345px;
            height: 100%;
            // 单个活动模块

            .mjhd-item {
                width: 100%;
                height: auto;
                border-radius: 10px;
                background: @white-color;
                box-shadow: 4px 0px 25px 0px rgba(0, 0, 0, 0.05);
                margin-top: 20px;
                overflow: hidden;


                // 顶部图片区域
                .mjhd-item-top {
                    width: 345px;
                    height: 200px;
                    position: relative;

                    span {
                        display: block;
                        width: 100px;
                        height: 30px;
                        background: @primary-color;
                        font-size: 12px;
                        font-weight: 500;
                        text-align: center;
                        line-height: 30px;
                        position: absolute;
                        color: @white-color;
                        border-radius: 0px 0px 190px 0px;
                    }

                    img {
                        object-fit: cover;
                        width: 345px;
                        height: 200px;
                    }
                }


                // 底部文字内容
                .mjhd-item-bottom {
                    width: 345px;
                    height: auto;


                    // 头部文字内容
                    .mjhd-item-bottom-top {
                        width: 345px;
                        height: 64px;


                        h4 {
                            width: 345px;
                            height: 54px;
                            font-size: 16px;
                            font-weight: 700;
                            letter-spacing: 0px;
                            color: @heading-color;
                            padding: 10px;

                            vertical-align: top;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            text-overflow: ellipsis;

                        }
                    }



                    // 中间活动内容介绍
                    .mjhd-item-bottom-center {
                        width: 345px;
                        height: auto;
                        padding-bottom: 40px;
                        border-bottom: 1px solid @background-color;

                        p {
                            padding: 10px;
                            font-size: @heading2-font-size;
                            font-weight: 700;
                            letter-spacing: 0px;
                            line-height: 20.27px;
                            color: rgba(38, 38, 38, 1);
                            text-align: left;
                            vertical-align: top;
                        }
                    }



                    // 底部提示文字
                    .mjhd-item-bottom-bottom {
                        width: 345px;
                        height: auto;


                        .top {
                            // background: red;
                            padding: 15px;

                            p {
                                // padding-left: 10px;
                                font-weight: 800;
                            }

                        }

                        .bottom {
                            display: flex;
                            // height: 60px;
                            min-height: 60px;
                            align-items: center;
                            justify-content: space-between;
                            padding: 15px;


                            p {
                                font-size: 12px;
                                font-weight: 500;
                                color: @body-color;
                                vertical-align: top;
                            }
                        }
                    }


                }




            }

        }





    }
}
</style>