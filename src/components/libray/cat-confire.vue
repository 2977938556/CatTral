<template>
    <Transition name="ShowHidden">
        <div class="popup">
            <div class="popup-mask" @click="closeCallback"></div>
            <div :class="['popup-content', { fade: fade }]">
                <div class="popup-header">
                    <!-- slot for custom title -->
                    {{ title }}
                    <slot name="title"></slot>
                </div>
                <div class="popup-body">
                    {{ text }}
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
    props: {
        title: {
            type: String,
            default: "消息提示"
        },
        text: {
            type: String,
            default: "亲，确认删除吗"
        },
        subCallback: {
            type: Function
        },
        closeCallback: {
            type: Function
        }
    },

    setup(props) {
        let fade = ref(false)

        onMounted(() => {
            setTimeout(() => { fade.value = true }, 0)
        })

        return { fade }

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
}

.popup-body {
    padding: 20px;
    border-radius: 10px;
    height: 80px;

}

.popup-footer {
    display: flex;

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