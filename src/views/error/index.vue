<template>
    <div class="error">
        <div class="error-center">
            <div class="error-top">
                <slot>
                    <h1>404</h1>
                    <h1>没有找到数据哦！请看看别的数据哦</h1>
                </slot>
            </div>
            <div class="error-botton">
                <span @click="returnRouter">
                    返回
                </span>
            </div>
        </div>
    </div>
</template>


<script>
import { useRouter } from 'vue-router'
export default {
    name: "CatErroe",
    setup() {
        let router = useRouter()
        let returnRouter = () => {
            // 这里返回前两级别
            router.go(-2);
        }
        return { returnRouter }
    }
}
</script>


<style lang="less" scoped>
.error {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    // 居中的盒子
    .error-center {
        width: 100%;
        height: 50%;

        .error-top {
            width: 100%;
            height: 20%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            h1 {
                font-size: @heading1-font-size;
                color: @primary-color;
            }
        }

        .error-botton {
            width: 100%;
            height: 80%;
            display: flex;
            justify-content: center;

            span {
                display: block;
                width: 78px;
                height: 36px;
                border-radius: 224px;
                border: 1px solid @primary-color;
                text-align: center;
                line-height: 36px;
                color: @primary-color;

            }
        }
    }

}
</style>