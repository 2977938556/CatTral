<template>
    <div class="socialprivacy">
        <!--  头部 -->
        <CartStatusBav :isstyle="false">
            <!-- 左边内容插槽 -->
            <template #left>
                <CatReturn></CatReturn>
            </template>
            <!-- 中间内容插槽 -->
            <template #center>
                更多功能
            </template>
        </CartStatusBav>

        <!-- 设置菜单 -->
        <div class="setup-content">
            <div class="setup-center">
                <!-- 功能2-->
                <div class="user-fun-b bottom">
                    <div class="item">
                        <a href="#" @click.prevent="messageFn">
                            <div class="item-icon">
                                <img src="../../../assets/image/cat-user-rz-icon.png" alt="">
                            </div>
                            <div class="item-title">
                                <p>申请认证</p>
                            </div>
                            <div class="item-fanhui-icon">
                                <img src="../../../assets/image/cat-fanhui-icon.png" alt="">
                            </div>
                        </a>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
// name: MessageSetup;
import { ref, watch, computed, reactive } from 'vue';
import { useRoute, useRouter, } from 'vue-router'
import { useStore } from 'vuex'
import { SetPrivacy } from '@/api/user.js'
import CatPromptJS from '@/components/libray/CatPrompt.js'




let route = useRoute()
let store = useStore()




let messageFn = () => {
    CatPromptJS({ text: "此服务暂未开通", type: 'error', timeout: 1000 })
}





</script>




<style lang="less" scoped>
.socialprivacy {
    width: 100%;
    height: 812px;
    background: rgba(242, 242, 242, 1);

    .setup-content {
        width: 375px;
        height: 100%;
        display: flex;
        justify-content: center;

        .setup-center {
            width: 345px;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;


            .user-fun-b {
                width: 100%;
                height: 100%;
                margin-top: 20px;

                // 居中的内容

                .bottom {
                    margin-bottom: 20px;
                }

                .item-icon {
                    margin-left: 13px;

                    img {
                        // background: red;
                        width: 100px;
                        height: 10px;
                    }

                }


                .item {
                    width: 100%;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    // justify-content: space-between;
                    background: @white-color;
                    border-radius: 10px;
                    // justify-content: space-around;


                    a {
                        width: 100%;
                        // height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-around;

                        // 图标
                        .item-icon {
                            width: 30px;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            img {
                                object-fit: cover;
                                width: 24px;
                                height: 24px;
                            }
                        }

                        // 功能标题
                        .item-title {
                            flex: 1;
                            height: 100%;
                            line-height: 60px;

                            p {
                                font-size: @heading2-font-size;
                                font-weight: 700;
                                letter-spacing: 0px;
                                color: @heading-color;
                                text-align: left;
                                vertical-align: top;
                            }
                        }

                        // 返回按钮 
                        .item-fanhui-icon {
                            padding-right: 13px;

                            img {
                                object-fit: cover;
                                width: 23px;
                                height: 22px;
                            }
                        }


                        .user-fun-a {
                            width: 100%;
                            height: auto;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;

                            .item {
                                // padding-bottom: 10px;
                                margin-bottom: 4px;
                            }

                        }

                        .user-fun-b {
                            width: 100%;
                            height: auto;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;

                            .item {
                                // padding-bottom: 10px;
                                margin-bottom: 4px;
                            }
                        }

                        .user-fun-c {
                            width: 100%;
                            height: auto;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            margin-top: 20px;

                            div {
                                width: 345px;
                                height: 60px;
                                background: @white-color;
                                font-size: @heading2-font-size;
                                font-weight: 700;
                                letter-spacing: 0px;
                                line-height: 60px;
                                color: @primary-color;
                                text-align: center;
                                vertical-align: top;
                                border-radius: 10px;
                            }

                            div:hover {
                                background: @primary-color;
                                color: @white-color;
                            }

                        }

                    }
                }



            }



        }
    }
}




.switch {
    display: inline-block;
    width: 60px;
    height: 30px;
    border-radius: 15px;
    background-color: #ccc;
    position: relative;
    cursor: pointer;

    .active {
        display: inline-block;
        width: 60px;
        height: 30px;
        border-radius: 15px;
        background: rgba(255, 124, 0, 1);
        position: relative;
        cursor: pointer;
    }


    .switch-inner {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(255, 124, 0, 1);
        position: absolute;
        top: 0;
        left: 0;
        transition: transform 0.2s;

    }

    .switch-on {
        background: rgb(255, 255, 255);
        transition: transform 0.2s;
        transform: translateX(100%);
    }
}
</style>
