<template>
    <div class="fh" @click="goBack">
        <!-- <img src="../../assets/image/cat-fanhui-icon.png" alt="返回"> -->
        返回
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
    name: "CatReturn",
    setup() {
        let router = useRouter()
        let goBack = () => {
            router.go(-1);
        }
        return { goBack }
    }
}
</script>


<style lang="less" scoped>
.fn {
    border: 1px solid red;

    img {
        object-fit: cover;
        width: 9px;
        height: 9px;
    }
}
</style>