<template>
    <div class="mjzn">
        <!-- 头状态栏 -->
        <CartStatusBav :isstyle="false">
            <!-- 左边内容插槽 -->
            <template #left>
                <!-- 返回 -->
                <CatReturn></CatReturn>
            </template>
            <!-- 中间内容插槽 -->
            <template #center>
                <p>养猫指南</p>
            </template>
            <template #right>
                <span class="shengq"></span>
            </template>
        </CartStatusBav>

        <!-- 内容区域 -->
        <div class="ymzn-center" style="margin-top: 20px;">
            <!-- <div class="mjzn-banner">
                <CatBannner />
            </div> -->
            <div class="mjzn-tj">
                <RecenGood />
                <div class="mjzn-tj-box" v-if="GuideList">
                    <ul>
                        <li class="mjzn-tj-box-item" v-for="item in GuideList">
                            <router-link :to="`/home/mjzn/${item._id}`">
                                <div class="item-top">
                                    <img v-for="citem in item.imageUrl" :src="citem" alt="">
                                </div>
                                <div class="item-bottom">
                                    <div class="item-bottom-top">
                                        <p>{{ item.content }}</p>
                                    </div>
                                    <div class="item-bottom-bottom">
                                        <p>浏览:{{ item.clickCount }}</p>
                                    </div>
                                </div>
                            </router-link>
                        </li>
                    </ul>

                    <!-- 提示用户 -->
                    <CatLoding :loading="loading" :finished="finished" @infinite="GetGuideFn()" :smail="true" />
                </div>
            </div>
        </div>



    </div>
</template>


<script setup>
import { GetGuideList } from '@/api/guide.js'
import { useStore } from 'vuex'
import MessageJs from '@/components/libray/CarMessage.js'
import { reactive, ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';





let store = useStore();
let router = useRouter()



// 初始化数据
// 初始化数据
onMounted(() => {
    let regular = router.options.history.state.forward
    if (regular === null) {
        store.commit('mjzn/AddGooList', [])
        store.commit('mjzn/SetMaxloding', true)
        store.commit('mjzn/SetCartConfigdefault', null)
    }
})






let loading = ref(false)// 控制是否在加载  false 代表可以加载
let finished = ref(false)// 控制是还有数据 false代表还有数据


// 获取查询的数据
let GuideList = computed(() => store.state.mjzn.GoodList)

// 获取最大值
let Maxloding = computed(() => store.state.mjzn.Maxloding)

// 获取的配置文件
let CartConfig = computed(() => store.state.mjzn.CartConfig)

if (!Maxloding.value) {
    loading.value = false
    finished.value = true
}


function GetGuideFn() {
    loading.value = true
    // 获取首页列表数据
    GetGuideList(CartConfig.value).then(({ result: { data } }) => {
        loading.value = false
        if (data.length != 0) {
            // 这里将获取到的值保存在vuex中
            store.commit('mjzn/AddGooList', data)
            // 这里需要将当前的页数增加1\
            // store.commit('mjzn/SetCartConfig', { page: })
            // CartConfig.value.page++

            loading.value = false
            finished.value = false
        } else {
            // 这里需要将已经全部加载完毕修改一下
            store.commit('mjzn/SetMaxloding', false)
            loading.value = false
            finished.value = true
        }
    }).catch(err => {
        loading.value = false
        finished.value = false
        return MessageJs({
            message: "获取数据失败",
            type: 'error',
        })
    })



}










</script>







<style lang="less" scoped>
div {}

.mjzn {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .ymzn-center {
        width: 345px;
        height: 100%;

        // 轮播图
        .mjzn-banner {}



        // 推荐模块
        .mjzn-tj {
            width: 345px;
            height: auto;
            min-height: 100px;


            .mjzn-tj-box {
                width: 345px;
                height: auto;


                ul {
                    width: 345px;
                    height: auto;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    // border: 1px solid red;


                    .mjzn-tj-box-item {
                        width: 162px;
                        height: 212px;
                        overflow: hidden;
                        overflow: hidden;
                        border-radius: 10px;
                        margin-top: 20px;

                        border: 1px solid rgba(242, 242, 242, 1);



                        // 图片内容区域
                        .item-top {
                            width: 162px;
                            height: 120px;
                            border-radius: 0px 0px 10px 10px;
                            overflow: hidden;

                            img {
                                width: 162px;
                                height: 119px;
                                object-fit: cover;
                            }
                        }


                        // 文字区域
                        .item-bottom {
                            width: 100%;
                            height: 92px;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;

                            .item-bottom-top {
                                height: 40px;
                                vertical-align: top;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                overflow: hidden;
                                text-overflow: ellipsis;

                                p {
                                    padding: 10px;
                                    font-size: 12px;
                                    font-weight: 500;
                                    letter-spacing: 0px;
                                    line-height: 14.48px;
                                    color: rgba(38, 38, 38, 1);
                                    text-align: left;
                                    vertical-align: top;
                                }
                            }

                            .item-bottom-bottom {
                                height: 20px;

                                p {
                                    font-size: 8px;
                                    font-weight: 500;
                                    letter-spacing: 0px;
                                    line-height: 20px;
                                    color: rgba(127, 127, 127, 1);
                                    padding-left: 10px;
                                }

                            }
                        }



                    }

                    .mjzn-tj-box-item:nth-child(1) {
                        margin-top: 10px;
                    }

                    .mjzn-tj-box-item:nth-child(2) {
                        margin-top: 10px;
                    }
                }

            }
        }
    }



}
</style>