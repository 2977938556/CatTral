<template>
    <div class="mjhdappfor">
        <!-- 头状态栏 -->
        <CartStatusBav :isstyle="false">
            <!-- 左边内容插槽 -->
            <template #left>
                <!-- 返回 -->
                <CatReturn></CatReturn>
            </template>
            <!-- 中间内容插槽 -->
            <template #center>
                <p>报名活动</p>
            </template>

            <template #right>
                <span class="shengq">注意事项</span>
            </template>
        </CartStatusBav>


        <div class="mjhdappfor-center">

            <!-- 01 缩略版的活动 -->
            <div class="mjhdappfor-activity">
                <div class="mjhdappfor-activity-box">
                    <div class="left">
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
            </div>


            <!-- 02 提交的表单 -->
            <div class="mjhdappfor-input">
                <div class="input-box">
                    <div class="release-a">
                        <div class="a center">
                            <p>你的电话号码</p>
                            <input type="text" placeholder="请输入你的电话号码" />
                        </div>
                    </div>
                    <div class="release-a">
                        <div class="a center">
                            <p>留言</p>
                            <input type="text" placeholder="输入你的留言" />
                        </div>
                    </div>
                </div>
            </div>



            <!-- 03 提交按钮 -->
            <div class="mjhdappfor-submit">
                <span>报名</span>
            </div>





        </div>
    </div>
</template>



<script>
export default {
    name: "CatMjhdAppfor",
    setup() {

    }
}




</script>



<style lang="less" scoped>
.mjhdappfor {
    width: 100%;
    height: 100%;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;


    .mjhdappfor-center {

        width: 345px;
        min-height: 400px;
        height: 100%;

        // 活动模块
        .mjhdappfor-activity {
            width: 345px;
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


        // 提交的表单
        .mjhdappfor-input {
            width: 345px;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-bottom: 50px;
            padding-top: 30px;

            .input-box {
                width: 345px;
                height: auto;

                // 每一个input输入框
                .release-a {
                    width: 345px;
                    height: 79px;

                    .a {
                        input {
                            width: 345px;
                            height: 38px;
                            opacity: 1;
                            border-radius: 7.2px;
                            background: @background-color;
                            font-size: @heading1-font-size;
                            font-weight: 500;
                            letter-spacing: 0px;
                            line-height: 0px;
                            // color: @secondary-text-color;
                            text-align: left;
                            vertical-align: top;
                            padding-left: 10px;
                        }
                    }

                }
            }
        }



        // 提交的按钮
        .mjhdappfor-submit {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            span {
                font-size: 16px;
                font-weight: 700;
                color: @white-color;
                text-align: center;


                display: block;
                width: 245px;
                height: 36px;
                border-radius: 100px;
                background: rgba(255, 124, 0, 1);
                display: flex;
                justify-content: center;
                align-items: center;
            }



        }







    }

}
</style>