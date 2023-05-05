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


                <div class="detail-comment-hf">
                    回复
                    今天到这里了，回复的内容
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
    border: 1px solid red;

    .detail-comment-center {
        width: 345px;
        height: auto;
        margin: 0px auto;
        // background: red;


        // 评论详情
        ul {
            width: 345px;
            height: auto;

            .center-item {
                width: 100%;
                height: auto;

                // 用户模块
                .detail-pl-title-user {
                    width: 100%;
                    height: 36px;
                    overflow: hidden;
                    background: red;

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
                    background: pink;

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
        .detail-comment-hf{
            width: 100%;
            height: 1100px;
            border: 1px solid red;
            margin-top: 10px;
        }
        
        
        
    }



}
</style>