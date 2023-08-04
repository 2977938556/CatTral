<template>
    <div class="noapply">
        <div class="noapply-content">
            <div class="noapply-center">
                <CarGoodsItem :goodsitem="goods" />
            </div>
        </div>
    </div>
</template>

<script setup>
let props = defineProps({
    goods: {
        type: Array,
        default: [],
    }
})
</script>


<style lang="less" scoped>
.noapply {
    width: 100%;
    height: 100%;

    .noapply-content {
        width: 375px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        // border: 1px solid red;

        .noapply-center {
            width: 345px;
            height: 100%;
        }
    }
}
</style>