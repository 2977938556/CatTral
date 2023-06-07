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
            分享
        </template>
    </CartStatusBav>

    <div class="detail">
        <div class="detail-center">
            <!-- 头图组件 -->
            <CatBannner />
            <CarUserInfo PageView="测试" />

            <!-- 内容区域 -->
            <div class="detail-content">
                <div class="detail-content-top">
                    <p>
                        从前有一只小猫，它叫做“小三”。小三是一只非常可爱的小猫咪，拥有一身柔软的白色皮毛和一双大大的绿眼睛。它住在一个非常贫穷的旧居民区里，没有人愿意收留这只小猫。小三日夜逃荒，在陌生的街头和城市中飘荡，寻找食物和住所。
                        有一天，小三遇到了一个善良的女孩，她看到这只无依无靠的小猫，便心生怜悯，决定给小三一个温暖的家。女孩将小三带到家中，并给它洗澡、剪指甲、换上新的玩具和床铺。小三感到非常快乐和自在，开始与女孩成为了好朋友。
                        随着时间的流逝，小三的生活变得越来越好。它在女孩的陪伴下，享受了有家的温暖和关爱。在女孩的悉心照料下，小三也成长为了一只健康、聪明、活泼的小猫咪。每当女孩回家时，小三总会蹦跶着迎接她，让女孩感到温馨和快乐。
                        小三的故事告诉我们，即使生活中有挫折和苦难，也不要失去希望和勇气。在这个世界上，总会有那么一些人，用他们的关注和爱心，为你点亮前方的路。而当你也成为了他们生命中的一部分，你同样能够给予他们温暖和善意。就像小三和女孩一样，好朋友之间的情感是无以言表的，我们应该珍惜彼此的陪伴、感激对方的付出，一起走过余生的美好时光。
                    </p>
                </div>
                <div class="detail-content-bottom">
                    <p>2023.9.14</p>
                    <p>199浏览</p>
                </div>
            </div>



            <!-- 评论标题内容 -->
            <div class="detail-comment">
                <RecenGood title="评论" :count="`评论${100}`" />
            </div>

            <!-- 渲染评论区内容 -->
            <div class="detail-comment-center">
                <div class="input">
                    <input type="text" placeholder="发表评论：">
                </div>
                <ul>
                    <!-- 这个是用于处理点赞与回复模块 -->
                    <CarCommentCommponent v-for="item in 10" />
                    <!-- loding加载效果 -->
                    <CatLoding :loading="false" :finished="true" :smail="true" message="没有更多评论哦，快点发布一条评论吧" />
                </ul>
            </div>







        </div>
    </div>
</template>


<script>
export default {
    name: "CatMjsdDetail",
    setup() {
        console.log("测试01");
    }
}


</script>


<style lang="less" scoped>
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