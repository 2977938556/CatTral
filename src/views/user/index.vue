<template>
    <div class="message">
        用户页面
    </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
    name: "User",
    setup() {
        let store = useStore();

    }
}
</script>