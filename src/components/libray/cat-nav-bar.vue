<template>
    <div class="footer">
        <div class="nav-item">
            <router-link to="/home">
                <img v-if="$route.fullPath == '/home' && scrollDistance < 1000" src="../../assets/image/cat-home-active.png"
                    alt="">
                <img v-else-if="$route.fullPath != '/home'" src="../../assets/image/cat-home-notselect.png" alt="">
                <img v-if="scrollDistance > 1000 && $route.fullPath == '/home'" class="fhdb" @click="scrollToTop()"
                    src="../../assets/image/home-fhdb-icon.png">
            </router-link>
        </div>
        <div class="nav-item b">
            <router-link to="/message">
                <span class="total" v-if="s > 1">{{ s || 0 }}</span>
                <img v-if="$route.fullPath == '/message'" src="../../assets/image/cat-message-active.png" alt="">
                <img v-else src="../../assets/image/cat-message-notselect.png" alt="">
            </router-link>
        </div>
        <div class="nav-item">
            <router-link to="/user">
                <img v-if="$route.fullPath == '/user'" src="../../assets/image/cat-user-active.png" alt="">
                <img v-else src="../../assets/image/cat-user-notselect.png" alt="">
            </router-link>
        </div>

    </div>
</template>


<script >
import { useStore } from 'vuex'
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { socket } from '@/utils/socket.js'
import { scrollToTop } from '@/utils/animact.js'

export default {
    name: "CatNavBar",
    setup() {
        // 这里是获取用户的私信\

        let store = useStore()

        let s = ref(0)


        socket.on('welcome', (result) => {
            if (result) {
                s.value = result.reduce((a, b) => {
                    return a + b.unread.length
                }, 0)
            }
        })


        const handleScroll = () => {
            // 处理滚动事件的逻辑
            scrollDistance.value = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
        };


        // 滚动的距离
        let scrollDistance = ref(0)

        onMounted(() => {
            window.addEventListener('scroll', handleScroll);
        });

        // 注销监听
        onBeforeUnmount(() => {
            window.removeEventListener('scroll', handleScroll);
        });



        return { s, scrollDistance, scrollToTop }

    }



}
</script>


<style lang="less" scoped>
.fhdb {
    display: block;
    width: 300px !important;
    height: 100px !important;
    object-fit: cover !important;
    // border: 1px solid red;
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: @white-color;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: @default-showdow;

}

.nav-item {
    flex-grow: 1;
    text-align: center;
    font-size: 14px;
    color: #666;
    flex: 1;
    display: flex;
    align-items: center;
    // border: 1px solid blue;
    height: 100%;
    justify-content: center;
}

.nav-item a {
    display: block;
    width: 34px;
    height: 34px;
    // border: 1px solid red;

    img {
        object-fit: cover;
        // width: 34px;
        // height: 34px;
        // border: 1px solid red;
    }

}


.b {
    position: relative;
}

.total {
    position: absolute;
    padding: 6px;
    background: @primary-color;
    right: 30px;
    top: -10px;
    border-radius: 200px;
    color: @white-color;
    border: 2px solid @white-color;

}
</style>