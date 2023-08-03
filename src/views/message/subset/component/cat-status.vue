<template>
    <div class="cat-status">
        <div class="cat-status-content">
            <div class="cat-status-center">
                <div class="cat-status-center-box">
                    <div class="img">
                        <img v-if="to_examine === 'ok'" src="../../../../assets/image/cat-status-success-icon.png" alt="">
                        <img v-if="to_examine === 'nopass'" src="../../../../assets/image/cat-status-no-icon.png" alt="">
                        <span v-if="to_examine === 'ok'">领养成功</span>
                        <span v-if="to_examine === 'nopass'">领养失败</span>
                    </div>
                    <div class="default">
                        <p v-if="to_examine === 'ok'">感谢你对流浪的关心</p>
                        <p v-else class="nopass">期待你寻找到一只可爱的猫猫</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
let props = defineProps({
    to_examine: {
        type: String,
    }
})



</script>





<style lang="less" scoped>
.cat-status {
    width: 100%;
    height: 100%;

    .cat-status-content {
        width: 100%;
        width: 345px;
        // height: 86px;
        display: flex;
        align-items: center;
        justify-content: center;

        .cat-status-center {
            width: 325px;
            height: 145px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .cat-status-center-box {
                display: flex;
                align-items: center;
                flex-direction: column;

                .img {
                    width: 100px;
                    position: relative;

                    img {
                        height: 90px;
                        width: 90px;
                        object-fit: cover;
                    }

                    span {
                        display: block;
                        transform: rotate(-30deg);
                        font-size: 10px;
                        font-weight: 500;
                        top: 60%;
                        left: 30%;
                        color: rgba(255, 255, 255, 1);
                        position: absolute;
                    }
                }

                .default {
                    width: 100%;

                    // border: 1px solid red;
                    p {
                        text-align: center;
                        font-size: 12px;
                        font-weight: 500;
                        color: @primary-color;
                    }

                    .nopass {
                        color: @auxiliary-color1;

                    }
                }
            }






        }
    }
}
</style>
