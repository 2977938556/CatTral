<template>
    <div class="Recommendedbars" :class="{ show: y > 360 }">
        <CatRecommendBar @changeState="changeState" />
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
    name: "CatRecommendBarSkice",
    setup(props, { emit }) {
        let store = useStore();

        // 修改状态
        let changeState = (type) => {
            store.commit('home/Modify', type)
        }



        const y = ref(0)
        // 页面加载进来后就设置页面滚动事件并获取被卷去的距离然后赋值给y
        onMounted(() => {
            window.onscroll = () => {
                const scrollTop = document.documentElement.scrollTop
                y.value = scrollTop
            }
        })




        return { y, changeState }
    }

}



</script>

<style scoped lang="less">
// 三个按钮
.Recommendedbars {
    width: 375px;
    height: 40px;
    display: flex;
    justify-content: center;
    z-index: 100;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 999;
    transform: translateY(0%);
    transition: all 0.3s linear;
    opacity: 0;

    &.show {
        transition: all 0.3s linear;
        left: 0px;
        top: 45px;
        opacity: 1 !important;
    }

    .Recommendedbar-counter {
        width: 345px;
        height: 40px;
        // border: 1px solid red;
        background: @white-color;
        display: flex;
        justify-content: center;
        box-shadow: @default-showdow;
        border-radius: 100px;

        .bar-center {
            width: 260px;
            height: 40px;
            // border: 1px solid red;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .bar-counter-item {
                text-align: center;
                line-height: 27px;
                width: 65px;
                height: 27px;

                a {
                    font-size: 14px;
                    font-weight: 700;
                    color: @heading-color;
                    text-align: left;
                    vertical-align: top;
                }


            }

            .active {
                width: 65px;
                height: 27px;
                background: @primary-color;
                border-radius: 100px;

                a {
                    /** 文本1 */
                    font-size: @heading1-font-size;
                    font-weight: 700;
                    letter-spacing: 0px;
                    color: @white-color;
                    text-align: left;
                    vertical-align: top;
                }
            }
        }
    }

}
</style>


