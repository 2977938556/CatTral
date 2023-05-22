<!-- <template>
    <div class="mjsd">
        <h1>猫迹指南</h1>
    </div>
</template>

<script>
export default {
    name: "CarMjsdPage"
}
</script>
 -->

<template>
    <div>
        <div class="comments">
            <div v-for="comment in comments" :key="comment.id">
                <p>{{ comment.content }}</p>
                <button @click="reply(comment.id)">回复</button>
            </div>
        </div>
        <div>
            <input ref="inputRef" type="text" @focus="setType('a')" @blur="checkEmpty" style="border:1px solid red;" />
            <button @click="sendCommentOrReply">{{ commentType === 'a' ? '发表评论' : '回复' }}</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
        const inputRef = ref(null);
        const commentType = ref("a"); // 初始为评论状态

        const comments = [
            { id: 1, content: "评论1" },
            { id: 2, content: "评论2" },
            { id: 3, content: "评论3" },
        ];

        function setType(type) {
            commentType.value = type;
            if (type === "b") {
                inputRef.value.focus(); // 设置输入框获取焦点
            }
        }

        function reply(id) {
            setType("b"); // 切换为回复状态
            console.log("回复评论 " + id);
        }

        function checkEmpty() {
            if (commentType.value === "b" && !inputRef.value.value.trim()) {
                setType("a"); // 重置为评论状态
            }
        }

        function sendCommentOrReply() {
            if (commentType.value === "a") {
                console.log("发送评论", inputRef.value.value);
            } else {
                console.log("发送回复", inputRef.value.value);
            }
        }

        return {
            inputRef,
            commentType,
            comments,
            setType,
            reply,
            checkEmpty,
            sendCommentOrReply,
        };
    },
};
</script>