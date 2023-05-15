<template>
    <div class="cat-banner">
        <div class="banner-box">
            <div class="item-banner" @touchend="open" @touchstart="stop" v-for="(item, index) in items" :key="item.id"
                :class="{ selectbanner: selectIndex == index }">
                <a href="javascript:;">
                    <img :src="item.imgUrl" :title="item.title">
                </a>
            </div>
            <div class="banner-item-checkout">
                <span @click="slelceBanner(index)" :class="{ active: selectIndex == index }"
                    v-for="(item, index) in items.length" :key="index"></span>
            </div>

        </div>
    </div>
</template>


<script >
import { ref, watch } from 'vue';
export default {
    name: "CatBannner",
    props: {
        // 轮播图数据
        items: {
            type: [Array],
            default: () => []
        },
        // 自动切换的时间
        rollingtime: {
            type: [Number, String],
            default: 3000
        },
        // 是否开启自动切换
        autoPlay: {
            type: Boolean,
            default: true,
        },

    },
    setup(props) {

        // 控制显示哪张图片
        let selectIndex = ref(0);

        // 接收定时器
        let time = null


        // 定时器函数 
        // 每次多少毫秒就自增1到了如果小于或者大于数据的长度就修改为0
        let autoPlayFn = () => {
            clearInterval(time)
            time = setInterval(() => {
                selectIndex.value = selectIndex.value + 1
                if (selectIndex.value >= props.items.length) {
                    selectIndex.value = 0
                }
            }, props.rollingtime)
        }


        // 监听是否有数据如果有数据和是否设置了自动机播放那么就调用自增函数
        watch(() => props.items, (neval) => {
            if (props.items.length && props.autoPlay) {
                autoPlayFn();
            }
        }, {
            // 这是立即执行
            immediate: true,
        })




        // 鼠标移入的时候暂停轮播
        let stop = () => {
            // 如果设置了自动播放那么就清除定时器
            if (props.autoPlay) {
                clearInterval(time)
            }
        }

        // 鼠标移出的时候开启
        let open = () => {
            if (props.autoPlay && props.items.length) {
                autoPlayFn()
            }
        }

        // 这个是点击指示器的时候跳转显示不同的页面
        let slelceBanner = (index) => {
            selectIndex.value = index
        }



        return { selectIndex, slelceBanner, stop, open }
    }
}
</script>

<style lang="less" scoped>
.cat-banner {
    width: 100%;
    height: 194px;
    // background: red;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;


    .selectbanner {
        opacity: 1 !important;
    }


    // 装
    .banner-box {
        width: 345px;
        height: 160px;
        border-radius: 20px;

        .item-banner {
            width: 345px;
            height: 160px;
            border-radius: 20px;
            background: rgb(0, 255, 242);
            position: absolute;
            transition: all 0.5s;
            opacity: 0;
            overflow: hidden;

            a {
                img {
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .item-banner:nth-child(1) {
            opacity: 1;
        }
    }

    .banner-item-checkout {
        width: auto;
        height: 8px;
        // background: red;
        position: absolute;
        top: 80%;
        left: 50%;
        transform: translate(-50%, -50%);
        // display: flex;
        justify-content: space-between;
        z-index: 100;

        span {
            display: block;
            width: 8px;
            height: 8px;
            opacity: 0.5;
            border-radius: 22px;
            background: rgba(255, 255, 255, 1);
            transition: all 0.5s;
            float: left;
            margin-left: 10px;
        }

        span:nth-child(1) {
            margin-left: 0px;
        }

        .active {
            width: 20px;
            height: 8px;
            opacity: 1;
            background: rgba(255, 255, 255, 1);
        }


    }



}
</style>



