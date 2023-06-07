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
            <p>猫迹商店</p>
        </template>

        <template #right>
            <router-link to="/home/mjgs/storyfrom">
                我要发布
            </router-link>
        </template>
    </CartStatusBav>

    <!-- 用户的故事 -->
    <div class="mjgz-box">
        <div class="mjgz-center">
            <div class="mjgz-center-item" v-for="item in 4">
                <!-- 用户infor数据模块 -->
                <CarUserInfo>
                    <template #top>
                        <p>浏览109</p>
                    </template>
                </CarUserInfo>
                <router-link to="/home/mjgs/detai/1">
                    <!-- 中间的数据 -->
                    <div class="mjgz-center-item-center">
                        <p>这是疫情前的冬天，被同学们喂的圆滚滚的一只长得嗷呜嗷呜，但叫起来哼哼唧唧的橘猫，是个弟弟～情期间被饿瘦了！但是依旧帅气
                            已绝育，所以右耳缺了一个小角，远看看不出来～</p>
                    </div>
                    <!-- 底部的数据 -->
                    <div class="mjgz-center-item-botton">
                        <img src="https://img.js.design/assets/img/643b6308de870f0cddb481be.png#6df78166f791ad7153c37bf3f3d4d054"
                            alt="">
                    </div>
                </router-link>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: "CatMjgsPage"
}
</script>



<style lang="less" scoped>
.mjgz-box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background: @background-color ;

    .mjgz-center {
        width: 345px;
        height: 100%;
        min-height: 400px;

        // 这个是每一个故事模块
        .mjgz-center-item {
            width: 100%;
            height: 100%;
            max-height: 400px;
            overflow: hidden;
            margin-top: 20px;
            border-radius: 10px;
            background: white;




            // 内容区域

            .mjgz-center-item-center {
                width: 324px;
                height: 58px;
                margin: 0 auto;

                p {
                    height: 38px;
                    font-size: @heading2-font-size;
                    font-weight: 500;
                    color: @heading-color;
                    vertical-align: top;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-align: center;
                }
            }

            .mjgz-center-item-botton {
                width: 344px;
                height: 170px;
                overflow: hidden;
                border-radius: 10px;

                img {
                    object-fit: cover;
                    width: 344px;
                    height: 170px;
                }
            }

        }




    }

}
</style>
