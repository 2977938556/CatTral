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
</style>