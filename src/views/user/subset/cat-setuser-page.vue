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
                <p>修改用户数据</p>
            </template>
        </CartStatusBav>

        <div class="release-content">
            <div class="release-content-center">

                <div class="release-a">
                    <div class="a center">
                        <p>用户名称</p>
                        <input v-model="SubmitData.username" type="text" placeholder="请输入标题" />
                    </div>
                </div>

                <div class="release-a">
                    <div class="a center">
                        <p>用户标语</p>
                        <input v-model="SubmitData.slogin" type="text" placeholder="请输入标题" />
                    </div>
                </div>



                <div class="release-e">
                    <div class="e center">
                        <p>选择头像</p>
                        <div>
                            <label for="upload">
                                <span>上传图片</span>
                                <input @change="GetFileFn" type="file" accept="image/*" id="upload" style="display: none">
                            </label>
                            <div class="img" v-if="SubmitData.imgUrl != ''"> <img @click="DelateImg"
                                    :src="SubmitData.imgUrl" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="buttton">
                <button @click="SubmitDaa">提交</button>
            </div>

        </div>




    </div>
</template>


<script>
import { reactive, ref } from 'vue'
import CatPromptJS from '@/components/libray/CatPrompt.js'
import { PushModifyUsers } from '@/api/user.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
    name: "SetUser",
    setup() {

        // 使用store
        const store = useStore()
        let router = useRouter()

        // 需要提交的数据
        let SubmitData = reactive({
            username: '',// 标题
            slogin: "", // 用户的标语
            maxSize: 1024 * 1024 * 2, // 2M
            imgBase64: null,
            imgtype: '',
            imgUrl: ''
        })


        // 这里我们可以获取本地的用户数据并渲染到页面上
        let userDat = JSON.parse(localStorage.getItem('user-store')).user.profile
        SubmitData.username = userDat.username
        SubmitData.slogin = userDat.slogin



        // 转换成base84 这里使用的是promise封装的一个
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
                // 图片转换成功
                SubmitData.imgUrl = URL.createObjectURL(file);// 这里将图片转换成一个链接给页面上使用
                SubmitData.imgBase64 = value // 将base64字符串保存到数组中
                SubmitData.imgtype = file.name

            }).catch(err => {
                return CatPromptJS({ text: '图片上传失败', type: 'error' })
            })
        }


        // 这里是删除掉图片的情况下需要点击图片的时候就将图片删除
        let DelateImg = () => {
            SubmitData.imgUrl = ''
            SubmitData.imgBase64 = ''
            SubmitData.imgtype = ''

            //  提示用户是否被删删除掉图片的数据并且将
            return CatPromptJS({ text: '删除成功数据请重新选择数据', type: 'success', timeout: "1000" })
        }



        // 提交数据
        let SubmitDaa = async () => {
            // 判断是否为空
            if (SubmitData.username == "" || SubmitData.slogin == "") {
                return CatPromptJS({ text: '不能为空', type: 'error' })
            }
            // 发送请求将数据发送回去
            // 明天完成啦

            PushModifyUsers({ SubmitData: SubmitData }).then(({ result }) => {
                CatPromptJS({ text: `${result.message}`, type: 'success', timeout: "1000" })
                store.commit('user/SetUser', result.data)
                router.go(-1)

            }).catch(({ response: { data } }) => {
                return CatPromptJS({ text: `${data.message}`, type: 'error', timeout: "1000" })
            })

        }





        return { GetFileFn, SubmitData, DelateImg, SubmitDaa }


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