<template>
    <div class="message">
        <CartStatusBav :isstyle="false">
            <template #center>
                <p class="tltes">消息</p>
            </template>
        </CartStatusBav>

        <div class="message-conent">
            <div class="message-item">
                <a href="javascript:;">
                    <div class="message-item-center">
                        <!-- 头像 -->
                        <div class="message-user-img">
                            <div>
                                <img src="../../assets/image/cat-message-tz.png" alt="领养通知">
                            </div>
                            <span>9</span>
                        </div>
                        <!-- 信息 -->
                        <div class="message-xiaoxi">
                            <div class="xiaoxi-center">
                                <p class="title">申请通知</p>
                                <p class="content">你好，我想知道这只猫是在哪里呢？我想养一只猫你好，我想知道这只猫是在哪里呢？我想养一只猫你好，我想知道这只猫是在哪里呢？我想养一只猫</p>
                            </div>
                        </div>
                        <!-- 时间 -->
                        <div class="message-time">
                            <p>21:30</p>
                        </div>
                    </div>
                </a>
            </div>
            <div class="message-item" v-for="(item, index) in 20" :key="index">
                <a href="javascript:;">
                    <div class="message-item-center">
                        <!-- 头像 -->
                        <div class="message-user-img">
                            <div>
                                <img class="user"
                                    src="https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg!0x0.webp"
                                    alt="领养通知">
                            </div>
                            <span>9</span>
                        </div>
                        <!-- 信息 -->
                        <div class="message-xiaoxi">
                            <div class="xiaoxi-center">
                                <p class="title">申请通知</p>
                                <p class="content">你好，我想知道这只猫是在哪里呢？我想养一只猫你好，我想知道这只猫是在哪里呢？我想养一只猫你好，我想知道这只猫是在哪里呢？我想养一只猫</p>
                            </div>
                        </div>
                        <!-- 时间 -->
                        <div class="message-time">
                            <p>21:30</p>
                        </div>
                    </div>
                </a>
            </div>

        </div>


        <cat-loding></cat-loding>

    </div>
</template>


<style lang="less" scoped>
.message-conent {
    width: 100%;
    height: 100%;
    // border: 1px solid red;

    .message-item {
        width: 375px;
        height: 76px;
        // border: 1px solid red;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid @background-color;

        // 主体内容区域
        .message-item-center {
            width: 345px;
            height: 64px;
            // background: red;
            display: flex;
            justify-content: space-between;


            // 头像区域
            .message-user-img {
                width: 68px;
                height: 63px;
                display: flex;
                align-items: center;
                position: relative;


                div {
                    width: 48px;
                    height: 48px;
                    background: @transition-color;
                    border-radius: 100px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;


                    img {
                        object-fit: cover;
                        width: 25px;
                        height: 30px;
                    }

                    .user {
                        object-fit: cover;
                        width: 100%;
                        height: 100%;
                    }

                }

                span {
                    display: block;
                    background: @primary-color;
                    width: auto;
                    width: 20px;
                    line-height: 20px;
                    height: 20px;
                    position: absolute;
                    right: 13px;
                    border-radius: 10px;
                    top: 1px;
                    font-size: @body-font-size;
                    font-weight: 500;
                    letter-spacing: 0px;
                    color: @background-color;
                    text-align: center;
                }


            }

            // 消息区域
            .message-xiaoxi {
                width: 250px;
                height: 63px;
                // border: 1px solid red;
                display: flex;
                align-items: center;
                justify-content: center;

                .title {
                    font-size: 12px;
                    font-weight: 500;
                    letter-spacing: 0px;
                    color: @heading-color;
                }

                .xiaoxi-center {
                    // border: 1px solid red;
                    width: 250px;
                    height: 40px;

                    .content {
                        font-size: @body-font-size;
                        font-weight: 500;
                        letter-spacing: 0px;
                        color: @secondary-text-color;
                        vertical-align: top;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }


            }

            // 时间区域
            .message-time {
                width: 32px;
                height: 63px;
                // border: 1px solid red;

                p {
                    font-size: 8px;
                    font-weight: 500;
                    letter-spacing: 0px;
                    color: @heading-color;
                    text-align: right;
                }

            }


        }
    }
}
</style>
