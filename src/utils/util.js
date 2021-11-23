//日期格式化 函数
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1
                    ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length)
            );
    return fmt;
};

//给每个路由加  module 属性
export let routeModule = (moduleName, routeArr) => {
    // console.log(moduleName);
    // console.log(routeArr);
    routeArr.forEach((route) => {
        route.module = moduleName;
        if (route.children) {
            routeModule(moduleName, route.children);
        }
    });
    return routeArr;
};
//解析字典
export let parseDict = (dict) => {
    window.parseDict = (resArr) => {
        let dictKeys = Object.keys(dict);
        // console.log(dictKeys);
        resArr.forEach((item, index) => {
            if (!item.hasOwnProperty("id")) {
                item.id = index;
            }
            for (let i = 0; i < dictKeys.length; i++) {
                let key = dictKeys[i];
                if (item.hasOwnProperty(key)) {
                    for (let j = 0; j < dict[key].length; j++) {
                        let dictionary = dict[key][j];
                        // console.log(dictionary);
                        if (item[key] == dictionary.key) {
                            // item[key] = dictionary.value;
                            item[key] = item[key] + "-" + dictionary.value;
                        }
                    }
                }
            }
        });
    };
    window.parseDictValue = (resArr) => {
        let dictKeys = Object.keys(dict);
        // console.log(dictKeys);
        resArr.forEach((item, index) => {
            if (!item.hasOwnProperty("id")) {
                item.id = index;
            }
            for (let i = 0; i < dictKeys.length; i++) {
                let key = dictKeys[i];
                if (item.hasOwnProperty(key)) {
                    item[key + "Value"] = item[key];
                    for (let j = 0; j < dict[key].length; j++) {
                        let dictionary = dict[key][j];
                        // console.log(dictionary);
                        if (item[key] == dictionary.key) {
                            // item[key] = dictionary.value;
                            item[key + "Value"] = dictionary.value;
                        }
                    }
                }
            }
        });
    };
    window.parseArrDict = (arr, mykey, realKey) => {
        let dictArr = dict[realKey];
        // console.log(arr, dictArr);
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < dictArr.length; j++) {
                // console.log(dictArr[j].key, arr[i][mykey]);
                if (dictArr[j].key == arr[i][mykey]) {
                    arr[i][mykey] = arr[i][mykey] + "-" + dictArr[j].value;
                    break;
                }
            }
        }
        return arr;
    };
};
