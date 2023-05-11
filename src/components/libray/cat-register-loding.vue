<template>
    <div class="login-loader" v-if="loading">
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p v-if="message" class="loading-text">{{ message }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "CatRegisterLoding",
    props: {
        loading: {
            type: Boolean,
            required: true,
        },
        message: {
            type: String,
            default: "正在加载中",
        },
    },
};
</script>

<style scoped lang="less">
.login-loader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000000;

    .loading-spinner {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;

        .spinner {
            width: 60px;
            height: 60px;
            border: 5px solid rgba(255, 255, 255, 0.418);
            border-top-color: @primary-color;
            border-radius: 50%;
            animation: spin 1s ease-in-out infinite;
        }
        .loading-text {
            margin-top: 20px;
            font-size: @heading1-font-size;
            font-weight: 900;
            color: @white-color !important;
        }
    }
}


@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
