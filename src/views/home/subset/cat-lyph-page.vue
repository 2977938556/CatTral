<template>
    <div class="phb">

        <!-- 状态栏组件 -->
        <CartStatusBav :isstyle="false">
            <template #left>
                <CatReturn>
                    <template v-slot:img>
                        <img class="fanhui" src="../../../assets/image/cat-fanhui-baise-icon.png" alt="返回">
                    </template>
                </CatReturn>
            </template>
            <template #center>
                <h4 style="color: rgb(255, 255, 255);">领养排行</h4>
            </template>
        </CartStatusBav>


        <!-- 内容区域 -->
        <div class="phb-conter">
            <div class="bg">
                <p>感谢你萌领养替代购买</p>
            </div>

            <div class="phb-center" v-if="dataMxs?.length != 0 && dataMxs != null">
                <div class="phb-user" v-if="userApplys != null">
                    <div class=" left">
                        <p>领养数量</p>
                        <h2>{{ userApplys == null ? 0 : userApplys.length || 0 }}只</h2>
                    </div>
                    <div class="center">
                        <router-link :to="`/user/space/${user._id}`">
                            <span>
                                <img :src="user.bgimgUrl" alt="">
                            </span>
                        </router-link>
                    </div>
                    <div class="right">
                        <p>排名</p>
                        <h2>{{ findUserAppMax(user._id) || "" }}</h2>
                    </div>
                </div>


                <div v-else class="phb-user">
                    <div class="left">
                        <p>领养数量</p>
                        <h2>{{ 0 }}只</h2>
                    </div>
                    <div class="center">
                        <router-link :to="`/user/space/${user._id}`">
                            <span>
                                <img :src="user.bgimgUrl" alt="">
                            </span>
                        </router-link>
                    </div>
                    <div class="right">
                        <p>排名</p>
                        <h2>未上榜</h2>
                    </div>
                </div>


                <!-- 列表 -->
                <div class="max-list">
                    <ul v-if="dataMxs != null">
                        <li v-for="( item, index ) in  dataMxs " :key="index">
                            <div class="left">
                                <img v-if="index + 1 == 1" src="../../../assets/image/cat-lyph-noe.png" alt="">
                                <img v-if="index + 1 == 2" src="../../../assets/image/cat-lyph-tow.png" alt="">
                                <img v-if="index + 1 == 3" src="../../../assets/image/cat-lyph-three.png" alt="">
                                <p v-if="index + 1 > 3">{{ index + 1 }}</p>
                            </div>
                            <div class="center">
                                <router-link :to="`/user/space/${item.user._id}`">
                                    <span>
                                        <img :src="item.user.bgimgUrl" alt="">
                                    </span>
                                    <h3>{{ item.user.username }}</h3>
                                </router-link>
                            </div>
                            <div class="right">
                                <h2>{{ item.count }}只</h2>
                            </div>
                        </li>
                    </ul>
                    <div v-else>
                        <p>暂无排行</p>
                    </div>

                </div>

            </div>
            <div class="no" v-else>
                <CatLoding :loading="false" :finished="true" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'
import { GetPhbDAta } from '@/api/home.js'
import CatPromptJS from '@/components/libray/CatPrompt.js'


let store = useStore()
let route = useRoute()
let router = useRouter()

let userApplys = ref([])
let dataMxs = ref(null)

let user = store.state.user.profile



GetPhbDAta({ _id: store.state.user.profile._id }).then(({ result }) => {
    console.log(result);
    dataMxs.value = result.dataMx
    if (result.userApply.length <= 0) {
        userApplys.value = null
    } else {
        userApplys.value = result.userApply
    }

}).catch(err => {
    CatPromptJS({ text: "获取数据失败", type: 'error', timeout: 1000 })
})


// 查找是否在里面有
let findUserAppMax = (item) => {
    if (item == undefined) {
        return "未上榜"
    }
    // console.log(item);
    let data = dataMxs.value.findIndex((items, index) => items._id == item)
    // console.log(data);
    if (data >= -1) {
        return data + 1
    } else {
        return "不在排行榜"
    }
}



</script>





<style lang="less" scoped>
.fanhui {
    width: 23px;
    height: 25px;
    // background: red;

    img {
        width: 100%;
        object-fit: cover;
    }

}

.phb {
    width: 100%;
    height: 100%;
    padding-bottom: 80%;
    background: @background-color;


    // 修改状态栏的样式
    /deep/.status-bar {
        background: @primary-color !important;
    }

    /deep/ .borders {
        border: none;
    }


    .phb-conter {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        // justify-content: center;
        align-items: center;
        flex-direction: column;


        .bg {
            width: 100%;
            height: 100px;
            position: absolute;
            background: @primary-color;
            border-radius: 0px 0px 50px 50px;
            z-index: -0;

            p {
                font-size: 14px;
                text-align: center;
                line-height: 50px;
                color: white;
                width: 100%;
            }


        }

        .phb-center {
            width: 345px;
            height: 100%;
            margin-top: 50px;
            z-index: 1;

            // 用户模块‘
            .phb-user {
                width: 100%;
                height: 90px;
                overflow: hidden;
                display: flex;
                justify-content: space-between;
                background: white;
                border-radius: 10px;

                div {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    p {
                        font-size: 10px;
                        font-weight: 500;
                        line-height: 10px;
                        color: rgba(127, 127, 127, 1);
                    }

                    h2 {
                        line-height: 10px;
                        font-size: 16px;
                        font-weight: 700;
                        letter-spacing: 0px;
                        color: rgba(255, 124, 0, 1);
                        text-align: center;
                        vertical-align: top;
                    }
                }

                .center {
                    a {
                        display: flex;

                        span {
                            width: 60px;
                            height: 60px;
                            border-radius: 100px;
                            overflow: hidden;

                            img {
                                width: 60px;
                                height: 60px;
                                object-fit: cover;
                            }
                        }
                    }
                }



            }



            // 用户前10
            .max-list {
                width: 100%;
                height: 100%;
                margin-top: 10px;
                background: @white-color;
                border-radius: 10px;

                ul {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    li {
                        width: 100%;
                        height: 60px;
                        display: flex;
                        padding: 0px 12px 0px 12px;
                        border-bottom: 1px solid @background-color;

                        div {
                            display: flex;
                            align-items: center;
                        }

                        .left {
                            width: 40px;
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            img {
                                width: 24px;
                                height: 24px;
                            }

                            p {
                                font-size: @heading1-font-size;
                                color: @heading-color;
                                text-align: center;
                            }
                        }

                        .center {
                            width: 100px;
                            display: flex;
                            align-items: center;
                            justify-content: flex-end;

                            a {
                                width: 100%;
                                height: 100%;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                justify-content: flex-start;



                                span {
                                    width: 34px;
                                    height: 34px;
                                    opacity: 1;
                                    border-radius: 268px;
                                    overflow: hidden;
                                }

                                img {
                                    width: 34px;
                                    height: 34px;
                                    object-fit: cover;
                                }

                                h3 {
                                    font-size: @heading3-font-size;
                                    color: @heading-color;
                                    text-align: left;
                                    padding-left: 8px;
                                }
                            }
                        }

                        .right {
                            flex: 2;
                            justify-content: flex-end;

                            h2 {
                                font-size: @heading1-font-size;
                                font-weight: 700;
                                letter-spacing: 0px;
                                color: @primary-color;
                            }

                        }































                    }

                }
            }


        }



    }

}
</style>