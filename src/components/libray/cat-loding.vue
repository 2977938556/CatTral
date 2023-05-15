<template>
    <div class="endof" :class="{ smia: smail == true }" ref="container">
        <p class="loding" v-if="loading"></p>
        <p class="finished" v-if="finished">~没有更多内容了哦~~</p>
    </div>
</template>


<script>

import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core';

export default {
    name: "CatLoding",
    props: {
        // 这个是调用方 传递的是否在加载中
        loading: {
            type: Boolean,
            default: false
        },
        // 这个是判断是否还有数据
        finished: {
            type: Boolean,
            default: false
        },
        smail: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        let container = ref(null)
        useIntersectionObserver(container, ([{ isIntersecting }], dom) => {
            if (isIntersecting == true && props.loading == false && props.finished == false) {
                console.log("进入可视区了", isIntersecting);
                emit("infinite");
            }
        }, { threshold: 0.1 })

        return { container }
    }


}


</script>



<style lang="less" scoped>
// 提示语
.smia {
    width: 345px !important;
    padding-bottom: 0px;
}

.endof {
    width: 375px;
    min-height: 200px;
    ;
    padding-bottom: 49px;
    display: flex;
    justify-content: center;
    align-items: center;

    .loding {
        display: block;
        width: 40px;
        height: 40px;
        margin: 0 auto;
        border: 4px solid #0000003b;
        border-top: 4px solid @primary-color;
        border-radius: 1000px;
        animation: spin 1s ease-in-out infinite;
        font-size: @body-font-size;
        font-weight: 500;
        letter-spacing: 0px;
        color: @transition-color;
        text-align: center;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }


    .finished {
        font-size: @body-font-size;
        font-weight: 500;
        letter-spacing: 0px;
        color: @transition-color;
        line-height: 136px;
        text-align: center;
    }



}
</style>