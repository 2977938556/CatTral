<template>
    <!-- 用户头部的数据 -->
    <div class="mjgz-center-item-top">
        <!-- 用户模块的数据 头像标题等 -->
        <div class='mjgz-center-item-user'>
            <div class="mjgz-center-item-user-left">
                <div class="img">
                    <span><img :src="user.bgimgUrl" alt="头像"></span>
                </div>
                <div class="text">
                    <h1>{{ user.username }}</h1>
                    <h3>{{ user.slogin }}</h3>
                </div>
            </div>

            <div class="mjgz-center-item-user-right">
                <div class="top">
                    <slot name="top">
                        <p>{{ `申请日期：${timeFormat(time)}` }}</p>
                        <!-- {{ PageView }} -->
                    </slot>
                </div>
                <div class="bottom">
                    <slot name="bottom">
                        <!-- {{ Submittime }} -->
                    </slot>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { timeFormat } from '@/utils/timeFilter.js'
export default {


    name: "ApplyCarUserInfo",
    props: {
        user: {
            type: Object,
            default: {},
        },
        time: {
            type: [String, Number],
            default: "",
        }
    },
    setup() {
        return { timeFormat }
    }

}


</script>


<style lang="less" scoped>
.small {
    width: 345px !important;
}

// 用户数据
.mjgz-center-item-top {
    width: 100%;
    height: 68px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid @background-color;

    .mjgz-center-item-user {
        width: 322px;
        height: 48px;
        display: flex;

        .mjgz-center-item-user-left {
            flex: 1.4;
            display: flex;
            justify-content: center;
            align-items: center;

            .img {
                flex: 0.7;

                span {
                    display: block;
                    width: 48px;
                    height: 48px;
                    border-radius: 100px;
                    overflow: hidden;
                    background: rgb(213, 213, 213);

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
                height: 38px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-left: 4px;

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

                p {
                    color: @secondary-text-color;
                    font-size: @secondary-text-font-size;
                    font-weight: 500;
                    text-align: right;
                    line-height: 24px;

                }
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