<template>
  <div class="cat">
    <RouterView></RouterView>
    <CatNavBar v-if="['/home', '/message', '/user'].includes($route.fullPath)" />
  </div>
</template>


<script>
import { useRoute } from 'vue-router'
export default {

}


</script>




<style lang="less" >
.cat {
  // background: rgb(211, 211, 211);
  // min-height: 812px;
}

* {
  color: @heading-color;

}

body {
  font-family: "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.message-app {
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