<template>
    <div class="message">
        <div class="message-content">
            <div class="message-center">
                <p>{{ message }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
let props = defineProps({
    message: {
        type: String,
        default: "",
    }
})


</script>





<style lang="less" scoped>
.message {
    width: 100%;
    height: 100%;

    .message-content {
        width: 100%;
        width: 345px;
        height: 86px;
        display: flex;
        align-items: center;
        justify-content: center;

        .message-center {
            width: 325px;
            height: 66px;
            background: rgba(242, 242, 242, 1);
            border-radius: 6px;
            font-size: @heading3-font-size;
            font-weight: 500;
            letter-spacing: 0px;
            line-height: 17.38px;
            color: rgba(38, 38, 38, 1);
            text-align: left;
            vertical-align: top;
            padding: 10px;
        }
    }
}
</style>