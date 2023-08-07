<template>
    <div>
        <!-- 评论的数据 -->
        <div class="detail-comment-content">
            <CartStatusBav :isstyle="true">
                <template #left>
                    <CatReturn />
                </template>
                <template #center>
                    评论详情
                </template>
            </CartStatusBav>

            <div class="input">
                <input v-model="replay" ref="inputes" @click="focusfn" type="text" placeholder="回复当前评论"
                    @keydown.enter="PushComment">
            </div>

            <!-- 渲染评论区内容 -->
            <div class="detail-comment-center" v-if="ContentData">
                <!-- 这个主评论区 -->
                <ul>
                    <li class="center-item paddings">
                        <div class="detail-pl-title-user">
                            <a href="javascript:;">
                                <span>
                                    <img :src="ContentData.commenter.bgimgUrl" alt="">
                                </span>
                                <span>
                                    <h4>{{ ContentData.commenter.username }}</h4>
                                    <p>{{ ContentData.createTime }}</p>
                                </span>
                            </a>
                        </div>
                        <!-- 评论详情 -->
                        <div class="detail-pl-title-content">
                            <!-- 分别有三个模块 -->
                            <div class="detail-pl-top">
                                <p>{{ ContentData.content }}</p>
                            </div>
                            <!-- 评论详情 -->
                            <div class="detail-pl-center" @click="addUpFN">
                                <span>
                                    <!-- 点赞模块 -->
                                    <img src="../../assets//image//cat-detail-dz.png" alt="a">
                                    <p>{{ ContentData.addup.length || 0 }}</p>
                                    <div :class="{ 'dz-img': ContentData.addup.indexOf(userId) != -1 }"></div>
                                </span>
                                <span>
                                    <img src="../../assets//image/cat-detail-pl.png" alt="a">
                                    <p> 回复({{ ContentData.replies.length }})</p>
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>

                <!-- 这个是回复评论区 -->
                <div class="detail-comment-hf">
                    <ul>
                        <li v-for="item in CommentRefyData" :key="item._id" class="center-item">
                            <div class="detail-pl-title-user">
                                <a href="javascript:;">
                                    <span>
                                        <img :src="item.replier.bgimgUrl">
                                    </span>
                                    <span>
                                        <h4>{{ item.replier.username }}</h4>
                                        <p>{{ item.createTime }}</p>
                                    </span>
                                </a>
                            </div>
                            <!-- 评论详情 -->
                            <div class="detail-pl-title-content">
                                <!-- 分别有三个模块 -->
                                <div class="detail-pl-top">
                                    <p>{{ item.content }}</p>
                                </div>
                            </div>
                        </li>
                        <!-- 没有更多了 -->
                        <!-- loding加载效果 -->
                        <CatLoding :loading="loading" :finished="finished" :smail="true" message="~没有更多评论了哦~"
                            @infinite="GetReplayList()" />
                    </ul>
                </div>

            </div>

        </div>
    </div>
</template>


<script>
import { watch, computed, ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { timeFormat } from '@/utils/timeFilter.js'
import { GetCommentDetail, GetCommentReplay } from '@/api/story.js'
import CatPromptJS from '@/components/libray/CatPrompt.js'
import { PushStoryHfCommment } from '@/api/story.js'



export default {
    name: 'CatCommentDetailsDomponent',
    props: {
        comment: {
            type: Array,
            default: []
        }
    },
    setup() {

        let store = useStore()
        let route = useRoute()
        let router = useRouter()


        let ContentData = ref(null)


        let userId = store.state.user.profile._id



        // 大致步骤就是先获取当前模块主评论的模块
        let commentId = route.params.id
        let type = "mjgs"

        // 基于id先查询出需要的数据
        GetCommentDetail({ _id: commentId, type }).then(({ result: { data } }) => {
            ContentData.value = data
            CatPromptJS({ text: '获取评论详情', type: "success", timeout: 1000 })
        }).catch(err => {
            CatPromptJS({ text: '获取评论失败', type: "error", timeout: 1000 })
        })



        let FromData = reactive({
            page: 1,
            pageSize: 5,
            total: 0,
            type: "mjgs",
            parentId: commentId,
        })



        let loading = ref(false)// 控制是否在加载  false 代表可以加载
        let finished = ref(false)// 控制是还有数据 false代表还有数据



        // 保存回复评论列表的数据
        let CommentRefyData = ref([])



        // 获取子集评论
        function GetReplayList() {
            loading.value = true
            GetCommentReplay(FromData).then(({ result: { data } }) => {
                loading.value = false
                if (data.length != 0) {
                    CommentRefyData.value.push(...data)
                    FromData.page++
                    loading.value = false
                    finished.value = false
                } else if (data.length <= 0) {
                    loading.value = false
                    finished.value = true
                }
            }).catch(err => {
                loading.value = false
                finished.value = true
                CatPromptJS({ text: '获取评论失败', type: "error", timeout: 1000 })
            })
        }


        let replay = ref("")
        let inputes = ref(null)

        // 发布评论
        let PushComment = () => {
            if (replay.value === "") {
                CatPromptJS({ text: '不能为空', type: "error", timeout: 1000 })
            }


            // 这里有bug明天早上处理
            // 基于当前评论
            PushStoryHfCommment({ content: replay.value, commentId: commentId, user_id: userId, type: "mjgs" }).then(({ result:{data} }) => {
                // 这里我们设置了新添加的数据放添加到评论列表中
                CommentRefyData.value.unshift(data)
                // 这里我们需要调用调用他的父级方法将数据
                // store.commit('mjgs/AddStoryCommentRefly', { commentId, data })
            })

        }




        return { ContentData, CommentRefyData, GetReplayList, inputes, loading, finished, userId, replay, PushComment }

    }

}
</script>



<style lang="less" scoped>
.dz-img {
    content: '';
    position: absolute;
    z-index: 0;
    top: 12px;
    left: 10px;
    width: 12px;
    height: 12px;
    background-color: @primary-color;
    border-radius: 100px;
}


.detail-comment-content {
    width: 100%;
    height: 100%;
    background: rgb(255, 255, 255);
    padding-bottom: 100px;



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



        input {
            width: 100%;
            margin: 20px;
            height: 42px;
            opacity: 1;
            background: @background-color;
            border-radius: 6px;
            padding-left: 10px;
        }

        button {
            width: 48px;
            height: 40px;
            border-radius: 9px;
            border: none;
            color: #000;
        }

    }




    .detail-comment-center {
        width: 345px;
        height: auto;
        margin: 0px auto;






        // 评论详情
        ul {
            width: 345px;
            height: auto;
            border-bottom: 1px solid @background-color;

            .paddings {
                padding-top: 30px;
                padding-bottom: 30px;
            }

            .center-item {
                width: 100%;
                height: auto;


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
                }


                // 评论模块
                .detail-pl-title-content {
                    width: 345px;
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
                            position: relative;

                            img {
                                z-index: 100;
                            }
                        }

                        span:nth-child(1) {
                            padding: 10px;

                        }





                    }

                }



            }
        }



        // 回复内容
        .detail-comment-hf {
            width: 100%;
            margin-top: 10px;

            ul {
                width: 345px;
                height: 100%;

                .center-item {
                    width: 100%;
                    height: auto;
                    padding-top: 10px;
                    border-bottom: 1px solid @background-color;
                    padding-top: 20px;
                    padding-bottom: 20px;

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
                    }


                    // 评论模块
                    .detail-pl-title-content {
                        width: 345px;
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
            }

        }



    }



}
</style>