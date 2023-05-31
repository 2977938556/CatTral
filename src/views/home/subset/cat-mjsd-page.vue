<!-- <template>
    <div class="mjsd">
        <h1>猫迹商店</h1>
    </div>
</template>

<script>
export default {
    name: "CarMjsdPage",
    setup() {

    }

}
</script> -->



<template>
    <div class="mjsd">
        <input type="file" ref="files">
        <button @click="upload">上传</button>
    </div>
</template>

<script>
import { ref } from 'vue'
import { PushUerImg } from '@/api/upload.js'
export default {
    name: "CarMjsdPage",
    setup() {
        let files = ref(null)

        let upload = () => {
            let filsa = files.value.files[0]
            if (!files.value.files.length) {
                alert("请选择图片")
            } else {
                const formData = new FormData();
                formData.append('file', filsa);
                // 发送请求获取数据
                // PushUerImg(formData).then(value=>{
                //     console.log(value);
                // })


                fetch('http://172.16.79.14:3000/api/user/upload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formData
                }).then(response => {
                    console.log(response);
                }).catch(error => {
                    console.error(error);
                });



            }
        }


        return { upload, files }

    }

}
</script>


