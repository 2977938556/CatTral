<template>
    <div class="login">
        <div class="login-content">
            <div class="login-content-logo">
                <img src="../../assets/image/cat-logo.png" alt="">
            </div>
            <div class="login-content-input">
                <div class="input-center">
                    <div class="input-cente-box-user">
                        <img src="../../assets/image/cat-login-user-icon.png" alt="用户名称">
                        <input v-model="FromDat.username" type="text" placeholder="请输入用户名称">
                    </div>
                    <div class="input-cente-box-password">
                        <img src="../../assets/image/cat-login-password-icon.png" alt="用户名称">
                        <input v-model="FromDat.password" type="password" placeholder="请输入密码">
                    </div>
                </div>
            </div>
            <div class="login-content-submit">
                <div class="submit-box-a">
                    <p v-if="FromErr.username">{{ FromErr.username }}</p>
                </div>
                <div class="submit-box-b">
                    <div class="login-content-submit-top">
                        <span @click="submitLogin">提交</span>
                    </div>
                    <div class="login-content-submit-button">
                        <a href="javascript:;">忘记密码</a>
                        <router-link to="/register">注册用户</router-link>
                    </div>
                </div>

            </div>
        </div>
        <img class="login-bg" src="../../assets/image/cat-login-bg.png" alt="">
    </div>
</template>

<script>
import { reactive, watch } from 'vue'
import { GetUserLogin } from '@/api/login.js'
import MessageJs from '@/components/libray/CarMessage.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'



export default {
    name: "CatLogin",
    setup() {
        let FromDat = reactive({
            username: "FeiMao",
            password: "111111"
        })

        let FromErr = reactive({
            username: "",
        })

        // 使用store
        const store = useStore()
        let router = useRouter()



        // 判断是否含有特殊字符
        function containsSymbols(str, symbols) {
            const regex = new RegExp('[' + symbols + ']', 'g');
            return regex.test(str);
        }
        let fuhao = '~!@#$%^&**()+|}{_}'


        watch(() => JSON.parse(JSON.stringify(FromDat)), (newvl, oldValue) => {
            // 这里是监听用户名称
            if (newvl.username != oldValue.username) {
                if (newvl.username.length < 1 || newvl.username.length < 8 || containsSymbols(FromDat.username, fuhao)) {
                    FromErr.username = "用户名称长度1-8不允许出现特殊符"
                } else {
                    FromErr.username = ""
                }
            }

            if (newvl.password != oldValue.username) {
                if (newvl.password.length < 6 || newvl.username.length > 16) {
                    FromErr.username = "密码长度6-16之间"
                } else {
                    FromErr.username = ""
                }
            }
        })



        let submitLogin = async () => {
            // 这里是监听用户名称
            if (FromDat.username.length < 1 || FromDat.username.length < 8 || containsSymbols(FromDat.username, fuhao)) {
                FromErr.username = "用户名称长度1-8不允许出现特殊符"
            } else {
                FromErr.username = ""
            }

            if (FromDat.password.length < 6 || FromDat.username.length > 16) {
                FromErr.username = "密码长度6-16之间"
            } else {
                FromErr.username = ""
            }



            // 判断是否校验合格然后发送请求
            let loginVaild = Object.values(FromErr).every(item => item == "");

            if (loginVaild) {

                try {
                    // 成功登录那么就保存用户数据到vuex中持久化存储
                    let result = await GetUserLogin(FromDat)
                    if (result.code === 200 || result.code === 201) {
                        // MessageJs({ text: `登录成功`, type: 'warn', timeout: 1000 })
                        store.commit("user/SetUser", { ...result.result.user, token: result.result.token })
                        router.push('/')
                    }
                } catch (error) {
                    let resultErr = error.response.data;
                    if (resultErr.code === 400 || resultErr.code === 500) {
                        MessageJs({ text: `${resultErr.message}`, type: 'error' })
                    }
                }



            }




        }





        return { FromDat, FromErr, submitLogin }



    }
}
</script>




<style scoped lang="less">
.login {
    height: 812px;
    background-size: 110%;
    backdrop-filter: blur(50);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-bg {
        position: absolute;
        width: 120%;
        height: 812px;
        top: 0px;
        left: 0px;
        filter: blur(5px);
        z-index: -1;
    }


    .login-content {
        width: 282px;
        height: 444px;
        border-radius: 38px;
        background: rgba(242, 242, 242, 0.692);

        .login-content-logo {
            width: 100%;
            height: 144px;
            // border: 1px solid red;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                display: block;
                width: 107px;
                height: 48px;
                object-fit: cover;
            }
        }

        .login-content-input {
            width: 100%;
            height: 96px;
            // border: 1px solid blue;
            display: flex;
            justify-content: center;
            align-items: center;

            .input-center {
                width: 196px;
                height: 100%;
                // border: 1px solid blue;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                align-items: flex-end;

                /* 或者 align-items: flex-end; */
                img {
                    display: block;
                    width: 30px;
                    height: 30px;
                    object-fit: cover;
                }

                input {
                    width: 156px;
                    height: 30px;
                    background: @white-color;
                    border-radius: 50px;
                    padding-left: 10px;
                    font-size: 14px;
                }

                .input-cente-box-user {
                    width: 196px;
                    height: 30px;
                    // border: 1px solid rgb(248, 141, 0);
                    display: flex;
                    justify-content: space-between;




                }

                .input-cente-box-password {
                    width: 196px;
                    height: 30px;
                    // border: 1px solid rgb(0, 250, 133);
                    display: flex;
                    justify-content: space-between;

                }
            }
        }

        .login-content-submit {
            width: 100%;
            height: 134px;
            // border: 1px solid pink;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: stretch;

            .submit-box-a {
                width: 100px;
                height: 20px;
                // border: 1px solid rgb(204, 22, 53);

                p {
                    color: red;
                    font-size: @body-font-size;
                    line-height: 20px;
                }
            }

            .submit-box-b {
                width: 196px;
                height: 60px;
                // border: 1px solid pink;
                display: flex;
                flex-wrap: wrap;
                align-items: self-end;
                justify-content: center;


                .login-content-submit-top {
                    width: 100%;
                    height: 37px;
                    // border: 1px solid pink;

                    span {
                        display: block;
                        width: 194px;
                        height: 37px;
                        text-align: center;
                        line-height: 37px;
                        background: @primary-color;
                        font-size: @heading1-font-size;
                        font-weight: 700;
                        color: @white-color;
                        border-radius: 50px;
                    }
                }

                .login-content-submit-button {
                    width: 80%;
                    display: flex;
                    justify-content: space-between;
                    // border: 1px solid pink;

                    a {
                        font-size: 10px;
                        font-weight: 500;
                        letter-spacing: 0px;
                        color: rgba(51, 51, 51, 1);

                    }
                }
            }
        }


    }





}
</style>