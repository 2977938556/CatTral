<template>
    <div class="login">
        <div class="login-content">
            <div class="login-content-logo">
                <img src="../../assets/image/cat-logo.png" alt="">
            </div>
            <div class="login-content-input">
                <div class="input-center">
                    <!-- 用户名称 -->
                    <div class="box input-cente-box-user">
                        <div class="user-top">
                            <img src="../../assets/image/cat-login-user-icon.png" alt="用户名称">
                            <input type="text" placeholder="请输入用户名称">
                        </div>
                        <div class="err-user">
                            <p v-show="false">错误</p>
                        </div>
                    </div>
                    <!-- 密码 -->
                    <div class="box input-cente-box-password">
                        <div class="password-top">
                            <img src="../../assets/image/cat-login-password-icon.png" alt="用户名称">
                            <input type="password" placeholder="请设置密码">
                        </div>
                        <div class="err-user">
                            <p v-show="false">错误</p>
                        </div>
                    </div>
                    <!-- 用户密码 -->
                    <div class="box input-cente-box-password-tow">
                        <div class="passwordtow-top">
                            <input type="password" placeholder="请设置密码">
                        </div>
                        <div class="err-user">
                            <p v-show="false">错误</p>
                        </div>
                    </div>
                    <!-- 用户手机号 -->
                    <div class="box input-cente-box-phone">
                        <div class="phone-top">
                            <img src="../../assets/image/cat-login-phone-icon.png" alt="用户名称">
                            <input type="text" placeholder="请输入手机号">
                        </div>
                        <div class="err-user">
                            <p v-show="false">错误</p>
                        </div>
                    </div>
                    <!-- 验证码 -->
                    <div class="box input-cente-box-code">
                        <div class="code-top">
                            <input type="text" placeholder="验证码">
                            <span>发送验证码</span>
                            <div class="abn"></div>
                        </div>
                        <div class="err-user">
                            <p v-show="false">错误</p>
                        </div>
                    </div>




                </div>
            </div>
            <div class="login-content-submit">
                <div class="submit-box-a">
                    <p v-show="false">错误提示</p>
                </div>
                <div class="submit-box-b">
                    <div class="login-content-submit-top">
                        <span>注册用户</span>
                    </div>
                    <div class="login-content-submit-button">
                        <router-link to="/login">已经账户登录</router-link>
                        <span>
                            <input type="checkbox" />
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
export default {
    name: "CatRegister",
    setup() {

    }
}
</script>




<style scoped lang="less">
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