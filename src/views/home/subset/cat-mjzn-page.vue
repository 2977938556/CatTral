<template>
    <div class="mjzn">
        <!-- 头状态栏 -->
        <CartStatusBav :isstyle="false">
            <!-- 左边内容插槽 -->
            <template #left>
                <!-- 返回 -->
                <CatReturn></CatReturn>
            </template>
            <!-- 中间内容插槽 -->
            <template #center>
                <p>养猫指南</p>
            </template>

            <template #right>
                <span class="shengq"></span>
            </template>
        </CartStatusBav>



        <!-- 内容区域 -->
        <div class="ymzn-center">
            <div class="mjzn-banner">
                <CatBannner />
            </div>
            <div class="mjzn-tj">
                <RecenGood />
                <div class="mjzn-tj-box">
                    <ul>
                        <li class="mjzn-tj-box-item" v-for="item in 9">
                            <router-link :to="`/home/mjzn/13213123${item}`">
                                <div class="item-top">
                                    <img src="https://img.js.design/assets/img/6471d0e0a9e4fdcd385318a5.png#037ffd6298c966b45058eacf8ab90465"
                                        alt="">
                                </div>
                                <div class="item-bottom">
                                    <div class="item-bottom-top">
                                        <p>萌新养猫需要哪些东西，这次一次给你搞定萌新养猫需要哪些东西，这次一次给你搞定萌新养猫需要哪些东西，这次一次给你搞定</p>
                                    </div>
                                    <div class="item-bottom-bottom">
                                        <p>浏览:312</p>
                                    </div>
                                </div>
                            </router-link>
                        </li>
                    </ul>

                    <!-- 提示用户 -->
                    <CatLoding :finished="true" :smail="true" />
                </div>
            </div>
        </div>



    </div>
</template>




<style lang="less" scoped>
.mjzn {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .ymzn-center {
        width: 345px;
        height: 100%;

        // 轮播图
        .mjzn-banner {}



        // 推荐模块
        .mjzn-tj {
            width: 345px;
            height: auto;
            min-height: 100px;


            .mjzn-tj-box {
                width: 345px;
                height: auto;


                ul {
                    width: 345px;
                    height: auto;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    // border: 1px solid red;


                    .mjzn-tj-box-item {
                        width: 162px;
                        height: 212px;
                        overflow: hidden;
                        overflow: hidden;
                        border-radius: 10px;
                        margin-top: 20px;

                        border: 1px solid rgba(242, 242, 242, 1);



                        // 图片内容区域
                        .item-top {
                            width: 162px;
                            height: 120px;
                            border-radius: 0px 0px 10px 10px;
                            overflow: hidden;

                            img {
                                width: 162px;
                                height: 119px;
                                object-fit: cover;
                            }
                        }


                        // 文字区域
                        .item-bottom {
                            width: 100%;
                            height: 92px;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;

                            .item-bottom-top {
                                height: 40px;
                                vertical-align: top;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                overflow: hidden;
                                text-overflow: ellipsis;

                                p {
                                    padding: 10px;
                                    font-size: 12px;
                                    font-weight: 500;
                                    letter-spacing: 0px;
                                    line-height: 14.48px;
                                    color: rgba(38, 38, 38, 1);
                                    text-align: left;
                                    vertical-align: top;
                                }
                            }

                            .item-bottom-bottom {
                                height: 20px;

                                p {
                                    font-size: 8px;
                                    font-weight: 500;
                                    letter-spacing: 0px;
                                    line-height: 20px;
                                    color: rgba(127, 127, 127, 1);
                                    padding-left: 10px;
                                }

                            }
                        }



                    }

                    .mjzn-tj-box-item:nth-child(1) {
                        margin-top: 10px;
                    }

                    .mjzn-tj-box-item:nth-child(2) {
                        margin-top: 10px;
                    }
                }

            }
        }
    }



}
</style>