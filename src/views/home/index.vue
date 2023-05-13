<template>
    <!-- 选择地区组件 -->
    <CatOpenCity v-model:show="showfalge" @cancel="cancels" @confirm="confirms">
        <template #title>
            选择地区
        </template>
        <template #content>
            <span class='cat-postion'>
                <CatAddrs @changes="GetcityAddrs" />
            </span>
        </template>
    </CatOpenCity>



    <!-- 状态栏组件 -->
    <CartStatusBav :isstyle="true">
        <template #left>
            <p @click="showfalge = true">
                <img id="city" class="addrs-img" src="../../assets/image/cat-position.png" alt="">
                <span v-if="cityAddrs">{{ cityAddrs.changeResult.countyName }}</span>
                <span v-else>全国</span>
            </p>
        </template>
        <template #center>
            <img class="logio-img" src="../../assets/image/cat-logo.png" alt="">
        </template>
    </CartStatusBav>


    <!-- 轮播图组件 -->
    <div class="banner">
        <CatBannner v-if="items && items.length" :items="items" />
        <CatLodingItem v-else :width="345" :height="146" />
    </div>

    <!-- 按钮组件 -->
    <div class="tab-nav">
        <div class="tab-nav-four">
            <div class="tab-nav-four-item">
                <router-link to="/home/mjgs">
                    <img src="../../assets/image/cat-tab-mjgs.png" alt="">
                </router-link>
            </div>
            <div class="tab-nav-four-item">
                <router-link to="/home/mjsd">
                    <img src="../../assets/image/cat-tab-mjsd.png" alt="">
                </router-link>
            </div>
            <div class="tab-nav-four-item">
                <router-link to="/home/mjzn">
                    <img src="../../assets/image/cat-tab-mjzn.png" alt="">
                </router-link>
            </div>
            <div class="tab-nav-four-item">
                <router-link to="/home/mjhd">
                    <img src="../../assets/image/cat-tab-mjhd.png" alt="">
                </router-link>
            </div>
        </div>
    </div>


    <!-- 推荐bar -->
    <div class="Reconed">
        <!-- 这个是固定的推荐bar -->
        <CatRecommendBarSkice />
        <!-- 不滚动的时候显示这个 -->
        <CatRecommendBar />
    </div>


    <!-- 内容区域 -->
    <div class="recommendeCount">
        <!-- 循环渲染 内容组件 -->
        <div class="recommende-count" v-if="goodsitem && goodsitem.length != 0">
            <CarGoodsItem :goodsitem="goodsitem" />
        </div>
    </div>

    <!-- loding加载效果 -->
    <CatLoding :loding="loding" />
</template>


<script>

import { GetHomePageBanner, GetHomePageTuiJian } from '@/api/home.js'
import MessageJs from '@/components/libray/CarMessage.js'
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex'

export default {
    setup() {
        let store = useStore()

        let goodsitem = ref([]);// 卡片数据集合

        let loding = ref(false);



        // 获取bar的响应性数据
        const CatRecommendBar = computed(() => store.state.home.CatRecommendBar)
        // 获取用户的数据
        const userData = store.state.user.profile || {}


        // 控制选择地区组件的显示隐藏
        let showfalge = ref(false);
        // 获取地区的响应性数据
        let cityAddrs = computed(() => store.state.home.cityAddrs)

        let cityFlage = ref(false)

        // 地区组件的如果有数据那么就传值给vuex
        let GetcityAddrs = (value) => {
            if (value.isFlage == true) {
                return store.commit('home/SetcityAddrs', value)
            }
        }
        // 关闭弹窗
        let cancels = () => {
            // 清空数据
            cityFlage.value = false;
            return store.commit('home/SetcityAddrs', null)
        }
        // 确认弹窗
        let confirms = () => {
            if (cityAddrs.value?.isFlage && cityAddrs.value?.isFlage == true) {
                //在这里 修改 vuex
                cityFlage.value = true;
                MessageJs({ typeo: 'scuess', text: "修改地区成功", timeout: 1000 })
                let time = setTimeout(() => {
                    cityFlage.value = false;
                    clearTimeout(time)
                }, 4)

            } else {
                cityFlage.value = false;
                MessageJs({ typeo: 'error', text: "请选择完整地址", timeout: 1000 })
            }
        }


        let items = ref([])    // 获取轮播图的数据
        // 获取banner的数据
        GetHomePageBanner().then(value => {
            items.value = value.result
        })

        // 需要传递的配置参数
        let CartConfig = reactive({
            page: 1,// 当前是第几页
            pageSize: 10,//每一页需要返回的数据 
            cityAddrs,//地区数据默认为null=全国
            CatRecommendBar,// bar状态
            userData,
        })

        // 获取推荐的数据
        let getRecommend = (config) => {
            GetHomePageTuiJian(config).then(({ result }) => {
                // 将数据添加进去
                goodsitem.value.push(...result.data)
            }).catch(err => {
                MessageJs({ text: "获取数据失败请重试", type: 'error' })
            })
        }

        //进入页面就发请求
        onMounted(() => {
            getRecommend(CartConfig)
        })


        // 监听地区是否被修改了
        watch(cityFlage, (newVal, olVal) => {
            if (cityFlage.value == true) {
                // console.log("可以发送数据");
                goodsitem.value = []
                getRecommend(CartConfig)
            }
        })



        // 监听bar状态栏
        watch(() => CatRecommendBar.value, (newVal, olVal) => {
            if (newVal == "A") {
                goodsitem.value = []
                getRecommend(CartConfig)
            } else if (newVal == "B") {
                goodsitem.value = []
                getRecommend(CartConfig)
            } else if (newVal == "C") {
                goodsitem.value = []
                getRecommend(CartConfig)
            }
        })








        return { items, goodsitem, showfalge, GetcityAddrs, cityAddrs, cancels, confirms, CartConfig, cityFlage,loding }
    }

};
</script>

<style lang="less" scoped>
.cat-postion {
    font-size: @heading3-font-size;
}

.header {
    height: 60px;
    // line-height: 60px;
    text-align: center;
    background-color: #eee;
}


//  banenr 轮播图
.banner {
    height: 194px;
    display: flex;
    align-items: center;
    justify-content: center;
}


// sattus nav 状态栏区图片

.addrs-img {
    width: 13px;
    height: 16px;
}

.logio-img {
    width: 58px;
    height: 26px;
}


// 内容区域
.recommendeCount {
    width: 375px;

    .recommende-count {
        width: 345px;
        margin: 0 auto;

    }


}




// 四个按钮 按钮组件
.tab-nav {
    width: 100%;
    height: 97px;
    // border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;

    .tab-nav-four {
        width: 345px;
        height: 97px;
        // border: 1px solid red;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .tab-nav-four-item {
            width: 71px;
            height: 100%;
            transition: all 0.5s;


            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            &:hover {
                transform: scale(0.9);
            }
        }
    }


}
</style>


