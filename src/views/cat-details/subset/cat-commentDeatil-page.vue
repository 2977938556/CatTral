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
                <input v-model="CommenTvalue" ref="inputs" type="text" @blur="fouceFn" :placeholder="placeholder"
                    @keydown.enter="sendCommentOrReply">
                <!-- <button @click="submitComment">评论</button> -->
            </div>
            <!-- 渲染评论区内容 -->
            <div class="detail-comment-center" v-if="JSON.stringify(CommenTetails) != '{}'">
                <!-- 这个主评论区 -->
                <ul>
                    <li class="center-item paddings">
                        <div class="detail-pl-title-user">
                            <a href="javascript:;">
                                <span>
                                    <img :src="CommenTetails.commenter?.bgimgUrl" alt="">
                                </span>
                                <span>
                                    <h4> {{ CommenTetails?.commenter?.username }} </h4>
                                    <p>{{ timeFormat(CommenTetails?.createTime) }}</p>
                                </span>
                            </a>
                        </div>
                        <!-- 评论详情 -->
                        <div class="detail-pl-title-content">
                            <!-- 分别有三个模块 -->
                            <div class="detail-pl-top">
                                <p>{{ CommenTetails?.content }}</p>
                            </div>
                            <!-- 评论详情 -->
                            <div class="detail-pl-center" @click="addUpFN">
                                <span>
                                    <!-- 点赞模块 -->
                                    <img src="../../../assets/image//cat-detail-dz.png" alt="a" :addup="CommenTetails._id">
                                    <p> {{ CommenTetails?.addup?.length }} </p>
                                    <div :class="{ 'dz-img': CommenTetails.addup.indexOf(commenter) != -1 }"></div>
                                </span>
                                <span>
                                    <img src="../../../assets/image//cat-detail-pl.png" alt="b" :addup="CommenTetails._id">
                                    <p>{{ CommenTetails?.replies.length }}</p>
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>

                <!-- 这个是回复评论区 -->
                <div class="detail-comment-hf">
                    <ul>
                        <li v-for="items in CommenTetails.replies" :key="items._id" class="center-item">
                            <div class="detail-pl-title-user">
                                <a href="javascript:;">
                                    <span>
                                        <img :src="items.replier.bgimgUrl">
                                    </span>
                                    <span>
                                        <h4> {{ items.replier.username }}</h4>
                                        <p>{{ timeFormat(items.createTime) }}</p>
                                    </span>
                                </a>
                            </div>
                            <!-- 评论详情 -->
                            <div class="detail-pl-title-content">
                                <!-- 分别有三个模块 -->
                                <div class="detail-pl-top">
                                    <p>{{ items.content }}
                                    </p>
                                </div>
                            </div>
                        </li>
                        <!-- 没有更多了 -->
                        <!-- loding加载效果 -->
                        <!-- <CatLoding :loding="false" :smail="true" /> -->
                    </ul>
                </div>

            </div>


            <!-- 没有更多了 -->
            <!-- loding加载效果 -->
            <!-- <CatLoding :loding="true" :smail="true" /> -->
            <CatLoding :loading="false" :finished="true" message="~没有更多评论了哦~" />


        </div>
    </div>
</template>


<script>
import { watch, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { timeFormat } from '@/utils/timeFilter.js'
import { CommentDetail, PushAddUp, PushReply } from '@/api/detail.js'
import MessageJs from '@/components/libray/CarMessage.js'
import CatPromptJS from '@/components/libray/CatPrompt.js'


export default {
    name: 'CatcommentDeatilPage',
    props: {
        comment: {
            type: Array,
            default: []
        }
    },
    setup() {
        let store = useStore()
        let route = useRoute()


        // 提示语
        let placeholder = ref("回复：")


        // 当前评论的详情的数据
        let CommenTetails = computed(() => store.state.detail.CommentDetail)
        // 当前登录的用户id
        let commenter = JSON.parse(localStorage.getItem('user-store')).user.profile._id || state.state.user.profile._id //当前登录的用户id


        // 绑定输入框的
        let CommenTvalue = ref('')
        let inputs = ref(null)


        let sendCommentOrReply = () => {
            // 发请求添加回复评价
            PushReply({ CommenTvalue: CommenTvalue.value, replyVal: route.params.id, commenter }).then(({ result: { data } }) => {
                store.commit('detail/SetCommentDetailData', data)
                CommenTvalue.value = ''
                return CatPromptJS({ text: "回复成功", type: "success", timeout: 1000 })
            }).catch(err => {
                // console.log(err);
                return CatPromptJS({ text: "回复失败哦·~", type: "error", timeout: 1000 })
            })
        }



        // 通过评论的id获取到评论详情的数据
        CommentDetail(route.params.id).then(({ result: { data } }) => {
            store.commit('detail/SetCommentDetail', data)
            placeholder.value = `回复：${data.commenter.username}` || "回复："
        }).catch(err => {
            return CatPromptJS({ text: "获取数据失败哦", type: "error", timeout: 1000 })
        })



        // 点赞与回复模块
        let addUpFN = (e) => {
            if (e.target.getAttribute('alt') == 'a') {
                // 原理就是先发请求到后台判断是否需要修改
                let addupId = e.target.getAttribute('addup')
                PushAddUp({ addupId, commenter }).then(({ result: { data } }) => {
                    // 这里我们需要修改vuex中的评论数据
                    store.commit('detail/AddCommentDetail', { addupId, commenter })
                }).catch(err => {
                    // console.log(err);
                    return CatPromptJS({ text: "点赞失败哦", type: "error", timeout: 1000 })
                })
            } else if (e.target.getAttribute('alt') == 'b') {
                let addupId = e.target.getAttribute('addup')
                inputs.value.focus()
            }
        }





        return { timeFormat, CommenTetails, commenter, addUpFN, sendCommentOrReply, CommenTvalue, inputs, placeholder }

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