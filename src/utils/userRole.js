import MessageJs from '@/components/libray/CarMessage.js'



export const RoleFm = (UserData, text = "当前账号封禁中，如有问题请申诉") => {
    return new Promise((reolve, reject) => {
        if (UserData?.role == "ban") {
            MessageJs({ type: "error", text: "账户当前被封禁" })
            return reject({ valve: false })
        } else if (UserData?.role == "delete") {
            MessageJs({ type: "error", text: "没有当前账户" })
            return reject({ valve: false })
        }
        return reolve({ valve: true })
    })
}