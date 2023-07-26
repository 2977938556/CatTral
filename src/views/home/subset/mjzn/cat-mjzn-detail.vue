<template>
    <div class="mjzndetail">
        <!-- 头状态栏 -->
        <CartStatusBav :isstyle="false">
            <!-- 左边内容插槽 -->
            <template #left>
                <!-- 返回 -->
                <CatReturn></CatReturn>
            </template>
            <!-- 中间内容插槽 -->
            <template #center>
                <p>养猫指南</p>
            </template>

            <template #right>
                <span class="shengq"></span>
            </template>
        </CartStatusBav>



        <!-- 内容区域 -->
        <div class="mjzndetail-bg" v-if="Datas">
            <img v-for="item in  Datas.imageUrl" :src="item" :key="item" alt="">
        </div>

        <div class="mjzn-center">
            <!-- 用户信息 -->
            <CarUserInfo :Submittime="`浏览量:${Datas.clickCount}`" :type="true" :data="Datas.user_id" />
            <!-- 标题 -->
            <div class="mjzn-center-title">
                <p>{{ Datas.title }}</p>
            </div>
            <!-- 内容 -->
            <div class="mjzn-center-content">
                <p>{{ Datas.content }} </p>
            </div>
        </div>

        <div class="db">
            <p>{{ timeFormat(Datas.updated_at) }} </p>
        </div>


        <!--         
        评论标题内容
        <div class="detail-comment">
            <RecenGood title="评论" :count="`评论${100}`" />
        </div>

        渲染评论区内容
        <div class="detail-comment-center">
            <div class="input">
                <input type="text" placeholder="发表评论：">
            </div>
            <ul>
                这个是用于处理点赞与回复模块
                <CarCommentCommponent v-for="item in 6" />
                loding加载效果
                <CatLoding :loading="false" :finished="true" :smail="true" message="没有更多评论哦，快点发布一条评论吧" />
            </ul>
        </div> -->





    </div>
</template>



<script setup>
import { timeFormat } from '@/utils/timeFilter.js'
import { GetGuideList, GetGuideDetail } from '@/api/guide.js'
import { useStore } from 'vuex'
import MessageJs from '@/components/libray/CarMessage.js'
import { reactive, ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

name: "CatMjznDetail";

let route = useRoute()
let router = useRouter()



let Datas = ref(null)


watch(() => route.params.id, (newVal, olVal) => {
    GetGuideDetail({ _id: newVal }).then(({ result: { data } }) => {
        Datas.value = data


    }).catch(err => {
        console.log(err);
        MessageJs({
            message: "获取数据失败",
            type: 'error',
        })

        router.push({ path: "/error" })
    })
}, {
    immediate: true
})







</script>


<style lang="less" scoped>
.mjzndetail {
    width: 100%;
    height: 100%;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;


    // 背景图片
    .mjzndetail-bg {
        width: 100%;
        height: 180px;
        overflow: hidden;

        img {
            width: 100%;
            height: 180px;
            object-fit: cover;
        }
    }

    // 文字内容区域
    .mjzn-center {
        width: 345px;
        height: auto;
        margin: 0 auto;
        padding-bottom: 40px;

        // 标题
        .mjzn-center-title {
            width: 345px;
            height: auto;
            padding: 2px;
            vertical-align: top;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;

            p {
                font-size: @heading1-font-size;
                font-weight: 700;
                letter-spacing: 0px;
                line-height: 23.17px;
                color: @heading-color;
            }

        }

        // 内容
        .mjzn-center-content {
            width: 100%;
            height: auto;
            padding-top: 20px;

            p {
                font-size: @heading3-font-size;
                font-weight: 500;
                letter-spacing: 0px;
                line-height: 20px;
                color: @heading-color;
                text-align: left;
                vertical-align: top;
            }
        }
    }


    .db {
        width: 100%;
        height: 40px;
        font-size: @secondary-text-font-size;
        font-weight: 500;
        color: @secondary-text-color;
        text-align: right;
        line-height: 40px;
        padding-right: 20px;
    }



    // 评论的内容
    .detail-comment {
        width: 345px;
        height: 50px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

    }

    .detail-comment-center {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        ul {
            width: 345px;
        }

    }

    //  评论
    .input {
        width: 100%;
        height: 72px;
        position: fixed;
        bottom: 0px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-shadow: @default-showdow;
        background: @white-color;
        z-index: 1000000;

        input {
            width: 100%;
            margin: 20px;
            height: 42px;
            background: @background-color;
            border-radius: 6px;
            padding-left: 10px;
        }
    }


}
</style>