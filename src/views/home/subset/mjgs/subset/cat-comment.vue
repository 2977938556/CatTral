<template>
    <li class="center-item" v-for="item in StoryComment" :key="item._id" @click="replyFunction">
        <div class="detail-pl-title-user">
            <a href="javascript:;">
                <span>
                    <img :src="item.commenter.bgimgUrl" alt="">
                </span>
                <span>
                    <h4>{{ item.commenter.username }}</h4>
                    <p>{{ item.commenter.slogin }}</p>
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
                    <img src="../../../../../assets/image/cat-detail-dz.png" alt="a" :storyid="item._id">
                    <div :class="{ 'dz-img': item.addup.indexOf(userId) != -1 }"></div>
                    <p alt="a" :storyid="item._id">{{ item.addup.length || 0 }}</p>
                </span>
                <span>
                    <img src="../../../../../assets/image/cat-detail-pl.png" alt="b" :storyid="item._id">
                    <p alt="b" :storyid="item._id">回复</p>
                </span>
            </div>
            <!-- 回复详情 -->
            <div class="detail-pl-hf" v-if="item.replies.length > 0">
                <ul>
                    <!-- 这里需要进行判断是否有回复的数据 -->
                    <template v-for="(pitem, index) in item.replies">
                        <template v-if="index < 3">
                            <li>
                                <h5>{{ pitem.replier.username }}</h5>
                                <span>{{ pitem.content }}</span>
                            </li>
                        </template>
                    </template>
                    <p>
                        <router-link :to="`/home/mjgs/comment/${item._id}`">
                            共{{ item.replies.length }}条评价 >
                        </router-link>
                    </p>
                </ul>
            </div>
        </div>


    </li>

    <div class="input">
        <input ref="input" type="text" v-model="replay" :placeholder="playloadval" @keydown.enter="sendCommentOrReply">
    </div>
</template>
<script>
import { PushStoryLike, PushStoryReplay, PushStoryHfCommment } from '@/api/story.js'
import { computed, ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router';
import CatPromptJS from '@/components/libray/CatPrompt.js'


export default {
    name: "CatCommentRefil",
    setup() {
        let store = useStore()
        let route = useRoute()
        let router = useRouter()


        // 这里是初始化数据和初始化是否需要进行
        // onMounted(() => {
        //     let regular = router.options.history.state.forward
        //     if (regular.indexOf("/home/mjgs/comment/")) {
        //         console.log("进来了");
        //         // store.commit('mjhd/SetMjhdData', [])
        //         // store.commit('mjhd/SetMaxloding', true)
        //     }
        // })


        let FromData = reactive({
            _id: route.params.id,
        })


        // 获取评论的数据
        let StoryComment = computed(() => store.state.mjgs.StoryComment || [])


        // 获取当前的用户的id
        let userId = JSON.parse(localStorage.getItem('user-store')).user.profile._id || store.state.user.profile._id //当前登录的用户id


        // 用户绑定input输入框
        let input = ref(null)
        let playloadval = ref("快来评价一下吧~")
        let type = ref("c")
        let nameId = ref("")



        //  这里是点赞或回复模块
        let replyFunction = (e) => {
            let types = e.target.getAttribute('alt')
            if (types == "a") {
                // 获取点赞的模块
                let commentId = e.target.getAttribute('storyid')
                // 点赞模块
                PushStoryLike({ userId, commentId, type: 'mjgs' }).then(value => {
                    store.commit('mjgs/AddStoryComment_Up', { commentId, userId })
                }).catch(err => {
                    CatPromptJS({ text: "发布失败哦", type: "error" })
                })
            } else if (types == "b") {
                // 设置回复的数据
                input.value.focus()
                playloadval.value = "回复:"
                type.value = "b"
                nameId.value = e.target.getAttribute('storyid')
            }
        }






        // 发布评论
        let replay = ref("")

        // 发布评论模块
        let sendCommentOrReply = async () => {
            if (type.value == "c") {
                PushStoryReplay({ content: replay.value, _id: FromData._id, user_id: userId, type: "mjgs" }).then(({ result }) => {
                    store.commit('mjgs/AddStoryComments', [result.data])
                    replay.value = ""
                }).catch(Err => {
                    return CatPromptJS({ text: "评论发布失败", type: "error" })
                })
            } else if (type.value == "b") {
                // 分别是回复的内容 回复的评论id  回复的用户id
                // let { content, commentId, userId } = req.body
                PushStoryHfCommment({ content: replay.value, commentId: nameId.value, user_id: userId, type: "mjgs" }).then(({ result: { data } }) => {
                    // 这里处理本地的数据
                    store.commit('mjgs/AddStoryCommentRefly', { commentId: nameId.value, playload: data })
                    replay.value = ""
                    type.value = "c"
                    playloadval.value = "快来评价一下吧"
                })
            }
        }





        return { StoryComment, userId, replyFunction, replay, input, playloadval, sendCommentOrReply, nameId }
    }
}



</script>






<style lang="less" scoped >
// 这个是点赞的高亮形式
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


.input {
    width: 100%;
    height: 72px;
    position: fixed;
    bottom: 10px;
    left: 0px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0px 0px 2.667vw #ff7c0014;
    background: @white-color;
    z-index: 1000000;
    margin: 0 auto;
    border-radius: 10px;

    input {
        width: 100%;
        margin: 20px;
        height: 42px;
        opacity: 1;
        background: @background-color;
        border-radius: 6px;
        padding-left: 10px;
        border-radius: 10px;
    }

    button {
        width: 48px;
        height: 40px;
        border-radius: 9px;
        border: none;
        color: #000;
    }

}



.center-item {
    width: 100%;
    height: auto;
    padding-bottom: 40px;
    box-sizing: border-box;
    // border: 1px solid red;

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
                word-wrap: break-word;
                overflow-wrap: break-word;
                white-space: pre-wrap;
                /* 或者 pre-line */
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
</style>