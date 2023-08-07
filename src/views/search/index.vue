<template>
    <div class="search">
        <!--  头部 -->
        <CartStatusBav :isstyle="false">
            <!-- 左边内容插槽 -->
            <template #left>
                <CatReturn></CatReturn>
            </template>
            <!-- 中间内容插槽 -->
            <template #center>
                搜索
            </template>
        </CartStatusBav>


        <div class="search-content">
            <div class="search-center">
                <div class="input">
                    <img src="../../assets/image/cat-search-msall-icon.png" alt="">
                    <input type="text" placeholder="请输入你的搜索内容" v-model="fromOtion.search" @blur="submiotSearch">
                </div>


                <!-- 输入搜索的内容的时候 -->
                <div class="history-list" v-if="SearchItem == null">
                    <div class="title">
                        <span>历史记录</span>
                        <p @click="deleteHis">
                            <img src="../../assets/image/cat-search-delete-icon.png" alt="">
                            <span>清空历史记录</span>
                        </p>
                    </div>

                    <div class="tag">
                        <template v-if="his != null">
                            <p v-for="item in his" :key="item.key">{{ item.history }}</p>
                        </template>
                    </div>
                </div>

                <div class="tab" v-else>
                    <ul>
                        <li @click="changeTab('cat')">
                            <p>流浪猫</p>
                            <span :class="{ active: fromOtion.types == 'cat' }"></span>
                        </li>
                        <li @click="changeTab('user')">
                            <p>用户</p>
                            <span :class="{ active: fromOtion.types == 'user' }"></span>
                        </li>
                    </ul>


                    <!-- 流浪猫数据 -->
                    <div class="item-content" v-if="fromOtion.types == 'cat' && SearchItem.length != 0">
                        <CarGoodsItem :goodsitem="SearchItem" />
                    </div>

                    <!-- // 用户数据 -->
                    <div class="item-contents" v-else-if="fromOtion.types == 'user' && SearchItem.length != 0">
                        <ul>
                            <li v-for="item in SearchItem" :key="item._id">
                                <router-link :to="`/user/space/${item._id}`">
                                    <div class="left">
                                        <span>
                                            <img :src="item.bgimgUrl" alt=""></span>
                                    </div>
                                    <div class="center">
                                        <h2>{{ item.username }}</h2>
                                        <p>{{ item.slogin }}</p>
                                    </div>
                                    <div class="right">
                                        <img src="../../assets/image/cat-fanhui-icon.png" />
                                    </div>
                                </router-link>
                            </li>
                        </ul>

                    </div>

                    <div class="loding" v-else>
                        <p>没有更多内容了哦~！</p>
                    </div>

                </div>


            </div>
        </div>
    </div>
</template>


<script setup>
import { markRaw, shallowRef, ref, reactive, watch, computed } from 'vue';
import { useStore } from 'vuex';
import CatPromptJS from '@/components/libray/CatPrompt.js'
import { GetUserRegister, GetHistoryData, DeleteHistory } from '@/api/search.js'

let store = useStore()
let loading = ref(false)
let finished = ref(false)



// 搜索配置项
let fromOtion = reactive({
    search: '',
    types: 'cat',
    _id: store.state.user.profile._id
})



// 
let SearchItem = ref(null)



let submiotSearch = () => {
    if (fromOtion.search == "") {
        CatPromptJS({ text: "搜索内容不能为空", type: 'error', timout: 100 })
    } else {
        GetUserRegister(fromOtion).then(({ result }) => {
            SearchItem.value = result.data
        }).catch(({ response: { data } }) => {
            // console.log(err);
            CatPromptJS({ text: data?.message || "搜索失败", type: 'error' })
        })
    }
}



// 切换tab
let changeTab = (val) => {
    if (fromOtion.search != "") {
        fromOtion.types = val
        SearchItem.value = []
        submiotSearch()
    }
}


let his = ref(null)
GetHistoryData(fromOtion).then(({ result }) => {
    his.value = result.data
}).catch(err => {
    console.log(err);
})




let deleteHis = () => {
    if (his != null && his.length != 0) {
        DeleteHistory(fromOtion).then(value => {
            his.value = null
        }).catch(({ response: { data } }) => {
            // console.log(err);
            CatPromptJS({ text: data?.message || "搜索失败", type: 'error' })
        })
    }
}






</script>


<style lang="less" scoped>
.search {
    width: 100%;
    height: 100%;

    .search-content {
        width: 375px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        // border: 1px solid red;

        .search-center {
            width: 100%;
            height: 100%;
            padding: 0px 15px 0px 15px;



            // input区域
            .input {
                width: 100%;
                height: 60px;
                display: flex;
                align-items: center;
                position: relative;
                border-radius: 10px;
                border-bottom: 1px solid @background-color;

                img {
                    position: absolute;
                    left: 10px;
                    width: 14px;
                    height: 14px;
                }

                input {
                    width: 100%;
                    height: 44px;
                    background: #F2F6FF;
                    padding-left: 30px;
                    font-size: 14px;
                    border-radius: 10px;
                }
            }



            // 历史记录区域
            .history-list {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                padding: 6px 0px 10px 0px;
                justify-content: center;

                .title {
                    height: 30px;
                    display: flex;
                    font-size: 12px;
                    align-content: center;
                    line-height: 30px;
                    justify-content: space-between;

                    img {
                        width: 12px;
                        height: 12px;
                        object-fit: cover;
                        margin-top: -4px;
                    }
                }

                .tag {
                    width: 100%;
                    height: 100%;
                    padding: 5px 0px 5px 0px;
                    display: flex;
                    flex-wrap: wrap;

                    p {
                        padding: 4px;
                        background: #F2F2F2;
                        margin-left: 10px;
                        border-radius: 4px;
                        color: #7F7F7F;
                        background: #F2F2F2;
                        margin-top: 10px;
                        font-size: 8px;
                    }
                }



            }


            // 内容渲染区域
            .tab {
                width: 100%;
                height: 44px;
                background: @white-color;

                ul {
                    width: 100%;
                    height: 44px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;

                    li {
                        position: relative;

                        p {
                            font-size: @heading2-font-size ;
                        }

                    }


                }

                .item-content {
                    width: 100%;
                    height: 100%;
                }

                .item-contents {
                    width: 100%;
                    height: 100%;

                    ul {
                        width: 100%;
                        height: 100%;
                        // display: flex;

                        li {
                            width: 100%;
                            height: 60px;

                            a {
                                width: 100%;
                                height: 60px;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                border-bottom: 1px solid @background-color;

                                div {
                                    display: flex;
                                }

                                .left {
                                    width: 40px;

                                    span {
                                        display: block;
                                        width: 40px;
                                        height: 40px;
                                        border-radius: 10px;
                                        overflow: hidden;
                                    }

                                    img {
                                        object-fit: cover;
                                        width: 40px;
                                        height: 40px;
                                    }
                                }


                                .center {
                                    width: 260px;
                                    font-size: 14px;
                                    font-weight: 700;
                                    color: rgba(38, 38, 38, 1);
                                    display: flex;
                                    flex-direction: column;

                                    h2 {
                                        font-size: 14px;
                                        font-weight: 700;
                                        color: rgba(38, 38, 38, 1);
                                        line-height: 6px;
                                    }

                                    p {
                                        font-size: 10px;
                                        font-weight: 500;
                                        color: rgba(127, 127, 127, 1);
                                    }
                                }

                                .right {
                                    img {
                                        width: 24px;
                                        height: 26px;
                                        object-fit: cover;

                                    }
                                }

                            }


                        }
                    }
                }

                .loding {
                    min-height: 100px;

                    p {
                        text-align: center;
                        font-size: 14px;
                        color: @primary-color;
                        line-height: 100px;
                    }
                }


            }


        }



    }
}

.active {
    display: block;
    width: 100%;
    height: 4px;
    border-radius: 10px;
    background: @primary-color;
    position: absolute;
}
</style>