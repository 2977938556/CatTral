<template>
    <div class="participate">
        <!-- 头状态栏 -->
        <CartStatusBav :isstyle="false">
            <!-- 左边内容插槽 -->
            <template #left>
                <!-- 返回 -->
                <CatReturn></CatReturn>
            </template>
            <!-- 中间内容插槽 -->
            <template #center>
                <p>我参与的</p>
            </template>

            <template #right>
                <span class="shengq"></span>
            </template>
        </CartStatusBav>


        <!-- 内容区域 -->
        <div class="participate-center">
            <!-- 01 缩略版的活动 -->
            <div class="mjhdappfor-activity" v-for="item in 5">
                <a href="#">
                    <div class="mjhdappfor-activity-box">
                        <div class="left">
                            <span class="tag no">活动已经结束了</span>
                            <img src="https://img.js.design/assets/smartFill/img195164da6ef470.jpg" alt="">
                        </div>
                        <div class="right">
                            <div class="top">
                                <p>关爱流浪猫，温暖在行动——平安普惠联合江东社区开展公益活动</p>
                            </div>
                            <div class="bottom">
                                <p>活动地点：赣州</p>
                                <p>报名时间:2023.5.20-5.30</p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>

            <!-- 这里可以设置一个加载数据 -->
            <CatLoding :finished="true" :smail="true" />
        </div>

    </div>
</template>

<script>
export default {
    name: "CatParticipate"
}


</script>

<style lang="less" scoped>
.participate {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .participate-center {
        width: 100%;
        height: 100%;
        min-height: 200px;

        // 活动模块
        .mjhdappfor-activity {
            width: 100%;
            height: 108px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid @background-color;

            .mjhdappfor-activity-box {
                width: 345px;
                height: 66px;
                display: flex;
                justify-content: space-between;

                .left {
                    width: 82px;
                    height: 100%;
                    border-radius: 10px;
                    overflow: hidden;
                    position: relative;

                    .tag {
                        display: block;
                        position: absolute;
                        font-size: 8px;
                        font-weight: 500;
                        color: @white-color;
                        text-align: center;
                        line-height: 18px;
                        width: 100%;
                        height: 18px;
                        bottom: 0px;
                    }

                    .no {
                        background: rgba(51, 51, 51, 0.5);
                    }

                    .yes {
                        background: rgba(255, 124, 0, 0.6);
                    }

                    img {
                        object-fit: cover;
                        width: 82px;
                        height: 66px;
                    }
                }

                .right {
                    width: 252px;
                    height: 100%;

                    .top {
                        width: 252px;
                        height: 40px;

                        p {
                            font-size: 12px;
                            font-weight: 500;
                            letter-spacing: 0px;
                            line-height: 17.38px;
                            color: rgba(38, 38, 38, 1);
                            text-align: left;
                            vertical-align: top;
                        }
                    }

                    .bottom {
                        width: 252px;
                        height: 26px;
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;

                        p {
                            font-size: 10px;
                            font-weight: 500;
                            letter-spacing: 0px;
                            line-height: 14.48px;
                            color: rgba(38, 38, 38, 1);
                            text-align: left;
                            vertical-align: top;
                        }
                    }
                }

            }

        }
    }
}
</style>