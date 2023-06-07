<template>
    <!-- 用户头部的数据 -->
    <div class="mjgz-center-item-top">
        <!-- 用户模块的数据 头像标题等 -->
        <div class="mjgz-center-item-user">
            <div class="mjgz-center-item-user-left">
                <div class="img">
                    <span><img src="https://img.js.design/assets/smartFill/img205164da6ef470.jpg" alt=""></span>
                </div>
                <div class="text">
                    <h1>FeiMao@110</h1>
                    <h3>我有一只可爱的奶牛猫</h3>
                </div>
            </div>

            <div class="mjgz-center-item-user-right">
                <div class="top">
                    <slot name="top">
                        <!-- <p>测试</p> -->
                        {{ PageView }}
                    </slot>
                </div>
                <div class="bottom">
                    <slot name="bottom">
                        {{ Submittime }}
                        <!-- <p>测试</p> -->
                    </slot>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "CarUserInfo",
    props: {
        // 浏览量模块
        PageView: {
            type: String,
            default: ""
        },
        Submittime: {
            type: String,
            default: ""
        }
    }

}


</script>


<style lang="less" scoped>
// 用户数据
.mjgz-center-item-top {
    width: 100%;
    height: 58px;
    display: flex;
    justify-content: center;
    align-items: center;

    .mjgz-center-item-user {
        width: 322px;
        height: 38px;
        // background: blue;
        display: flex;

        .mjgz-center-item-user-left {
            flex: 1.4;
            // background: blue;
            display: flex;
            justify-content: center;
            align-items: center;

            .img {
                flex: 0.7;
                // background: rgb(126, 101, 55);

                span {
                    display: block;
                    width: 38px;
                    height: 38px;
                    border-radius: 100px;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;

                    }
                }
            }

            .text {
                flex: 1.8;
                // background: palegreen;
                height: 30px;


                h1 {
                    font-size: @heading2-font-size;
                    font-weight: 700;
                    color: @heading-color;
                    // line-height: 20px;

                }

                h3 {
                    font-size: @body-font-size;
                    font-weight: 500;
                    color: @secondary-text-color;
                }


            }
        }

        .mjgz-center-item-user-right {
            flex: 1.4;
            display: flex;
            flex-direction: column;

            .top {
                flex: 1;
                font-size: @secondary-text-font-size;
                font-weight: 500;
                color: @secondary-text-color;
                text-align: right;
                line-height: 20px;
            }

            .bottom {
                flex: 1;
                font-size: @secondary-text-font-size;
                font-weight: 500;
                color: @secondary-text-color;
                text-align: right;
                line-height: 20px;
            }



        }
    }
}
</style>