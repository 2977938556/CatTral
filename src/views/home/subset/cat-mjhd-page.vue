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
                <router-link to="/home/mjhd/participate">我参与的</router-link>
            </template>
        </CartStatusBav>



        <!-- 内容区域 -->
        <div class="mjhds">
            <div class="mjhd-center" v-if="CatMjhdData.length != 0">
                <!--活动卡片区域 -->
                <ul>
                    <li class="mjhd-item" v-for="item in CatMjhdData" :key="item._id">
                        <template v-if="item.to_examine != 'delete'">
                            <router-link :to="`/home/mjhd/${item._id}`">
                                <!-- 头部活动图片区域 -->
                                <div class="mjhd-item-top">
                                    <span class="mjsd-item-tag" style="background: #rFF7C00ed;"
                                        v-if="item.to_examine === 'progress'">活动报名中</span>
                                    <span class="mjsd-item-tag" style="background: rgb(148, 148, 148);"
                                        v-if="item.to_examine === 'end'">活动结束了</span>
                                    <span class=" mjsd-item-tag" style="background: rgb(88, 88, 88);"
                                        v-if="item.to_examine === 'cancellation'" >活动已经取消了</span>
                                    <img v-for="(mitem, index) in item.imageUrl" :key="index" :src="mitem" alt="">
                                </div>
                                <!-- 底部内容区域 -->
                                <div class="mjhd-item-bottom">
                                    <div class="mjhd-item-bottom-top">
                                        <h4>{{ item.title }}</h4>
                                    </div>
                                    <div class="mjhd-item-bottom-bottom">
                                        <p>已报名人数:{{ `${item.people}/${item.participant.length}`}}</p>
                                        <p>{{ `${FromTimeArrat(item.time[0])}-${FromTimeArrat(item.time[1])}` }}</p>
                                    </div>
                                </div>
                            </router-link>
                        </template>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 活动无限加载 -->
        <CatLoding :loading="loading" :finished="finished" @infinite="GetBgDataFn()" />

    </div>
</template>


<script>
import { GetBgData } from '@/api/home.js'
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { FromTimeArrat } from '@/utils/timeFilter.js'
import MessageJs from '@/components/libray/CarMessage.js'
import { ignorableWatch } from '@vueuse/core'
export default {
    name: "CatMjhdPage",
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore()


        // 这里是初始化数据和初始化是否需要进行请求
        onMounted(() => {
            let regular = router.options.history.state.forward
            if (regular === null) {
                store.commit('mjhd/SetMjhdData', [])
                store.commit('mjhd/SetMaxloding', true)
            }
        })


        let loading = ref(false)// 控制是否在加载  false 代表可以加载
        let finished = ref(false)// 控制是还有数据 false代表还有数据

        //  这个是获取活动需要提交的数据
        let CartConfig = reactive({
            page: 1,//
            pageSize: 2,
            total: 0,
            searchVal: "",
            type: "whole",
            typeofs: "mjhd",
        }) //交接口的参数接口的参数

        let Maxloding = computed(() => store.state.mjhd.Maxloding)

        // 获取数据函数.
        let GetBgDataFn = () => {
            if (Maxloding.value) {
                loading.value = true;
                GetBgData(CartConfig).then(({ result }) => {
                    // 将数据给响应性数据的变量
                    CartConfig.total = result.total
                    loading.value = false;
                    if (result.data && result.data.length !== 0) {
                        // 将数据添加进去
                        store.commit('mjhd/SetMjhdData', result.data)
                        // 每次请求之后就将当前页添加1页
                        CartConfig.page++

                        // 加载结束后将loding状态失效
                        loading.value = false
                        finished.value = false
                    } else if (result.data && result.data.length === 0) {
                        // 加载失败的话显示没有数据了就显示提示文本,关闭loding 
                        finished.value = true
                        loading.value = false

                        // 这里设置状态
                        store.commit('mjhd/SetMaxloding', false)
                    }
                    // loading.value = false

                }).catch(err => {
                    finished.value = false
                    loading.value = false
                    //这里获取数据失败的情况
                    return MessageJs({
                        message: "获取数据失败",
                        type: 'error',
                    })
                })
            } else {
                finished.value = true
                loading.value = false

            }

        }

        let CatMjhdData = computed(() => store.state.mjhd.MjhdData)


        return { CatMjhdData, loading, CartConfig, Maxloding, finished, GetBgDataFn, FromTimeArrat }
    }





}



</script>

<style scoped lang="less">
.catmjhd {
    width: 100%;
    height: 100%;
    min-height: 400px;

    .mjhds {
        width: 100%;
        height: 100%;
        min-height: 100px;
        display: flex;
        justify-content: center;
    }

    .mjhd-center {
        width: 345px;
        height: 100%;
        min-height: 400px;


        // 卡片区域
        ul {
            width: 345px;
            height: 100%;



            // 单个活动模块

            .mjhd-item {
                width: 100%;
                height: 298px;
                border-radius: 10px;
                overflow: hidden;
                background: @white-color;
                box-shadow: 4px 0px 25px 0px rgba(0, 0, 0, 0.05);
                margin-top: 20px;

                a {

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
                            color: @white-color;
                            font-size: 12px;
                            font-weight: 500;
                            text-align: center;
                            line-height: 30px;
                            position: absolute;
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
                        height: 98px;


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

                        .mjhd-item-bottom-bottom {
                            width: 345px;
                            height: 34px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            padding: 10px;

                            p {
                                font-size: 12px;
                                font-weight: 500;
                                letter-spacing: 0px;
                                line-height: 17.38px;
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