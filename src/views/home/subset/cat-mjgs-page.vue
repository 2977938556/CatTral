<template>
    <!-- 头状态栏 -->
    <CartStatusBav :isstyle="false">
        <!-- 左边内容插槽 -->
        <template #left>
            <!-- 返回 -->
            <CatReturn></CatReturn>
        </template>
        <!-- 中间内容插槽 -->
        <template #center>
            <p>猫迹故事</p>
        </template>

        <template #right>
            <router-link to="/home/mjgs/storyfrom">
                我要发布
            </router-link>
        </template>
    </CartStatusBav>

    <!-- 用户的故事 -->
    <div class="mjgz-box" v-if="StoryList">
        <div class="mjgz-center">
            <CatMjgsItem :data="StoryList" />
        </div>
    </div>


    <!-- // loding加载效果 -->
    <!-- loding加载效果 -->
    <CatLoding :loading="loading" :finished="finished" @infinite="getRecommend()" />
</template>

<script>
import { GetStoryData } from '@/api/story.js'
import { reactive, ref, computed } from 'vue'
import CatPromptJS from '@/components/libray/CatPrompt.js'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'


export default {
    name: "CatMjgsPage",
    setup() {
        let store = useStore()
        let route = useRoute()


        let fromDat = reactive({
            page: 1,
            pageSize: 3,
        })

        let StoryList = computed(() => store.state.mjgs.StoryList)


        let loading = ref(false);
        let finished = ref(false)


        let GetStoryDataFn = () => {
            loading.value = true
            GetStoryData(fromDat).then(({ result }) => {
                if (result.data.length != 0) {
                    fromDat.page++
                    loading.value = false
                    store.commit('mjgs/AddStoryList', result.data)
                    CatPromptJS({ text: "获取数据成功", type: 'success' })
                } else {
                    finished.value = true
                    loading.value = false
                }

            }).catch(err => {
                CatPromptJS({ text: "获取数据失败", type: 'error' })
            })
        }

        GetStoryDataFn()



        let getRecommend = () => {
            GetStoryDataFn()
        }





        return { StoryList, getRecommend, loading, finished }

    }
}
</script>



<style lang="less" scoped>
.mjgz-box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background: @background-color ;

    .mjgz-center {
        width: 345px;
        height: 100%;
        min-height: 400px;






    }

}
</style>
