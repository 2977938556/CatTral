<template>
    <div class="Recen-good">
        <div class="recen-good-center">
            <img src="../../assets/image/cat-tj-icon.png" alt="推荐">
            <span>
                <slot>推荐</slot>
            </span>
        </div>
    </div>
</template>
<script>
export default {
    name: "RecenGood",
    setup() {

    }

}


</script>


<style lang="less" scoped>
.Recen-good {
    width: 100%;
    height: 22px;

    .recen-good-center {
        width: 345px;
        height: 22px;
        margin: 0 auto;

        img {
            width: 14px;
            height: 13px;
            object-fit: cover;
        }

        span {
            font-size: @heading3-font-size;
            font-weight: 700;
            color: @heading-color;
            padding-left: 4px;
        }

    }
}</style>