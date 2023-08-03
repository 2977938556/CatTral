<template>
    <Transition name="ShowHidden">
        <div class="popup">
            <div class="popup-mask" @click="closeCallback"></div>
            <div :class="['popup-content', { fade: fade }]">
                <div class="popup-header">
                    <!-- slot for custom title -->
                    <slot name="title"></slot>
                </div>
                <div class="popup-body">
                    <slot name="content"></slot>
                </div>
                <div class="popup-footer">
                    <button class="popup-btn popup-btn-cancel" @click="closeCallback">取消</button>
                    <button class="popup-btn popup-btn-confirm" @click="subCallback">确定</button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
    name: 'CatConfires',
    emits: ['update:modelValue', 'closeCallback', 'subCallback'],
    props: {
        modelValue: {
            type: [String, Number, Boolean],
            required: true
        }
    },
    setup(props, { emit }) {
        let fade = ref(false)

        onMounted(() => {
            setTimeout(() => { fade.value = true }, 0)
        })


        let closeCallback = () => {
            emit('closeCallback', false)
            emit('update:modelValue', false)
        }

        let subCallback = () => {
            emit('subCallback', true)
            emit('update:modelValue', false)
        }


        return { fade, closeCallback, subCallback }

    },
}
</script>

<style scoped lang="less">
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

.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000000;
}

.popup-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
}

.fade {
    transition: all 0.5s ease-in-out;
    opacity: 1 !important;
}

.popup-content {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 450px;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    opacity: 0;
    height: auto;
}

.popup-header {
    padding: 15px;
    border-bottom: 1px solid @background-color;
    text-align: center;
    font-weight: 900;
}

.popup-body {
    padding: 20px 15px 20px 15px;
    // border-radius: 10px;
    // height: 100%;

}

.popup-footer {
    display: flex;
    padding-top: 20px;

    .popup-btn {
        flex: 1;
        height: 40px;
        border: none;


    }


    .popup-btn-cancel {
        background-color: @white-color;
        color: @heading-color;
    }

    .popup-btn-cancel:hover {
        opacity: 0.5;
    }

    .popup-btn-confirm {
        color: @white-color;
        background-color: @transition-color;
    }

    .popup-btn-confirm:hover {
        opacity: 0.5;
    }
}
</style>
```