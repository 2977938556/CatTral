<template>
    <div class="mjsd">
        <label>
            上传图片
            <input @change="filechange" type="file">
        </label>
    </div>
</template>

<script>

import axios from 'axios'
export default {
    name: "CatMjsd",
    setup() {
        let ConvertFile = (file) => {
            return new Promise((reolve, reject) => {
                const reader = new FileReader()
                reader.onload = (event) => {
                    let resulss = event.target.result // 将base64字符串保存到数组中
                    reolve(resulss)
                }
                reader.onerror = function (event) {
                    reject(new Error("图片转换失败"))
                }
                reader.readAsDataURL(file)
            })
        }
        let filechange = (e) => {

            ConvertFile(e.target.files[0]).then(value => {
                axios.post('http://172.16.69.58:3000/api/upload/img', {
                    base64: value
                }).then(value => {
                    console.log(value);
                })


            }).catch(Err => {
                console.log("错误");
            })




        }



        return { filechange }


    }
}



</script>