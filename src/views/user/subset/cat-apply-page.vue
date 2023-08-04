<template>
    <div class="love">
        <!--  头部 -->
        <CartStatusBav :isstyle="false">
            <!-- 左边内容插槽 -->
            <template #left>
                <CatReturn></CatReturn>
            </template>
            <!-- 中间内容插槽 -->
            <template #center>
                我领养的
            </template>
        </CartStatusBav>

        <div class="love-content">
            <div class="love-center">
                <CarGoodsItem :goodsitem="CatgoodsList" />
            </div>
        </div>

        <!-- loding加载效果 -->
        <CatLoding :loading="loading" :finished="finished" />
    </div>
</template>


<script setup>
import { markRaw, shallowRef, ref, reactive, watch, computed } from 'vue';
import { useStore } from 'vuex';
import CatPromptJS from '@/components/libray/CatPrompt.js'
import { DeleteCatLove } from '@/api/user.js'




// 获取数据
import { GetCatData } from '@/api/user.js'


let store = useStore()
let loading = ref(false)
let finished = ref(false)



// 获取数据基础数据
let CatgoodsList = computed(() => store.state.user.catapply)



// 这个是指如果没有数据那么就发送一次请求
if (CatgoodsList.value.length) {
    finished.value = true
}







// 发起请求的参数
let fromOtion = reactive({
    customertype: 0,// 对内
    _id: store.state.user.profile._id,// 当前登录的用户id
    types: 'Myadoption',// 获取为我的发布模块数据
})


function getCatData() {
    loading.value = true
    finished.value = false
    // 这里是设置状态
    // 这里是发送请求获取数据
    GetCatData(fromOtion).then(({ result }) => {
        if (result.data) {
            store.commit('user/SetCatApply', result.data.map(item => item.cat_id))
            loading.value = false
            finished.value = true
        } else {
            store.commit('user/SetCatApply', [])
            loading.value = false
            finished.value = true
        }
    }).catch(Err => {
        loading.value = false
        finished.value = true
        MessageJs({ text: '获取数据失败', type: 'error', timeout: 1000 })
    })
}

// 这里如果没有数据那么就可以发送一次请求
if (CatgoodsList.value.length <= 0) {
    getCatData()
}



</script>


<style lang="less" scoped>

.love {
    width: 100%;
    height: 100%;

    .love-content {
        width: 375px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        // border: 1px solid red;

        .love-center {
            width: 345px;
            height: 100%;
        }
    }
}
</style>