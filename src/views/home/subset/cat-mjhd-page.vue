<!-- <template>
    <div class="mjhd">
        <h1>猫迹活动</h1>
    </div>
</template>

<script>
export default {
    name: "CatMjhdPage"
}
</script>
 -->


<template>
    <div>
        <input type="file" @change="onFileChange" multiple accept="image/*">
        <div v-if="imageList.length > 0">
            <p>上传的图片：</p>
            <div v-for="(url, index) in imageList" :key="index">
                <img :src="url" width="100">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            imageList: [],
            maxSize: 1024 * 1024 * 1 // 2M
        }
    },
    methods: {
        onFileChange(event) {
            const fileList = event.target.files;
            if (fileList.length === 0) {
                return;
            }
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                if (!file.type.startsWith('image/')) {
                    alert('请选择图片文件');
                    continue;
                }
                if (file.size > this.maxSize) {
                    alert('图片大小不能超过2M');
                    continue;
                }
                const reader = new FileReader();
                reader.onload = () => {
                    console.log(reader.result);
                    this.imageList.push(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
    },
    watch: {
        imageList: function () {
            // 生成baseurl并提交给服务器
            const baseUrls = this.imageList.map((url) => {
                const base64Index = url.indexOf(';base64,');
                const base64 = url.substr(base64Index + 8);
                const type = url.substr(5, base64Index - 5);
                return `data:${type};base64,${base64}`;
            });
            console.log(baseUrls);
        }
    }
}
</script>
