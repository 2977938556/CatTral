<template>
    <Transition name="ShowHidden">
        <div class="message" v-show="flage" >
            <div :class="type" style="border-radius: 100px;overflow: hidden;">
                <p>{{ text }}</p>
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
    transform: translate3d(0, -60px, 0);
    opacity: 0;
}

.ShowHidden-enter-active {
    transition: all 0.5s;
}

.ShowHidden-enter-to {
    transform: none;
    opacity: 1;
}


// 结束
.ShowHidden-leave-from {
    transform: none;
    opacity: 1;
}

.ShowHidden-leave-active {
    transition: all 0.5s;
}

.ShowHidden-leave-to {
    transform: translate3d(0, 0px, 0);
    opacity: 0;
}





.message {
    width: auto;
    min-width: 150px;
    height: 46px;
    box-shadow: @default-showdow;
    z-index: 9999;
    line-height: 46px;
    text-align: center;
    font-size: @heading2-font-size;
    font-weight: 700;
    position: absolute;
    top: 10%;
    left: 40%;
    transform: translate(-20%, -0%);
    border-radius: 20px;



    p {
        padding: 5px 5px 5px 5px;
        border-radius: 50px;

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
