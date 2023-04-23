<template>
    <div id="wrapper">
        <div id="refresh-container" :class="{ 'refresh-active': isRefreshing }">
            <div id="refresh-text">{{ refreshText }}</div>
        </div>
        <div id="message-container" ref="messageContainer">
            <div v-for="(item, index) in messageList" :key="index" class="message-item">
                {{ item }}
            </div>
        </div>
    </div>
</template>
<script>
import { ref, onMounted } from 'vue';
export default {
    setup() {
        const messageContainer = ref(null); // 消息容器
        const messageList = ref([]); // 消息列表
        const startY = ref(0); // 手指触摸的起始位置
        const endY = ref(0); // 手指触摸的结束位置
        const moveY = ref(0); // 手指触摸的移动距离
        const isMoving = ref(false); // 是否正在移动
        const isRefreshing = ref(false); // 是否正在刷新
        const refreshText = ref('下拉刷新'); // 刷新提示文字
        // 监听触摸事件
        function onTouchStart(event) {
            isMoving.value = true;
            startY.value = event.touches[0].clientY;
        }
        function onTouchMove(event) {
            if (!isMoving.value) return;
            endY.value = event.touches[0].clientY;
            moveY.value = endY.value - startY.value;
            // 如果下拉距离超过一定值，则显示“松开刷新”提示
            if (moveY.value > 50) {
                refreshText.value = '松开刷新';
                messageContainer.value.style.transform = `translateY(${moveY.value - 50}px)`;
            }
        }
        function onTouchEnd(event) {
            if (!isMoving.value) return;
            isMoving.value = false;
            // 如果下拉距离超过一定值，则触发刷新事件，并重新加载数据
            if (moveY.value > 50) {
                isRefreshing.value = true;
                refreshText.value = '正在刷新...';
                messageContainer.value.style.transform = 'translateY(0)';
                loadData();
            } else {
                messageContainer.value.style.transform = 'translateY(0)';
            }
        }
        // 加载数据的函数
        function loadData() {
            // 模拟请求新数据的过程
            setTimeout(() => {
                const newMessageList = [];
                for (let i = 0; i < 20; i++) {
                    newMessageList.push(`新消息 ${i}`);
                }
                messageList.value = newMessageList;
                isRefreshing.value = false;
                refreshText.value = '下拉刷新';
            }, 1000);
        }
        // 注册触摸事件
        onMounted(() => {
            const wrapper = document.getElementById('wrapper');
            wrapper.addEventListener('touchstart', onTouchStart);
            wrapper.addEventListener('touchmove', onTouchMove);
            wrapper.addEventListener('touchend', onTouchEnd);
        });
        return {
            messageContainer,
            messageList,
            isRefreshing,
            refreshText,
        };
    },
};
</script>

<style scoped>
#wrapper {
    height: 812px;
    overflow-y: scroll;
}

.message-item {
    padding: 10px;
    border-bottom: 1px solid #ccc;
}

#refresh-container {
    height: 0px;
    background-color: #f5f5f5;
    position: relative;
}

#refresh-container.refresh-active #refresh-text:before {
    content: '\2193';
    margin-right: 10px;
    -webkit-animation: rotate 5s linear infinite;
    animation: rotate 5s linear infinite;
}

@-webkit-keyframes rotate {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes rotate {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>