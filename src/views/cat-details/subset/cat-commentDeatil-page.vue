<template>
    <div>
        <!-- 评论的数据 -->
        <div class="detail-comment-content">

            <CartStatusBav>
                <template #left>
                    <CatReturn />
                </template>
                <template #center>
                    评论详情
                </template>
            </CartStatusBav>

            <!-- 渲染评论区内容 -->
            <div class="detail-comment-center">
                <!-- 这个主评论区 -->
                <ul>
                    <li class="center-item">
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
                                <p>这只猫猫好可爱哇，再养一只了，希望他可以找一个好人家，呜呜呜这只猫猫好可爱哇，再养一只了，希望他可以找一个好人家，呜呜呜这只猫猫好可爱哇，再养一只了，希望他可以找一个好人家，呜呜呜这只猫猫好可爱哇，再养一只了，希望他可以找一个好人家，呜呜呜
                                </p>
                            </div>
                            <!-- 评论详情 -->
                            <div class="detail-pl-center">
                                <span>
                                    <img src="../../../assets/image//cat-detail-dz.png" alt="">
                                    <p>19</p>
                                </span>
                                <span>
                                    <img src="../../../assets/image//cat-detail-pl.png" alt="">
                                    <p>90</p>
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>


                <!-- 这个是回复评论区 -->
                <div class="detail-comment-hf">
                    <ul>
                        <li v-for="item in 2" :key="item" class="center-item">
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
                                    <p>这只猫猫好可爱哇，再养一只了，希望他可以找一个好人家，呜呜呜这只猫猫好可爱哇，再养一只了，希望他可以找一个好人家，呜呜呜这只猫猫好可爱哇，再养一只了，希望他可以找一个好人家，呜呜呜
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
            <!-- <CatLoding :loding="false" :smail="true" /> -->





        </div>


    </div>
</template>


<script>
import { watch } from 'vue'
export default {
    name: 'CatcommentDeatilPage',
    props: {
        comment: {
            type: Array,
            default: []
        }
    },
    setup() {





    }



}
</script>



<style lang="less" scoped>
.detail-comment-content {
    width: 100%;
    height: 100%;
    background: rgb(255, 255, 255);

    .detail-comment-center {
        width: 345px;
        height: auto;
        margin: 0px auto;



        // 评论详情
        ul {
            width: 345px;
            height: auto;
            border-bottom: 1px solid @background-color;


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