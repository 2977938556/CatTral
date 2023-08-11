<template>
    <div>
        <div class="mask" @click="cloneMask"> <!-- 评论数据 -->
            {{ CommentDat.addup }}
        </div>
        <!-- 评论的数据 -->
        <div class="detail-comment-content">

            <!-- 渲染评论区内容 -->
            <div class="detail-comment-center" @click="addUpFN">
                <ul>
                    <template v-if="CommentDat.length != 0">
                        <li v-for="(item, index) in  CommentDat " :key="item" class="center-item">
                            <div class="detail-pl-title-user">
                                <a href="javascript:;">
                                    <span>
                                        <img :src="item.commenter.bgimgUrl" alt="">
                                    </span>
                                    <span>
                                        <h4>{{ item.commenter.username }}</h4>
                                        <p>{{ timeFormat(item.createTime) }}</p>
                                    </span>
                                </a>
                            </div>


                            <!-- 评论详情 -->
                            <div class="detail-pl-title-content">
                                <!-- 分别有三个模块 -->
                                <div class="detail-pl-top">
                                    <p>{{ item.content }}</p>
                                </div>
                                <!-- 评论详情 -->
                                <div class="detail-pl-center">
                                    <span>
                                        <img src="../../assets/image/cat-detail-dz.png" alt="a" :addup="item?._id">
                                        <p>{{ item.addup.length }}</p>
                                        <div :class="{ 'dz-img': item.addup.indexOf(commenter) != -1 }"></div>
                                    </span>
                                    <span>
                                        <img src="../../assets/image/cat-detail-pl.png" alt="b" :addup="item?._id">
                                        <p>{{ item.replyCount }}</p>
                                    </span>
                                </div>

                                <!-- 回复详情 -->
                                <div class="detail-pl-hf" v-if="item.replies.length != 0">
                                    <ul>
                                        <!-- 这里需要进行判断是否有回复的数据 -->
                                        <template v-for=" (items, index)  in  item.replies" :key="item">
                                            <template v-if="index < 3">
                                                <li>
                                                    <h5>{{ items.replier.username }}</h5>
                                                    <span>{{ items.content }}</span>
                                                </li>
                                            </template>

                                        </template>
                                        <p>
                                            <router-link :to="`/comment/detail/${item._id}`">
                                                共{{ item.replies.length }}条评价 >
                                            </router-link>
                                        </p>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </template>
                    <!-- loding加载效果 -->
                    <CatLoding :loading="false" :finished="true" :smail="true" message="没有更多评论哦，快点发布一条评论吧" />
                </ul>
                <div class="input">
                    <input ref="inputs" v-model="CommenTvalue" type="text" @blur="fouceFn" :placeholder="placeholder"
                        @keydown.enter="sendCommentOrReply">
                    <!-- <button @click="submitComment">评论</button> -->
                </div>

            </div>


        </div>

    </div>
</template>

<script>
import { refAutoReset } from '@vueuse/core';
import { watch, ref, computed } from 'vue'
import MessageJs from '@/components/libray/CarMessage.js'
import { PushCommentData, GetCommentData, PushAddUp, PushReply } from '@/api/detail.js'
import { useRoute, useRouter, } from 'vue-router'
import { useStore } from 'vuex'
import { timeFormat } from '@/utils/timeFilter.js'
import CatPromptJS from '@/components/libray/CatPrompt.js'

export default {
    name: 'CatComment',
    props: {
        // // 这个是控制是否显示评论的
        // showComment: {
        //     type: Boolean,
        //     default: true,
        // },
        comment: {
            type: Array,
            default: []
        },
        DetailData: {
            type: [Array, Object],
        }
    },
    setup(props, { emit }) {
        let route = useRoute()
        let state = useStore()


        // 通过vuex进行数据的托管这个是关闭评论模块
        let cloneMask = () => {
            state.commit('detail/SetShowComment')
        }

        // 提示语
        let placeholder = ref("请输入你的友好评论")

        // 用户保存需要评论的id
        let CommenTvalue = ref('');// 评论内容
        let CatId = state.state.detail.DetailData._id // 帖子id
        let commenter = JSON.parse(localStorage.getItem('user-store')).user.profile._id || state.state.user.profile._id //当前登录的用户id




        // 这里是发送数据获取当前评论的数据
        GetCommentData(CatId).then(value => {
            // console.log("获取到的数据", value.result.data);

            //这里我们使用vuex进行管理
            state.commit('detail/SetCommentDat', value.result.data)
        }).catch(err => {
            state.commit('detail/SetCommentDat', [])
        })

        // 这个是从vuex中获取评论的数据
        let CommentDat = computed(() => state.state.detail.CommentDat)




        let inputs = ref(null)
        // tyep 是判断用户是否是评论还是回复
        let type = ref("a")
        // 这个是失去焦点那么就设置状态为“a”  并设置input的提示文本为
        let fouceFn = () => {
            type.value = "a"
            placeholder.value = "请输入你的友好评论"
        }

        // 发布评论模块和回复模块
        let sendCommentOrReply = () => {
            // 这里先判断是是否提交的数据是否为空
            if (CommenTvalue.value != "") {
                // 判断是否为a如果为a那么就是评论

                // 以下主要的逻辑就是使用vuex进行数据的托管
                // 01 当发送当评论的请求成功的话那么就在vuex中添加进入
                if (type.value != "b" && CatId != "" && commenter != "") {
                    // 这里发送请求获取数据 分别传递评论内容,评论作者id 和帖子id
                    PushCommentData({ content: CommenTvalue.value, commenter, CatId }).then(({ result: { data } }) => {
                        state.commit('detail/IncreaseComment', data)
                        // 清空输入框中的内容
                        CommenTvalue.value = ""
                        return CatPromptJS({ text: "评论成功", type: "success", timeout: 1000 })
                    }).catch(e => {
                        return CatPromptJS({ text: "评论失败哦~", type: "error", timeout: 1000 })
                    })
                } else if (type.value != "a" && CommenTvalue.value != "") {
                    // 这里的逻辑和上面一致
                    PushReply({ CommenTvalue: CommenTvalue.value, replyVal: replyVal.value, commenter }).then(({ result: { data } }) => {
                        state.commit('detail/SetReplies', { refId: replyVal.value, playload: data })
                        // 清空输入框中的内容
                        CommenTvalue.value = ""
                        return CatPromptJS({ text: "回复成功啦", type: "success", timeout: 1000 })
                    }).catch(err => {
                        return CatPromptJS({ text: "回复失败了哦！~", type: "error", timeout: 1000 })
                    })

                }
            } else {
                return CatPromptJS({ text: "回复内容不能为空", type: "error", timeout: 1000 })
            }

        }

        // 这个是回复的id
        let replyVal = ref('')

        // 点赞与回复 模块
        let addUpFN = (e) => {
            // 等于a表示是的是点赞的
            // 当点击点赞的时候服务端会进行查找如果有那么就取消如果没有那么就添加
            if (e.target.getAttribute('alt') == 'a') {
                let addupId = e.target.getAttribute('addup')// 获取需要点赞的评论id
                PushAddUp({ addupId, commenter }).then(({ result }) => {
                    // 这里是点赞模块
                    // 当addup中有数据的时候就会删除否则就会被删除
                    state.commit('detail/AddCommentData', { addupId, commenter })
                }).catch(err => {
                    return CatPromptJS({ text: "点赞失败哦", type: "error", timeout: 1000 })
                })
                // 这里表示是回复的情况
            } else if (e.target.getAttribute('alt') == 'b') {
                replyVal.value = e.target.getAttribute('addup')// 获取需要回复的的帖子id
                // 设置input的提示语为回复
                placeholder.value = "回复："
                // 设置当前的类型会b作为回复的情况
                type.value = "b"
                // 设置input获取焦点
                inputs.value.focus()
                // 清空输入框中的内容
                CommenTvalue.value = ""
            }
        }


        return { CommenTvalue, placeholder, inputs, CatId, type, CommentDat, timeFormat, fouceFn, addUpFN, commenter, cloneMask, inputs, sendCommentOrReply }

    }

}
</script>



<style lang="less" scoped>
.mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.498);
    position: fixed;
    bottom: 0px;
    z-index: 1000;

}

.myimg {
    filter: brightness(75%) hue-rotate(30deg);
}

.dz-img {
    content: '';
    position: absolute;
    z-index: -1;
    top: 12px;
    left: 10px;
    width: 12px;
    height: 12px;
    background-color: @primary-color;
    border-radius: 100px;
}

.detail-comment-content {
    width: 100%;
    height: 464px;
    background: rgb(255, 255, 255);
    position: fixed;
    bottom: 0px;
    border-radius: 40px 40px 0px 0px;
    z-index: 1200;
    display: flex;
    align-items: center;



    //  // 评论
    .input {
        width: 100%;
        height: 72px;
        position: fixed;
        bottom: 0px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-shadow: @default-showdow;
        background: @white-color;
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
        height: 464px;
        margin: 0px auto;
        // background: red;
        display: flex;
        align-items: center;
        flex-direction: column;


        ul {
            width: 345px;
            height: 430px;
            overflow: auto;
            border-radius: 14px;

            .center-item {
                width: 100%;
                height: auto;
                padding-bottom: 40px;

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
</style>