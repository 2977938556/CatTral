<template>
  <div class="cat">
    <RouterView></RouterView>
    <CatNavBar v-if="['/home', '/message', '/user'].includes($route.fullPath)" />
  </div>
</template>


<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { socket } from '@/utils/socket.js'

// window
let store = useStore()
let route = useRoute()
let router = useRouter()
// 这里是清空vuex中的持久化数据
// window.addEventListener("beforeunload", () => {
//   store.commit('home/DeleteGoodsitem', [])
// })


socket.on('welcome', (result) => {
  if (result) {
    store.commit('websocket/AddFriends', result)
  }
})


// const socket = io('http://192.168.137.1:8200'); // 根据实际地址和端口号进行修改

// // 这里一进入那么就发送有人进来了
// socket.emit('join', store.state.user.profile._id);

// socket.on('welcome', (name) => {
//   console.log(name);
// })



</script>




<style lang="less" >
.cat {
  // background: rgb(211, 211, 211);
  // min-height: 812px;
}

* {
  color: @heading-color;
  transition: all 0.5s ease-in-out;
}

body {
  font-family: "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  // background: @background-color;
}

.message-app {
  background: red;
  width: 100%;
  height: auto;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1000000000;
  display: flex;
  justify-content: center;
}
</style>