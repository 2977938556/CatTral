<template>
    <div class="waterfall" v-if="goodsitem && goodsitem?._id != ''">
        <!-- 单个item内容 -->
        <div :class="{ 'recommende-count-item': true }" v-for="(item, index) in goodsitem" :key="item.id">
            <div class="select" v-if="edit">
                <input class="round-checkbox" type="checkbox"
                    @change="handleInputChange({ checked: $event.target.checked, id: item._id })">
            </div>
            <router-link :to='`/catdetail/${item._id}`'>
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
        },
        // 设置是否需要编辑
        edit: {
            type: Boolean,
            default: false
        }

    },
    setup(props, { emit }) {

        let handleInputChange = ({ checked, id }) => {
            // console.log(checked, id);
            emit('handleInputChange', { checked, id })
        }



        return { timeFormat, Processingregion, handleInputChange }
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


// 单项选中
.select {
    // width: 100%;
    // height: 100%;
    position: absolute;
    right: 10px;
    top: 10px;
    // background: red;

    .round-checkbox {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid @primary-color;
        outline: none;
        cursor: pointer;
    }

    .round-checkbox:checked {
        transition: none;
        background-color: @transition-color;
        box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.25);
    }
}

// 单个item区域
.recommende-count-item {
    left: 0;
    position: relative;
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