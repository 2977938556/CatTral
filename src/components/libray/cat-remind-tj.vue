<template>
    <div :class="['Recen-good', { 'masall': small }]">
        <div class="recen-good-center">
            <img src="../../assets/image/cat-tj-icon.png" :alt="title">
            <span>
                <slot>{{ title }}</slot>
            </span>
        </div>
        <div class="recen-good-count">
            <p>{{ count }}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: "RecenGood",
    props: {
        title: {
            type: String,
            default: "推荐"
        },
        count: {
            type: String,
            default: ""
        },
        small: {
            type: Boolean,
            default: false
        }
    },
    setup() {


    }

}


</script>


<style lang="less" scoped>
.masall {
    width: 345px !important;
}

.Recen-good {
    width: 100%;
    height: 22px;
    display: flex;
    // justify-content: space-between;
    justify-content: space-between;

    margin: 0 auto;

    .recen-good-center {
        // width: 100%;
        height: 22px;
        // margin: 0 auto;

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

    .recen-good-count {
        // flex: 0.2;
        width: 200px;
        width: auto;
        line-height: 22px;
        font-size: @heading3-font-size;
        font-weight: 700;
        color: @secondary-text-color;

    }
}
</style>