<template>
    <!-- 头状态栏 -->
    <CartStatusBav :isstyle="false">
        <!-- 左边内容插槽 -->
        <template #left>
            <!-- 返回 -->
            <CatReturn></CatReturn>
        </template>
        <!-- 中间内容插槽 -->
        <template #center>
            <p>猫迹商店</p>
        </template>

        <template #right>
            <router-link to="path">
                我要发布
            </router-link>
        </template>
    </CartStatusBav>

    <!-- 用户的故事 -->
    <div class="mjgz-box">
        <div class="mjgz-center">
            <div class="mjgz-center-item">
                <!-- 用户头部的数据 -->
                <div class="mjgz-center-item-top">
                    <div class="mjgz-center-item-user">
                        <div class="mjgz-center-item-user-left">
                            <div class="img">
                                <span><img src="" alt=""></span>
                            </div>
                        </div>
                        <div class="mjgz-center-item-user-right"></div>
                    </div>
                    <div class="mjgz-center-item-title"></div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: "CatMjgsPage"
}
</script>



<style lang="less" scoped>
.mjgz-box {
    width: 100%;
    height: 100%;
    border: 1px solid red;
    display: flex;
    justify-content: center;

    .mjgz-center {
        width: 345px;
        height: 100%;
        min-height: 400px;
        border: 1px solid red;
    }

}
</style>
