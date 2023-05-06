<template>
    <div class="History">
        <!--  头部 -->
        <CartStatusBav :isstyle="true">
            <!-- 左边内容插槽 -->
            <template #left>
                <CatReturn></CatReturn>
            </template>
            <!-- 中间内容插槽 -->
            <template #center>
                历史记录
            </template>
            <template #right>
                <p class="remover-p" @click="cesjo">清空全部</p>
            </template>
        </CartStatusBav>


        <!-- 内容区域 -->
        <div class="history-content-box">
            <div class="history-center">
                <ul>
                    <!-- 单个元素 -->
                    <li v-for="item in 5" :key="item">
                        <div class="history-item">
                            <div class="history-img">
                                <img src="https://img.js.design/assets/smartFill/img193164da6ef470.jpg" alt="">
                            </div>
                            <div class="history-text">
                                <div class="history-text-top">
                                    <p>有需要领奖猫猫的吗，个人因为工作的原因，不方便养猫了。。有需要领奖猫猫的吗，个人因为工作的原因，不方便养猫了。。有需要领奖猫猫的吗，个人因为工作的原因，不方便养猫了。。
                                    </p>
                                </div>
                                <div class="history-text-bottom">
                                    <p>2023.5.4</p>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- 显示组件 -->
            <CatLoding></CatLoding>



        </div>



    </div>
</template>


<script>
export default {
    name: 'History',
    setup() {
        let cesjo = () => {
            console.log("11");
        }
        return {cesjo}
    },

}
</script>


<style lang="less" scoped>
.History {

    // 头部文字样式
    .remover-p {
        color: @primary-color;
        font-size: 12px;
        font-weight: 500;

        &:hover {
            font-weight: 900;
            color: @transition-color;
        }
    }


    .history-content-box {
        width: 100%;
        height: 100%;
        min-height: 812px;
        background: @background-color;
        overflow: hidden;

        // 内容区域
        .history-center {
            width: 345px;
            height: 100%;
            margin: 20px auto;

            ul {
                display: flex;
                flex-direction: column;

                li {
                    width: 345px;
                    height: 74px;
                    background: @white-color;
                    margin-top: 10px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .history-item {
                        width: 329px;
                        height: 60px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        // 图片窗口
                        .history-img {
                            width: 64px;
                            height: 60px;
                            overflow: hidden;
                            border-radius: 10px;

                            img {
                                width: 64px;
                                height: 60px;
                                object-fit: cover;

                            }
                        }

                        // 文字窗口
                        .history-text {
                            width: 100%;
                            height: 60px;
                            display: flex;
                            align-items: center;
                            flex-direction: column;

                            .history-text-top {
                                width: 100%;
                                height: 40px;

                                p {
                                    font-size: @heading3-font-size;
                                    font-weight: 500;
                                    color: @body-color;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    padding-left: 10px;
                                }
                            }

                            .history-text-bottom {
                                width: 100%;
                                height: 20px;

                                p {
                                    line-height: 40px;
                                    font-size: @body-font-size;
                                    font-weight: 500;
                                    letter-spacing: 0px;
                                    line-height: 20px;
                                    text-align: right;
                                    color: @comment-color;
                                }
                            }

                        }
                    }
                }

                li:nth-child(1) {
                    margin-top: 0px;
                }
            }
        }
    }


}</style>