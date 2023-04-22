<template>
    <div class="waterfall">
        <!-- 单个item内容 -->
        <div :class="{ 'recommende-count-item': true }" v-for="(item, index) in goodsitem" :key="item.id">
            <div class="item-img">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRerelBBiyL8B9YtcIrH90tjszGIqzUy9569Q&usqp=CAU"
                    alt="">
            </div>
            <div class="item-text">
                <div class="item-text-top">
                    <p>{{ index }}有需要领奖猫猫的吗，个人因为工作的原因，不方便养猫了。。便养猫了。。便养猫了。。</p>
                </div>
                <div class="item-text-booton">
                    <span>赣州</span>
                    <span>2023.4.{{ index }}</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "CarGoodsItem",
    props: {
        goodsitem: {
            type: [Array, Number, String],
            default: 10,
        }
    },
}


</script>


<style scoped lang="less">
.waterfall {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 345px;
    margin: 0 auto;
}

// 单个item区域
.recommende-count-item {
    left: 0;
    box-sizing: border-box;
    width: 162px;
    height: 280px;
    overflow: hidden;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 30px;


    .item-img {
        width: 162px;
        height: 100%;
        overflow: hidden;

        img {
            object-fit: cover;
            height: 100%;
            width: 100%;
        }

    }

    .item-text {
        width: 162px;
        height: 63px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex-wrap: nowrap;
        align-content: center;

        .item-text-top {
            width: 156px;
            height: 36px;
            margin: 0 auto;
            /** 文本1 */
            font-size: @heading3-font-size;
            font-weight: 500;
            letter-spacing: 0px;
            color: @heading-color;
            vertical-align: top;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .item-text-booton {
            width: 156px;
            height: 16px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            // background: red;

            span {
                padding: 10px;
                font-size: @heading3-font-size;
                font-weight: 500;
                letter-spacing: 0px;
                color: @secondary-text-color;
                text-align: left;
                vertical-align: top;
            }


        }


    }
}

.recommende-count-item:nth-child(1) {
    margin-top: 20px;
}

.recommende-count-item:nth-child(2) {
    margin-top: 20px;
}





.long {
    height: 281px !important;
}

.default {
    height: 281px !important;
}
</style>