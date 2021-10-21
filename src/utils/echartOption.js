// import { graphic } from "echarts";

let getBarOption = (params) => {
    let list = params.data;
    let xArr = list.map((item) => item.x);
    let yArr = list.map((item) => item.y);
    let option = {
        // color:"rgba(24,144,255,0.7)"
        grid: {
            left: "4%",
            right: "25%",
            containLabel: true,
        },
        tooltip: {
            trigger: "axis",
            formatter: function (params) {
                return (
                    params[0].name +
                    xunit +
                    "<br />" +
                    params[0].marker +
                    params.seriesName +
                    ":" +
                    params[0].value +
                    yunit
                );
            },
        },
        dataZoom: [
            {
                type: "inside",
            },
            {
                type: "slider",
            },
        ],
        xAxis: {
            data: xArr,
            name: params.xAxis.name,
            type: "category",
            nameGap: "5",
            splitLine: {
                show: false,
            },
        },
        yAxis: {
            name: params.yAxis.name,
            type: "value",
            boundaryGap: [0, "100%"],
            splitLine: {
                show: false,
            },
            max: function (value) {
                return Math.ceil(value.max * 1.1);
            },
        },
        series: {
            name: params.seriesName ? params.seriesName : "时延",
            type: "bar",
            showSymbol: false,
            data: yArr,
            barMaxWidth: 40,
            smooth: true,
            areaStyle: {
                normal: {
                    color: "#ddd",
                },
            },
            // itemStyle: {
            //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //         { offset: 0, color: "#83bff6" },
            //         { offset: 0.5, color: "#188df0" },
            //         { offset: 1, color: "#188df0" },
            //     ]),
            // },
            // emphasis: {
            //     itemStyle: {
            //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //             { offset: 0, color: "#2378f7" },
            //             { offset: 0.7, color: "#2378f7" },
            //             { offset: 1, color: "#83bff6" },
            //         ]),
            //     },
            // },
        },
    };
    return Object.assign(params, option);
};
let getLineOption = (params) => {
    let xunit = params.xSeriesUnit ? params.xSeriesUnit : "";
    let yunit = params.ySeriesUnit ? params.ySeriesUnit : "";
    let gridRight = params.gridRight ? params.gridRight : "13%";
    let list = params.data;
    // for (let i = 0; i < 100; i++) {
    //     list.push({
    //         x: Math.ceil(Math.random() * 10 + 11),
    //         y: Math.ceil(Math.random() * 300),
    //     });
    // }
    let xArr = list.map((item) => item.x);
    let yArr = list.map((item) => item.y);
    // let yMax = Math.max.apply(Math, yArr) * 0.95;
    // let level = params.level;
    // if (yMax > 0) {
    //     level = [
    //         Math.ceil(yMax * 0.2),
    //         Math.ceil(yMax * 0.4),
    //         Math.ceil(yMax * 0.6),
    //         Math.ceil(yMax * 0.8),
    //         Math.ceil(yMax),
    //     ];
    // } else {
    //     level = [10000, 20000, 30000, 40000, 50000];
    // }
    let option = {
        // title: {
        //   text: "深市解析后未知行情数目"
        // },
        tooltip: {
            trigger: "axis",
            formatter: function (params) {
                return (
                    params[0].name +
                    xunit +
                    "<br />" +
                    params[0].marker +
                    params[0].seriesName +
                    ":" +
                    params[0].value +
                    yunit
                );
            },
        },
        grid: {
            left: "2%",
            right: gridRight,
            // containLabel: true,
        },
        xAxis: {
            name: params.xAxis.name,
            boundaryGap: false,
            data: xArr,
        },
        yAxis: {
            name: params.yAxis.name,
            // splitLine: {
            //     show: false,
            // },
            // max: function (value) {
            //     return Math.ceil(value.max * 1.1);
            // },
        },
        dataZoom: [
            {
                type: "inside",
            },
            {
                type: "slider",
            },
        ],
        // visualMap: {
        //     top: 10,
        //     right: 10,
        //     pieces: [
        //         {
        //             gt: 0,
        //             lte: level[0],
        //             color: "#096",
        //         },
        //         {
        //             gt: level[0],
        //             lte: level[1],
        //             color: "#ffde33",
        //         },
        //         {
        //             gt: level[1],
        //             lte: level[2],
        //             color: "#ff9933",
        //         },
        //         {
        //             gt: level[2],
        //             lte: level[3],
        //             color: "#cc0033",
        //         },
        //         {
        //             gt: level[3],
        //             lte: level[4],
        //             color: "#660099",
        //         },
        //         {
        //             gt: level[4],
        //             color: "#7e0023",
        //         },
        //     ],
        //     outOfRange: {
        //         color: "#999",
        //     },
        // },
        series: {
            type: "line",
            data: yArr,
            name: params.yAxis.name ? params.yAxis.name : "",
            itemStyle: {
                normal: {
                    // color: "#8cd5c2", //改变折线点的颜色
                    lineStyle: {
                        color: "#18a0ff", //改变折线颜色
                    },
                },
            },
            // markLine: {
            //     silent: true,
            //     data: [
            //         {
            //             yAxis: level[0],
            //         },
            //         {
            //             yAxis: level[1],
            //         },
            //         {
            //             yAxis: level[2],
            //         },
            //         {
            //             yAxis: level[3],
            //         },
            //         {
            //             yAxis: level[4],
            //         },
            //     ],
            // },
        },
    };
    return Object.assign(params, option);
};
let getMulLineOption = (params) => {
    let gridRight = params.gridRight ? params.gridRight : "6%";
    let list = params.data;
    let xArr = list.x;
    let legendArr = [];
    let series = list.y.map((item) => {
        // console.log(item);
        legendArr.push(item.name);
        return {
            ...item,
            type: "line",
        };
    });
    let option = {
        theme: "light",
        tooltip: {
            trigger: "axis",
        },
        legend: {
            data: legendArr,
        },
        grid: {
            left: "4%",
            right: gridRight,
            boundaryGap: false,
            containLabel: true,
        },
        xAxis: {
            name: params.xAxis.name,
            type: "category",
            boundaryGap: false,
            data: xArr,
        },
        yAxis: {
            name: params.yAxis.name,
            type: "value",
        },
        series: series,
    };
    return Object.assign(params, option);
};

export { getBarOption, getLineOption, getMulLineOption };
