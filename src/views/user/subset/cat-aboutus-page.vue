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
                关于我们
            </template>
        </CartStatusBav>

        <!-- 设置菜单 -->
        <div class="setup-content">
            <div class="setup-center">
                <div class="setup-top">
                    <div class="img">
                        <img src="../../../assets/image/log.png" alt="">
                        <h4>猫迹，让领养代替购买</h4>
                    </div>
                </div>
                <div class="setup-bottom">
                    <div class="text">
                        <p>0797-297793855</p>
                        <p>liulinchun233@gmail.com</p>
                        <p><u><a href="javascript:;">官方网站</a></u></p>
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





</script>




<style lang="less" scoped>
.socialprivacy {
    width: 100%;
    height: 700px;
    background: @white-color;
    top: 0px;

    .setup-content {
        width: 375px;
        height: 100%;
        display: flex;
        justify-content: center;

        .setup-center {
            width: 345px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .setup-top {
                width: 100%;
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;

                .img {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    img {
                        width: 88px;
                        height: 88px;
                    }
                    h4{
                        padding-top: 20px;
                    }

                }
            }

            .setup-bottom {
                width: 100%;
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;

                .text {
                    text-align: center;
                    font-size: @heading3-font-size;
                }
            }

        }
    }
}
</style>
