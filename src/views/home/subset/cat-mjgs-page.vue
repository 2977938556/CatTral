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
    <CatLoding :loading="loading" :finished="finished" @infinite="GetStoryDataFn()" />
</template>

<script>
import { GetStoryData } from '@/api/story.js'
import { reactive, ref, computed, onMounted } from 'vue'
import CatPromptJS from '@/components/libray/CatPrompt.js'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'


export default {
    name: "CatMjgsPage",
    setup() {
        let store = useStore()
        let route = useRoute()
        let router = useRouter()


        onMounted(() => {
            let regular = router.options.history.state.forward
            if (regular === null) {
                store.commit('mjgs/AddStoryList', [])
                store.commit('mjgs/SetMaxloding', true)
            }
        })


        let fromDat = reactive({
            page: 1,
            pageSize: 3,
        })

        let StoryList = computed(() => store.state.mjgs.StoryList)// 获取加载的数据

        let Maxloding = computed(() => store.state.mjgs.Maxloding)


        let loading = ref(false)// 控制是否在加载  false 代表可以加载
        let finished = ref(false)// 控制是还有数据 false代表还有数据

        // 获取数据请求
        let GetStoryDataFn = () => {
            if (Maxloding.value) {
                loading.value = true
                GetStoryData(fromDat).then(({ result }) => {
                    if (result.data.length != 0) {
                        fromDat.page++
                        loading.value = false
                        store.commit('mjgs/AddStoryList', result.data)
                        // CatPromptJS({ text: "获取数据成功", type: 'success' })
                    } else {
                        finished.value = true
                        loading.value = false
                        store.commit('mjgs/SetMaxloding', false)
                    }
                }).catch(err => {
                    finished.value = true
                    loading.value = false
                    CatPromptJS({ text: "获取数据失败", type: 'error' })
                })
            }
        }

        GetStoryDataFn()

        return { StoryList, loading, finished, GetStoryDataFn }

    }
}
</script>



<style lang="less" scoped>
.mjgz-box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    // background: @background-color ;

    .mjgz-center {
        width: 345px;
        height: 100%;
        // min-height: 400px;

    }

}
</style>
