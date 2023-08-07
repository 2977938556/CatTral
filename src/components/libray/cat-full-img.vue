<template>
    <div class="full-img-content">
        <div class="full-img-box" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
            <div class="full-mask"></div>
            <!-- <h1>{{ activeIndex }}</h1> -->
            <div class="full-img-list" @click="cancel">
                <img :class="{ active: activeIndex == index }" :src="item" alt="" v-for="(item, index) in openImg.data"
                    :key="index">
            </div>
            <!-- 指示器 -->
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    name: "CatFullImg",
    props: {
        openImg: {
            type: [Object, Array],
            default: []
        }
    },
    setup(props, { emit }) {
        // 被选中的
        let activeIndex = ref(props.openImg.index) || 0

        // 开始与结束的值
        let startX = ref(0)
        let endX = ref(0)


        // 监听刚刚开始触摸的时候手指坐标
        let handleTouchStart = (e) => {
            startX.value = e.touches[0].clientX
        }

        let distance = ref(0)

        // 监听用户触摸过程中最新的收集坐标
        let handleTouchMove = (e) => {
            endX.value = e.touches[0].clientX
            distance.value = endX.value - startX.value
        }



        let handleTouchEnd = (e) => {
            if (distance.value > 100) {
                // console.log('向右滑动');
                activeIndex.value--

                // 执行向后切换的操作
                if (activeIndex.value <= 0) {
                    // console.log("小于了");
                    activeIndex.value = props.openImg.data.length - 1
                }
            } else if (distance.value < -100) {
                // console.log('向左滑动');
                // 执行向前切换的操作
                activeIndex.value++
                if (activeIndex.value >= props.openImg.data.length) {
                    activeIndex.value = 0
                }

            }
            startX.value = 0;
            endX.value = 0;
        }


        let cancel = () => {
            emit('cancel')
        }

        return { activeIndex, handleTouchStart, handleTouchMove, handleTouchEnd, startX, endX, cancel }
    }

}
</script>


<style lang="less" scoped>
.full-img-content {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000000;
    display: flex;
    justify-content: center;
    align-items: center;

    .full-img-box {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10000000;
    }

    .full-mask {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .full-img-list {
        width: 100%;
        height: 100%;
        // background-color: rgba(219, 10, 10, 0.5);

        // margin: 200px auto;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 90%;
            display: block;
            object-fit: cover;
            position: absolute;
            opacity: 0;
            border-radius: 6px;

        }

        .active {
            transition: all 0.23s ease-in;
            // transform: translateX(0px);
            opacity: 1 !important;
            display: block;
            z-index: 10000;
            opacity: 1;
        }


    }

}
</style>


