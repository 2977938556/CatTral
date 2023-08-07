<template>
    <!-- 选择地区组件 -->
    <CatOpenCity v-model:show="showfalge" @cancel="cancels" @confirm="confirms">
        <template #title>
            选择地区
        </template>
        <template #content>
            <span class='cat-postion'>
                <CatAddrs @changes="GetcityAddrs" :AddsCode="cityAddrs" />
            </span>
        </template>

    </CatOpenCity>



    <!-- 状态栏组件 -->
    <CartStatusBav :isstyle="true">
        <template #left>
            <p @click="showfalge = true">
                <img id="city" class="addrs-img" src="../../assets/image/cat-position.png" alt="">
                <!-- <span v-if="cityAddrs?.changeResult?.provinceName || cityAddrs == null">{{
                    cityAddrs?.changeResult?.provinceName }}</span>
                <span v-else>全国</span> -->

                <span v-if="cityAddrs?.changeResult?.provinceName || cityAddrs == null || cityAddrs == undefined">{{
                    cityAddrs?.changeResult?.provinceName || "全国" }}</span>
                <span v-else>全国</span>
            </p>
        </template>
        <template #center>
            <img class="logio-img" src="../../assets/image/cat-logo.png" alt="">
        </template>
        <template #right>
            <router-link to="/search">
                <img class="search-img" src="../../assets/image/cat-home-search.png" alt="">
            </router-link>
        </template>
    </CartStatusBav>

    <!-- 轮播图组件 -->
    <div class="banner">
        <CatBannner v-if="items && items.length" :items="items" />
        <CatLodingItem v-else :width="380" :height="170" />
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
                <router-link to="/home/lyph">
                    <img src="../../assets/image/cat-tab-lyph.png" alt="">
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
        <div class="recommende-count" v-if="goodsitem?.length != 0">
            <CarGoodsItem :goodsitem="goodsitem" />
        </div>
        <div class="recommende-count lodings" v-else-if="loading == true">
            <CatLodingItem v-for="item in 3" key="item" :width="179" :height="160" />
        </div>
    </div>

    <!-- loding加载效果 -->
    <CatLoding :loading="loading" :finished="finished" @infinite="getRecommend()" />
</template>


<script>

import { GetHomePageBanner, GetHomePageTuiJian } from '@/api/home.js'
import MessageJs from '@/components/libray/CarMessage.js'
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex'
import { socket } from '@/utils/socket.js'


export default {
    setup() {
        let store = useStore()

        socket.emit('join', store.state.user.profile._id || "");
        // // 获取数据
        // socket.on('welcome', (result) => {
        //     store.commit('websocket/AddFriends', result.friends)
        // })

        let loading = ref(false)// 控制是否在加载  false 代表可以加载
        let finished = ref(false)// 控制是还有数据 false代表还有数据

        let items = computed(() => store.state.home.HomeBanner)   // 获取轮播图的数据
        // 获取banner的数据
        GetHomePageBanner().then(value => {
            // 将数据添加进去
            store.commit('home/SetHomeBanner', value.result)
        })
        // 获取bar的响应性数据
        const CatRecommendBar = computed(() => store.state.home.CatRecommendBar)
        // 获取用户的数据
        const userData = store.state.user.profile || {}



        // 控制选择地区组件的显示隐藏
        let showfalge = ref(false);
        // 获取地区的响应性数据
        let cityAddrs = computed(() => store.state.home.cityAddrs)

        // 我的打算就是将值传递给一个变量
        let cityCityCopy = ref()

        // 这里是赋值       
        let GetcityAddrs = (value) => {
            cityCityCopy.value = value
        }
        // 地区关闭弹窗
        let cancels = () => {
            // 清空数据
            return store.commit('home/SetcityAddrs', cityAddrs?.value)
        }

        // 地区确认弹窗
        let confirms = () => {
            // 这个逻辑就是如果地区组件选择数据为合法的并且 当前的最后一个层级的数据必须要有
            if (cityCityCopy?.value?.isFlage == true && cityCityCopy?.value?.changeResult?.countyCode != "") {
                // 这里是判断用户的数据是否等于之前的数据如果等于之前的数据那么就不需要发送请求这样以节约服务器资源
                if (cityAddrs?.value?.changeResult?.countyName != cityCityCopy?.value?.changeResult?.countyName) {
                    store.commit('home/DeleteGoodsitem', [])

                    //在这里 修改 vuex
                    store.commit('home/SetcityAddrs', cityCityCopy.value)
                    MessageJs({ typeo: 'scuess', text: "修改地区成功", timeout: 1000 })

                    // 数据页数复原为1
                    CartConfig.page = 1;
                    // 加载效果复原为false
                    loading.value = false
                    // 发送请求获取数据
                    getRecommend(CartConfig)
                }
            } else {
                MessageJs({ typeo: 'error', text: "请选择完整地址", timeout: 1000 })
            }
        }

        // 需要传递的配置参数
        let CartConfig = reactive({
            page: 1,// 当前是第几页
            pageSize: Math.floor(Math.random() * 2) === 0 ? 3 : 5,//每一页需要返回的数据 
            cityAddrs,//地区数据默认为null=全国
            CatRecommendBar,// bar状态
            userData,
        })
        // 卡片数据集合
        let goodsitem = computed(() => store.state.home.goodsitem)
        // 请求推荐的数据请求
        let getRecommend = (config = CartConfig) => {
            // 一调用这个方法就需要显示出加载中
            loading.value = true
            // 发送请求携带参数
            GetHomePageTuiJian(config).then(({ result }) => {
                // 判断是否有数据
                // 这里是如果返回数据了那么就需要设置一下用户的数据状态和将数据转换里面
                if (result.data && result.data.length !== 0) {

                    // 将数据添加进去
                    store.commit('home/SetGoodsitem', result.data)

                    // 每次请求之后就将当前页添加1页
                    CartConfig.page++

                    // 加载结束后将loding状态失效
                    loading.value = false
                    finished.value = false
                } else if (result.data && result.data.length === 0) {
                    // 加载失败的话显示没有数据了就显示提示文本,关闭loding 
                    finished.value = true
                    loading.value = false
                }
                loading.value = false
            }).catch(err => {
                finished.value = false
                loading.value = false
                MessageJs({ text: "获取数据失败请重试", type: 'error' })
            })
        }
        // 监听bar状态栏
        watch(() => CatRecommendBar.value, (newVal, olVal) => {
            loading.value = true
            finished.value = false
            // 先清空数据
            store.commit('home/DeleteGoodsitem', [])
            // 变为1
            CartConfig.page = 1;

            if (newVal == "A") {
                getRecommend(CartConfig)
            } else if (newVal == "B") {
                getRecommend(CartConfig)
            } else if (newVal == "C") {
                getRecommend(CartConfig)
            }
        })


        // 删除掉猫迹故事的数据
        // let remoteMjhd = () => {
        //     store.commit('home/SetMjhdData', [])
        // }


        return { items, goodsitem, showfalge, GetcityAddrs, CartConfig, cityAddrs, getRecommend, cancels, confirms, CartConfig, loading, finished }
    }

};
</script>

<style lang="less" scoped>
.cat-postion {
    font-size: @heading3-font-size;
}

.lodings {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    // background: red;

    .loding {
        margin-top: 20px;
    }
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

.search-img {
    width: 26px;
    height: 26px;
}


// 内容区域
.recommendeCount {
    width: 375px;
    min-height: auto;

    // background: red;
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


