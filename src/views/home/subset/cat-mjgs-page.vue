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

        // 定义需要返回多少数据
        let fromDat = computed(() => store.state.mjgs.CartConfig)


        // 初始化数据
        onMounted(() => {
            let regular = router.options.history.state.forward
            if (regular === null) {
                store.commit('mjgs/AddStoryList', [])
                store.commit('mjgs/SetMaxloding', true)
                store.commit('mjgs/SetCartConfig')
                store.commit('mjgs/AddStoryComment', [])
                store.commit('mjgs/SetFromDataDefault')

            }
        })

        let Maxloding = computed(() => store.state.mjgs.Maxloding)



        let loading = ref(false)// 控制是否在加载  false 代表可以加载
        let finished = ref(false)// 控制是还有数据 false代表还有数据


        // 获取数据请求
        let GetStoryDataFn = () => {
            if (Maxloding.value) {
                loading.value = true
                GetStoryData(fromDat.value).then(({ result }) => {
                    loading.value = false
                    if (result.data.length != 0) {
                        store.commit('mjgs/AddStoryList', result.data)
                        // 加载结束后将loding状态失效
                        loading.value = false
                        finished.value = false
                    } else if (result.data && result.data.length === 0) {
                        finished.value = true
                        loading.value = false
                        store.commit('mjgs/SetMaxloding', false)
                    }
                }).catch(err => {
                    finished.value = true
                    loading.value = false
                    CatPromptJS({ text: "获取数据失败", type: 'error' })
                })
            } else {
                finished.value = true
                loading.value = false
            }
        }
        // 获取加载到的数据
        let StoryList = computed(() => store.state.mjgs.StoryList)


        return { StoryList, loading, finished, GetStoryDataFn, Maxloding, fromDat }

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
