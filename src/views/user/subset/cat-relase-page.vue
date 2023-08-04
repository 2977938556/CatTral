<template>
    <div class="applyfor">
        <CartStatusBav :isstyle="false">
            <template #left>
                <CatReturn />
            </template>
            <template #center>
                <p class="tltes">申请通知</p>
            </template>
        </CartStatusBav>

        <div class="applyfor-content">
            <!-- 选择菜单 -->
            <div class="applyfor-nav">
                <!--  -->
                <div v-for="(item, index) in tabList" :key="item.name"
                    :class="['applyfor-nav', { active: components.name == item.name }]">
                    <h1 @click="change(index)">{{ item.name }}</h1>
                    <span></span>
                </div>
            </div>
            <!-- 显示的内容 -->
            <div class="applyfor-center" v-if="CatgoodsList">
                <keep-alive>
                    <component :is="components.com" :goods="CatgoodsList" />
                </keep-alive>
            </div>

            <!-- loding加载效果 -->
            <CatLoding :loading="loading" :finished="finished" />
        </div>

    </div>
</template>


<script setup>
import { markRaw, shallowRef, ref, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import CatPromptJS from '@/components/libray/CatPrompt.js'


// 获取数据
import { GetCatData } from '@/api/user.js'

// 组件领养和未领养
import YesApply from '../component/yesapply.vue'
import noapply from '../component/noapply.vue'


let store = useStore()
let loading = ref(false)
let finished = ref(false)

// 需要显示的组件列表
let tabList = reactive([
    { name: "未领养", com: markRaw(noapply), types: "noapply" },
    { name: "已领养", com: markRaw(YesApply), types: "yesapply" },
])

// 默认显示的组件
let components = shallowRef({
    com: markRaw(noapply),// 组件
    name: "未领养",// 名称
    types: "noapply"// 类型
})

// 切换组件
let change = (index) => {
    finished.value = false // 这里每次点击切换的时候需要不显示无数据状态
    CatgoodsList.value = [] // 清空掉上一次的数据

    components.value = {
        com: tabList[index].com,
        name: tabList[index].name,
        types: tabList[index].types
    }
}

// 获取数据
let CatgoodsList = ref([])

// 发起请求的参数
let fromOtion = reactive({
    customertype: 0,// 对内
    _id: store.state.user.profile._id,// 当前登录的用户id
    types: 'MyPublishing',// 获取为我的发布模块数据
    state: 'noapply',// 获取未领养的模块
})


function getCatData() {
    loading.value = true
    // 这里是设置状态
    // 这里是发送请求获取数据
    GetCatData(fromOtion).then(({ result }) => {
        CatgoodsList.value = result.data
        loading.value = false
        finished.value = true

    }).catch(Err => {
        loading.value = false
        finished.value = true
        MessageJs({ text: '获取数据失败', type: 'error', timeout: 1000 })
    })
}

getCatData()








watch(components, (newVal, olVal) => {
    if (newVal.name != olVal?.name) {
        fromOtion.state = newVal.types
        getCatData()
    }
})













</script>



<style lang="less" scoped>
.applyfor {
    width: 100%;
    // height: 1000%;
    // background: @background-color;


    .applyfor-content {
        width: 375px;

        .applyfor-nav {
            width: 100%;
            height: 44px;
            display: flex;
            align-items: center;

            .applyfor-nav {
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                background: @white-color;


                h1 {
                    font-size: @heading2-font-size;
                    color: @secondary-text-color;
                }
            }
        }

        // 选中的状态
        .active {
            position: relative;

            h1 {
                color: @heading-color !important;
                position: relative;
                font-weight: 900;

            }

            // h1::before {
            //     position: absolute;
            //     content: " 111";
            //     z-index: -1;
            //     display: block;
            //     width: 56px;
            //     height: 4px;
            //     background: red;
            //     // bottom: -5px;
            //     border-radius: 10px;
            // }

            span {
                display: block;
                width: 30px;
                height: 4px;
                display: block;
                width: 56px;
                height: 4px;
                background: @primary-color;
                border-radius: 10px;
                position: absolute;
                bottom: 6px;
            }
        }


        .applyfor-center {
            width: 100%;
            height: 100%;
            // background: red;
            // border: 1px solid red;
            // padding-top: 20px;

        }

    }
}
</style>
