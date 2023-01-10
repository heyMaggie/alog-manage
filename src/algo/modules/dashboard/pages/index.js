import React from "react";
import styles from "./style.module.less";
import "./main.less";
import "./style.less";
import echarts from "echarts";
import "echarts-liquidfill";
import { Form, Tabs, Badge } from "antd";
import Table from "@/components/Table";
import TagLabel from "@/components/Tag";

const { TabPane } = Tabs;
import { connect } from "react-redux";

import aa from "../../assets/icon/1aa.png";
import bb from "../../assets/icon/2bb.png";
import cc from "../../assets/icon/3cc.png";
import dd from "../../assets/icon/4dd.png";
import ee from "../../assets/icon/5ee.png";
class RegularWay extends React.PureComponent {
    state = {
        activeName: "0",
        summaryObj: {
            user_cnt: "0",
            algo_cnt: "0",
            trade_vol: "0",
            order_cnt: "0",
            provider_cnt: "0",
            total_user_cnt: "",
        },
        market_rate: {
            huge: "0",
            big: "0",
            middle: "0",
            small: "0",
        },
        algo_nameList: [], //算法列表
        selectIndex: "0",
        assessList: [],
        // assessList: [{ id: 1 }, { id: 2 }, { id: 3 }],
        pageTotal: 0,
        pageObj: { page: 1, pageNum: 4 },
        algoContrastList: [],
        quoteData: [], //行情更新数据
        netData: [], //网关数据
        delayData: [], //行情延迟
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let noTime = values["pickerTime"].length < 1;
                let params = {
                    securityId: values.securityId,
                    uuserId: values.uuserId,
                    countWay: values.countWay,
                    startTime: noTime
                        ? ""
                        : Date.parse(values["pickerTime"][0]) * 1000,
                    endTime: noTime
                        ? ""
                        : Date.parse(values["pickerTime"][1]) * 1000,
                };
                this.setState({
                    numberText: values.countWay == "0" ? "笔" : "元",
                });
                this.getData(params);
            }
        });
    };
    generateChart = (list, type) => {
        let fiexdDate = [
            "09:30",
            "09:31",
            "09:32",
            "09:33",
            "09:34",
            "09:35",
            "09:36",
            "09:37",
            "09:38",
            "09:39",
            "09:40",
            "09:41",
            "09:42",
            "09:43",
            "09:44",
            "09:45",
            "09:46",
            "09:47",
            "09:48",
            "09:49",
            "09:50",
            "09:51",
            "09:52",
            "09:53",
            "09:54",
            "09:55",
            "09:56",
            "09:57",
            "09:58",
            "09:59",
            "10:00",
            "10:01",
            "10:02",
            "10:03",
            "10:04",
            "10:05",
            "10:06",
            "10:07",
            "10:08",
            "10:09",
            "10:10",
            "10:11",
            "10:12",
            "10:13",
            "10:14",
            "10:15",
            "10:16",
            "10:17",
            "10:18",
            "10:19",
            "10:20",
            "10:21",
            "10:22",
            "10:23",
            "10:24",
            "10:25",
            "10:26",
            "10:27",
            "10:28",
            "10:29",
            "10:30",
            "10:31",
            "10:32",
            "10:33",
            "10:34",
            "10:35",
            "10:36",
            "10:37",
            "10:38",
            "10:39",
            "10:40",
            "10:41",
            "10:42",
            "10:43",
            "10:44",
            "10:45",
            "10:46",
            "10:47",
            "10:48",
            "10:49",
            "10:50",
            "10:51",
            "10:52",
            "10:53",
            "10:54",
            "10:55",
            "10:56",
            "10:57",
            "10:58",
            "10:59",
            "11:00",
            "11:01",
            "11:02",
            "11:03",
            "11:04",
            "11:05",
            "11:06",
            "11:07",
            "11:08",
            "11:09",
            "11:10",
            "11:11",
            "11:12",
            "11:13",
            "11:14",
            "11:15",
            "11:16",
            "11:17",
            "11:18",
            "11:19",
            "11:20",
            "11:21",
            "11:22",
            "11:23",
            "11:24",
            "11:25",
            "11:26",
            "11:27",
            "11:28",
            "11:29",
            "11:30/13:00",
            "13:01",
            "13:02",
            "13:03",
            "13:04",
            "13:05",
            "13:06",
            "13:07",
            "13:08",
            "13:09",
            "13:10",
            "13:11",
            "13:12",
            "13:13",
            "13:14",
            "13:15",
            "13:16",
            "13:17",
            "13:18",
            "13:19",
            "13:20",
            "13:21",
            "13:22",
            "13:23",
            "13:24",
            "13:25",
            "13:26",
            "13:27",
            "13:28",
            "13:29",
            "13:30",
            "13:31",
            "13:32",
            "13:33",
            "13:34",
            "13:35",
            "13:36",
            "13:37",
            "13:38",
            "13:39",
            "13:40",
            "13:41",
            "13:42",
            "13:43",
            "13:44",
            "13:45",
            "13:46",
            "13:47",
            "13:48",
            "13:49",
            "13:50",
            "13:51",
            "13:52",
            "13:53",
            "13:54",
            "13:55",
            "13:56",
            "13:57",
            "13:58",
            "13:59",
            "14:00",
            "14:01",
            "14:02",
            "14:03",
            "14:04",
            "14:05",
            "14:06",
            "14:07",
            "14:08",
            "14:09",
            "14:10",
            "14:11",
            "14:12",
            "14:13",
            "14:14",
            "14:15",
            "14:16",
            "14:17",
            "14:18",
            "14:19",
            "14:20",
            "14:21",
            "14:22",
            "14:23",
            "14:24",
            "14:25",
            "14:26",
            "14:27",
            "14:28",
            "14:29",
            "14:30",
            "14:31",
            "14:32",
            "14:33",
            "14:34",
            "14:35",
            "14:36",
            "14:37",
            "14:38",
            "14:39",
            "14:40",
            "14:41",
            "14:42",
            "14:43",
            "14:44",
            "14:45",
            "14:46",
            "14:47",
            "14:48",
            "14:49",
            "14:50",
            "14:51",
            "14:52",
            "14:53",
            "14:54",
            "14:55",
            "14:56",
            "14:57",
            "14:58",
            "14:59",
            "15:00",
            "15:01",
            "15:02",
            "15:03",
            "15:04",
            "15:05",
            "15:06",
            "15:07",
            "15:08",
            "15:09",
            "15:10",
            "15:11",
            "15:12",
            "15:13",
            "15:14",
            "15:15",
            "15:16",
            "15:17",
            "15:18",
            "15:19",
            "15:20",
            "15:21",
            "15:22",
            "15:23",
            "15:24",
            "15:25",
            "15:26",
            "15:27",
            "15:28",
            "15:29",
            "15:30",
            "15:31",
            "15:32",
            "15:33",
            "15:34",
            "15:35",
            "15:36",
            "15:37",
            "15:38",
            "15:39",
            "15:40",
            "15:41",
            "15:42",
            "15:43",
            "15:44",
            "15:45",
            "15:46",
            "15:47",
            "15:48",
            "15:49",
            "15:50",
            "15:51",
            "15:52",
            "15:53",
            "15:54",
            "15:55",
            "15:56",
            "15:57",
            "15:58",
            "15:59",
            "16:00",
            "16:01",
            "16:02",
            "16:03",
            "16:04",
            "16:05",
            "16:06",
            "16:07",
            "16:08",
            "16:09",
            "16:10",
            "16:11",
            "16:12",
            "16:13",
            "16:14",
            "16:15",
            "16:16",
            "16:17",
            "16:18",
            "16:19",
            "16:20",
            "16:21",
            "16:22",
            "16:23",
            "16:24",
            "16:25",
            "16:26",
            "16:27",
            "16:28",
            "16:29",
            "16:30",
            "16:31",
            "16:32",
            "16:33",
            "16:34",
            "16:35",
            "16:36",
            "16:37",
            "16:38",
            "16:39",
            "16:40",
            "16:41",
            "16:42",
            "16:43",
            "16:44",
            "16:45",
            "16:46",
            "16:47",
            "16:48",
            "16:49",
            "16:50",
            "16:51",
            "16:52",
            "16:53",
            "16:54",
            "16:55",
            "16:56",
            "16:57",
            "16:58",
            "16:59",
            "17:00",
            "17:01",
            "17:02",
            "17:03",
            "17:04",
            "17:05",
            "17:06",
            "17:07",
            "17:08",
            "17:09",
            "17:10",
            "17:11",
            "17:12",
            "17:13",
            "17:14",
            "17:15",
            "17:16",
            "17:17",
            "17:18",
            "17:19",
            "17:20",
            "17:21",
            "17:22",
            "17:23",
            "17:24",
            "17:25",
            "17:26",
            "17:27",
            "17:28",
            "17:29",
            "17:30",
            "17:31",
            "17:32",
            "17:33",
            "17:34",
            "17:35",
            "17:36",
            "17:37",
            "17:38",
            "17:39",
            "17:40",
            "17:41",
            "17:42",
            "17:43",
            "17:44",
            "17:45",
            "17:46",
            "17:47",
            "17:48",
            "17:49",
            "17:50",
            "17:51",
            "17:52",
            "17:53",
            "17:54",
            "17:55",
            "17:56",
            "17:57",
            "17:58",
            "17:59",
            "18:00",
        ];
        let option;
        let isNull = false;
        let seriesList = [];
        function singelLine(params) {
            let lineObj = { name: "", data: [] };
            fiexdDate.forEach((item, i) => {
                lineObj.name = params.algo_name;
                lineObj.data[i] = "";
                //容错处理
                if (!params.time_line) {
                    params.time_line = [];
                } else {
                    params.time_line.forEach((subitem) => {
                        // console.log(subitem.time_point, item);
                        if (subitem.time_point == item) {
                            lineObj.data[i] = subitem.score;
                        }
                    });
                }
            });
            return lineObj;
        }
        if (!list.length) {
            // this.$message.error('该时间段暂无数据');
            isNull = true;
        } else {
            list.forEach((params) => {
                seriesList.push(singelLine(params));
            });
            let colorList = ["#65A6FF", "#0be2ff", "#59CC7F", "#FAD337"];
            seriesList.forEach((item, i) => {
                // 有值
                if (item.data.some((item) => item)) {
                    isNull = false;
                } else {
                    isNull = true;
                }
                item.type = "line";
                item.smooth = true;
                item.showSymbol = true;
                item.showAllSymbol = true;
                item.itemStyle = {
                    color: colorList[i],
                };
                item.connectNulls = true;
                item.areaStyle = {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: colorList[i],
                            },
                            {
                                offset: 1,
                                color: "rgba(255,255,255,0)",
                            },
                        ],
                        false
                    ),
                    opacity: 0.2,
                    shadowColor: "rgba(0, 0, 0, 0.1)",
                    shadowBlur: 10,
                };
            });
        }
        option = {
            legend: {
                // data: ['算法1', '算法2', '算法3', '算法4'],
                bottom: 14,
                icon: "circle",
                itemWidth: 8,
                x: "center",
                textStyle: { color: " #999" },
            },
            tooltip: {
                trigger: "axis",
                backgroundColor: "#1F2329",
                boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.15)",
                borderColor: "#1F2329",
                textStyle: {
                    color: "#fff",
                },
            },
            grid: {
                left: "3px",
                right: "15px",
                bottom: "50px",
                top: "42px",
                containLabel: true,
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: fiexdDate,
                axisPointer: {
                    type: "line",
                    lineStyle: { color: "#BDBEBF" },
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#E9E9E9",
                        type: "dashed",
                    },
                },
                axisLabel: {
                    interval: 29,
                    // rotate: 30,
                    color: "#000",
                    // x轴字体颜色
                },
                axisTick: {
                    show: true, //显示X轴刻度
                    lineStyle: {
                        color: "#E9E9E9",
                    },
                },
                axisLine: {
                    // 刻度线的颜色
                    show: true,
                    lineStyle: {
                        color: "#E8E8E8",
                    },
                },
            },
            yAxis: [
                {
                    type: "value",
                    name: `单位：（分数）`,
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false, //隐藏X轴刻度
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "#E9E9E9",
                            type: "dashed",
                        },
                    },
                    axisLabel: {
                        color: "#000",
                    },
                    nameTextStyle: {
                        color: "#888",
                        padding: [0, 0, 0, 35],
                    },
                    // min: isNull ? 0 : null,
                    // max: isNull ? 10 : null
                    min: 0,
                    max: 10,
                },
            ],
            series: seriesList,
        };
        var myChart = echarts.init(document.getElementById(type));
        myChart.clear();
        myChart.setOption(option);
        myChart.resize();
    };
    chartResize = () => {
        let domList = ["tradeOrder", "cancelTradeOrder", "dealTradeOrder"];
        domList.forEach((item) => {
            echarts.init(document.getElementById(item)).resize();
        });
    };

    componentDidMount() {
        this.getSummarydata();
        // this.getOptionList();
        setTimeout(() => {
            this.getOptionList();
        }, 200);
        this.getQuoteRefresh();
        this.getNetworkInfo();
        this.getQuoteDelay();
    }
    getSummarydata = () => {
        // let params = {
        //     start_time: 1671552000,
        //     end_time: 1671638340,
        //     user_id: "aUser0000105",
        // };
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let today = year + "-" + month + "-" + day;
        // console.log(today);
        let start_time = new Date(`${today} 00:00`).getTime() / 1000;
        let end_time = new Date(`${today} 23:59`).getTime() / 1000;
        let query = {
            start_time,
            end_time,
            user_id: sessionStorage.getItem("userName"),
        };
        http.post({
            url: "/assess/summary",
            data: query,
        })
            .then((res) => {
                console.log("dashbaord ", res);
                this.setState({
                    summaryObj: res,
                    market_rate: res.market_rate,
                });
                this.getSemicircle("pie2", res.side);
                this.getWaterEchart(res.progress);
            })
            .catch(() => {
                this.getSemicircle("pie2", []);
                this.getWaterEchart(0);
            });
        // });
    };
    getOptionList = () => {
        let query = {
            choose_type: 5,
        };
        http.post({
            url: "/assess/algoSelect",
            data: query,
        })
            .then((res) => {
                if (res.code == 200) {
                    console.log("getOptionList", res);
                    // this.algo_nameList = res.algo_type || [];
                    this.setState({
                        algo_nameList: res.algo_type || [],
                    });
                    this.getFerfAlgolist();
                } else {
                    return Promise.reject(new Error("请求异常"));
                }
            })
            .catch((err) => {
                console.log("getOptionList error-----", err);
                // this.generateChart([], "dashboardMain1");
                // this.getRadarChart([]);
            });
    };
    getFerfAlgolist = (pageObj = { page: 1, pageNum: 4 }) => {
        this.pageObj = pageObj;
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let today = year + "-" + month + "-" + day;
        let start_time = new Date(`${today} 00:00`).getTime() / 1000;
        let end_time = new Date(`${today} 23:59`).getTime() / 1000;
        let query = {
            start_time: start_time,
            end_time: end_time,
            algo_type_name: this.state.algo_nameList[this.state.activeName],
            page: pageObj.page,
            limit: pageObj.pageNum,
            user_id: sessionStorage.getItem("userName"),
            // start_time: 1671552000,
            // end_time: 1671638340,
            // user_id: "aUser0000105",
        };
        http.post({
            url: "/assess/algoList",
            data: query,
        })
            .then((res) => {
                console.log("algoList ", res);
                if (res.code == 200) {
                    // this.assessList = res.list ? res.list : [];
                    // console.log(this.assessList);
                    // this.algoContrastList = res.assess;
                    // this.pageTotal = res.total;
                    this.setState({
                        assessList: res.list ? res.list : [],
                        algoContrastList: res.assess,
                        pageTotal: res.total,
                    });
                    // this.generateChart(this.algoContrastList, "dashboardMain1");
                    // this.getRadarChart(this.algoContrastList);
                    if (this.state.assessList.length) {
                        // this.$nextTick(() => {
                        this.state.assessList.forEach((item, i) => {
                            // this.$refs[`pieList${i}${this.activeName}`].height = '50px';
                            // this.$refs[`pieList${i}${this.activeName}`].width = '300px';
                            // console.log(
                            //     this.refs[`pieList${i}${this.state.activeName}`]
                            // );
                            this.getSemicircle(
                                `pieList${i}${this.state.activeName}`,
                                {
                                    buy: item.side.buy,
                                    sell: item.side.sell,
                                }
                            );
                        });
                        // });
                    }
                } else {
                    // this.generateChart([], "dashboardMain1");
                    // this.getRadarChart([]);
                }
            })
            .catch((erro) => {
                // this.generateChart([], "dashboardMain1");
                // this.getRadarChart([]);
            });
    };
    getSemicircle = (type, data) => {
        // console.log(type, data);
        if (!data) {
            data.buy = "0";
            data.sell = "0";
        }
        data.buy = Number(data.buy).toFixed(1) / 1;
        data.sell = Number(data.sell).toFixed(1) / 1;
        var chartDom = document.getElementById(type);
        var myChart = echarts.init(chartDom);
        var option;
        var option2;
        option = {
            series: [
                {
                    type: "gauge",
                    startAngle: 180,
                    center: ["30%", "37%"],
                    endAngle: 0,
                    min: 0,
                    max: 100,
                    radius: "50%",
                    progress: {
                        show: true,
                        width: 6,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                1,
                                0,
                                [
                                    {
                                        offset: 0,
                                        color: "rgba(154, 223, 174, 1)",
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(63, 173, 96, 1)",
                                    },
                                ]
                            ),
                        },
                    },
                    pointer: { show: false },
                    axisLine: {
                        lineStyle: {
                            width: 6,
                            color: [[1, "#DEEFE4"]],
                        },
                    },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    axisLabel: {
                        distance: 5,
                        color: "#666",
                        fontSize: 0,
                        formatter: function (value) {
                            if (value === 0 || value === 100) {
                                return value + "%";
                            }
                        },
                    },
                    anchor: {
                        show: false,
                        showAbove: false,
                        size: 25,
                        itemStyle: {
                            borderWidth: 60,
                        },
                    },
                    title: {
                        show: true,
                        offsetCenter: [0, "30%"],
                        fontSize: 18,
                    },
                    detail: {
                        valueAnimation: true,
                        fontSize: 22,
                        lineHeight: 10,
                        color: "#333333",
                        fontWeight: "bold",
                        offsetCenter: ["70px", "0%"],
                        formatter: function (value) {
                            return value + "{a1|%}" + "\n" + "{a|买} ";
                        },
                        rich: {
                            a1: {
                                color: "#333",
                            },
                            a: {
                                color: "#999",
                                fontSize: 12,
                                fontWeight: "400",
                                padding: [-20, 132, 0, 0],
                            },
                        },
                    },
                    data: [
                        {
                            value: data.buy,
                            name: "",
                        },
                    ],
                },
                {
                    type: "gauge",
                    startAngle: 180,
                    center: ["30%", "88%"],
                    endAngle: 0,
                    min: 0,
                    max: 100,
                    radius: "50%",
                    progress: {
                        show: true,
                        width: 6,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                1,
                                0,
                                [
                                    {
                                        offset: 0,
                                        color: "rgba(158, 199, 255, 1)",
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(109, 164, 239, 1)",
                                    },
                                ]
                            ),
                        },
                    },
                    pointer: { show: false },
                    axisLine: {
                        lineStyle: {
                            width: 6,
                            color: [[1, "#E6EEF9"]],
                        },
                    },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    axisLabel: {
                        distance: 5,
                        color: "#666",
                        fontSize: 0,
                        formatter: function (value) {
                            if (value === 0 || value === 100) {
                                return value + "%";
                            }
                        },
                    },
                    anchor: {
                        show: false,
                        showAbove: false,
                        size: 25,
                        itemStyle: {
                            borderWidth: 60,
                        },
                    },
                    title: {
                        show: true,
                        offsetCenter: [0, "30%"],
                        fontSize: 18,
                    },
                    detail: {
                        valueAnimation: true,
                        fontSize: 22,
                        lineHeight: 10,
                        color: "#333333",
                        fontWeight: "bold",
                        offsetCenter: ["70px", "0%"],
                        formatter: function (value) {
                            return value + "{a1|%}" + "\n" + "{a|卖} ";
                        },
                        rich: {
                            a1: {
                                color: "#333",
                            },
                            a: {
                                color: "#999",
                                fontSize: 12,
                                fontWeight: "400",
                                padding: [-20, 132, 0, 0],
                            },
                        },
                    },
                    data: [
                        {
                            value: data.sell,
                            name: "",
                        },
                    ],
                },
            ],
        };
        option2 = {
            series: [
                {
                    type: "gauge",
                    startAngle: 180,
                    center: ["30%", "100%"],
                    endAngle: 0,
                    min: 0,
                    max: 100,
                    radius: "200%",
                    progress: {
                        show: true,
                        width: 8,
                        itemStyle: {
                            color: echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                {
                                    offset: 0,
                                    color: "rgba(154, 223, 174, 1)",
                                },
                                {
                                    offset: 1,
                                    color: "rgba(63, 173, 96, 1)",
                                },
                            ]),
                        },
                    },
                    pointer: { show: false },
                    axisLine: {
                        lineStyle: {
                            width: 8,
                            color: [[1, "#DEEFE4"]],
                        },
                    },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    axisLabel: {
                        distance: 5,
                        color: "#666",
                        fontSize: 0,
                        formatter: function (value) {
                            if (value === 0 || value === 100) {
                                return value + "%";
                            }
                        },
                    },
                    detail: {
                        valueAnimation: true,
                        fontSize: 26,
                        lineHeight: 10,
                        color: "#333333",
                        fontWeight: "bold",
                        offsetCenter: [0, "-12%"],
                        formatter: function (value) {
                            return value + "{a1|%}" + "\n" + "{a|买} ";
                        },
                        rich: {
                            a1: {
                                color: "#333",
                            },
                            a: {
                                color: "#999",
                                fontSize: 14,
                                padding: [-8, 120, 0, 0],
                            },
                        },
                    },
                    data: [
                        {
                            value: data.buy,
                            name: "",
                        },
                    ],
                },
                {
                    type: "gauge",
                    startAngle: 180,
                    center: ["83%", "100%"],
                    endAngle: 0,
                    min: 0,
                    max: 100,
                    radius: "200%",
                    progress: {
                        show: true,
                        width: 8,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                1,
                                0,
                                [
                                    {
                                        offset: 0,
                                        color: "rgba(158, 199, 255, 1)",
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(109, 164, 239, 1)",
                                    },
                                ]
                            ),
                        },
                    },
                    pointer: { show: false },
                    axisLine: {
                        lineStyle: {
                            width: 8,
                            color: [[1, "#E6EEF9"]],
                        },
                    },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    axisLabel: {
                        distance: 5,
                        color: "#666",
                        fontSize: 0,
                        formatter: function (value) {
                            if (value === 0 || value === 100) {
                                return value + "%";
                            }
                        },
                    },
                    anchor: {
                        show: false,
                    },

                    detail: {
                        valueAnimation: true,
                        fontSize: 26,
                        lineHeight: 10,
                        color: "#333333",
                        fontWeight: "bold",
                        offsetCenter: [0, "-12%"],
                        formatter: function (value) {
                            return value + "{a1|%}" + "\n" + "{a|卖} ";
                        },
                        rich: {
                            a1: {
                                color: "#333",
                            },
                            a: {
                                color: "#999",
                                fontSize: 14,
                                padding: [-8, 120, 0, 0],
                            },
                        },
                    },
                    data: [
                        {
                            value: data.sell,
                            name: "",
                        },
                    ],
                },
            ],
        };
        if (type == "pie2") {
            myChart.setOption(option);
        } else {
            myChart.setOption(option2);
        }
        // myChart.setOption(option);
    };
    getWaterEchart = (data) => {
        data = data.toFixed(1) / 100;
        // data = (data.toFixed(2) / 100).toFixed(1);
        // console.log((6.6564277985276).toFixed(2) / 100, 'dddddd');
        var chartDom = document.getElementById("water-polo");
        var myChart = echarts.init(chartDom);
        var option;
        option = {
            backgroundColor: "#fff",
            series: [
                {
                    type: "liquidFill",
                    data: [data],
                    radius: "95%",
                    // 水球颜色
                    color: [
                        {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: "rgba(145, 213, 255, 0.3)",
                                },
                                {
                                    offset: 1,
                                    color: "rgba(50, 129, 255, 0.8)",
                                },
                            ],
                        },
                    ],
                    // outline  外边
                    outline: {
                        // show: false
                        borderDistance: 3,
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: "#D1E3FF",
                        },
                    },
                    label: {
                        formatter: function (param) {
                            return (
                                "{b|" +
                                (param.value * 100).toFixed(1) +
                                "}{c| %}"
                            );
                        },
                        textStyle: {
                            rich: {
                                b: {
                                    fontSize: 28,
                                    fontWeight: "bold",
                                    color: "#000",
                                },
                                c: {
                                    fontSize: 12,
                                    color: "#000",
                                },
                            },
                        },
                    },
                    // 内图 背景色 边
                    backgroundStyle: {
                        color: "#fff",
                    },
                    itemStyle: {
                        opacity: 1, // 波浪的透明度
                        shadowBlur: 0, // 波浪的阴影范围
                    },
                },
            ],
        };
        myChart.setOption(option, true);
    };
    callback = (key) => {
        console.log("activeName ", key);
        this.setState({ activeName: key }, () => {
            this.getFerfAlgolist();
        });
    };
    //行情延迟
    getQuoteDelay = () => {
        http.get({
            url: "/quote-delay/queryQuoteDelay",
            // data: query,
        }).then((res) => {
            console.log("行情延迟 ", res);
            let arr = res.data.map((item, index) => {
                item.key = index;
                return item;
            });
            this.setState(
                {
                    delayData: arr,
                },
                () => {
                    //generateChart
                    // this.generateChart([], "dashboardMain1");
                    this.generateChart([], "dashboardMain1");
                }
            );
        });
    };
    //行情更新
    getQuoteRefresh = () => {
        http.get({
            url: "/quote-delay/quoteRefresh",
            // data: query,
        }).then((res) => {
            console.log("getQuoteRefresh ", res);
            let arr = res.data.map((item, index) => {
                item.key = index;
                return item;
            });
            console.log(arr);
            this.setState({
                quoteData: arr,
            });
        });
    };
    //网关信息
    getNetworkInfo = () => {
        http.get({
            url: "/counter-info/networkInfo",
            // data: query,
        }).then((res) => {
            // console.log("getNetworkInfo ", res);
            let arr = res.data.map((item, index) => {
                item.key = index;
                return item;
            });
            // console.log(arr);
            parseArrDict(arr, "status", "counterStatus");
            this.setState({
                netData: arr,
            });
        });
    };
    render() {
        let { summaryObj, market_rate, assessList } = this.state;
        let columns = [
            {
                title: "更新时间",
                dataIndex: "origTime",
            },
            {
                title: "深市股票数量",
                dataIndex: "secQuantitySz",
            },
            {
                title: "沪市股票数量",
                dataIndex: "secQuantitySh",
            },
        ];
        let columns2 = [
            {
                title: "股票网关",
                dataIndex: "gwAddr",
            },
            {
                title: "状态",
                dataIndex: "status",
                render: (text, record) => {
                    // return (
                    //     <TagLabel record={record.status} type="warn"></TagLabel>
                    // );
                    if (record.status.indexOf("0") == 0) {
                        return (
                            <div>
                                <TagLabel
                                    record={record.status}
                                    type="warn"
                                ></TagLabel>
                            </div>
                        );
                    } else if (record.status.indexOf("1") == 0) {
                        return (
                            <TagLabel
                                record={record.status}
                                type="success"
                                color="#3281FF"
                            ></TagLabel>
                        );
                    }
                    return <TagLabel record={record.status}></TagLabel>;
                },
            },
            {
                title: "时间",
                dataIndex: "createTime",
            },
        ];
        let scroll = { x: 400, y: 300 };
        let pag = {
            pageSize: 4,
            showQuickJumper: false,
            showSizeChanger: false,
        };
        return (
            <div className={styles.dashboardWrap}>
                {/* <div className={styles.content}> */}
                <div className="echart-container">
                    <div className="showBorder">
                        <div className="card">
                            <div className="card-title line-img">用户数量</div>
                            {/* <el-tooltip :content="`用户总数量：${summaryObj.total_user_cnt}`" placement="top">
                        <img className="query-icon" src="../../assets/icon/query.png"
                    /></el-tooltip> */}
                            <div className="circular">
                                <span className="number">
                                    {summaryObj.user_cnt}
                                    <span className="unit">(个)</span>
                                </span>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-title line-img">算法数量</div>
                            {/* <el-tooltip :content="`算法总数量：${summaryObj.total_algo_cnt}`" placement="top">
                        <img className="query-icon" src="../../assets/icon/query.png"
                    /></el-tooltip> */}
                            <div className="circular special-green">
                                <span className="number">
                                    {summaryObj.algo_cnt}
                                    <span className="unit">(个)</span>
                                </span>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-title">交易量</div>
                            <div className="blue-card">
                                <span className="number">
                                    {Number(summaryObj.trade_vol).toFixed(2)}
                                    <div className="unit">(元)</div>
                                </span>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-title line-img">订单数</div>
                            {/* <el-tooltip content="说明：订单总数量" placement="top">
                        <img className="query-icon" src="../../assets/icon/query.png"
                    /></el-tooltip>  */}
                            <div className="circular">
                                <span className="number">
                                    {summaryObj.order_cnt}
                                    <span className="unit">(个)</span>
                                </span>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-title">买卖占比</div>
                            <div className="medium-blue-card" id="pie2"></div>
                        </div>
                        <div className="card">
                            <div className="card-title line-img">厂商总数</div>
                            {/* <el-tooltip :content="`厂商总数量：${summaryObj.total_provider_cnt}`" placement="top">
                        <img className="query-icon" src="../../assets/icon/query.png"
                    /></el-tooltip> */}
                            <div className="circular special-pink">
                                <span className="number">
                                    {summaryObj.provider_cnt}
                                    <span className="unit">(个)</span>
                                </span>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-title line-img">资金占比</div>
                            {/* <el-tooltip content="说明：XXX" placement="top">
                        <img className="query-icon" src="../../assets/icon/query.png"
                    /></el-tooltip>  */}
                            <div className="gather">
                                <div className="min-blue-card">
                                    <span className="number">
                                        {Number(market_rate.huge).toFixed(1)}
                                        <span className="unit">%</span>
                                    </span>
                                    <div className="explain">超大市值</div>
                                </div>
                                <div className="min-blue-card">
                                    <span className="number">
                                        {Number(market_rate.big).toFixed(1)}
                                        <span className="unit">%</span>
                                    </span>
                                    <div className="explain">大市值</div>
                                </div>
                                <div className="min-blue-card">
                                    <span className="number">
                                        {Number(market_rate.middle).toFixed(1)}
                                        <span className="unit">%</span>
                                    </span>
                                    <div className="explain">中市值</div>
                                </div>
                                <div className="min-blue-card">
                                    <span className="number">
                                        {Number(market_rate.small).toFixed(1)}
                                        <span className="unit">%</span>
                                    </span>
                                    <div className="explain">小市值</div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-title line-img">完成度</div>
                            <div id="water-polo" className="water-polo"></div>
                        </div>
                    </div>
                    <div
                        // className="showClounm"
                        style={{
                            backgroundColor: "white",
                            borderRadius: "12px",
                            marginBottom: "12px",
                        }}
                    >
                        <Tabs onChange={this.callback}>
                            {/* <TabPane tab="Tab 1" key="1">
                            Content of Tab Pane 1
                        </TabPane>*/}
                            {this.state.algo_nameList.length > 0 &&
                                this.state.algo_nameList.map((item, i) => {
                                    return (
                                        <TabPane tab={item} key={i}>
                                            <div className="showClounm">
                                                <div>
                                                    <div className="pane-card">
                                                        {/* <div v-for="(sonItem, j) in assessList" :key="sonItem.provider"> */}
                                                        {assessList.length >
                                                            0 &&
                                                            assessList.map(
                                                                (
                                                                    sonItem,
                                                                    j
                                                                ) => {
                                                                    return (
                                                                        <div
                                                                            className="rowlist"
                                                                            key={
                                                                                j
                                                                            }
                                                                        >
                                                                            <div className="rowtitle">
                                                                                {
                                                                                    sonItem.provider
                                                                                }
                                                                            </div>
                                                                            <div className="blue-mincard">
                                                                                <div className="tit">
                                                                                    <img
                                                                                        src={
                                                                                            aa
                                                                                        }
                                                                                    />
                                                                                    用户数量
                                                                                </div>
                                                                                <div className="number">
                                                                                    {
                                                                                        sonItem.user_cnt
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="blue-mincard">
                                                                                <div className="tit">
                                                                                    <img
                                                                                        src={
                                                                                            bb
                                                                                        }
                                                                                    />
                                                                                    交易量
                                                                                </div>
                                                                                <div className="number">
                                                                                    <span className="symbol">
                                                                                        ￥
                                                                                    </span>
                                                                                    {Number(
                                                                                        sonItem.trade_vol
                                                                                    ).toFixed(
                                                                                        2
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div className="blue-mincard">
                                                                                <div className="tit">
                                                                                    <img
                                                                                        src={
                                                                                            cc
                                                                                        }
                                                                                    />
                                                                                    收益率
                                                                                </div>
                                                                                <Badge
                                                                                    count={
                                                                                        sonItem.profit_rate >
                                                                                        0
                                                                                            ? "盈利"
                                                                                            : "亏损"
                                                                                    }
                                                                                    style={
                                                                                        sonItem.profit_rate >
                                                                                        0
                                                                                            ? {
                                                                                                  backgroundColor:
                                                                                                      "#F05F5E",
                                                                                              }
                                                                                            : {
                                                                                                  backgroundColor:
                                                                                                      "#4DCB73",
                                                                                              }
                                                                                    }
                                                                                >
                                                                                    <div className="number">
                                                                                        <span className="symbol">
                                                                                            {sonItem.profit_rate >
                                                                                            0
                                                                                                ? "+"
                                                                                                : " "}
                                                                                        </span>
                                                                                        {Number(
                                                                                            sonItem.profit_rate
                                                                                        ).toFixed(
                                                                                            2
                                                                                        )}
                                                                                        <span className="unit">
                                                                                            %
                                                                                        </span>
                                                                                    </div>
                                                                                </Badge>
                                                                            </div>
                                                                            <div className="blue-mincard">
                                                                                <div className="tit">
                                                                                    <img
                                                                                        src={
                                                                                            dd
                                                                                        }
                                                                                    />
                                                                                    订单数量
                                                                                </div>
                                                                                <div className="number">
                                                                                    {
                                                                                        sonItem.order_cnt
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="blue-mincard">
                                                                                <div className="tit">
                                                                                    <img
                                                                                        src={
                                                                                            ee
                                                                                        }
                                                                                    />
                                                                                    买卖占比
                                                                                </div>
                                                                                <div
                                                                                    style={{
                                                                                        height: "50px",
                                                                                        width: "300px",
                                                                                    }}
                                                                                    id={`pieList${j}${i}`}
                                                                                    ref={`pieList${j}${i}`}
                                                                                ></div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        {assessList.length ==
                                                            0 && (
                                                            <div className="rowlist">
                                                                <div className="rowtitle">
                                                                    厂商 —
                                                                </div>
                                                                <div className="blue-mincard">
                                                                    <div className="tit">
                                                                        <img
                                                                            src={
                                                                                aa
                                                                            }
                                                                        />
                                                                        用户数量
                                                                    </div>
                                                                    <div className="number empty-number">
                                                                        —
                                                                    </div>
                                                                </div>
                                                                <div className="blue-mincard">
                                                                    <div className="tit">
                                                                        <img
                                                                            src={
                                                                                bb
                                                                            }
                                                                        />
                                                                        交易总额
                                                                    </div>
                                                                    <div className="number empty-number">
                                                                        —
                                                                    </div>
                                                                </div>
                                                                <div className="blue-mincard">
                                                                    <div className="tit">
                                                                        <img
                                                                            src={
                                                                                cc
                                                                            }
                                                                        />
                                                                        收益率
                                                                    </div>
                                                                    <div className="number empty-number">
                                                                        —
                                                                    </div>
                                                                </div>
                                                                <div className="blue-mincard">
                                                                    <div className="tit">
                                                                        <img
                                                                            src={
                                                                                dd
                                                                            }
                                                                        />
                                                                        订单数量
                                                                    </div>
                                                                    <div className="number empty-number">
                                                                        —
                                                                    </div>
                                                                </div>
                                                                <div className="blue-mincard">
                                                                    <div className="tit">
                                                                        <img
                                                                            src={
                                                                                ee
                                                                            }
                                                                        />
                                                                        买卖占比
                                                                    </div>
                                                                    <div className="number empty-number">
                                                                        —
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPane>
                                    );
                                })}
                        </Tabs>
                    </div>
                    <div className="showPortrait">
                        <div className="card">
                            <div className="card-title">
                                <span>行情延时</span>
                                {/* <span className="more" >查看更多<span className="icon el-icon-arrow-right"></span></span> */}
                            </div>
                            <div
                                className="dashboardMain1"
                                id="dashboardMain1"
                            ></div>
                        </div>
                        <div className="card">
                            <div className="card-title">
                                <span>行情更新</span>
                            </div>
                            {/* <div id="radar" className="radarCard"></div> */}
                            <div className="litTable">
                                <Table
                                    columns={columns}
                                    dataSource={this.state.quoteData}
                                    scroll={scroll}
                                    pagination={pag}
                                />
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-title">
                                <span>网关信息</span>
                            </div>
                            <div className="litTable">
                                <Table
                                    columns={columns2}
                                    dataSource={this.state.netData}
                                    scroll={scroll}
                                    pagination={pag}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            // </div>
        );
    }
}
// export default Form.create()(RegularWay);
const mapStateToProps = (state, ownProps) => {
    return {
        path: state.RouterModel.path,
    };
};
export default connect(mapStateToProps, null)(Form.create()(RegularWay));
