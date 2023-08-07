<template>
    <!-- 头状态栏 -->
    <CartStatusBav :isstyle="false">
        <!-- 左边内容插槽 -->
        <template #left>
            <!-- 返回 -->
            <CatReturn></CatReturn>
        </template>
        <!-- 中间内容插槽 -->
        <template #center>
            <p>分享故事</p>
        </template>

        <template #right>
            注意事项
        </template>
    </CartStatusBav>

    <!-- 用户的故事 -->
    <div class="story-box">
        <div class="story-center">

            <!-- 写故模块 -->
            <div class="release-a story">
                <div class="a center">
                    <p>用户名称</p>
                    <textarea type="text" v-model="SubmitData.story" placeholder="请写下你的故事"></textarea>
                </div>
            </div>


            <div class="release-e story">
                <div class="e center">
                    <p>选择头像</p>
                    <div>
                        <label for="upload">
                            <span>上传图片</span>
                            <input type="file" @change="GetFileFn" accept="image/*" id="upload" style="display: none">
                        </label>
                        <div class="img" @click="DelateImg" v-if="SubmitData.imgUrl">
                            <img :src="SubmitData.imgUrl" alt="">
                        </div>
                    </div>
                </div>
            </div>

            <CatSubmit @click="SubmitDaa" />

        </div>
    </div>
</template>

<script>


import { reactive, ref } from 'vue'
import CatPromptJS from '@/components/libray/CatPrompt.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { PushStoryData } from '@/api/story.js'


import { OutUserFn } from '@/utils/outUser.js'

export default {
    name: "CatStoryPage",
    setup() {
        // 使用store
        const store = useStore()
        let router = useRouter()

        // 需要提交的数据
        let SubmitData = reactive({
            story: "真是一只可爱的猫猫哇好可爱的猫猫真是一只可爱的猫猫哇好可爱的猫猫真是一只可爱的猫猫哇好可爱的猫猫真是一只可爱的猫猫哇好可爱的猫猫真是一只可爱的猫猫哇好可爱的猫猫真是一只可爱的猫猫哇好可爱的猫猫真是一只可爱的猫猫哇好可爱的猫猫真是一只可爱的猫猫哇好可爱的猫猫真是一只可爱的猫猫哇好可爱的猫猫真是一只可爱的猫猫哇好可爱的猫猫真是一只可爱的猫猫哇好可爱的猫猫真是一只可爱的猫猫哇好可爱的猫猫真是一只可爱的猫猫哇好可爱的猫猫真是一只可爱的猫猫哇好可爱的猫猫", // 用户的标语
            maxSize: 1024 * 1024 * 2, // 2M
            imgUrl: '',
            name: '',
            size: '',
            base64: null,
        })

        let ConvertFile = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    let result = event.target.result; // 将base64字符串保存到数组中
                    let fileName = file.name;
                    let fileSize = file.size;
                    resolve({ size: fileSize, name: fileName, base64: result });
                };
                reader.onerror = function (event) {
                    reject(new Error("图片转换失败"));
                };
                reader.readAsDataURL(file);
            });
        };


        // 监听图片的模块
        let GetFileFn = (event) => {
            // 先判断是否是超出了大小
            let file = event.target.files[0]

            // 这里是限制大小的情况
            if (file.size > SubmitData.maxSize) {
                return CatPromptJS({ text: '选择的图片大于2M', type: 'error' })
            }

            // 这里必须要转换成功的情况下才能显示图片
            ConvertFile(file).then(value => {
                // console.log(value);
                SubmitData.name = value.name
                SubmitData.size = value.size
                SubmitData.base64 = value.base64
                SubmitData.imgUrl = value.base64
            }).catch(err => {
                // console.log(err);
                return CatPromptJS({ text: '图片上传失败', type: 'error' })
            })
        }

        // 这里是删除掉图片的情况下需要点击图片的时候就将图片删除
        let DelateImg = () => {
            SubmitData.name = ''
            SubmitData.base64 = ''
            SubmitData.size = ''
            SubmitData.imgUrl = ''
            //  提示用户是否被删删除掉图片的数据并且将
            // return CatPromptJS({ text: '删除图片成功', type: 'success', timeout: "1000" })
        }


        // 提交数据
        let SubmitDaa = async () => {
            // 判断是否为空
            if (SubmitData.story == "" || SubmitData.base64 == null) {
                return CatPromptJS({ text: '请填写与上传完整请填写与上传完整请填写与上传完整', type: 'error' })
            }


            // 这里整理数据
            let FormDataList = [
                {
                    name: SubmitData.name,
                    base64: SubmitData.base64,
                    size: SubmitData.size,
                }
            ]

            // input
            let inputData = {
                content: SubmitData.story,
            }

            // 这里发送请求回去将参数传递回去
            PushStoryData({ FormDataList, inputData }).then(({ result }) => {
                CatPromptJS({ text: "正在审核", type: 'success' })
                DelateImg()
                SubmitData.story = ''

            }).catch(({ response: { data: { result } } }) => {
                CatPromptJS({ text: result.message || "发布失败", type: 'error' })
            })
        }
        return { GetFileFn, SubmitData, SubmitDaa, DelateImg }
    }
}
</script>



<style lang="less" scoped>
.story-box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    .story-center {
        width: 345px;
        height: 100%;
        min-height: 400px;

        .story {
            margin-top: 20px;
        }


        // 头部模块
        .release-a {
            width: 345px;

            .a {
                textarea {
                    width: 100%;
                    height: 300px;
                    border-radius: 1.92vw;
                    background: #f2f2f2;
                    font-size: 4.267vw;
                    font-weight: 500;
                    letter-spacing: 0px;
                    color: #262626;
                    padding: 2.667vw;
                    text-align: left;
                    vertical-align: top;
                    border: none;
                }
            }

        }


        .release-e {
            width: 345px;
            height: auto;

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

}
</style>
