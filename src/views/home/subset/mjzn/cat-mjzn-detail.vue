<template>
    <div class="mjzndetail">
        <!-- 头状态栏 -->
        <CartStatusBav :isstyle="false">
            <!-- 左边内容插槽 -->
            <template #left>
                <!-- 返回 -->
                <CatReturn></CatReturn>
            </template>
            <!-- 中间内容插槽 -->
            <template #center>
                <p>养猫指南</p>
            </template>

            <template #right>
                <span class="shengq"></span>
            </template>
        </CartStatusBav>



        <!-- 内容区域 -->
        <div class="mjzndetail-bg">
            <img src="https://img.js.design/assets/img/6466d94cb2d3df3c0f231835.png#075f6769e57fea12ae72d6e8c1b559a" alt="">
        </div>

        <div class="mjzn-center">
            <!-- 用户信息 -->
            <CarUserInfo Submittime="190浏览量" :type="true" />
            <!-- 标题 -->
            <div class="mjzn-center-title">
                <p>#猫专家告诉你如何科学的养猫，如何科学的养猫，养告诉养猫专家告学的养猫</p>
            </div>
            <!-- 内容 -->
            <div class="mjzn-center-content">
                <p>分享时机，在不同的时机分析用户是否有分享的意愿，提供给他们合适的分享内容，能让分享的效果更好。
                    现在很多APP在用户截图时会自动提示用户是否要进行分享。这个时机确实抓的很棒，一般来说，用户截图大多数时候都是为了分享给他人，少部分是为了留底备份。
                    我们从分享时机、分享形式、分享动机、分享场景4个维度来聊聊「社交分享」的那些事儿。
                    为了借助社交产品的流量，让用户主动分享APP中的内容
                    到社交平台来达到拉新和促活的目的，市场上绝大多数APP
                    有第三方分享的功能，它是内容分发的最有效途径，并且大大降低了企业的营销成本。
                    尤其是刚上线的产品，很难通过产品的内部体系来实现快速的用户增长，所以会更加依赖于分享来达到广泛的传播，获取目标用户。
                    用户主动点击分享 绝大多数APP都是在详情页等需要分享的页面放置一个分享按钮，由用户自行选择分享。这种情况下用户是否分享主要是取决于产品内容本身，比如内容有趣或是有用。在一些APP中设计者会对这个分享按钮加一些鼓励的文案或着重的设计来促进用户分享。
                    用户分享内容到社交媒体或好友，不应该是一种粗暴的强制行为，我们应该在保证产品本身内容有
                </p>
            </div>
        </div>




        <!-- 评论标题内容 -->
        <div class="detail-comment">
            <RecenGood title="评论" :count="`评论${100}`" />
        </div>

        <!-- 渲染评论区内容 -->
        <div class="detail-comment-center">
            <div class="input">
                <input type="text" placeholder="发表评论：">
            </div>
            <ul>
                <!-- 这个是用于处理点赞与回复模块 -->
                <CarCommentCommponent v-for="item in 6" />
                <!-- loding加载效果 -->
                <CatLoding :loading="false" :finished="true" :smail="true" message="没有更多评论哦，快点发布一条评论吧" />
            </ul>
        </div>





    </div>
</template>


<script>
export default {
    name: "CatMjznDetail",
    setup() {

    }
}



</script>


<style lang="less" scoped>
.mjzndetail {
    width: 100%;
    height: 100%;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;


    // 背景图片
    .mjzndetail-bg {
        width: 100%;
        height: 180px;
        overflow: hidden;

        img {
            width: 100%;
            height: 180px;
            object-fit: cover;
        }
    }

    // 文字内容区域
    .mjzn-center {
        width: 345px;
        height: auto;
        margin: 0 auto;

        // 标题
        .mjzn-center-title {
            width: 345px;
            height: auto;
            padding: 2px;
            vertical-align: top;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            p {
                font-size: @heading1-font-size;
                font-weight: 700;
                letter-spacing: 0px;
                line-height: 23.17px;
                color: @heading-color;
            }

        }

        // 内容
        .mjzn-center-content {
            width: 100%;
            height: auto;
            padding-top: 20px;

            p {
                font-size: @heading3-font-size;
                font-weight: 500;
                letter-spacing: 0px;
                line-height: 20px;
                color: @heading-color;
                text-align: left;
                vertical-align: top;
            }
        }
    }



    // 评论的内容
    .detail-comment {
        width: 345px;
        height: 50px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

    }

    .detail-comment-center {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        ul {
            width: 345px;
        }

    }

    //  评论
    .input {
        width: 100%;
        height: 72px;
        position: fixed;
        bottom: 0px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-shadow: @default-showdow;
        background: @white-color;
        z-index: 1000000;

        input {
            width: 100%;
            margin: 20px;
            height: 42px;
            background: @background-color;
            border-radius: 6px;
            padding-left: 10px;
        }
    }


}
</style>