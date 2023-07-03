<template>
    <div class="participate">
        <!-- 头状态栏 -->
        <CartStatusBav :isstyle="false">
            <!-- 左边内容插槽 -->
            <template #left>
                <!-- 返回 -->
                <CatReturn></CatReturn>
            </template>
            <!-- 中间内容插槽 -->
            <template #center>
                <p>我参与的</p>
            </template>

            <template #right>
                <span class="shengq"></span>
            </template>
        </CartStatusBav>

        <!-- 内容区域 -->
        <div class="participate-center">
            <!-- 01 缩略版的活动 -->
            <template v-if="PushActivityList">
                <div class="mjhdappfor-activity" v-for="item in PushActivityList">
                    <router-link :to="`/home/mjhd/${item.act_id._id}`">
                        <div class="mjhdappfor-activity-box">
                            <div class="left">
                                <span class="tag no" style="background: rgba(241, 110, 35, 0.411);"
                                    v-if="item.act_id.to_examine === 'progress'">活动报名中</span>
                                <span class="tag no" style="background: rgb(148, 148, 148);"
                                    v-if="item.act_id.to_examine === 'end'">活动结束了</span>
                                <span class="tag no" style="background: rgb(88, 88, 88);"
                                    v-if="item.act_id.to_examine === 'cancellation'">活动已经取消了</span>
                                <img v-for="(mitem, index) in item.act_id.imageUrl" :key="index" :src="mitem" alt="">
                            </div>
                            <div class="right">
                                <!-- 明天优化一下我参与的还有完成猫迹故事使用七牛云 -->
                                <div class="top">
                                    <p>{{ item.act_id.title }}</p>
                                </div>
                                <div class="bottom">
                                    <p>地点：{{ item.act_id.adds }}</p>
                                    <p>{{ `${FromTimeArrat(item.act_id.time[0])}-${FromTimeArrat(item.act_id.time[1])}` }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </template>

            <!-- 这里设置一个加载数据的loding的数据结构 -->
            <div class="loadings" v-else>
                <CatLodingItem width="375" height="60" v-for="item in 15"></CatLodingItem>
            </div>


        </div>


    </div>
</template>

<script>
import { useStore } from 'vuex'
import { GetMjhdSubmit } from '@/api/home.js'
import CatPromptJS from '@/components/libray/CatPrompt.js'
import { ref, watch } from 'vue'
import { FromTimeArrat } from '@/utils/timeFilter.js'


export default {
    name: "CatParticipate",
    setup() {
        let store = useStore()
        let _id = store.state.user.profile._id

        let PushActivityList = ref(null)
        try {
            // 这里是获取数据列表
            watch(_id, async (newVal, olVal) => {
                let { result: { data: { activities } } } = await GetMjhdSubmit(_id)

                PushActivityList.value = activities
            }, { immediate: true })
        } catch (err) {
            return CatPromptJS({ text: "获取数据失败请重试", type: "error" })
        }



        return { PushActivityList, FromTimeArrat }
    }
}


</script>

<style lang="less" scoped>
.loadings {
    width: 375px;
    height: 100%;
    // border: 1px solid red;
    height: 100%;
    
    // justify-content: space-between;
    .shang{
        margin-top: 10px;
        margin: 10px auto;
    }

}

.participate {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .participate-center {
        width: 100%;
        height: 100%;
        min-height: 200px;

        // 活动模块
        .mjhdappfor-activity {
            width: 100%;
            height: 108px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid @background-color;

            .mjhdappfor-activity-box {
                width: 345px;
                height: 66px;
                display: flex;
                justify-content: space-between;

                .left {
                    width: 82px;
                    height: 100%;
                    border-radius: 10px;
                    overflow: hidden;
                    position: relative;

                    .tag {
                        display: block;
                        position: absolute;
                        font-size: 8px;
                        font-weight: 500;
                        color: @white-color;
                        text-align: center;
                        line-height: 18px;
                        width: 100%;
                        height: 18px;
                        bottom: 0px;
                    }

                    .no {
                        background: rgba(51, 51, 51, 0.5);
                    }

                    .yes {
                        background: rgba(255, 124, 0, 0.6);
                    }

                    img {
                        object-fit: cover;
                        width: 82px;
                        height: 66px;
                    }
                }

                .right {
                    width: 252px;
                    height: 100%;

                    .top {
                        width: 252px;
                        height: 40px;

                        p {
                            font-size: 12px;
                            font-weight: 500;
                            letter-spacing: 0px;
                            line-height: 17.38px;
                            color: rgba(38, 38, 38, 1);
                            text-align: left;
                            vertical-align: top;
                        }
                    }

                    .bottom {
                        width: 252px;
                        height: 26px;
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;

                        p {
                            font-size: 10px;
                            font-weight: 500;
                            letter-spacing: 0px;
                            line-height: 14.48px;
                            color: rgba(38, 38, 38, 1);
                            text-align: left;
                            vertical-align: top;
                        }
                    }
                }

            }

        }
    }
}
</style>