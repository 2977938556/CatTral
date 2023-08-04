<template>
    <div class="user">
        <div class="user-bg">
            <img src="../../assets/image/cat-user-bg.png" alt="用户背景图片">
        </div>
        <!-- 头部数据 -->
        <div class="user-title-content">
            <div class="user-title-content">
                <div class="user-center">
                    <router-link to="/user/setuser">
                        <!-- 用户头像 -->
                        <div class="user-img">
                            <span>
                                <img :src="UserData.bgimgUrl" alt="头像">
                            </span>
                        </div>

                        <!-- 用户信息 -->
                        <div class="user-infor">
                            <div class="infor-box">
                                <p class="p1">{{ UserData.username }}</p>
                                <p class="p2">{{ UserData.slogin }}</p><br>
                                <p class="p3">{{ lable }}</p>
                            </div>
                        </div>
                    </router-link>
                    <!-- 发布 -->
                    <div class="user-submit">
                        <span @click="goBack">发布</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 功能菜单 -->
        <div class="user-fun">
            <!-- 居中容器 -->
            <div class="user-fun-center">

                <!-- 头部按钮 -->
                <div class="user-fun-top">
                    <!-- 控制居中 -->
                    <div class="user-fun-top-center">
                        <div class="item-a">
                            <router-link to="/user/myrelase">
                                <img src="../../assets/image/user-fabu-icon.png" alt="">
                                <p>我的发布</p>
                            </router-link>
                        </div>
                        <div class="item-a">
                            <router-link to="/user/mylove">
                                <img src="../../assets/image/user-shoc-icon.png" alt="">
                                <p>我的收藏</p>
                            </router-link>
                        </div>
                        <div class="item-a">
                            <router-link to="/user/myapply">
                                <img src="../../assets/image/user-wdly-icon.png" alt="">
                                <p>我的领养</p>
                            </router-link>
                        </div>

                    </div>
                </div>


                <!-- 下面菜单 -->

                <div class="user-fun-btn">
                    <div class="user-fun-btn-center">
                        <!-- 功能1-->
                        <div class="user-fun-a">
                            <div class="item">
                                <div class="item-icon">
                                    <img src="../../assets/image/cat-user-ddgl-icon.png" alt="">
                                </div>
                                <div class="item-title">
                                    <p>订单管理</p>
                                </div>
                                <div class="item-fanhui-icon">
                                    <a href="javascript:;">
                                        <img src="../../assets/image/cat-fanhui-icon.png" alt="">
                                    </a>
                                </div>
                            </div>

                            <div class="item">
                                <div class="item-icon">
                                    <img src="../../assets/image/cat-user-lsjl-icon.png" alt="">
                                </div>
                                <div class="item-title">
                                    <router-link to="/user/history">
                                        <p>历史记录</p>
                                    </router-link>
                                </div>
                                <div class="item-fanhui-icon">
                                    <a href="javascript:;">
                                        <img src="../../assets/image/cat-fanhui-icon.png" alt="">
                                    </a>
                                </div>
                            </div>
                            <div class="item">
                                <div class="item-icon">
                                    <img src="../../assets/image/cat-user-sjys-icon.png" alt="">
                                </div>
                                <div class="item-title">
                                    <p>社交隐私</p>
                                </div>
                                <div class="item-fanhui-icon">
                                    <a href="javascript:;">
                                        <img src="../../assets/image/cat-fanhui-icon.png" alt="">
                                    </a>
                                </div>
                            </div>

                        </div>
                        <!-- 功能2-->
                        <div class="user-fun-b">
                            <div class="item">
                                <div class="item-icon">
                                    <img src="../../assets/image/cat-user-gdgn-icon.png" alt="">
                                </div>
                                <div class="item-title">
                                    <p>更多功能</p>
                                </div>
                                <div class="item-fanhui-icon">
                                    <a href="javascript:;">
                                        <img src="../../assets/image/cat-fanhui-icon.png" alt="">
                                    </a>
                                </div>
                            </div>
                            <div class="item">
                                <div class="item-icon">
                                    <img src="../../assets/image/cat-user-gywm-icon.png" alt="">
                                </div>
                                <div class="item-title">
                                    <p>关于我们</p>
                                </div>
                                <div class="item-fanhui-icon">
                                    <a href="javascript:;">
                                        <img src="../../assets/image/cat-fanhui-icon.png" alt="">
                                    </a>
                                </div>
                            </div>

                        </div>
                        <!-- 功能3-->
                        <div class="user-fun-c">
                            <div @click="userOut">退出当前账户</div>
                        </div>
                    </div>
                </div>




            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import MessageJs from '@/components/libray/CarMessage.js'
import CatConfire from '@/components/libray/CatConfire.js'
import { RoleFm } from '@/utils/userRole.js'
export default {
    name: "User",
    setup() {
        let router = useRouter()
        let store = useStore()

        let UserData = store.state.user?.profile || {}

        // 点击前往发布页面
        // 获取vuex中的数据渲染页面，并且跳转到发布页面需要进行判断是否被禁言了
        let goBack = () => {
            RoleFm(UserData).then(value => {
                router.push('/user/release');
            }).catch(err => {
                // 错误会在这里提示我已经封装好了错误提示函数了
            })
        }

        // 退出登录
        let userOut = () => {
            CatConfire({ title: "系统提示", text: "是否退出登录" }).then(value => {
                store.commit('user/SetUser', {})// 清空用户数据
                store.commit('home/SetcityAddrs', {})// 清空地区数据
                store.commit('home/DeleteGoodsitem', []) //清空首页数据
                store.commit('user/SetCatLove', []) //清空收藏数据

                // 这里可以优化一下 弹窗确认
                MessageJs({ text: '退出登录成功', type: 'success', timeout: 1000 })
                router.push('/login')

            }).catch(e => {
            })
        }

        // 计算用户是权重
        let lable = computed(() => {
            return UserData.role == "user" ? "猫迹社区伙伴" : UserData.role == "admin" ? "超级管理员" : "禁言中"
        })

        return { goBack, userOut, UserData, lable }
    }
}
</script>


<style scoped lang="less">
// 最大容器
.user {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    // border: 1px solid rgba(255, 0, 0, 0);
    transition: all 0.5s ease;


    // 用户背景图片
    .user-bg {
        width: 100%;
        height: 100%;
        // border: 1px solid red;
        align-items: center;
        // position: fixed;
        z-index: -100000;
        position: absolute;
        background: @background-color;




        img {
            object-fit: cover;
            width: 100%;
            height: 309px;
        }
    }


    // 用户头部数据
    .user-title-content {
        width: 100%;
        height: 228px;
        // border: 1px solid rgb(0, 4, 255);
        display: flex;
        justify-content: center;
        align-items: center;
        // position: fixed;
        // top: 0px;
        // left: 0px;



        // 居中容器
        .user-title-content {
            width: 317px;
            height: 102px;
            // border: 1px solid rgb(0, 4, 255);


            .user-center {
                width: 100%;
                height: 102px;
                // border: 1px solid rgb(0, 4, 255);
                display: flex;
                justify-content: space-between;

                div {
                    // border: 1px solid rgb(0, 4, 255);
                }

                a {
                    display: flex;
                    justify-content: space-between;

                    // 用户头像
                    .user-img {
                        width: 100px;
                        height: 102px;
                        display: flex;
                        // justify-content: center;
                        align-items: center;

                        span {
                            display: block;
                            width: 92px;
                            height: 92px;
                            border-radius: 100px;
                            border: 5px solid @white-color;
                            // background: red;
                            overflow: hidden;

                            img {
                                object-fit: cover;
                                width: 92px;
                                height: 92px;
                            }
                        }
                    }

                    // 用户信息
                    .user-infor {
                        width: 142px;
                        height: 102px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        // background: pink;

                        .infor-box {
                            width: 142px;
                            height: 50px;
                            // background: red;


                            .p1 {
                                font-size: 18px;
                                font-weight: 900;
                                color: @white-color;

                            }

                            .p2 {
                                font-size: 12px;
                                font-weight: 900;
                                color: @white-color;
                            }

                            .p3 {
                                font-size: 8px;
                                // font-weight: 900;
                                color: @white-color;
                            }
                        }

                    }
                }



                // 提交按钮
                .user-submit {
                    width: 60px;
                    height: 102px;
                    cursor: pointer;
                    display: flex;
                    justify-content: end;

                    span {
                        display: block;
                        width: 48px;
                        height: 20px;
                        border-radius: 12px;
                        background: @white-color;
                        font-size: @heading3-font-size;
                        font-weight: 500;
                        line-height: 20px;
                        color: @heading-color;
                        text-align: center;
                        transition: all 0.5s ease;

                        &:hover {
                            background: @primary-color;
                            color: @white-color;
                        }
                    }
                }


            }

        }
    }


    // 开关用户
    .user-fun {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 74px;



        .user-fun-center {
            width: 345px;
            height: 100%;

            // background: @white-color;
            // display: flex;
            // flex-direction: column;

            //头部按钮
            .user-fun-top {
                display: flex;
                width: 100%;
                height: 84px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 20px;
                // border: 1px solid rgb(255, 238, 0);
                background: @white-color;
                box-shadow: 0px 12px 10px 0px rgba(255, 124, 0, 0.05);




                .user-fun-top-center {
                    width: 80%;
                    height: 64px;
                    // border: 1px solid rgb(255, 238, 0);
                    display: flex;
                    justify-content: space-between;
                    // background: red;

                    .item-a {
                        // border: 1px solid rgb(98, 0, 255);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;

                        img {
                            width: 46px;
                            height: 46px;
                            object-fit: cover;
                            // box-shadow: 0px 4px 10px 0px rgba(255, 202, 145, 0.3), 0px 4px 10px 0px rgba(255, 202, 145, 0.2);
                        }

                        p {
                            font-size: 10px;
                            font-weight: 500;
                            letter-spacing: 0px;
                            color: @heading-color;
                        }
                    }



                }



            }

            // 底部菜单
            .user-fun-btn {
                width: 100%;
                height: 100%;

                // 居中的内容
                .user-fun-btn-center {
                    width: 345px;
                    height: 420px;
                    padding-top: 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    .item {
                        width: 100%;
                        height: 60px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        background: @white-color;
                        border-radius: 10px;

                        // 图标
                        .item-icon {
                            width: 30px;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            img {
                                object-fit: cover;
                                width: 24px;
                                height: 24px;
                            }
                        }

                        // 功能标题
                        .item-title {
                            flex: 1;
                            height: 100%;
                            line-height: 60px;

                            p {
                                font-size: @heading2-font-size;
                                font-weight: 700;
                                letter-spacing: 0px;
                                color: @heading-color;
                                text-align: left;
                                vertical-align: top;
                            }
                        }

                        // 返回按钮 
                        .item-fanhui-icon {
                            a {
                                padding-right: 10px;

                                img {
                                    object-fit: cover;
                                    width: 9px;
                                    height: 9px;
                                }
                            }
                        }

                    }


                    .user-fun-a {
                        width: 100%;
                        height: 188px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    }

                    .user-fun-b {
                        width: 100%;
                        height: 128px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;

                    }

                    .user-fun-c {
                        width: 100%;
                        height: 60px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        div {
                            width: 345px;
                            height: 60px;
                            background: @white-color;
                            font-size: @heading2-font-size;
                            font-weight: 700;
                            letter-spacing: 0px;
                            line-height: 60px;
                            color: @primary-color;
                            text-align: center;
                            vertical-align: top;
                            border-radius: 10px;
                        }

                        div:hover {
                            background: @primary-color;
                            color: @white-color;
                        }

                    }

                }


            }

        }
    }




}
</style>