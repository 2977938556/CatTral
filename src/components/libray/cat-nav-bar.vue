<template>
    <div class="footer">
        <div class="nav-item">
            <router-link to="/home">
                <img v-if="$route.fullPath == '/home'" src="../../assets/image/cat-home-active.png" alt="">
                <img v-else src="../../assets/image/cat-home-notselect.png" alt="">
            </router-link>
        </div>
        <div class="nav-item">
            <router-link to="/message">
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
export default {
    name: "CatNavBar",
    setup() {

    }



}
</script>


<style lang="less" scoped>
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
    justify-content: center;
}

.nav-item a {
    display: block;
    width: 34px;
    height: 34px;
    // border: 1px solid red;

    img {
        object-fit: cover;
        width: 34px;
        height: 34px;
        // border: 1px solid red;
    }

}
</style>