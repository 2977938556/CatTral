<template>
    <div class="login">
        <div class="login-content">
            <div class="login-content-logo">
                <img src="../../assets/image/cat-logo.png" alt="">
            </div>
            <div class="login-content-input">
                <form>
                    <div class=" input-center">
                        <!-- 用户名称 -->
                        <div class="box input-cente-box-user">
                            <div class="user-top">
                                <img src="../../assets/image/cat-login-user-icon.png" alt="用户名称">
                                <input v-model="FromData.username" name="username" type="text" placeholder="请输入用户名称" />
                            </div>
                            <div class="err-user">
                                <p v-if="FromErroe.username">{{ FromErroe.username }}</p>
                            </div>
                        </div>
                        <!-- 密码 -->
                        <div class="box input-cente-box-password">
                            <div class="password-top">
                                <img src="../../assets/image/cat-login-password-icon.png" alt="用户名称">
                                <input v-model="FromData.password" name="password" type="password" placeholder="请设置密码" />
                            </div>
                            <div class="err-user">
                                <p v-if="FromErroe.password">{{ FromErroe.password }}</p>
                            </div>
                        </div>
                        <!-- 用户密码 -->
                        <div class="box input-cente-box-password-tow">
                            <div class="passwordtow-top">
                                <input v-model="FromData.passwordtow" name="passwordtow" type="password"
                                    placeholder="请设置密码" />
                            </div>
                            <div class="err-user">
                                <p v-if="FromErroe.passwordtow">{{ FromErroe.passwordtow }}</p>
                            </div>
                        </div>
                        <!-- 用户手机号 -->
                        <div class="box input-cente-box-phone">
                            <div class="phone-top">
                                <img src="../../assets/image/cat-login-phone-icon.png" alt="用户名称">
                                <input v-model="FromData.mobile" name="mobile" type="text" placeholder="请输入手机号" />
                            </div>
                            <div class="err-user">
                                <p v-if="FromErroe.mobile">{{ FromErroe.mobile }}</p>
                            </div>
                        </div>
                        <!-- 验证码 -->
                        <div class="box input-cente-box-code">
                            <div class="code-top">
                                <input v-model="FromData.code" name="code" type="text" placeholder="验证码" />
                                <span :class="{ disabled: codeTime != 10 }" @click="getCode">{{ codeTitle }}</span>
                                <div class="abn"></div>
                            </div>
                            <div class="err-user">
                                <p v-if="FromErroe.code">{{ FromErroe.code }}</p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="login-content-submit">
                <div class="submit-box-a">
                    <!-- <p v-show="false">错误提示</p> -->
                </div>
                <div class="submit-box-b">
                    <div class="login-content-submit-top">
                        <span @click="submitRegister">注册用户</span>
                    </div>
                    <div class="login-content-submit-button">
                        <router-link to="/login">已经账户登录</router-link>
                        <span>
                            <span v-if="FromErroe.select" style="color:red">{{ FromErroe.select }}</span>

                            <input type="checkbox" v-model="FromData.select" />
                            条款协议


                        </span>
                    </div>
                </div>

            </div>
        </div>
        <img class="login-bg" src="../../assets/image/cat-login-bg.png" alt="">
    </div>
</template>

<script>
import { reactive, watch, ref } from 'vue'
import MessageJs from '@/components/libray/CarMessage.js'
import { useRouter } from 'vue-router'
import { GetUserRegister, GetUserRegisterCode } from '@/api/register.js'
export default {
    name: "CatRegister",
    setup() {
        let router = useRouter()

        // 收集数据
        let FromData = reactive({
            username: "",
            password: "111111",
            passwordtow: "111111",
            mobile: "",
            code: "",
            select: false,
        })
        // 校验规则表单对象

        let FromErroe = reactive({
            username: "",
            password: "",
            passwordtow: "",
            mobile: "",
            code: "",
            select: "",
        })





        // 提示文本
        let codeTitle = ref("发送验证码")
        // 倒计时
        let codeTime = ref(10)
        // 保存验证码的
        let code = ref("")


        // 这个函数用户发送验证码和倒计时的
        let getCode = async () => {
            // 这里判断手机号是否正确
            if (FromData.mobile.length == 11) {
                if (codeTitle.value == "发送验证码") {
                    let { result } = await GetUserRegisterCode(FormData.mobile)
                    //  将code 设置在input上
                    FromData.code = result.code
                    code.value = result.code

                    // 修改提示文本
                    codeTitle.value = `重新发送${codeTime.value}`

                    // 定时器 倒计时
                    let time = setInterval(() => {
                        codeTitle.value = `重新发送${codeTime.value--}`
                        codeTime.value--
                        if (codeTime.value <= 0) {
                            codeTime.value = 10
                            codeTitle.value = "发送验证码"
                            clearInterval(time)
                            return false
                        }
                    }, 1000)
                }
            } else {
                // 判断手机号
                // 判断二次密码
                if (FromData.mobile.length != 11) {
                    FromErroe.mobile = "手机号格式有误请重新输入"
                } else {
                    FromErroe.mobile = ""
                }
            }
        }




        // 判断是否含有特殊字符
        function containsSymbols(str, symbols) {
            const regex = new RegExp('[' + symbols + ']', 'g');
            return regex.test(str);
        }
        let fuhao = '~!@#$%^&**()+|}{_}'

        // 判断是合法的手机号
        function isMobilePhone(str) {
            const regex = /^1[3456789]\d{9}$/;
            return regex.test(str);
        }





        // 这里是监听是否修改了那么就修改状态
        watch(() => JSON.parse(JSON.stringify(FromData)), (newvl, olval) => {
            // 判断用户名称
            if (newvl.username != olval.username) {
                if (newvl.username.length < 1 || newvl.username.length > 8 || containsSymbols(FromData.username, fuhao)) {
                    FromErroe.username = "用户名称长度1-8不允许出现特殊符"
                } else {
                    FromErroe.username = ""
                }
            }


            if (newvl.password != olval.password) {
                // 判断用户密码
                if (newvl.password.length < 6 || newvl.username.length > 16) {
                    FromErroe.password = "密码长度6-16之间"
                } else {
                    FromErroe.password = ""
                }
            }


            if (newvl.passwordtow != olval.passwordtow) {
                // 判断二次密码
                if (newvl.passwordtow != newvl.password || newvl.passwordtow.length == 0) {
                    FromErroe.passwordtow = "两个密码不相等，请重新输入"
                } else {
                    FromErroe.passwordtow = ""
                }
            }


            if (newvl.mobile != olval.mobile) {
                // 判断手机号
                // 判断二次密码
                if (newvl.mobile.length == 0) {
                    FromErroe.mobile = "手机号格式有误请重新输入"
                } else {
                    FromErroe.mobile = ""
                }
            }


            if (newvl.code != olval.code) {
                // 判断验证码
                if (newvl.code == "" || newvl.code != code.value) {
                    FromErroe.code = "验证码错误"
                } else {
                    FromErroe.code = ""
                }
            }

            if (newvl.select != olval.select) {
                if (newvl.select == true) {
                    FromErroe.select = ""
                } else {
                    FromErroe.select = "请勾选协议"
                }
            }
        })


        // 提交数据
        let submitRegister = () => {
            // 判断用户名称
            if (FromData.username.length < 1 || FromData.username.length > 8 || containsSymbols(FromData.username, fuhao)) {
                FromErroe.username = "用户名称长度1-8不允许出现特殊符"
            } else {
                FromErroe.username = ""
            }

            // 判断用户密码
            if (FromData.password.length < 6 || FromData.username.length > 16) {
                FromErroe.password = "密码长度在6-16之间"
            } else {
                FromErroe.password = ""
            }

            // 判断二次密码
            if (FromData.passwordtow != FromData.password || FromData.passwordtow.length == 0) {
                FromErroe.passwordtow = "两个密码不相等，请重新输入"
            } else {
                FromErroe.passwordtow = ""
            }


            // 判断手机号
            // 判断二次密码
            if (FromData.mobile.length == 0) {
                FromErroe.mobile = "手机号格式有误请重新输入"
            } else {
                FromErroe.mobile = ""
            }

            // 判断验证码
            if (FromData.code == "" || FromData.code != code.value) {
                FromErroe.code = "验证码错误"
            } else {
                FromErroe.code = ""
            }

            // 判断验证码
            if (FromData.code == "" || FromData.code != code.value) {
                console.log("错误");
                FromErroe.code = "验证码错误"
            } else {
                FromErroe.code = ""
            }

            // 判断是否勾选协议
            if (FromData.select === false) {
                FromErroe.select = "请勾选协议"
            } else {
                FromErroe.select = ""
            }



            // 提交数据 注册用户
            // 这里是判断是否全部都为正确的情况
            const isAllEmpty = Object.values(FromErroe).every(value => value === '');
            // 这里是还有错误的情况下
            if (!isAllEmpty) {
                return false;
            } else {
                // 这是发送注册请求
                GetUserRegister(FromData).then(result => {
                    // 这里是注册成功
                    if (result.code == 201 || result.code == 200) {
                        // 给予提示
                        MessageJs({ type: "success", text: `${result.message},注册成功` })

                        // 定时跳转页面并清除定时器
                        let time = setTimeout(() => {
                            router.push('/login')
                            clearTimeout(time)
                        }, 100);
                    }

                }).catch(err => {
                    // 这里是不等于正确返回的状态
                    if (err.response.data.code != 201 || err.response.data.code != 200) {
                        // 给予提示
                        MessageJs({ type: "error", text: err.response.data.message })
                        return false
                    }

                })

            }
        }






        return { FromData, FromErroe, submitRegister, codeTitle, codeTime, getCode }
    }
}
</script>




<style scoped lang="less">
.disabled {
    pointer-events: none !important;
    background: rgb(255, 169, 94) !important;
}

.err {
    color: red !important;
}

.login {
    height: 100%;
    min-height: 812px;
    background-size: 110%;
    backdrop-filter: blur(50);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease-out;

    .login-bg {
        position: absolute;
        width: 120%;
        height: 812px;
        top: 0px;
        left: 0px;
        filter: blur(5px);
        z-index: -1;
        transition: all 0.5s ease-out;

    }


    .login-content {
        width: 282px;
        height: 540px;
        border-radius: 38px;
        background: rgba(242, 242, 242, 0.692);
        transition: all 0.5s ease-out;



        // Logo
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

        // input  内容区域
        .login-content-input {
            width: 100%;
            height: auto;
            // border: 1px solid blue;
            display: flex;
            align-items: center;
            justify-content: center;

            // 模块居中模块
            .input-center {
                width: 196px;
                height: 100%;
                // border: 1px solid blue;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                align-items: flex-end;

                // 公共样式
                .box {
                    width: 196px;
                    height: 50px;
                    // border: 1px solid blue;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: right;

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

                    .err-user {
                        width: 156px;
                        height: 20px;
                        // border: 1px solid blue;


                        p {
                            color: red;
                            font-size: @body-font-size;
                            line-height: 20px;
                        }
                    }
                }



                .input-cente-box-user {
                    .user-top {
                        width: 196px;
                        // background: blue;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        align-items: flex-end;

                    }
                }

                .input-cente-box-password {
                    .password-top {
                        width: 196px;
                        // background: blue;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        align-items: flex-end;

                    }
                }

                .input-cente-box-password-tow {
                    .passwordtow-top {
                        width: 196px;
                        // background: blue;
                        display: flex;
                        justify-content: flex-end;

                    }
                }


                .input-cente-box-phone {
                    .phone-top {
                        width: 196px;
                        // background: blue;
                        display: flex;
                        justify-content: space-around
                    }
                }

                .input-cente-box-code {
                    display: flex;
                    justify-content: flex-end;

                    .code-top {
                        display: flex;
                        justify-content: flex-end;
                        position: relative;

                        // background: rgb(48, 202, 10);
                        input {
                            width: 112px;
                            // background: red;
                        }

                        span {
                            display: block;
                            width: 67px;
                            height: 30px;
                            background: @primary-color;
                            font-size: @heading1-font-size;
                            position: absolute;
                            font-size: @body-font-size;
                            font-weight: 500;
                            letter-spacing: 0px;
                            color: @white-color;
                            text-align: left;
                            vertical-align: top;
                            text-align: center;
                            line-height: 30px;
                            border-radius: 100px;
                            cursor: pointer;

                            &:hover {
                                background: @transition-color;
                            }
                        }

                        .abn {
                            width: 40px;
                            height: 30px;
                        }
                    }
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
                        cursor: pointer;

                        &:hover {
                            background: @transition-color;
                        }
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

                    span {
                        display: flex;
                        align-items: center;
                        font-size: 10px;

                        input {
                            width: 10px;
                            height: 10px;
                        }
                    }

                }
            }
        }




    }





}
</style>