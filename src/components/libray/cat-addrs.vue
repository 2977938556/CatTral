<template>
    <div class="c enter">
        <!-- <p> {{ cityS.length && cityS[0].areaList }}</p> -->

        <!-- {{ inputCity }} -->
        <p>地区</p>
        <div v-if="cityList && cityList.length">
            <select v-model="province" name="sheng" style="width:100px;">
                <option value="">请选择省</option>
                <option :value="item.code" v-for="item in cityList" :key="item.name">{{ item.name }}</option>
            </select>
            <select v-model="city" name="shi" :disabled="cityArr.length == 0">
                <option value="">请选择市</option>
                <option :value="item.code" v-for="item in cityArr" :key="item.name">{{
                    item.name }}</option>
            </select>
            <select v-model="county" name="qu" :disabled="countyArr.length == 0">
                <option value="">请选择县区</option>
                <option :value="item.code" v-for="item in countyArr" :key="item.name">{{
                    item.name }}</option>
            </select>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import { computed, ref, reactive, watch, toRaw } from 'vue';
export default {
    name: "CatAddrs",
    emits:["changes"],
    props: {
        provinceCode: {
            type: [Number, String],
            default: 110000,
        },// 省code
        cityCode: {
            type: [Number, String],
            default: 110100,
        },// 市code
        countyCode: {
            type: [Number, String],
            default: 110101,
        },// 县市区code
    },
    setup(props, { emit }) {
        let cityList = ref([])

        // 先调用方法获取数据
        GetCityJson().then(value => {
            cityList.value = value
        })

        // 这里是数据双向绑定
        let province = ref('');
        let city = ref('');
        let county = ref('');





        // 保存城市的数据
        let cityArr = ref([])
        // 保存地区的数据
        let countyArr = ref([])



        // 这个是需要提交的数据
        const changeResult = reactive({
            provinceCode: '',// 省code
            provinceName: '',// 省名称
            cityCode: '',// 市code
            cityName: '',// 市名称
            countyCode: '',// 县市区code
            countyName: '',// 县市区名称
            fullLocation: ''
        })



        // 监听省级别的code 查找到城市的数据
        watch(() => province.value, (neval, olval) => {
            // 再修改了省的级别数据需要清空后面已经被选择数据还有code
            cityArr.value = []
            countyArr.value = []
            city.value = ""
            county.value = ""

            if (neval != olval) {
                cityList.value.filter(item => {
                    if (item.code === neval) {
                        cityArr.value = item.areaList
                    }
                })
            }


            // 再省级数据选择后需要清空所有的
            changeResult.provinceCode = ""
            changeResult.cityCode = ""
            changeResult.provinceCode = ""
            changeResult.cityCode = ""
            changeResult.countyCode = ""
            changeResult.provinceName = ""
            changeResult.cityName = ""
            changeResult.countyName = ""
            changeResult.fullLocation = ""



            // 这里是重新赋值给省级数据和城市数据
            changeResult.provinceCode = province.value;
            changeResult.cityCode = city.value;

            // 由于封装的问题所如果用户重新选了那么就需要设置为false帮助父级进行判断
            emit("changes", { isFlage: false, changeResult: toRaw(changeResult) })
        })


        // 监听市级别的数据查找到地区的数据
        watch(() => city.value, (neval, olval) => {
            // 清空城市的数据清空地区的数据
            county.value = ""
            countyArr.value = []
            if (neval != olval || neval != "") {
                cityArr.value.filter((item) => {
                    if (item.code == neval) {
                        countyArr.value = item.areaList
                    }
                })
            }

            // 这里是需要重新赋值
            changeResult.provinceCode = province.value;
            changeResult.cityCode = city.value;

            emit("changes", { isFlage: false, changeResult: toRaw(changeResult) })
        })







        // 监听最后一个返回数据
        watch(() => county.value, (neval, olval) => {
            if (neval != olval && neval != "") {
                // 这里是赋值给code
                changeResult.countyCode = county.value;
                // 这里下面是赋值给name 数据
                changeResult.provinceName = cityList.value.filter(item => item.code === province.value)[0].name
                changeResult.cityName = cityArr.value.filter(item => item.code === city.value)[0].name
                changeResult.countyName = countyArr.value.filter(item => item.code === county.value)[0].name
                // 这里是拼接数据
                changeResult.fullLocation = `${changeResult.provinceName}|${changeResult.cityName}|${changeResult.countyName}`
                // 这里是发送正确的数据给服务器
                // console.log("这里是发送正确的数据给服务器");
                emit("changes", { isFlage: true, changeResult: toRaw(changeResult) })
            }
        })









        return { cityList, province, city, county, cityArr, countyArr, changeResult }







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
    flex-direction: column;


    div {
        width: 100%;
        display: flex;
        justify-content: space-between;
         

        // height: 77px;
        select {
            width: 100px;
            padding: 4px;
            border-radius: 10px;
            border: none;
            background: @background-color;
            margin: 2px;
            font-size: 14px;

            option {
                border-radius: 10px;
                border: none;


            }
        }

    }

}
</style>