<template>
    <div class="fh" @click="goBack">
        <img class="fanhui" src="../../assets/image/cat-fanhui-active-icon.png" alt="返回">
        <slot></slot>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
    name: "CatReturn",
    props: {
        http: {
            type: String,
            default: ""
        }
    },
    setup(props) {
        // 这个是返回上一个页
        let router = useRouter()

        let goBack = () => {
            if (props.http == "") {
                router.go(-1);
            } else {
                console.log("进来1");
                console.log(props.http);
                router.push(props.http);
            }
        }
        return { goBack }
    }
}
</script>


<style lang="less" scoped>
.fanhui {
    width: 10px;
    height: 19px;
    // background: red;

    img {
        width: 100%;
        object-fit: cover;
    }

}
</style>