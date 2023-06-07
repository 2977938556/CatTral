<template>
    <li class="center-item">
        <div class="detail-pl-title-user">
            <a href="javascript:;">
                <span>
                    <img src="https://img.js.design/assets/smartFill/img195164da6ef470.jpg" alt="">
                </span>
                <span>
                    <h4>FeiMao@110</h4>
                    <p>测试</p>
                </span>
            </a>
        </div>

        <!-- 评论详情 -->
        <div class="detail-pl-title-content">
            <!-- 分别有三个模块 -->
            <div class="detail-pl-top">
                <p>测试</p>
            </div>
            <!-- 评论详情 -->
            <div class="detail-pl-center">
                <span>
                    <img src="../../assets/image/cat-detail-dz.png" alt="a">
                    <p>点赞</p>
                </span>
                <span>
                    <img src="../../assets/image/cat-detail-pl.png" alt="b">
                    <p>回复</p>
                </span>
            </div>

            <!-- 回复详情 -->
            <div class="detail-pl-hf">
                <ul>
                    <!-- 这里需要进行判断是否有回复的数据 -->
                    <li>
                        <h5>feimao@11-</h5>
                        <span>1111测试</span>
                    </li>
                    <p>
                        <router-link :to="`/comment/detail/1`">
                            共1条评价 >
                        </router-link>
                    </p>
                </ul>
            </div>
        </div>
    </li>
</template>
<script>
export default {
    name: "CarCommentCommponent"
}



</script>






<style lang="less" scoped >
.center-item {
    width: 100%;
    height: auto;
    padding-bottom: 40px;
    box-sizing: border-box;

    // 用户模块
    .detail-pl-title-user {
        width: 100%;
        height: 36px;
        overflow: hidden;

        a {
            display: flex;
            height: auto;

            span:nth-child(1) {
                display: block;
                overflow: hidden;
                border-radius: 100px;
                width: 36px;
                height: 36px;

                img {
                    object-fit: cover;
                    width: 100%;
                    height: 100%;

                }
            }

            span:nth-child(2) {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding-left: 8px;

                h4 {
                    font-size: @heading3-font-size;
                    font-weight: 900;
                    color: @heading-color;
                }

                p {
                    font-size: @secondary-text-font-size;
                    color: @heading-color;
                }
            }
        }
    }


    // 评论模块
    .detail-pl-title-content {
        width: 100%;
        height: auto;

        // 评论模块
        .detail-pl-top {
            width: 345px;
            height: auto;
            padding: 10px;

            p {
                font-size: @heading3-font-size;
                font-weight: 500;
                color: @heading-color;
            }
        }


        // 评论点赞评论模块
        .detail-pl-center {
            width: 300px;
            height: 24px;
            display: flex;
            justify-content: end;
            align-items: center;

            span {
                display: flex;
                position: relative;

            }

            img {
                width: 14px;
                height: 15px;
            }


            p {
                font-size: @heading3-font-size;
                font-weight: 500;
                color: @heading-color;
                padding-left: 4px;
            }

            span:nth-child(1) {
                padding: 20px;

            }

            span:nth-child(1) {
                padding: 10px;

            }





        }

    }

    // 回复模块
    .detail-pl-hf {
        width: 300px;
        height: auto;
        margin: 0 auto;
        border-radius: 20px;
        opacity: 1;
        border-radius: 9px;
        background: rgba(242, 242, 242, 1);

        ul {
            width: 100%;
            height: 100%;
            // background: red;
            padding: 10px;


            li {
                width: 100%;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;

                h5 {
                    flex: 0.3;
                    font-size: @body-font-size;
                    font-weight: 500;
                    color: @transition-color;
                    padding-left: 10px;
                }

                span {
                    flex: 1.2;
                    font-size: @body-font-size;
                    font-weight: 500;
                    padding: -20px;
                    color: rgba(38, 38, 38, 1);
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;

                }
            }

            li:nth-child(1) {
                // padding-top: 10px;
            }

            p {
                a {
                    font-size: @body-font-size;
                    font-weight: 500;
                    color: @transition-color;
                    padding-left: 10px;
                    padding-bottom: 10px;
                }

            }

        }


    }
}

.center-item:nth-child(1) {
    margin-top: 20px;
}
</style>