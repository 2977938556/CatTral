<template>
    <Transition name="ShowHidden">
        <div class="miaoya" v-show="flage">
            <div :class="['message', type]">
                <p>{{ text }}</p>
            </div>
        </div>
    </Transition>
</template>


<script>
import { onMounted, ref } from 'vue'
export default {
    name: "CatPrompt",
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
.miaoya {
    width: auto;
    height: auto;
    position: relative;
}

.message {
    width: 110px;
    height: 40px;
    box-shadow: @default-showdow;
    z-index: 10000000000;
    text-align: center;
    font-size: @heading2-font-size;
    font-weight: 700;
    line-height: 40px;
    border-radius: 10px;
    transition: all 0.5s;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 100%);

    p {
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
    background: @auxiliary-color5;
}



// 过渡动画
.ShowHidden-enter-from {
    transition: all 0.5s;
    opacity: 0;
    transform: translate(-50%, -300%);
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
    transform: translate(-50%, -300%);



}
</style>
