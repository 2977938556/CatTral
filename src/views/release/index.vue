<template>
    <div class="release">
        <!-- 头状态栏 -->
        <CartStatusBav :isstyle="true">
            <!-- 左边内容插槽 -->
            <template #left>
                <!-- 返回 -->
                <CatReturn></CatReturn>
            </template>
            <!-- 中间内容插槽 -->
            <template #center>
                发布启示
            </template>
        </CartStatusBav>
    </div>
</template>