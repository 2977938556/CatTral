<template>
    <Transition name="ShowHidden">
        <div class="popup" v-if="show">
            <div class="popup-mask" @click="close"></div>
            <div class="popup-content">
                <div class="popup-header">
                    <!-- slot for custom title -->
                    <slot name="title">Default title</slot>
                </div>
                <div class="popup-body">
                    <!-- slot for custom content -->
                    <slot name="content">Default content</slot>
                </div>
                <div class="popup-footer">
                    <button class="popup-btn popup-btn-cancel" @click="cancel">取消</button>
                    <button class="popup-btn popup-btn-confirm" @click="confirm">确定</button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
export default {
    name: "CatOpenCity",
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        close() {
            this.$emit("update:show", false);
        },
        cancel() {
            this.$emit("cancel");
            this.close();
        },
        confirm() {
            this.$emit("confirm");
            this.close();
        }
    }
};
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
}

.popup-header {
    padding: 15px;
}

.popup-body {
    padding: 15px;
    border-radius: 10px;

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

    .popup-btn-confirm {
        color: @white-color;
        background-color: @transition-color;
    }
}
</style>
```