<template>
    <div class="guding"></div>

    <div class="status-bar" :class="{ borders: isstyle == false, shadow: isstyle == true }">
        <div class="status-box">
            <div class="status-bar-left">
                <a href="javascript:;" >
                    <slot name="left"></slot>
                </a>
            </div>
            <div class="status-bar-center">
                <a href="javascript:;">
                    <slot name="center">
                        猫迹首页
                    </slot>
                </a>
            </div>
            <div class="status-bar-right">
                <a href="javascript:;">
                    <slot name="right"></slot>
                </a>
            </div>
        </div>
    </div>
</template>


<script >
export default {
    name: "CartStatusBav",
    emits:["change"],
    props: {
        isstyle: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {

    }
}
</script>


<style lang="less" scoped>
.shadow {
    box-shadow: @default-showdow;
}

.borders {
    border-bottom: 1px solid @background-color;
}

.guding {
    width: 375px;
    height: 44px;
    // border: 1px solid red;
}


.status-bar {
    width: 100%;
    height: 44px;
    background: @white-color;
    display: flex;
    align-items: center;
    justify-content: center;



    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;



    .status-box {
        width: 345px;
        display: flex;
        height: 44px;

        div {
            width: 100%;
            line-height: 44px;
        }

        .status-bar-left {
            display: flex;
            align-items: left;
            justify-content: left;

            a {
                font-size: @heading2-font-size;
                font-weight: 700;
                color: @heading-color;
            }
        }

        .status-bar-center {
            display: flex;
            align-items: center;
            justify-content: center;

            p {
                font-size: @heading1-font-size;
                font-weight: 700;
                color: @heading-color;
            }

            a {
                font-size: @heading1-font-size;
                font-weight: 700;
                color: @heading-color;
            }
        }

        .status-bar-right {
            display: flex;
            align-items: center;
            justify-content: right;

            a {
                /** 文本1 */
                font-size: @heading3-font-size;
                font-weight: 500;
            }
        }
    }

}
</style>