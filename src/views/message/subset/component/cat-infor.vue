<template>
    <div class="catInfor">
        <div class="catInfor-content">
            <div class="catInfor-center">
                <router-link :to="`/catdetail/${cat._id}`">
                    <div class="left">
                        <div :class="[{ label: cat.to_examine === 'pass' }, { labelB: cat.to_examine == 'ok' }]">
                            {{ cat.to_examine == 'pass' ? '领养中' : '已领养' }}
                        </div>
                        <span>
                            <img :src="cat.imageUrl[0]" alt="猫图片">
                        </span>
                    </div>
                    <div class="right">
                        <p>{{ cat.title }}</p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
let props = defineProps({
    cat: {
        type: Object,
        default: {},
    }


})




</script>




<style lang="less" scoped>
.label {
    width: auto;
    background: #ff7b00a5;
    padding: 2px 4px 2px 4px;
    position: absolute;
    font-size: 12px;
    color: @white-color;
    right: 0px;
    border-radius: 0px 6px 0px 10px;
}


.labelB {
    width: auto;
    background: #7cde26bc;
    padding: 2px 4px 2px 4px;
    position: absolute;
    font-size: 12px;
    color: @white-color;
    right: 0px;
    border-radius: 0px 6px 0px 10px;
}

.catInfor {
    width: 100%;
    height: 100%;

    .catInfor-content {
        width: 345px;
        height: 86px;
        display: flex;
        align-items: center;
        justify-content: center;

        .catInfor-center {
            width: 325px;
            height: 66px;

            a {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .left {
                    position: relative;

                    span {
                        display: block;
                        overflow: hidden;
                        width: 104px;
                        height: 66px;
                        border-radius: 6px;


                        img {
                            width: 104px;
                            height: 66px;
                            object-fit: cover;
                        }
                    }
                }

                .right {
                    p {
                        width: 210px;
                        height: 66px;
                        font-size: 12px;
                        font-weight: 500;
                        letter-spacing: 0px;
                        line-height: 17.38px;
                        color: @heading-color;
                        text-align: left;
                        display: -webkit-box;
                        /* 将元素设置为块级上下文 */
                        -webkit-line-clamp: 4;
                        /* 控制显示的行数 */
                        -webkit-box-orient: vertical;
                        /* 设置元素内容垂直排列 */
                        overflow: hidden;
                        /* 溢出的部分隐藏 */
                        text-overflow: ellipsis;
                        /* 溢出的部分显示省略号 */
                    }
                }
            }
        }

    }

}
</style>

<script setup>

</script>


