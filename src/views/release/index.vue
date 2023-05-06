<template>
    <div class="release">
        <!-- 头状态栏 -->
        <CartStatusBav :isstyle="false">
            <!-- 左边内容插槽 -->
            <template #left>
                <!-- 返回 -->
                <CatReturn></CatReturn>
            </template>
            <!-- 中间内容插槽 -->
            <template #center>
                <p>发布启示</p>
            </template>
        </CartStatusBav>

        <div class="release-content">
            <div class="release-content-center">

                <div class="release-a">
                    <div class="a center">
                        <p>启示标题</p>
                        <input type="text" v-model="SubmitData.title" placeholder="请输入标题" />
                    </div>
                </div>
                <div class="release-b">
                    <div class="b center">
                        <p>启示内容</p>
                        <textarea placeholder="输入你的简介" v-model="SubmitData.content" name="" id="" cols="0"
                            rows="0"></textarea>
                    </div>
                </div>
                <div class="release-c">
                    <CatAddrs @changes="GetAddres" />
                </div>


                <div class="release-d">
                    <div class="d center">
                        <p>标签</p>
                        <div class="label">
                            <span v-for="(item, index) in SubmitData.lable" :key="index">{{ item }}</span>
                            <!-- <span>金渐层</span> -->
                            <!-- <span>金渐层</span> -->
                            <input @keydown="addlable" @blur="addlable" v-model.trim="vlabel" type="text"
                                placeholder="添加标签">

                        </div>
                    </div>
                </div>
                <div class="release-e">
                    <div class="e center">
                        <p>选择图片5/{{ SubmitData.imgDataUrl.length }}</p>
                        <div>
                            <label for="upload">
                                <span>上传图片</span>
                                <input @change="GetFileFn" type="file" accept="image/*" multiple id="upload"
                                    style="display: none">
                            </label>
                            <div class="img" v-for="(item, index) in SubmitData.imgDataUrl" @click="RemoleImg(item, index)"
                                :key="item.size + 1">
                                <img :src="item.imgurl" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="buttton">
                <button @click="subCat">提交</button>
            </div>
        </div>




    </div>
</template>


<script >

import { baseURL } from '@/utils/request.js'
import axios from 'axios'
import { ref, reactive, computed, watch } from 'vue'
import MessageJs from '@/components/libray/CarMessage.js'
import { GetCityJson } from '@/api/register.js'

export default {
    name: "release",
    setup() {

        //标签数据
        let vlabel = ref(null);// 数据双向绑定标签
        // 需要提交的数据
        let SubmitData = reactive({
            title: '',// 标题
            content: '',// 内容
            addrs: null,// 地址
            lable: [],
            imgDataUrl: [],
            maxSize: 1024 * 1024 * 5, // 2M
        })

        let formData = new FormData()

        // 添加标签函数
        let addlable = () => {
            // if (lable.value.length > 6) alert("标签最多只能添加6个") 
            // input 中没有值那么就不会去添加
            if (vlabel.value == '' || vlabel.value == null) return false
            // 如果标签中已经有数据那么就不会被添加
            if (SubmitData.lable.includes(vlabel.value)) return false
            // 否则就添加数据到数组中
            SubmitData.lable.push(vlabel.value)
            vlabel.value = ''
        }

        // 添加图片
        let GetFileFn = (e) => {
            let files = e.target.files

            if (SubmitData.imgDataUrl.length >= 5 || files.length + SubmitData.imgDataUrl.length > 5) {
                alert('有图片大于了5张，请重新选择')
                return false
            }


            if (files.length > 5) {
                alert('最多只能选择5张')

                return false
            }



            for (let i = 0; i < files.length; i++) {
                // 这里是判断图片是否大于了规定大小
                if (files[i].size > SubmitData.maxSize) {
                    alert('有图片大于了，请重新选择')
                    return false
                }
            }




            // 二次添加
            // 二次添加 
            // 需要获取到已经保存的数组组后一个元素的名称 并使用正则获取到索引值
            // 基于索引值再次将数据插入到fromData中
            if (SubmitData.imgDataUrl.length > 0) {
                let lastKey = null;

                for (let key of formData.keys()) {
                    lastKey = key;
                }
                let lastNumber = parseInt(lastKey.match(/\d+$/)[0]);
                console.log(lastNumber);

                // 这里是判断是否有图片被选中了
                for (let i = 0; i < files.length; i++) {
                    for (let [key, value] of formData.entries()) {
                        if (files[i].size == value.size || files[i].name == value.name) {
                            console.log("已经被选中了");
                            continue;
                        } else {
                            // 这里需要进入到这里的时候就将索引值加一
                            lastNumber = lastNumber + 1
                            // 将后面导入的图片插入到fromData中
                            formData.append(`img${lastNumber}`, files[i])
                            // 这里我们循环的是一个fromDat数据 将fromDatz中的数据插入到imgUrl里面 
                            for (let [keys, value] of formData.entries()) {
                                // 由于fromDatz中的数据还存在不同的数所以需要判断是否有相同的数据
                                if (value.name == files[i].name && value.size == files[i].size) {
                                    SubmitData.imgDataUrl.push({ imgurl: URL.createObjectURL(value), imgKey: `img${lastNumber}`, name: files[i].name, size: files[i].size })
                                    break
                                }
                            }
                            break;
                        }
                    }
                }

                return false;
            } else {
                // 第一次选择图片的时候会走这里，这里是基于索引值顺序插入
                for (let i = 0; i < files.length; i++) {
                    formData.append(`img${i}`, files[i])
                    for (let [key, value] of formData.entries()) {
                        if (value.name == files[i].name) {
                            SubmitData.imgDataUrl.push({ imgurl: URL.createObjectURL(value), imgKey: key, name: files[i].name, size: files[i].size })
                            break
                        }
                    }
                }
                return false;
            }





        }

        // 删除图片
        let RemoleImg = ({ imgurl, name, size, imgKey }, index) => {
            // console.log(imgKey)
            // 删除图片需要删除掉fromDat'中的还需要删除掉imgUrl中的，这里我们选择的是点击的时候传递来的参数
            for (let [key, value] of formData.entries()) {
                console.log(imgKey);
                if (value.name == name && value.size == size && key == imgKey) {
                    formData.delete(imgKey)
                }
            }
            // 删除图片的数据
            SubmitData.imgDataUrl.splice(index, 1)

        }

        // 监听地区组件
        let GetAddres = (value) => {
            if (value.isFlage && value.isFlage == true) {
                SubmitData.addrs = value.changeResult
            } else if (value && value.isFlage == false) {
                SubmitData.addrs = null
            }
        }




        let subCat = () => {
            // 判断数据是否填写
            if (SubmitData.title != "" && SubmitData.addrs != null && Array.from(formData.entries()).length != 0) {
                // 发请求
                // console.log(baseURL);

                // GetCityJson({
                //     text: {
                //         formData,
                //         title: SubmitData.title,
                //         content: SubmitData.content,
                //         addrs: SubmitData.addrs,
                //         lable: SubmitData.lable,
                //     }
                // }).then(value => {
                //     console.log("上传图片和文字成功");
                //     console.log(value);
                // })



                // axios.post(`${baseURL}/release/filte`, {
                //     text: {
                //         formData,
                //         title: SubmitData.title,
                //         content: SubmitData.content,
                //         addrs: SubmitData.addrs,
                //         lable: SubmitData.lable,
                //     }
                // },
                // ).then(valu => {
                //     console.log(valu);
                // })


                // axios.post(`${baseURL}/release/filte`, formData.entries(), {
                //     headers: {
                //         'Content-Type': 'multipart/form-data',
                //     },
                // }).then(valu => {
                //     console.log(valu);
                // })


                // 今天到这里了

            } else {
                alert("请查看 ，标题，地区，图片是否填入")
                return false
            }
        }

















        return { vlabel, SubmitData, addlable, GetFileFn, RemoleImg, GetAddres, subCat }
    }
}


</script>




<style lang="less" scoped>
.release-content {
    width: 100%;
    min-height: auto;

    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;


    .release-content-center {
        width: 345px;
        min-height: auto;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;

        // 所有居中的盒子
        .center {
            margin: 10px 0px 10px 0px;

            input {
                border: noe;
            }

        }

        p {
            font-size: @heading2-font-size;
            font-weight: 700;
            letter-spacing: 0px;
            color: @heading-color;
            text-align: left;
            vertical-align: top;
        }

        .release-a {
            width: 345px;
            // height: 79px;


            .a {
                input {
                    width: 345px;
                    height: 38px;
                    opacity: 1;
                    border-radius: 7.2px;
                    background: @background-color;
                    font-size: @heading1-font-size;
                    font-weight: 500;
                    letter-spacing: 0px;
                    line-height: 0px;
                    // color: @secondary-text-color;
                    text-align: left;
                    vertical-align: top;
                    padding-left: 10px;
                }
            }

        }

        .release-b {
            width: 345px;


            .b {
                textarea {
                    width: 345px;
                    // height: auto;
                    min-height: 100px;
                    border-radius: 7.2px;
                    background: rgba(242, 242, 242, 1);

                    font-size: @heading1-font-size;
                    font-weight: 500;
                    letter-spacing: 0px;
                    color: @heading-color;
                    padding: 10px;
                    text-align: left;
                    vertical-align: top;
                    border: none;
                }
            }
        }

        .release-c {
            width: 345px;
            // height: 77px;


        }

        .release-d {
            width: 345px;
            // height: 65px;


            .d {
                .label {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    align-content: stretch;
                    align-items: stretch;
                    padding: 5px;


                    span {
                        padding: 5px;
                        margin: 2px;
                        width: auto;
                        background: @primary-color;
                        font-size: 12px;
                        font-weight: 500;
                        color: rgba(255, 255, 255, 1);
                        text-align: center;
                        border-radius: 10px;
                        // line-height: 100%;
                    }

                    input {
                        padding: 5px;
                        margin: 2px;
                        width: 80px;
                        // height: 22px;
                        border-radius: 10px;
                        background: @background-color;
                    }


                }
            }
        }

        .release-e {
            width: 345px;
            // height: 238px;


            .e {
                div {
                    display: flex;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    align-items: center;


                    label {
                        width: 100px;
                        height: 100px;
                        margin: 4px;
                        // opacity: 0.5;
                        border-radius: 6px;
                        overflow: hidden;
                        background: @background-color;
                        font-size: 14px;
                        font-weight: 700;
                        letter-spacing: 0px;
                        line-height: 100px;
                        color: @secondary-text-color;
                        text-align: center;


                    }

                    .img {
                        margin: 4px;
                        width: 100px;
                        height: 100px;
                        // opacity: 0.5;
                        border-radius: 6px;
                        overflow: hidden;
                        background: @background-color;

                        img {
                            width: 111px;
                            height: 96px;
                            object-fit: cover;
                        }

                    }
                }
            }
        }
    }


    .buttton {
        width: 100%;
        min-height: 100px;

        display: flex;
        align-items: center;
        justify-content: center;

        button {
            width: 245px;
            height: 36px;
            background: @primary-color;
            font-size: @heading1-font-size;
            font-weight: 700;
            line-height: 36px;
            color: @white-color;
            text-align: center;
            border: 0px;
            border-radius: 50px;
            transition: all 0.5s ease-in;
        }
    }
}
</style>