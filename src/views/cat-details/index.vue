<template>
    <div class="Cat-details">
        <CartStatusBav :isstyle="true">
            <template #left>
                <CatReturn></CatReturn>
            </template>

            <template #center>
                <p>启示详情</p>
            </template>
            <template #right>
                <span class="btn">申请领养</span>
            </template>
        </CartStatusBav>


        <!-- 主要内容区域 -->
        <div class="details-content">
            <div class="detail-center">
                <!--  banner -->
                <CatBannner :itme="[]"></CatBannner>
                <!-- 头部用户信息模块 -->
                <div class="detail-user">
                    <div class="detail-left">
                        <a href="javascript:;">
                            <div class="detail-left-img">
                                <img src="https://img.js.design/assets/smartFill/img205164da6ef470.jpg" alt="">
                            </div>
                            <div class="detail-left-text">
                                <p>FeiMao@110</p>
                                <span>领养替代购买</span>
                            </div>
                        </a>
                    </div>
                    <div class="detail-right">
                        <div class="sc">
                            <img src="../../assets/image/cat-detail-sc.png" alt="">
                            <span>收藏</span>
                        </div>
                        <div class="sx">
                            <img src="../../assets/image/cat-details-message.png">
                            <span>私信</span>
                        </div>
                    </div>
                </div>

                <!-- 标题模块 -->
                <div class="detail-title">
                    <div class="detail-title-center">
                        <p>有需要领养猫猫的吗，有只金渐层，个人因为工作的原因，不方便养猫了，需要私信我有需要领养猫猫的吗，有只金渐层，个人因为工作的原因，不方便养猫了，需要私信我</p>
                    </div>
                </div>


                <!-- 简介模块 -->
                <div class="dateil-jj" v-if="true">
                    <div class="detail-jj-center">
                        <p>
                            如果你正在寻找一只可爱的金渐层猫猫作为你的宠物，那么你来对地了我有一只金渐层猫猫需要领养，因为我的工作原因无法照顾它。如果你对猫咪有经验，愿意给它提供一个温暖的家，那么请私信联系我。如果你正在寻找一只可爱的金渐层猫猫作为你的宠物，那么你来对地方了。我有一只金渐层猫猫需要领养，因为我的工作原因无法照顾它。如果你对猫咪有经验，愿意给它提供一个温暖的家，那么请私信联系我。如果你正在寻找一只可爱的金渐层猫猫作为你的宠物，那么你来对地方了。我有一只金渐层猫猫需要领养，因为我的工作原因无法照顾它。如果你对猫咪有经验，愿意给它提供一个温暖的家，那么请私信联系我。如果你正在寻找一只可爱的金渐层猫猫作为你的宠物，那么你来对地方了。我有一只金渐层猫猫需要领养，因为我的工作原因无法照顾它。如果你对猫咪有经验，愿意给它提供一个温暖的家，那么请私信联系我。
                        </p>
                    </div>
                </div>


                <!-- 标签模块 -->
                <div class="dateil-tab">
                    <ul>
                        <li v-for="(item, index) in ['金渐层', '个人', '金渐层']" :key="index + 1">
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
                            <p>赣州</p>
                        </div>
                        <div class="city-time">
                            <p>2023.5.5</p>
                        </div>
                    </div>
                </div>


                <!-- 评论模块 -->
                <div class="detail-pinglun">
                    <div class="detail-pinglun-center">
                        <a href="javascript:;">
                            <span class="pl-count">99</span>
                            <div class="pinglun-left">
                                <div class="pinglun-title">
                                    <h1>猫友评论:</h1>
                                </div>
                                <div class="pinglun-content">
                                    <p>这只猫猫好可爱哇，但是我家里友一只奶牛猫了，哎，父母也不会同意再养一只了，希望他可以找一个好人家，呜呜呜</p>
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
        </div>




    </div>
</template>


<script>
export default {
    name: "CatDetail",
    setup() {

    }
}


</script>


<style lang="less" scoped>
.Cat-details {
    transition: all 0.5s ease-in;

    // 按钮样式
    .btn {
        display: block;
        width: 62px;
        height: 26px;
        background: @primary-color;
        text-align: center;
        line-height: 26px;
        color: @white-color;
        /** 文本1 */
        font-size: @heading3-font-size;
        font-weight: 500;
        border-radius: 50px;

        &:hover {
            background: @transition-color;
            font-weight: 900;
        }
    }

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
                    flex: 1;
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



                    }




                }

                // 右边内容
                .detail-right {
                    flex: 1;
                    height: 100%;
                    display: flex;
                    align-items: center;

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

                .cancel-ellipsis {
                    display: block !important;
                    overflow: visible;
                    text-overflow: unset;
                    -webkit-line-clamp: initial;
                }

                .detail-jj-center {
                    width: 325px;
                    height: auto;

                    // background: red;
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
                padding: 10px;

                ul {
                    width: 325px;
                    height: auto;
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        padding: 10px;
                        display: block;
                        height: 14px;
                        border-radius: 217px;
                        background: @primary-color;
                        // margin-left: 4px;
                        margin-top: 2px;
                        line-height: 0px;



                        a {
                            /** 文本1 */
                            font-size: 10px;
                            font-weight: 500;
                            color: @white-color;
                            line-height: 0px;
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