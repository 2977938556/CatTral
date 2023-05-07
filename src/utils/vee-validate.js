// // 导入校验规则
export default {
    username(value) {
        if (!value) return "请输入用户名称"
    },
    password(value) {
        if (!value) return "请输入密码"

    },
    passwordtow(value) {
        if (!value) return "请输入密码02"

    },
    mobile(value) {
        if (!value) return "请输入手机号"

    },
    code(value) {
        if (!value) return "请输入验证码"
    },
}


// export default {
//     username: [
//         { required: true, message: '请输入用户名', trigger: 'blur' },
//         { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符之间', trigger: 'blur' }
//     ],
//     password: [
//         { required: true, message: '请输入密码', trigger: 'blur' },
//         { min: 6, max: 20, message: '密码长度在 6 到 20 个字符之间', trigger: 'blur' }
//     ],
//     passwordtow: [
//         { required: true, message: '请再次输入密码', trigger: 'blur' },
//         { validator: validatePasswordtow, trigger: 'blur' }
//     ],
//     mobile: [
//         { required: true, message: '请输入手机号码', trigger: 'blur' },
//         { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
//     ],
//     code: [
//         { required: true, message: '请输入短信验证码', trigger: 'blur' }
//     ]
// }

// function validatePasswordtow(rule, value) {
//     const password = this.form.password;
//     if (value !== password) {
//         return Promise.reject('两次输入的密码不一致');
//     } else {
//         return Promise.resolve();
//     }
// }
