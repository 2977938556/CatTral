<template>
    <div class="endof" :class="{ smia: smail == true }">
        <p v-if="loding">~正在加载内容~</p>
        <p v-else>~没有更多内容了哦~~</p>
    </div>
</template>


<script>
export default {
    name: "CatLoding",
    props: {
        loding: {
            type: Boolean,
        },
        smail: {
            type: Boolean,
            default: false
        }
    }

}


</script>



<style lang="less" scoped>
// 提示语
.smia{
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