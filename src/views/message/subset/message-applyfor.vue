<template>
    <div class="applyfor">
        <CartStatusBav :isstyle="false">
            <template #left>
                <CatReturn http="/message" />
            </template>
            <template #center>
                <p class="tltes">申请通知</p>
            </template>
        </CartStatusBav>


        <div class="applyfor-content">

            <!-- 选择菜单 -->
            <div class="applyfor-nav">
                <div :class="['applyfor-nav', { active: route.name == 'apply' }]">
                    <router-link :to="{ name: 'apply' }">
                        <h1>申请领养</h1>
                        <span></span>
                    </router-link>
                </div>
                <div :class="['applyfor-nav', { active: route.name == 'applymy' }]">
                    <router-link :to="{ name: 'applymy' }">
                        <h1>我的申请</h1>
                        <span></span>
                    </router-link>
                </div>
            </div>

            <!-- 显示的内容 -->
            <div class="applyfor-center">
                <router-view>
                </router-view>
            </div>
        </div>
    </div>
</template>




<script setup>
import { useRoute, useRouter } from 'vue-router';
let route = useRoute()






</script>



<style lang="less" scoped>
.applyfor {
    width: 100%;
    // height: 1000%;
    background: @background-color;


    .applyfor-content {
        width: 375px;

        .applyfor-nav {
            width: 100%;
            height: 44px;
            display: flex;
            align-items: center;

            .applyfor-nav {
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                background: @white-color;


                h1 {
                    font-size: @heading2-font-size;
                    color: @secondary-text-color;
                }
            }
        }

        // 选中的状态
        .active {
            h1 {
                color: @heading-color !important;
                position: relative;
                font-weight: 900;

            }

            // h1::before {
            //     position: absolute;
            //     content: " 111";
            //     z-index: -1;
            //     display: block;
            //     width: 56px;
            //     height: 4px;
            //     background: red;
            //     // bottom: -5px;
            //     border-radius: 10px;
            // }

            span {
                display: block;
                width: 30px;
                height: 4px;
                display: block;
                width: 56px;
                height: 4px;
                background: @primary-color;
                border-radius: 10px;
            }
        }


        .applyfor-center {
            width: 100%;
            height: 100%;
            // background: red;
            // border: 1px solid red;
            padding-top: 20px;

        }

    }
}
</style>
