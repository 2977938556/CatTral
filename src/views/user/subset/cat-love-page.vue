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
                我的收藏
            </template>
            <template #right>
                <div class="select">
                    <p v-if="edit" @click="DeleteFn" class="edit">删除({{ Getselect.length || 0 }})</p>
                    <p @click="editFun(edit ? '取消' : '编辑')" class="edit">{{ edit ? '取消' : '编辑' }}</p>
                </div>
            </template>
        </CartStatusBav>

        <div class="love-content">
            <div class="love-center">
                <CarGoodsItem :goodsitem="CatgoodsList" :edit="edit" @handleInputChange="handleInputChangeHandler" />
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
let CatgoodsList = computed(() => store.state.user.catLove)


// 获取选中的数据
let Getselect = computed(() => {
    return store.state.user.catLove.filter(item => item.select == true)
})




// 这个是指如果没有数据那么就发送一次请求
if (CatgoodsList.value.length) {
    finished.value = true
}







// 发起请求的参数
let fromOtion = reactive({
    customertype: 0,// 对内
    _id: store.state.user.profile._id,// 当前登录的用户id
    types: 'MyCollection',// 获取为我的发布模块数据
    state: 'noapply',// 获取未领养的模块
})



function getCatData() {
    loading.value = true
    finished.value = false
    // 这里是设置状态
    // 这里是发送请求获取数据
    GetCatData(fromOtion).then(({ result }) => {
        if (result.data) {
            store.commit('user/SetCatLove', result.data?.bookmarks.map(item => item.cat_id))
            loading.value = false
            finished.value = true
        } else {
            store.commit('user/SetCatLove', [])
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





// 选中与没有选中的显示
let edit = ref(false)


// 选择事件
let editFun = (value) => {
    if (value == "取消") {
        store.commit('user/SetCatLove', CatgoodsList.value)
        console.log("重置成功");
    }
    // 这里是开启和关闭
    edit.value = !edit.value
}



// 选择事件
let handleInputChangeHandler = ({ checked, id }) => {
    store.commit('user/SetCatLoveSelect', { checked, id })
}

// 删除事件
let DeleteFn = async () => {
    try {
        // 这里判断是否有选择帖子
        if (Getselect.value.length == 0) {
            return CatPromptJS({ text: "没有选择藏帖子", type: 'error', timeout: 1000 })
        }

        // 这里是由选择的情况那么就发送请求
        // 获取所有id然后删除
        let { result } = await DeleteCatLove({ _id: store.state.user.profile._id, deleteCatId: Getselect.value.map((item) => item._id) })
        store.commit('user/SetCatLove', result.data?.map(item => item.cat_id) || [])


        CatPromptJS({ text: `删除成功${result.data.length}`, type: 'error', timeout: 1000 })

        // 关闭开关
        edit.value = !edit.value

    } catch (Err) {
        return CatPromptJS({ text: "删除失败", type: 'error', timeout: 1000 })
    }













}







</script>



<style lang="less" scoped>
.select {
    width: 80px;
    display: flex;
    justify-content: space-between;
    justify-content: flex-end;

    // 编辑
    .edit {
        font-size: @heading3-font-size;
        font-weight: 500;
        letter-spacing: 0px;
        color: @primary-color;
        padding: 2px;
    }
}




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