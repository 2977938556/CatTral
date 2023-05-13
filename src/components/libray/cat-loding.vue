<template>
    <div class="endof" :class="{ smia: smail == true }" ref="container">
        <p v-if="loading">~正在加载内容~</p>
        <p v-if="finished">~没有更多内容了哦~~</p>
    </div>
</template>


<script>

import { ref } from 'vue'
// import { useIntersectionObserver } from '@vueuse/core';

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
    setup() {
        let container = ref(null)
        // useIntersectionObserver(container, ([{ isIntersecting }], dom) => {
        //     console.log("进入可视区域了");
        // })

        

     




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
    min-height: 136px;
    // border: 1px solid red;
    padding-bottom: 49px;

    p {
        font-size: @body-font-size;
        font-weight: 500;
        letter-spacing: 0px;
        color: @transition-color;
        line-height: 136px;
        text-align: center;
    }

}
</style>