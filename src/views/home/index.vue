<template>
    <!-- 状态栏组件 -->
    <CartStatusBav :isstyle="true">
        <template #left>
            <p @click="showfalge = true">
                <img id="city" class="addrs-img" src="../../assets/image/cat-position.png" alt="">
                <span>地区</span>
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
        <div class="recommende-count" v-if="goodsitem && goodsitem.length || typeof goodsitem == 'number'">
            <CarGoodsItem :goodsitem="goodsitem"></CarGoodsItem>
        </div>
    </div>

    <!-- loding加载效果 -->
    <CatLoding :loding="true" />


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



    
</template>


<script>

import { GetHomePageBanner } from '@/api/home.js'
import MessageJs from '@/components/libray/CarMessage.js'

import { ref } from 'vue';

export default {
    setup() {
        // 获取轮播图的数据
        let items = ref([])
        GetHomePageBanner().then(value => {
            items.value = value.result
        })


        // 卡片数据集合
        let goodsitem = ref(10);


        // 控制选择地区组件的显示隐藏
        let showfalge = ref(false);



        // 保存地区的数据
        let cityAddrs = ref({})
        let GetcityAddrs = (value) => {
            cityAddrs.value = value
        }



        // 定义是否需要修改地区数据
        let CityVilive = ref(false);

        let cancels = () => {
            CityVilive.value = false
            cityAddrs.value = {}
            console.log("取消数据");
        }


        // 确定修改地区
        let confirms = () => {
            if (cityAddrs.value.isFlage && cityAddrs.value.isFlage == true) {
                //在这里 修改 vuex
                console.log(cityAddrs.value);
            } else {
                CityVilive.value = true
                MessageJs({ typeo: 'error', text: "请选择完整地址" })
            }
        }



        return { items, goodsitem, showfalge, GetcityAddrs, cityAddrs, cancels, confirms }
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


