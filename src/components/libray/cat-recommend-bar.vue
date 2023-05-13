<template>
    <div class="Recommendedbar">
        <div class="Recommendedbar-counter">
            <div class="bar-center">
                <div :class="['bar-counter-item', { active: CatRecommendBar == 'A' }]" @click="StateData('A')">
                    <a href="javascript:;">
                        关注
                    </a>
                </div>
                <div :class="['bar-counter-item', { active: CatRecommendBar == 'B' }]" @click="StateData('B')">
                    <a href="javascript:;">
                        推荐
                    </a>
                </div>
                <div :class="['bar-counter-item', { active: CatRecommendBar == 'C' }]" @click="StateData('C')">
                    <a href="javascript:;">
                        最新
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
export default {
    name: "CatRecommendBar",
    setup(props, { emit }) {
        // 默认值
        let store = useStore();

        const CatRecommendBar = computed(() => store.state.home.CatRecommendBar);

        // 发送需要获取的数据
        let StateData = (type) => {
            store.commit('home/Modify', type)
            emit("changeState", type)
        }
        return { StateData, CatRecommendBar }
    }
}



</script>

<style scoped lang="less">
// 三个按钮
.Recommendedbar {
    width: 375px;
    height: 40px;
    // border: 1px solid red;
    display: flex;
    justify-content: center;
    z-index: 100;


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
                    transition: all 0.1s ease-in-out;
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