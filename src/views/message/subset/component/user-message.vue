<template>
    <div class="message">
        <div class="message-content">
            <div class="message-center">
                <h4>{{ title }}:</h4>
                <p>{{ user_message || "暂无留言" }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>

let props = defineProps({
    title: {
        type: String,
        default: "留言"
    },
    user_message: {
        type: String,
        default: "暂无留言"
    }
})




</script>





<style lang="less" scoped>
.message {
    width: 100%;
    height: 100%;

    .message-content {
        width: 345px;
        display: flex;
        align-items: center;
        justify-content: center;

        .message-center {
            width: 325px;

            h4 {
                font-size: 14px;
                font-weight: 700;
                letter-spacing: 0px;
                line-height: 30px;
                color: rgba(255, 124, 0, 1);
            }

            p {
                width: 325px;
                background: rgba(242, 242, 242, 1);
                border-radius: 6px;
                font-size: @heading3-font-size;
                font-weight: 500;
                line-height: 17.38px;
                color: rgba(38, 38, 38, 1);
                text-align: left;
                vertical-align: top;
                padding: 10px;
            }
        }
    }
}
</style>