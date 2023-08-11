<template>
    <div class="c enter">
        <div v-if="cityList.length == 0">lodgin</div>
        <div v-else>
            <select v-model="province" name="sheng">
                <option v-for="item in cityList" :key="item.code" :value="item.code">{{ item.name }}</option>
            </select>
            <select v-model="city" name="shi" v-if="province !== '1'">
                <option v-for="item in cityData" :disabled="cityData && cityData.length == 0" :key="item.code"
                    :value="item.code">{{ item.name }}
                </option>
            </select>
            <select v-model="county" name="qu" v-if="province !== '1'">
                <option v-for="item in countyData" :disabled="countyData && countyData.length == 0" :key="item.code"
                    :value="item.code">{{ item.name }}</option>
            </select>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import { computed, ref, reactive, watch, toRaw } from 'vue';
export default {
    name: "CatAddrs",
    emits: ["changes"],
    props: {
        AddsCode: {
            type: [Object],
            default: {},
        }
    },
    setup(props, { emit }) {
        let cityList = ref([])

        // // 先调用方法获取数据
        GetCityJson().then(value => {
            cityList.value = value
        })


        // // 这里是数据双向绑定设置的code
        let province = ref(props.AddsCode.provinceCode || "1");
        let city = ref(props.AddsCode.cityCode || "2");
        let county = ref(props.AddsCode.countyCode || "3");



        // // 这个是需要提交的数据
        const changeResult = reactive({
            provinceCode: '',// 省code
            provinceName: '',// 省名称
            cityCode: '',// 市code
            cityName: '',// 市名称
            countyCode: '',// 县市区code
            countyName: '',// 县市区名称
            fullLocation: ''
        })


        //计算出市级别的数据
        let cityData = computed(() => {
            return cityList.value.find(item => item.code == province.value)?.areaList || []
        })


        //计算出区级别的数据
        let countyData = computed(() => {
            return cityData.value.find(item => item.code == city.value)?.areaList || []
        })



        // 收集数据
        let addData = (type) => {
            changeResult.provinceCode = province.value
            changeResult.cityCode = city.value
            changeResult.countyCode = county.value
            if (type == true) {
                changeResult.provinceName = "全国"
                changeResult.cityName = "市"
                changeResult.countyName = "区"
            } else {
                changeResult.provinceName = cityList.value.find(item => item.code == province.value)?.name || ""
                changeResult.cityName = cityData.value.find(item => item.code == city.value)?.name || ""
                changeResult.countyName = countyData.value.find(item => item.code == county.value)?.name || ""
            }

            changeResult.fullLocation = `${changeResult.provinceName}|${changeResult.cityName}|${changeResult.countyName}`
        }


        // 监听 省 
        // 因为如果用户选择了全国那么就需要设置为 后面的市区为2和3
        // 并且收集数据发送请求
        // 注意：必须一开始就需要发送数据
        watch(() => province.value, (newVal, olVal) => {
            if (newVal == "1") {
                city.value = '2'
                county.value = '3'
                addData(true)
                emit("changes", { isFlage: true, changeResult: toRaw(changeResult) })
            } else {
                city.value = ''
                county.value = ''
                emit("changes", { isFlage: false, changeResult: toRaw(changeResult) })
            }
        }, { immediate: true })


        // 监听 市
        // 这里判断非全国的数据并且不等于空的情况
        // 并且收集数据发送请求 这一由于是选择了两个非全国的数据所以呢需要返回一个false作为判断条件
        watch(() => city.value, (newVal, olVal) => {
            if (newVal != '2' && newVal != "") {
                county.value = ''
                addData(false)
                emit("changes", { isFlage: false, changeResult: toRaw(changeResult) })
            }
        })


        //  这里判断非全国的数据并且不等于空的情况 
        // 收集数据发送请求
        watch(() => county.value, (newVal, olVal) => {
            if (newVal != '' && newVal != '3') {
                addData(false)
                emit("changes", { isFlage: true, changeResult: toRaw(changeResult) })
            }
        })



        return { cityList, city, province, county, changeResult, cityData, countyData }
    }







}

// 获取城市数据
// 缓存，防止后期会再次发送请求
let GetCityJson = () => {
    return new Promise((resolve, reject) => {
        // 先判断本地是否有数据
        if (window.cityData) {
            resolve(window.cityData)
        } else {
            axios('https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json').then(({ data }) => {
                data.unshift({
                    code: '1', level: 0, name: '全国', areaList: [{
                        code: '2',
                        level: 1,
                        name: '市',
                        areaList: [
                            {
                                code: '3',
                                level: 2,
                                name: '区',
                            }
                        ]
                    }]
                })
                window.cityData = data
                resolve(data)
            })
        }
    })
}
</script>


<style lang="less" scoped>
.c {
    display: flex;
    justify-content: space-around;

    div {
        width: 100%;
        display: flex;
        justify-content: center;
        justify-content: center;

        // height: 77px;
        select {
            width: 88px;
            padding: 4px;
            border-radius: 4px;
            border: none;
            background: @background-color;
            // margin: 1px;
            padding: 4px;
            font-size: 14px;

            option {
                border-radius: 10px;
                border: none;
            }
        }

    }

}
</style>