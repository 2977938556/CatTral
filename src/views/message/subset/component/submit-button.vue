<template>
    <div class="submit">
        <div class="submit-content">
            <div class="submit-center">
                <div class="submit-btn">
                    <!-- 自定义事件 -->
                    <span class="refuse" @click="no">{{ left }}</span>
                    <span class="agreewith" @click="ok">{{ right }}</span>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup>
import { ref } from 'vue';
const emit = defineEmits(['noCat', 'okCat'])
let props = defineProps({
    left: {
        type: String,
        default: "拒绝",
    },
    right: {
        type: String,
        default: "同意"
    },
    apply: {
        type: Object,
        default: {},
    }
})

let no = () => {
    emit('noCat', { vavles: false, item: props.apply });
}

let ok = () => {
    emit('okCat', { vavles: true, item: props.apply });
}
</script>





<style lang="less" scoped>
.submit {
    width: 100%;
    height: 100%;

    .submit-content {
        width: 100%;
        width: 345px;
        height: 86px;
        display: flex;
        align-items: center;
        justify-content: center;

        .submit-center {
            width: 325px;
            height: 62px;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            .submit-btn {
                width: 100px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .refuse {
                    font-size: 12px;
                    font-weight: 500;
                    letter-spacing: 0px;
                    line-height: 17.38px;
                    color: @heading-color ;
                    border: 1px solid @heading-color;
                    padding: 3px 10px 3px 10px;
                    border-radius: 20px;
                }

                .refuse :hover {
                    opacity: 0.5;
                }


                .agreewith {
                    font-size: 12px;
                    font-weight: 500;
                    letter-spacing: 0px;
                    line-height: 17.38px;
                    color: @white-color ;
                    padding: 3px 10px 3px 10px;
                    background: @transition-color ;
                    border-radius: 20px;
                }

                .agreewith :hover {
                    opacity: 0.5;
                }
            }
        }
    }
}
</style>