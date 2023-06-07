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
                <router-link to="/home/mjhd/participate">我参与的</router-link>
            </template>
        </CartStatusBav>


        <!-- 内容区域 -->
        <div class="mjhd">
            <div class="mjhd-center">


                <!--活动卡片区域 -->
                <ul>
                    <li class="mjhd-item" v-for="item in 5">
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
                                <div class="mjhd-item-bottom-bottom">
                                    <p>已报名人数:56</p>
                                    <p>2023.5.20 - 5.30</p>
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>


                <!-- 活动无限加载 -->
                <CatLoding :loading="false" :finished="true" :smail="true"/>
                
                
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
                height: 298px;
                border-radius: 10px;
                overflow: hidden;
                background: @white-color;
                box-shadow: 4px 0px 25px 0px rgba(0, 0, 0, 0.05);
                margin-top: 20px;

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
                        height: 98px;


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

                        .mjhd-item-bottom-bottom {
                            width: 345px;
                            height: 34px;
                            display: flex;
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
</style>