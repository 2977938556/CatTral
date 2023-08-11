<template>
    <img :src="imageSrc" @error="handleError" @click="handleClick" />
</template>
  
<script setup>
import { ref } from 'vue'

const props = defineProps({
    imageSrc: { type: String },
    fallback: { type: String, default: "http://ryhi4ojn4.hn-bkt.clouddn.com/img-error.png" },
    item: { type: [Object, Array], default: [] },
})
const emit = defineEmits(['opneMax'])


const imageSrc = ref(props.imageSrc)


const handleError = () => {
    if (props.fallback) {
        imageSrc.value = props.fallback
    }
}


const handleClick = () => {

    if (props.item[0]?.length > 10) {
        // 触发自定义事件
        emit('opneMax', { target: JSON.parse(JSON.stringify(props.imageSrc)), data: JSON.parse(JSON.stringify(props.item)) })
    }


}
</script>


<style scoped>
img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>


