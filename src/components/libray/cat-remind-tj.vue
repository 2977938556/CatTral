<template>
    <div class="Recen-good">
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
        }
    },
    setup() {


    }

}


</script>


<style lang="less" scoped>
.Recen-good {
    width: 100%;
    height: 22px;
    display: flex;
    justify-content: space-between;

    .recen-good-center {
        width: auto;
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
        font-size: @heading3-font-size;
        font-weight: 700;
        color: @secondary-text-color;
        padding-left: 4px;
    }
}
</style>