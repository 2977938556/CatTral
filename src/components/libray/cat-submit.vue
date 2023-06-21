<template>
    <div class="submit">
        <div class="bottomm">
            <span @click="$emit('submit')">{{ title }}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: "CatSubmit",
    props: {
        title: {
            type: String,
            default: "提交"
        }
    }
}


</script>


<style scoped lang="less">
.submit {
    width: 100%;
    height: auto;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-top: 100px;

    .bottomm {
        width: auto;
        height: 36px;
        display: flex;
        justify-content: center;

    }

    span {
        display: block;
        width: 245px;
        height: 36px;
        border-radius: 217px;
        background: @primary-color;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px 50px 0px 50px;


        font-size: @heading1-font-size;
        font-weight: 700;
        letter-spacing: 0px;
        line-height: 23.17px;
        color: @white-color;
        text-align: center;
    }
}
</style>