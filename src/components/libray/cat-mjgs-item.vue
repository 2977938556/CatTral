<template>
    <div class="mjgz-center-item" v-for="item in data" :kry="item._id">
        <!-- 用户infor数据模块 -->
        <CarUserInfo :data="item.user_id">
            <template #top>
                <p>浏览{{ item.clickCount }}</p>
            </template>
        </CarUserInfo>
        <router-link :to="`/home/mjgs/detai/${item._id}`">
            <!-- 中间的数据 -->
            <div class="mjgz-center-item-center">
                <p>{{ item.content }}</p>
            </div>
            <!-- 底部的数据 -->
            <div class="mjgz-center-item-botton">
                <img v-for="(items, index) in item.imageUrl" :key="index" :src="items" alt="">
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "CatMjgsItem",
    props: {
        data: {
            type: [Object, Array],
            default: []
        }
    }
}



</script>


<style lang="less" scoped>
// 这个是每一个故事模块
.mjgz-center-item {
    width: 100%;
    height: 100%;
    max-height: 400px;
    overflow: hidden;
    margin-top: 20px;
    border-radius: 10px;
    background: white;




    // 内容区域

    .mjgz-center-item-center {
        width: 324px;
        height: 58px;
        margin: 0 auto;

        p {
            height: 38px;
            font-size: @heading2-font-size;
            font-weight: 500;
            color: @heading-color;
            vertical-align: top;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
        }
    }

    .mjgz-center-item-botton {
        width: 344px;
        height: 170px;
        overflow: hidden;
        border-radius: 10px;

        img {
            object-fit: cover;
            width: 344px;
            height: 170px;
        }
    }

}
</style>