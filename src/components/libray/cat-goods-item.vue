<template>
    <div class="waterfall" v-if="goodsitem && goodsitem?._id != ''">
        <!-- 单个item内容 -->
        <div :class="{ 'recommende-count-item': true }" v-for="(item, index) in goodsitem" :key="item.id">
            <router-link :to='`/catdetail/${item.cat_id}`'>
                <!-- {{ item.cat_id }} -->
                <div class="item-img">
                    <img :src="item.imageUrl[0]" alt="">
                </div>
                <div class="item-text">
                    <div class="item-text-top">
                        <p>{{ item.title }}</p>
                    </div>
                    <div class="item-text-booton">
                        <span>{{ Processingregion(item.addrs) }}</span>
                        <span>{{ timeFormat(item.updated_at) }}</span>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>


<script>
import { timeFormat } from '@/utils/timeFilter.js'
import { Processingregion } from '@/utils/timeFilter.js'


export default {
    name: "CarGoodsItem",
    props: {
        goodsitem: {
            type: [Array, Object],
        }
    },
    setup(props) {
        // console.log(props.goodsitem);
        // console.log("01",props.goodsitem);
        return { timeFormat, Processingregion }
    }
}


</script>


<!-- bug 明天修复
    元素错位
    
    
 -->

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
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 30px;
    // background: red;


    .item-img {
        width: 162px;
        height: 200px;
        overflow: hidden;
        border-radius: 16px;

        img {
            object-fit: cover;
            width: 162px;
            height: 200px;
        }

    }

    .active {
        height: 160px !important;
    }

    .item-text {
        width: 162px;
        min-height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-wrap: nowrap;
        padding: 4px 0px 4px 0px;
        align-content: center;
        position: relative;

        .item-text-top {
            width: 156px;
            // height: 100%;
            margin: 0 auto;
            /** 文本1 */
            font-size: @heading3-font-size;
            font-weight: 500;
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
            height: 20px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;


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