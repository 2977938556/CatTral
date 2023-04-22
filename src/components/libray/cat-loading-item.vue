<template>
    <div class="loding" :style="`width:${width}px;height:${height}px;background:${bg};`" :class="{ shang: animate }">
        <span></span>
    </div>
</template>


<script>
export default {
    name: "CatLodingItem",
    props: {
        width: {
            type: [String, Number],
            default: 200,
        },
        height: {
            type: [String, Number],
            default: 160,
        },
        bg: {
            type: [String],
            default: "#e0e0e0",
        },
        animate: {
            type: Boolean,
            default: true,
        }
    }
}

</script>


<style lang="less" scoped>
.loding {
    background: #e0e0e0;
    position: relative;
    overflow: hidden;
    border-radius: 10px;
}

.shang {
    &::after {
        content: "";
        position: absolute;
        animation: shan 0.5s ease 0s infinite;
        top: 0;
        width: 50%;
        height: 100%;
        background: linear-gradient(to left,
                rgba(255, 255, 255, 0) 0,
                rgba(255, 255, 255, 0.3) 50%,
                rgba(255, 255, 255, 0) 100%);
        transform: skewX(-45deg);
    }
}

@keyframes shan {
    0% {
        left: -100%;
    }

    100% {
        left: 120%;
    }
}
</style>
