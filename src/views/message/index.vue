<template>
    <div class="waterfall">
        <div v-for="(item, index) in items" :key="index" class="waterfall-item" :style="{ height: item.height + 'px' }">
            {{ item.text }}
        </div>
    </div>

    <div class="nbs">
        和
    </div>
</template>
<script>
import { ref, onMounted } from 'vue';
export default {
    name: 'Waterfall',
    setup() {
        const items = ref([
            { text: '1', height: 100 },
            { text: '2', height: 150 },
            { text: '3', height: 200 },
            { text: '4', height: 250 },
            { text: '5', height: 300 },
            { text: '6', height: 350 },
            { text: '7', height: 400 },
            { text: '8', height: 450 },
            { text: '9', height: 500 },
            { text: '10', height: 550 },
            { text: '11', height: 600 },
            { text: '12', height: 650 },
            { text: '12', height: 650 },
            { text: '12', height: 650 },
            { text: '12', height: 650 },
            { text: '12', height: 650 },
            { text: '12', height: 650 },
        ]);
        onMounted(() => {
            const waterfall = document.querySelector('.waterfall');
            const items = document.querySelectorAll('.waterfall-item');
            const itemWidth = items[0].offsetWidth;
            const gap = 20;
            const columnCount = 2;
            const columnHeights = [0, 0];
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
                const x = (itemWidth + gap) * shortestColumnIndex;
                const y = columnHeights[shortestColumnIndex];
                item.style.transform = `translate(${x}px, ${y}px)`;
                columnHeights[shortestColumnIndex] += item.offsetHeight + gap;
            }
            const maxHeight = Math.max(...columnHeights);
            console.log(maxHeight);
            waterfall.style.height = maxHeight + 'px';
        });
        return {
            items,
        };
    },
};
</script>
<style scoped>
.waterfall {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 345px;
    margin: 0 auto;
    background-color: rgb(255, 82, 82);

}

.waterfall-item {
    position: absolute;
    left: 0;
    width: 162px;
    background-color: #eee;
    padding: 10px;
    box-sizing: border-box;
    height: 120px;
    /* margin-top: 30px; */
}

.nbs {
    width: 345px;
    height: 300px;
    background-color: rgb(236, 153, 153);
}
</style>