export default {
    namespaced: true,
    state: () => {
        return {
            // 用户信息
            profile: JSON.parse(localStorage.getItem('user-store'))?.user.profile || {
                _id: "",
                username: "",
                slogin: "",
                bgimgUrl: "",
                user_id: "",
                created_at: "",
                role: "",
                token: "",
                configuration_information: ""
            },
            catLove: [],
            catapply: []
        }
    },
    mutations: {
        // 修改用户数据
        SetUser(state, payload) {
            // 这里直接设置数据
            // state.profile = { ...state.profile, ...payload }
            if (Object.values(payload).length > 0) {
                // 这里是修改用户，由于我偷懒不想结构出数据所以我就采用循环判断的方式
                for (let [key, value] of Object.entries(payload)) {
                    if (key in state.profile) {
                        state.profile[key] = value
                    }
                }
            } else {
                state.profile = {
                    _id: "",
                    username: "",
                    slogin: "",
                    bgimgUrl: "",
                    user_id: "",
                    created_at: "",
                    role: "",
                    token: "",
                    configuration_information: ""
                }

            }
        },
        // 设置收藏数据
        SetCatLove(state, playload) {
            console.log(playload, "01测试");
            // 这里遍历每一个对象添加一个选中的属性
            if (playload.length != 0) {
                console.log(playload, "02测试");
                playload.forEach(item => {
                    item.select = false
                });
            }
            state.catLove = playload
        },// 设置选中还有不选中
        SetCatLoveSelect(state, { checked, id }) {
            let cat = state.catLove.find((item) => item._id == id)
            cat.select = checked
        },
        // 设置我的领养的数据
        SetCatApply(state, playload) {
            state.catapply = playload
        }



    },
    actions: {

    },
    getters: {
        // Getselect: state => (select = true) => {
        //     console.log("测试", select);
        //     return state.catLove.filter(item => item.select == select)
        // }
    }
}