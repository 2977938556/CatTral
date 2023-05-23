// 01 处理时间戳
export const timeFormat = (time) => {
    if (!time) return "暂无时间"
    // 处理年份的数据
    var date = new Date(time);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();



    // 获取当年的年份数据
    const now = new Date();
    const currentYear = now.getFullYear();

    // 这里是判断如果是当年发布的那么就不需要添加年份否则就需要添加当年的年份
    if (currentYear !== year) {
        var formattedDate = year + '.' + month + '.' + (day < 10 ? '0' + day : day);
    } else {
        var formattedDate = month + '.' + (day < 10 ? '0' + day : day);
    }


    return formattedDate;
}


// 处理地区的
export const Processingregion = (city, run = 2) => {
    if (city.provinceCode == "1") {
        return city.provinceName
    }

    if (run == 1) {
        return city.provinceName
    }
    if (run == 2) {
        return city.cityName
    }
    if (run == 3) {
        return city.countyName
    }


    return "地区"
}
