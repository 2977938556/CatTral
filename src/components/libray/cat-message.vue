<template>
    <Transition name="ShowHidden">
        <div class="miaoya">
            <div class="message" v-show="flage">
                <div :class="type">
                    <p>{{ text }}</p>
                </div>
            </div>
        </div>
    </Transition>
</template>


<script>
import { onMounted, ref } from 'vue'
export default {
    name: "CatMessage",
    props: {
        text: {
            type: [String, Boolean, Number],
            default: '输入错误数据'
        },
        type: {
            type: String,
            default: 'error'
        }

    },
    setup() {
        let flage = ref(false)

        onMounted(() => {
            flage.value = true
        })

        return { flage }

    }

}
</script>


<style lang="less" scoped>
// 过渡动画
.ShowHidden-enter-from {
    transition: all 0.5s;
    opacity: 0;
}

.ShowHidden-enter-active {
    transition: all 0.5s;
}

.ShowHidden-enter-to {
    transition: all 0.5s;
    opacity: 1;
}


// 结束
.ShowHidden-leave-from {
    transition: all 0.5s;
    opacity: 1;
}

.ShowHidden-leave-active {
    transition: all 0.5s;
}

.ShowHidden-leave-to {
    transition: all 0.5s;
    opacity: 0;
}

.miaoya {
    width: 100%;
    height: 100%;
    position: relative;
}

.message {
    width: 100%;
    min-width: 150px;
    height: 46px;
    box-shadow: @default-showdow;
    z-index: 9999;
    line-height: 46px;
    text-align: center;
    font-size: @heading2-font-size;
    font-weight: 700;
    border-radius: 10px;
    transition: all 0.5s;

    // transform: translateY(-100%);

    p {
        // padding: 5px 5px 5px 5px;
        color: #fff;
    }
}


// 错误
.warn {
    background: @auxiliary-color1;
}

// 错误提示
.error {
    background: @auxiliary-color2;

}

// 成功
.success {
    background: @transition-color;

}
</style>
