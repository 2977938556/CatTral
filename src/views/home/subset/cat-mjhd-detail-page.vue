<template>
    <div class="catmjhd">
        <!-- 头状态栏 -->
        <CartStatusBav :isstyle="false">
            <!-- 左边内容插槽 -->
            <template #left>
                <!-- 返回 -->
                <CatReturn></CatReturn>
            </template>
            <!-- 中间内容插槽 -->
            <template #center>
                <p>猫迹活动</p>
            </template>

            <template #right>
                <span>申请</span>
            </template>
        </CartStatusBav>


        <!-- 内容区域 -->
        <div class="mjhd">
            <div class="mjhd-center">


                <!--活动卡片区域 -->
                <ul>
                    <li class="mjhd-item">
                        <router-link to="/home/mjhd/321u312ui4y">
                            <!-- 头部活动图片区域 -->
                            <div class="mjhd-item-top">
                                <span class="mjsd-item-tag">活动报名中</span>
                                <img src="https://img.js.design/assets/smartFill/img195164da6ef470.jpg" alt="">
                            </div>






                            <!-- 底部内容区域 -->
                            <div class="mjhd-item-bottom">
                                <div class="mjhd-item-bottom-top">
                                    <h4>关爱流浪猫，温暖在行动——平安普惠联合江东社区开展公益活动关爱流浪猫，温暖在行动——平安普惠联合江东社区开展公益活动关爱流浪猫，温暖在行动——平安普惠联合江东社区开展公益活动
                                    </h4>
                                </div>
                                <div class="mjhd-item-bottom-center">
                                    <p>
                                        “关爱流浪猫，温暖在行动”是一项由平安普惠联合江东社区开展的公益活动。该活动旨在通过集中精力关注流浪猫的福利和保健，为当地流浪猫群体提供更好的生存环境和健康保障。
                                        此次活动将涵盖以下几个方面
                                        捐赠活动：平安普惠将向江东社区捐赠一定数量的猫粮、水杯和其它必需品，供社区志愿者及群众喂养和照料流浪猫。
                                        爱心义诊：为流浪猫提供必要的医疗和治疗，减轻它们的痛苦和疾病，这项活动将为流浪猫提供免费的医疗和护理服务，包括进行健康检查、体检、打疫苗等服务。
                                        寻找志愿者：社区将联络志愿者，号召居民参与到该活动中来，他们可以通过喂养流浪猫、关注猫咪卫生、管理流浪猫收容所、寻找家庭领养等方式来参与活动。
                                        推广活动：平安普惠将会开展一系列的宣传推广活动，包括制作海报、写微博、发朋友圈、发布文章等，以及邀请当地媒体进行报道，鼓励更多的人关注流浪猫这个议题，并参与到这项公益活动中来。
                                        该项活动旨在通过凝聚社区、组织志愿者和社会共同力量的方式，为当地的流浪猫提供更好的福利和保障，同时也为大家提供了一个关心社区、关爱生命的有益途径。
                                    </p>
                                </div>
                                <div class="mjhd-item-bottom-bottom">
                                    <div class="top">
                                        <p>已报名:39</p>
                                    </div>
                                    <div class="bottom">
                                        <p>地区:广州番禺</p>
                                        <p>2023.5.20 - 5.30</p>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </li>


                    <!-- 提示用户 -->
                    <CatLoding :finished="true" :smail="true" />
                </ul>



            </div>
        </div>



    </div>
</template>


<script>
export default {
    name: "CatMjhdPage",

}



</script>

<style scoped lang="less">
.mjhd {
    width: 100%;
    height: 100%;
    min-height: 400px;
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: center;

    .mjhd-center {
        width: 345px;
        height: 100%;
        min-height: 400px;


        // 卡片区域
        ul {
            width: 345px;
            height: 100%;



            // 单个活动模块

            .mjhd-item {
                width: 100%;
                height: auto;
                border-radius: 10px;
                background: @white-color ;
                box-shadow: 4px 0px 25px 0px rgba(0, 0, 0, 0.05);
                margin-top: 20px;

                border: 1px solid blue;

                a {

                    // 顶部图片区域
                    .mjhd-item-top {
                        width: 345px;
                        height: 200px;
                        position: relative;

                        span {
                            display: block;
                            width: 100px;
                            height: 30px;
                            background: @primary-color;
                            color: @white-color;
                            font-size: 12px;
                            font-weight: 500;
                            text-align: center;
                            line-height: 30px;
                            position: absolute;
                            border-radius: 0px 0px 190px 0px;
                        }

                        img {
                            object-fit: cover;
                            width: 345px;
                            height: 200px;
                        }
                    }


                    // 底部文字内容
                    .mjhd-item-bottom {
                        width: 345px;
                        height: auto;


                        // 头部文字内容
                        .mjhd-item-bottom-top {
                            width: 345px;
                            height: 64px;


                            h4 {
                                width: 345px;
                                height: 54px;
                                font-size: 16px;
                                font-weight: 700;
                                letter-spacing: 0px;
                                color: @heading-color;
                                padding: 10px;

                                vertical-align: top;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                overflow: hidden;
                                text-overflow: ellipsis;

                            }
                        }



                        // 中间活动内容介绍
                        .mjhd-item-bottom-center {
                            width: 345px;
                            height: auto;

                            p {
                                padding: 10px;
                            }
                        }



                        // 底部提示文字
                        .mjhd-item-bottom-bottom {
                            width: 345px;
                            height: auto;


                            .top {
                                height: 60px;

                                p {
                                    padding-left: 10px;
                                    line-height: 60px;
                                    font-weight: 800;
                                }

                            }

                            .bottom {
                                display: flex;
                                height: 60px;
                                align-items: center;
                                justify-content: space-between;
                                padding: 10px;

                                p {
                                    font-size: 12px;
                                    font-weight: 500;
                                    letter-spacing: 0px;
                                    line-height: 17.38px;
                                    color: @body-color;
                                    vertical-align: top;
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