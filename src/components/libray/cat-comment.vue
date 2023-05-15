<template>
    <div>
        <div class="mask" @click.prevent="$emit('change', false)"> <!-- 评论数据 -->

        </div>
        <!-- 评论的数据 -->
        <div class="detail-comment-content">

            <div class="input">
                <input type="text" placeholder="请输入您的友好评论">
                <button>评论</button>
            </div>
            <!-- 渲染评论区内容 -->
            <div class="detail-comment-center">
                <ul>
                    <li v-for="item in 6" :key="item" class="center-item">
                        <div class="detail-pl-title-user">
                            <a href="javascript:;">
                                <span>
                                    <img src="https://img.js.design/assets/smartFill/img195164da6ef470.jpg" alt="">
                                </span>
                                <span>
                                    <h4>FeiMao@110</h4>
                                    <p>4月14日</p>
                                </span>
                            </a>
                        </div>
                        <!-- 评论详情 -->
                        <div class="detail-pl-title-content">
                            <!-- 分别有三个模块 -->
                            <div class="detail-pl-top">
                                <p>这只猫猫好可爱哇，再养一只了，希望他可以找一个好人家，呜呜呜
                                </p>
                            </div>
                            <!-- 评论详情 -->
                            <div class="detail-pl-center">
                                <span>
                                    <img src="../../assets/image/cat-detail-dz.png" alt="">
                                    <p>19</p>
                                </span>
                                <span>
                                    <img src="../../assets/image/cat-detail-pl.png" alt="">
                                    <p>90</p>
                                </span>
                            </div>
                            <!-- 回复详情 -->
                            <div class="detail-pl-hf" v-if="item % 2 != 0">
                                <ul>
                                    <!-- 这里需要进行判断是否有回复的数据 -->
                                    <template v-for="item in 2" :key="item">
                                        <li v-if="item % 2 != 0">
                                            <h5>爱猫使者：</h5>
                                            <span>对哇，这只猫好可爱走了对哇，这只猫好可爱走了</span>
                                        </li>
                                        <li v-else>
                                            <h5>爱猫使者：</h5>
                                            <span>哈哈哈哈哈，好可爱的猫猫哇</span>
                                        </li>
                                    </template>
                                    <p>
                                        <router-link :to="`/comment/detail/${item}`">
                                            共五条评论 >
                                        </router-link>
                                    </p>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <!-- 没有更多了 -->
                    <!-- loding加载效果 -->
                    <!-- <CatLoding :loding="false" :smail="true" /> -->
                </ul>

            </div>
        </div>


    </div>
</template>


<script>
import { watch } from 'vue'
export default {
    name: 'CatComment',
    props: {
        // 这个是控制是否显示评论的
        showComment: {
            type: Boolean,
            default: true,
        },
        comment: {
            type: Array,
            default: []
        }
    },
    setup(props) {
        // 禁止body元素的滚动事件
        let disableBodyScroll = () => {
            document.body.style.overflow = 'hidden';
        }
        // 恢复body元素滚动事件
        let enableBodyScroll = () => {
            document.body.style.overflow = '';
        }



        // 监听控制是否显示隐藏来进行判断是否可以滚动
        watch(() => props.showComment, (newvalue, oldvalue) => {
            if (newvalue == true) {
                // console.log("进来1");
                disableBodyScroll()
            } else {
                // console.log("进来2");
                enableBodyScroll()
            }
        }, {
            immediate: true
        })







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




        input {
            width: 279px;
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


        ul {
            width: 345px;
            height: 430px;
            overflow-y: auto;

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
</style>