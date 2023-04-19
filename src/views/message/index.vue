<template>
    <div class="message">
        消息页面
    </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
    name: "Message",
    setup() {
        let store = useStore();

    }
}
</script>