<template>
    <div class="navss">
        <p>首页</p>
    </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
    name: "Home",
    setup() {
        let store = useStore();

    }
}
</script>