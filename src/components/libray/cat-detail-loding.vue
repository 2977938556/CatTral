<template>
    <!-- 主要内容区域 -->
    <div class="details-content">
        <div class="detail-center">
            <!--  banner -->
            <CatLodingItem :width="328" :height="170" style="margin-top: 10px;" />

            <!-- 头部用户信息模块 -->
            <div class="detail-user" style="margin-top: 10px;">
                <div class="detail-left">
                    <CatLodingItem :width="260" :height="40" />
                </div>
                <div class="detail-right">
                    <!--   -->
                    <div class="sc">
                        <CatLodingItem :width="26" :height="26" style="margin-left: 10px;" />
                    </div>
                    <div class="sx">
                        <CatLodingItem :width="26" :height="26" style="margin-left: 5px;" />
                    </div>
                </div>
            </div>

            <!-- 标题模块 -->
            <div class="detail-title">
                <CatLodingItem :width="356" :height="38" />
            </div>

            <!-- 简介模块 -->
            <div class="dateil-jj">
                <CatLodingItem :width="356" :height="160" style="margin-top: 10px;" />
            </div>


            <!-- 评论模块 -->
            <div class="detail-pinglun">
                <CatLodingItem :width="356" :height="200" style="margin-top: 100px;" />
            </div>
        </div>

        <!-- 推荐内容区域 -->
        <!-- 内容区域 -->
        <div class="recommendeCount">
            <!-- <RecenGood></RecenGood> -->

            <!-- 循环渲染 内容组件 -->
            <div class="recommende-count">
               
            </div>
        </div>

        <!-- loding加载效果 -->
        <!-- <CatLoding :loding="false" /> -->
    </div>
</template>

<script>
export default {
    name: "CatDetailLoding"
}


</script>



<style lang="less" scoped>
* {
    // border: 1px solid red;

}


// 内容区域
.details-content {
    width: 100%;
    height: 100%;
    display: flex;
    // flex-direction: column;
    // align-items: center;
    // overflow: hidden;
    // background: red;


    .detail-center {
        width: 345px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 100px;

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

                        img {
                            object-fit: covers;
                            width: 38px;
                            height: 38px;
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
            transition: all 5s ease-in;

            // 开关控制是否
            .cancel-ellipsis {
                display: block !important;
                overflow: visible !important;
                text-overflow: unset !important;
                -webkit-line-clamp: initial !important;
                font-size: @body-font-size !important;
                font-weight: 500 !important;
                color: @secondary-text-color !important;
            }

            // .opne {
            //     display: block;
            //     overflow: visible;
            //     text-overflow: unset;
            //     -webkit-line-clamp: initial;
            // }

            .detail-jj-center {
                width: 325px;
                height: auto;

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

            ul {
                width: 325px;
                height: auto;
                display: flex;
                flex-wrap: wrap;
                padding: 6px;

                li {
                    padding: 10px;
                    height: 10px;
                    border-radius: 217px;
                    background: @primary-color;
                    display: flex;
                    align-items: center;
                    margin-left: 4px;
                    margin-top: 2px;

                    a {
                        /** 文本1 */
                        font-size: 10px;
                        font-weight: 500;
                        color: @white-color;
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
</style>