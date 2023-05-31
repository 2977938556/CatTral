<template>
    <div class="Cat-details">
        <!-- 头部标题栏 -->
        <CartStatusBav :isstyle="true">
            <template #left>
                <CatReturn></CatReturn>
            </template>

            <template #center>
                <p>启示详情</p>
            </template>
            <template #right>
                <CatApply :DetailData="DetailData" />
            </template>
        </CartStatusBav>

        <!-- 主要内容区域 -->
        <div class="details-content" v-if="DetailData">
            <div class="detail-center">
                <!--  banner -->
                <CatBannner @opneMax="opneMax" :items="DetailData?.imageUrl"></CatBannner>
                <!-- 头部用户信息模块 -->
                <div class="detail-user">
                    <div class="detail-left">
                        <a href="javascript:;">
                            <div class="detail-left-img">
                                <img :src="DetailData.user_id?.bgimgUrl" alt="">
                            </div>
                            <div class="detail-left-text">
                                <p>{{ DetailData.user_id?.username }}</p>
                                <span>{{ DetailData.user_id?.slogin }}</span>
                            </div>
                            <div class="gz">

                                <span @click="pushFollowFn(DetailData.user_id._id)"
                                    :class="[{ active: FollowData?.findIndex(itemss => itemss.follow_id == DetailData?.user_id._id) < 0 ? false : true }]">
                                    {{ FollowData?.findIndex(itemssa => itemssa.follow_id == DetailData.user_id._id)
                                        < 0 ? '关注' : '取关' }} </span>
                            </div>
                        </a>
                    </div>
                    <div class="detail-right">

                        <!--   -->
                        <div class="sc" @click="CollectFn">
                            <!-- 收藏了 -->
                            <img src="../../assets/image/cat-detail-sc.png" alt="" v-if="collectFlage">
                            <!-- 未收藏 -->
                            <img src="../../assets/image/cat-detail-sc-on.png" alt="" v-else>

                            <span>收藏</span>
                        </div>
                        <div class="sx">
                            <img src="../../assets/image/cat-details-message-no.png" v-if="false">
                            <img src="../../assets/image/cat-details-message.png" alt="">
                            <span @click="PrivateChatModule">私信</span>
                        </div>
                        <!-- 当点击的时候就需要设置判断用户是否设置了用户可以私聊的功能 -->
                    </div>
                </div>

                <!-- 标题模块 -->
                <div class="detail-title">
                    <div class="detail-title-center">
                        <p>{{ DetailData.title }}</p>
                    </div>
                </div>


                <!-- 简介模块 -->
                <div class="dateil-jj">
                    <div class="detail-jj-center">
                        <p :class="BriefIntVaild" @click="BriefIntVaildFn(DetailData.content)">
                            {{ DetailData.content }}
                        </p>
                    </div>
                </div>


                <!-- 标签模块 -->
                <div class="dateil-tab">
                    <ul>
                        <li v-for="(item, index) in DetailData.lable" :key="index + 1">
                            <a href="javascript:;">
                                {{ item }}
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- 时间与地区 -->
                <div class="detail-city-time">
                    <div class="detail-city-time-center">
                        <div class="city-left">
                            <p>{{ Processingregion(DetailData.addrs, 1) }}</p>
                        </div>
                        <div class="city-time">
                            <p>{{ timeFormat(DetailData.created_at) }}</p>
                        </div>
                    </div>
                </div>

                <!-- 评论模块 -->

                <div class="detail-pinglun" @click="openComment">
                    <div class="detail-pinglun-center">
                        <a href="javascript:;">
                            <span class="pl-count">{{ commentData?.length }}</span>
                            <div class="pinglun-left">
                                <div class="pinglun-title">
                                    <h1>猫友评论:</h1>
                                </div>
                                <div class="pinglun-content">
                                    <p>{{ commentData[0]?.content || "暂无评论哦~" }}</p>
                                </div>
                            </div>
                            <div class="pinglun-right">
                                <h1>查看全部</h1>
                                <img src="../../assets/image/cat-fanhui-active-icon.png" alt="">
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <!-- 推荐内容区域 -->
            <!-- 内容区域 -->
            <div class="recommendeCount">
                <RecenGood></RecenGood>
                <!-- 循环渲染 内容组件 -->
                <div class="recommende-count" v-if="RemmendData.length != 0">
                    <CarGoodsItem :goodsitem="RemmendData" />
                </div>
            </div>

            <!-- loding加载效果 -->
            <CatLoding :loading="false" :finished="true" />
        </div>


        <CatDetailLoding v-else />

        <!-- 评论组件 -->
        <CatComment v-if="showComment" :DetailData="DetailData" />

        <!-- 全屏图片组件 -->
        <CatFullImg v-if="openFullImg" @cancel="cancel" :openImg="openImg" />

    </div>
</template>


<script>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { timeFormat } from '@/utils/timeFilter.js'
import { GetDEtailCat, GetCollect, GetcollectObje, GetRemmed, GetFollow, PushFollow } from '@/api/detail.js'
import MessageJs from '@/components/libray/CarMessage.js'
import { Processingregion } from '@/utils/timeFilter.js'
import CatPromptJS from '@/components/libray/CatPrompt.js'
import router from '../../router'


export default {
    name: "CatDetail",
    setup() {

        let route = useRoute();
        let store = useStore()



        let showComment = computed(() => store.state.detail.showComment)


        let userData = JSON.parse(localStorage.getItem('user-store')).user.profile

        // 01：点击查看全屏图片
        let openImg = ref({})// 图片的数据
        let openFullImg = ref(false)// 控制是否开启
        let opneMax = (result) => {
            // 这里找出被点击的索引值
            result.index = result.data.findIndex(item => item == result.target)
            openFullImg.value = true
            openImg.value = result
        }
        // 02：关闭全屏预览图片
        let cancel = () => {
            openFullImg.value = !openFullImg.value
        }


        // 03：控制简介的点击开启
        let BriefIntVaild = ref("")
        let BriefIntVaildFn = (text) => {
            if (BriefIntVaild.value != "") {
                BriefIntVaild.value = ''
                return false;
            }
            // 大于了五十的字符长度那么就需要设置一下
            if (text.length > 50) {
                BriefIntVaild.value = 'cancel-ellipsis'
            }
        }



        // 获取评论的数据
        let commentData = ref([])


        // 通过routqe中获取parmas的参数 id获取详情数据
        let GoodsId = ref(route.params.id)



        // 01_1 获取当前页面的数据
        let DetailData = ref(null)



        // 02_2 用户保存用户的收藏信息
        let collectData = ref({})
        // 这个是控制是否收藏了
        let collectFlage = ref(false)

        // 03_3 保存用户的推荐数据
        let RemmendData = ref([])


        // 04_4 保存用户的关注数据
        let FollowData = ref([])


        // 获取帖子的数据
        let GetGetDEtailCat = async () => {
            // 获取帖子的详情数据
            GetDEtailCat(GoodsId.value).then(({ result }) => {
                DetailData.value = result.data.DetailData
                commentData.value = result.data.commentData
                // 这里我们需要将帖子的数据存入vuex中
                store.commit('detail/SetDetailData', result.data.DetailData)
            }).catch(({ response: { data } }) => {
                // 这里是没有数据的情况下。我们跳转到404页面上
                router.push('/error')
            })


            // 获取用户的收藏数据
            let GetCollectData = await GetCollect(userData.user_id)
            collectData.value = GetCollectData.result.data

            // 获取用户的推荐数据
            let remmedData = await GetRemmed()
            RemmendData.value = remmedData.result.data


            // 获取用户关注的数据
            let { result: { data: { follow } } } = await GetFollow()
            FollowData.value = follow


        }
        GetGetDEtailCat()



        // 设置节流阀
        let Debouncing = null
        // 点击收藏的时候就发送请求将收藏的数据添加进去
        let CollectFn = () => {
            if (!Debouncing) {
                clearInterval(Debouncing)
                Debouncing = setInterval(() => {
                    // 发送请求
                    GetcollectObje({ DetailData: DetailData.value, cat_id: GoodsId.value, userData: userData, collectFlage: collectFlage.value }).then(({ result }) => {
                        // 这里由于我直接修改了储存收藏的数据所以会自动更新
                        collectData.value = result.data
                        clearInterval(Debouncing)
                        Debouncing = null
                    })
                }, 500)
            }
        }

        // 这里我是直接监听收藏的数据
        watch(() => collectData.value, (newVal, olVal) => {
            // 这里我们设置了一下如果没有值的情况那么就会直接赋值为1
            if (newVal?.bookmarks?.length == 0) {
                collectFlage.value = false
                return
            }

            // // 这里是查早是否有数据
            let index = collectData?.value?.bookmarks?.findIndex(item => item.cat_id == GoodsId.value);

            if (index < 0 || index == "undefined") {
                collectFlage.value = false
            } else if (index >= 0) {
                collectFlage.value = true
            }
        }, { immediate: true })


        // 这里是监听的当前页面其他的流浪猫卡片
        watch(() => route.params.id, (newVal, olVal) => {
            if (newVal != olVal) {
                // 将当前需要被查询的帖子id进行查询
                GoodsId.value = newVal
                GetGetDEtailCat()
            }
        })


        // 这个是开启与关闭评论模块
        let openComment = () => {
            store.commit('detail/SetShowComment')
        }


        // 关注
        let pushFollowFn = (id) => {
            try {
                PushFollow({ user_id: userData._id, follow_id: id }).then((result) => {
                    console.log(result);
                    if (!result.result.data) {
                        console.log(result.result.data);
                        return CatPromptJS({ text: `${result.message}`, type: "error" })
                    }

                    FollowData.value = result?.result?.data?.follow
                    CatPromptJS({ text: `${result.message}`, type: "success" })
                })

            } catch (err) {
                CatPromptJS({ text: "操作失败请重试", type: "error" })
            }
        }


        // 这里需要设置用户是否开启了私聊模式
        let PrivateChatModule = () => {
            // console.log();
            if (userData.configuration_information.private_letter) {
                CatPromptJS({ text: "可以私聊", type: "success" })
                // 这里就是需要跳转到用户与该用户私聊的窗口中了，
                // 我的想法大概是当用户点击的时候那么就设置在message数据库中基于当前的用用户保存
                // 当前私聊的用户和需要回复的用户并且设置， 
                // 当回复的用户发送第一条信息的时候那么就需要设置一下在当前的数据中
            } else {
                CatPromptJS({ text: "用户已禁止私聊了", type: "error" })
            }
        }

        return { showComment, timeFormat, commentData, BriefIntVaildFn, PrivateChatModule, GoodsId, BriefIntVaild, DetailData, FollowData, openComment, pushFollowFn, opneMax, RemmendData, Processingregion, openImg, openFullImg, cancel, collectData, collectFlage, CollectFn }
    }
}


</script>


<style lang="less" scoped>
.Cat-details {
    transition: all 0.5s ease-in;



    // 内容区域
    .details-content {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;

        .detail-center {
            width: 345px;
            height: 100%;


            // 轮播图已经有样式了
            // 用户模块
            .detail-user {
                width: 345px;
                height: 38px;

                display: flex;

                // 左边内容
                .detail-left {
                    flex: 0.8;
                    height: 100%;


                    a {
                        display: block;
                        display: flex;

                        .detail-left-img {
                            width: 38px;
                            height: 38px;
                            overflow: hidden;
                            border-radius: 100px;

                            img {
                                object-fit: covers;
                                width: 38px;
                                height: 38px;
                                overflow: hidden;
                            }
                        }

                        .detail-left-text {
                            width: auto;
                            height: 38px;
                            // overflow: hidden;

                            p {
                                font-size: @heading3-font-size;
                                font-weight: 900;
                                color: @heading-color;
                                text-align: left;
                                vertical-align: top;
                                padding-left: 4px;
                                margin-top: 0px;


                            }

                            span {
                                font-size: @secondary-text-font-size;
                                font-weight: 500;
                                padding-left: 4px;
                                color: @secondary-text-color;
                                display: block;
                                margin-top: 6px;
                            }

                        }

                        .gz {
                            flex: 0.8;

                            span {
                                display: block;
                                width: 46px;
                                height: 20px;
                                border-radius: 16px;
                                background: @comment-color;
                                color: @white-color;
                                text-align: center;
                                line-height: 20px;

                                &.active {
                                    background: @primary-color;
                                    color: @white-color;
                                }
                            }

                        }

                    }




                }

                // 右边内容
                .detail-right {
                    flex: 0.6;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    img {
                        object-fit: cover;
                        width: 17px;
                        height: 16px;
                    }

                    span {
                        font-size: @heading3-font-size;
                        font-weight: 500;
                        color: @heading-color;

                    }





                    .sc {
                        flex: 1;
                    }

                    .sx {
                        flex: 1;
                    }
                }




            }

            // 用户标题模块
            .detail-title {
                width: 345px;
                height: 56px;
                display: flex;
                align-items: center;
                justify-content: center;

                .detail-title-center {
                    width: 325px;
                    height: 40px;

                    p {
                        font-size: @heading3-font-size;
                        font-weight: 700;
                        letter-spacing: 0px;
                        line-height: 20.27px;
                        color: @heading-color;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                }
            }

            // 简介模块
            .dateil-jj {
                width: 345px;
                height: auto;
                // 
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 5s ease-in;

                // 开关控制是否
                .cancel-ellipsis {
                    display: block !important;
                    overflow: visible !important;
                    text-overflow: unset !important;
                    -webkit-line-clamp: initial !important;
                    font-size: @body-font-size !important;
                    font-weight: 500 !important;
                    color: @secondary-text-color !important;
                }

                // .opne {
                //     display: block;
                //     overflow: visible;
                //     text-overflow: unset;
                //     -webkit-line-clamp: initial;
                // }

                .detail-jj-center {
                    width: 325px;
                    height: auto;

                    p {
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                        overflow: hidden;
                        font-size: @body-font-size;
                        font-weight: 500;
                        color: @secondary-text-color;
                    }


                }


            }


            // 标签模块
            .dateil-tab {
                width: 345px;
                height: auto;
                display: flex;
                flex-direction: column;
                align-items: center;
                flex-wrap: wrap;

                ul {
                    width: 325px;
                    height: auto;
                    display: flex;
                    flex-wrap: wrap;
                    padding: 6px;

                    li {
                        padding: 10px;
                        height: 10px;
                        border-radius: 217px;
                        background: @primary-color;
                        display: flex;
                        align-items: center;
                        margin-left: 4px;
                        margin-top: 2px;

                        a {
                            /** 文本1 */
                            font-size: 10px;
                            font-weight: 500;
                            color: @white-color;
                        }
                    }
                }

            }

            // 时间与地区
            .detail-city-time {
                width: 345px;
                height: 38px;

                display: flex;
                align-items: center;
                justify-content: center;

                .detail-city-time-center {
                    width: 325px;
                    height: 38px;
                    display: flex;

                    .city-left {
                        flex: 1;


                        p {
                            text-align: left;
                            line-height: 38px;
                            font-size: @body-font-size;
                            font-weight: 500;
                            letter-spacing: 0px;
                            color: @secondary-text-color;
                        }
                    }

                    .city-time {
                        flex: 1;


                        p {
                            text-align: right;
                            line-height: 38px;
                            font-size: @body-font-size;
                            font-weight: 500;
                            letter-spacing: 0px;
                            color: @secondary-text-color;


                        }
                    }

                }
            }


            // 评论内容
            .detail-pinglun {
                width: 345px;
                height: 76px;
                display: flex;
                justify-content: center;
                align-items: center;

                .detail-pinglun-center {
                    width: 325px;
                    height: 48px;
                    background: @white-color;
                    box-shadow: @default-showdow;
                    display: flex;
                    justify-content: center;
                    border-radius: 10px;

                    a {
                        display: flex;
                        width: 300px;
                        height: 48px;
                        position: relative;

                        .pl-count {
                            position: absolute;
                            top: -8px;
                            z-index: 10;
                            right: 0px;
                            width: auto;
                            height: auto;
                            border-radius: 100px;
                            background: @transition-color;
                            color: @white-color;
                            padding: 3px 3px 3px 3px;
                        }

                        .pinglun-left {
                            flex: 1.5;
                            // background: red;
                            display: flex;

                            .pinglun-title {
                                width: 70px;

                                h1 {
                                    font-size: 14px;
                                    font-weight: 700;
                                    letter-spacing: 0px;
                                    line-height: 20.27px;
                                    color: rgba(38, 38, 38, 1);
                                    line-height: 48px;
                                }
                            }

                            .pinglun-content {
                                width: 150px;

                                p {
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 1;
                                    overflow: hidden;
                                    line-height: 48px;
                                    font-size: @heading3-font-size;
                                    color: @heading-color;
                                }
                            }




                        }

                        .pinglun-right {
                            flex: 0.5;
                            display: flex;
                            justify-content: space-around;
                            align-items: center;

                            h1 {
                                font-size: 12px;
                                font-weight: 500;
                                color: @body-color;

                            }

                            img {
                                object-fit: cover;
                                width: 9px;
                                height: 15px;
                                transform: rotate(180deg);

                            }


                        }
                    }



                }
            }



        }

    }


    // 内容区域
    .recommendeCount {
        width: 375px;
        margin-top: 20px;
        // min-height: 100px;

        .recommende-count {
            width: 345px;
            margin: 0 auto;


            .tuij-content {
                width: 345px;
                height: 26px;
                // border: 1px solid red;
                margin: 0 auto;
                display: flex;
                align-items: center;

                img {
                    width: 14px;
                    height: 13px;
                    object-fit: cover;
                }

                p {
                    font-size: @heading2-font-size;
                    font-weight: 700;
                    color: @heading-color;
                    padding-left: 4px;
                }

            }

        }


    }


}
</style>