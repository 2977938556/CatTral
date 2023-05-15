<template>
    <div class="mjsd">
        <h1>猫迹商店</h1>
        <!-- <Add @changes="changes" :AddsCode="cityCode" /> -->
        <Add @changes="changes"  />
    </div>
</template>

<script>
export default {
    name: "CarMjsdPage",
    setup() {
        let cityCode = JSON.parse(localStorage.getItem('user-store'))?.home.cityAddrs.changeResult

        let changes = (value) => {
            console.log(value);
        }
        return { cityCode, changes }
    }

}
</script>

