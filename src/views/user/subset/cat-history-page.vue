<template>
    <div class="History">
        <!--  头部 -->
        <CartStatusBav :isstyle="false">
            <!-- 左边内容插槽 -->
            <template #left>
                <CatReturn></CatReturn>
            </template>
            <!-- 中间内容插槽 -->
            <template #center>
                历史记录
            </template>
            <template #right>
                <p class="remover-p" @click="clonehish">清空全部</p>
            </template>
        </CartStatusBav>

        <!-- 内容区域 -->
        <div class="history-content-box">
            <div class="history-center">
                <ul v-if="HistryList.length">
                    <!-- 单个元素 -->
                    <li v-for="item in HistryList" :key="item._id">
                        <div class="history-item">
                            <div class="history-img">
                                <img v-for="mitem in item.cat_id.imageUrl" :src="mitem" alt="图片">
                            </div>
                            <div class="history-text">
                                <div class="history-text-top">
                                    <p>{{ item.cat_id.title }}</p>
                                </div>
                                <div class="history-text-bottom">
                                    <p>{{ timeFormat(item.updated_at) }}</p>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- loding加载效果 -->
            <CatLoding :loading="loading" :finished="finished" @infinite="getCatData()" />

        </div>




    </div>
</template>


<script setup>
import { markRaw, shallowRef, ref, reactive, watch, computed } from 'vue';
import { useStore } from 'vuex';
import CatPromptJS from '@/components/libray/CatPrompt.js'
import { DeleteCatLove } from '@/api/user.js'
import { timeFormat } from '@/utils/timeFilter.js'



// 获取数据
import { GetCatData, DeleteHistory } from '@/api/user.js'


let store = useStore()
let loading = ref(false)
let finished = ref(false)




let HistryList = ref([])




// 发起请求的参数
let fromOtion = reactive({
    customertype: 0,// 对内
    _id: store.state.user.profile._id,// 当前登录的用户id
    types: 'MyHistory',// 获取为历史记录模块的数据
    option: {
        page: 1,
        pageSize: 10,
        store: -1
    }
})


function getCatData() {
    loading.value = true
    finished.value = false
    // 这里是设置状态
    // 这里是发送请求获取数据
    GetCatData(fromOtion).then(({ result }) => {

        console.log(result);

        let daya = result.data.filter(item => item.cat_id != null)

        console.log(daya);


        if (daya.length != 0) {
            loading.value = false
            finished.value = true
            HistryList.value.push(...daya)
            fromOtion.option.page++
        } else {
            console.log("进来了");
            loading.value = false
            finished.value = true
        }

    }).catch(({ response: { data } }) => {
        // CatPromptJS({ text: data?.message || "暂时没有历史记录哦", type: 'error' })
        loading.value = false
        finished.value = true
    })
}

// 这里如果没有数据那么就可以发送一次请求
// if (CatgoodsList.value.length <= 0) {
// getCatData()
// }




// 清空数据
let clonehish = () => {
    DeleteHistory({ _id: store.state.user.profile._id }).then(({ result }) => {
        if (result.data.length != 0) {
            HistryList.value = []
            loading.value = false
            finished.value = true
            CatPromptJS({ text: result.data?.message || "清空成功", type: 'success' })
        }
    }).catch(({ response: { data } }) => {
        CatPromptJS({ text: data?.message || "暂时没有历史记录哦", type: 'error' })
    })
}







</script>


<style lang="less" scoped>
.History {

    // 头部文字样式
    .remover-p {
        color: @primary-color;
        font-size: 12px;
        font-weight: 500;

        &:hover {
            font-weight: 900;
            color: @transition-color;
        }
    }


    .history-content-box {
        width: 100%;
        height: 100%;
        // min-height: 812px;
        background: @background-color;
        overflow: hidden;

        // 内容区域
        .history-center {
            width: 345px;
            height: 100%;
            margin: 20px auto;

            ul {
                display: flex;
                flex-direction: column;

                li {
                    width: 345px;
                    height: 74px;
                    background: @white-color;
                    margin-top: 10px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .history-item {
                        width: 329px;
                        height: 60px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        // 图片窗口
                        .history-img {
                            width: 64px;
                            height: 60px;
                            overflow: hidden;
                            border-radius: 10px;

                            img {
                                width: 64px;
                                height: 60px;
                                object-fit: cover;

                            }
                        }

                        // 文字窗口
                        .history-text {
                            width: 100%;
                            height: 60px;
                            display: flex;
                            align-items: center;
                            flex-direction: column;

                            .history-text-top {
                                width: 100%;
                                height: 40px;

                                p {
                                    font-size: @heading3-font-size;
                                    font-weight: 500;
                                    color: @body-color;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    padding-left: 10px;
                                }
                            }

                            .history-text-bottom {
                                width: 100%;
                                height: 20px;

                                p {
                                    line-height: 40px;
                                    font-size: @body-font-size;
                                    font-weight: 500;
                                    letter-spacing: 0px;
                                    line-height: 20px;
                                    text-align: right;
                                    color: @comment-color;
                                }
                            }

                        }
                    }
                }

                li:nth-child(1) {
                    margin-top: 0px;
                }
            }
        }
    }


}
</style>