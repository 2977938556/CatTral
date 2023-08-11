<template>
    <!-- 头状态栏 -->
    <CartStatusBav :isstyle="false">
        <!-- 左边内容插槽 -->
        <template #left>
            <!-- 返回 -->
            <CatReturn></CatReturn>
        </template>
        <!-- 中间内容插槽 -->
        <template #center>
            <p>故事详情</p>
        </template>

        <template #right>
            <p @click="share">分享</p>
        </template>
    </CartStatusBav>


    <div class="fxmok" v-if="fxshow">
        <div class="mk"></div>
        <div class="img">
            <img :src="imgsrc" alt="">
            <span @click="clonefx">关闭(长按保存)</span>
        </div>
    </div>

    <div class="detail">
        <div class="detail-center" v-if="StoryDetail">
            <!-- 头图组件 -->
            <CatBannner :items="StoryDetail.imageUrl" />
            <CarUserInfo :PageView="timeFormat(StoryDetail.updated_at)" :data="StoryDetail.user_id" />
            <!-- 内容区域 -->
            <div class="detail-content" ref="fx">
                <div class="detail-content-top">
                    <p>
                        {{ StoryDetail.content }}
                    </p>
                </div>
                <div class="detail-content-bottom">
                    <p></p>
                    <p>{{ StoryDetail.clickCount }}浏览</p>
                </div>
            </div>



            <!-- 评论标题内容 -->
            <div class="detail-comment">
                <RecenGood title="评论" :count="`评论${FromData.total}`" />
            </div>

            <!-- 渲染评论区内容 -->
            <div class="detail-comment-center">
                <ul>
                    <!-- 这个是用于处理点赞与回复模块 -->
                    <!-- 这个是单个模块的数据 -->
                    <CatCommentRefil />
                </ul>
                <!-- loding加载效果 -->
                <!-- 活动无限加载 -->
                <CatLoding :loading="loading" :finished="finished" @infinite="GetRelativeComment()" />
            </div>
        </div>
    </div>
</template>


<script>
import { GetStoryDetail, GetStoryComment } from '@/api/story.js'
import { timeFormat } from '@/utils/timeFilter.js'
import CatCommentRefil from './subset/cat-comment.vue'

import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
import CatPromptJS from '@/components/libray/CatPrompt.js'
// 在顶部导入所需库和方法
import html2canvas from 'html2canvas';
import { scrollToTop } from '@/utils/animact.js'

// import domtoimage from 'dom-to-image';

export default {
    name: "CatMjsdDetail",
    components: { CatCommentRefil },
    setup() {
        let route = useRoute()
        let store = useStore()
        let router = useRouter()


        // 初始化数据
        onMounted(() => {
            let regular = router.options.history.state.forward


            if (regular == null) {
                GetStoryDetailFn()
            }
        })


        // 获取总评论数量


        // 获取详情数据
        let StoryDetail = computed(() => store.state.mjgs.StoryDetail)


        // 获取数据
        let FromData = computed(() => store.state.mjgs.FromData)
        // 这里是设置id
        store.commit('mjgs/SetFromData', { _id: route.params.id })

        // 这里的数据保存到vuex中
        async function GetStoryDetailFn() {
            // 基于故事id获取详情数据
            GetStoryDetail(FromData.value._id).then(({ result }) => {
                store.commit('mjgs/AddStoryDetail', result.data)
            })
        }


        let loading = ref(false)// 控制是否在加载  false 代表可以加载
        let finished = ref(false)// 控制是还有数据 false代表还有数据

        function GetRelativeComment() {
            loading.value = true
            // 这里是获取评论的数据
            GetStoryComment(FromData.value).then(({ result }) => {
                loading.value = false;
                if (result.data.length != 0) {
                    store.commit('mjgs/AddStoryComment', result.data)
                    FromData.value.total = result.total
                    FromData.page++
                    loading.value = false
                    finished.value = false
                } else if (result.data.length === 0) {
                    finished.value = true
                    loading.value = false
                }
            }).catch(err => {
                finished.value = false
                loading.value = false
                CatPromptJS({ text: "获取数据失败", type: "error" })
            })
        }


        GetStoryDetailFn()



        let fx = ref(null)


        // 图片路径
        let imgsrc = ref('')



        // 控制是否分享模块
        let fxshow = ref(false)

        //  关闭菜单
        let clonefx = () => {
            fxshow.value = false
        }





        // 创建为图片
        let share = () => {
            const options = {
                width: fx.value.offsetWidth,  // 设置图片宽度为div的宽度
                height: fx.value.offsetHeight,  // 设置图片高度为div的高度
            };



            // 使用html2canvas将div转换为canvas，传递配置对象作为第二个参数
            html2canvas(fx.value, options).then((canvas) => {
                // 创建一个新的图片元素
                const img = new Image();
                img.src = canvas.toDataURL();

                imgsrc.value = img.src

                fxshow.value = true
                scrollToTop()
            });


        }




        return { timeFormat, FromData, StoryDetail, loading, finished, fxshow, clonefx, GetRelativeComment, share, fx, imgsrc }
    }
}

</script>


<style lang="less" scoped>
.fxmok {
    width: 100%;
    height: 100%;
    // background: red;
    position: absolute;
    z-index: 10000000;

    .mk {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.472);
        position: absolute;
        z-index: -1;
    }

    .img {
        width: 200px;
        height: 300px;
        background: rgb(255, 255, 255);
        z-index: 100;
        margin: 100px auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 10px;

        img {
            object-fit: contain;
            width: 180px;
            height: 300px;
        }

        span {
            border-top: 1px solid rgb(227, 227, 227);
            width: 100%;
            height: 40px;
            text-align: center;
            line-height: 40px;
            font-size: 14px;

        }

    }
}

.detail {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    .detail-center {
        width: 345px;
        height: 100%;
        margin-bottom: 100px;


        .detail-content {
            margin-top: 10px;
            width: 345px;
            height: 100%;

            // 故事内容区域
            .detail-content-top {
                p {
                    text-indent: 2em;
                    font-size: @heading2-font-size;
                    font-weight: 700;
                    letter-spacing: 0px;
                    line-height: 20px;
                    color: @heading-color;
                }
            }

            // 浏览及区域
            .detail-content-bottom {
                width: 345px;
                height: 74px;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                font-size: @heading3-font-size;
                font-weight: 500;
                color: @secondary-text-color;
                text-align: right;
                line-height: 20px;
            }
        }

    }








    // 评论的内容
    .detail-comment {
        height: 86px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }


    // 评论内容



    .detail-comment-center {
        width: 345px;
        height: auto;
        margin: 0px auto;
        // background: red;
        display: flex;
        align-items: center;
        flex-direction: column;

        //  // 评论





        ul {
            width: 345px;
            height: auto;
            overflow: auto;
            border-radius: 14px;
            // background: red;

            .center-item {
                width: 100%;
                height: auto;
                // padding-bottom: 40px;

                // 用户模块
                .detail-pl-title-user {
                    width: 100%;
                    height: 36px;
                    overflow: hidden;


                    a {
                        display: flex;
                        height: auto;

                        span:nth-child(1) {
                            display: block;
                            overflow: hidden;
                            border-radius: 100px;
                            width: 36px;
                            height: 36px;

                            img {
                                object-fit: cover;
                                width: 100%;
                                height: 100%;

                            }
                        }

                        span:nth-child(2) {
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            padding-left: 8px;

                            h4 {
                                font-size: @heading3-font-size;
                                font-weight: 900;
                                color: @heading-color;
                            }

                            p {
                                font-size: @secondary-text-font-size;
                                color: @heading-color;
                            }
                        }
                    }


                    // 评论模块
                    .detail-pl-title-content {
                        width: 100%;
                        height: auto;

                        // 评论模块
                        .detail-pl-top {
                            width: 345px;
                            height: auto;
                            padding: 10px;

                            p {
                                font-size: @heading3-font-size;
                                font-weight: 500;
                                color: @heading-color;
                            }
                        }


                        // 评论点赞评论模块
                        .detail-pl-center {
                            width: 300px;
                            height: 24px;
                            display: flex;
                            justify-content: end;
                            align-items: center;

                            span {
                                display: flex;
                                position: relative;

                            }

                            img {
                                width: 14px;
                                height: 15px;
                            }


                            p {
                                font-size: @heading3-font-size;
                                font-weight: 500;
                                color: @heading-color;
                                padding-left: 4px;
                            }

                            span:nth-child(1) {
                                padding: 20px;

                            }

                            span:nth-child(1) {
                                padding: 10px;

                            }





                        }

                    }

                    // 回复模块
                    .detail-pl-hf {
                        width: 300px;
                        height: auto;
                        margin: 0 auto;
                        border-radius: 20px;
                        opacity: 1;
                        border-radius: 9px;
                        background: rgba(242, 242, 242, 1);

                        ul {
                            width: 100%;
                            height: 100%;
                            // background: red;
                            padding: 10px;


                            li {
                                width: 100%;
                                height: 20px;
                                display: flex;
                                align-items: center;
                                justify-content: center;

                                h5 {
                                    flex: 0.3;
                                    font-size: @body-font-size;
                                    font-weight: 500;
                                    color: @transition-color;
                                    padding-left: 10px;
                                }

                                span {
                                    flex: 1.2;
                                    font-size: @body-font-size;
                                    font-weight: 500;
                                    padding: -20px;
                                    color: rgba(38, 38, 38, 1);
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 1;
                                    overflow: hidden;

                                }
                            }

                            li:nth-child(1) {
                                // padding-top: 10px;
                            }

                            p {
                                a {
                                    font-size: @body-font-size;
                                    font-weight: 500;
                                    color: @transition-color;
                                    padding-left: 10px;
                                    padding-bottom: 10px;
                                }

                            }

                        }


                    }
                }

                .center-item:nth-child(1) {
                    margin-top: 20px;
                }

            }
        }


    }
}
</style>