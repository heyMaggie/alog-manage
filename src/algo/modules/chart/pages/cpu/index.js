import React from "react";
import styles from "./style.module.less";
import echarts from "echarts";
import {
    SearchForm,
    Input,
    TimePicker,
    Form,
    Button,
    Icon,
    DatePicker,
    Select,
} from "antd";

const { RangePicker } = DatePicker;
const { Option } = Select;
export default class Cccx extends React.PureComponent {
    state = {
        searchLoading: false,
        info: [],
        pagination: { total: 0 },
        username: "",
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
            }
        });
    };
    getData2 = (params, count = 0) => {
        let option = {
            textStyle: {
                color: "#333",
            },
            // title: {
            //     text: "折线图堆叠",
            // },
            tooltip: {
                trigger: "axis",
                backgroundColor: "#1F2329",
                boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.15)",
                borderColor: "#1F2329",
                textStyle: {
                    color: "#fff",
                },
            },
            legend: {
                data: ["人数", "股票数量"],
                left: 0,
            },
            grid: {
                left: "1%",
                right: "4%",
                bottom: "9%",
                containLabel: true,
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: [
                    "9-12 10:00",
                    "9-13 10:00",
                    "9-14 10:00",
                    "9-15 10:00",
                    "9-16 10:00",
                    "9-17 10:00",
                    "9-18 10:00",
                ],
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#E9E9E9",
                        type: "dashed",
                    },
                },
                axisTick: {
                    show: true, //显示X轴刻度
                    lineStyle: {
                        color: "#E9E9E9",
                    },
                },
                axisLine: {
                    // 刻度线的颜色
                    show: false,
                },
                axisPointer: {
                    type: "line",
                    lineStyle: { color: "#BDBEBF" },
                },
            },
            yAxis: [
                {
                    type: "value",
                    name: "单位：（股）",
                    nameLocation: "end",
                    axisLine: {
                        show: false,
                    },
                    nameTextStyle: {
                        color: "#666",
                    },
                    axisTick: {
                        show: false, //隐藏X轴刻度
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "#E9E9E9",
                        },
                    },
                },
                {
                    gridIndex: 0,
                    type: "value",
                    name: "单位：（个）",
                    splitLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false, //隐藏X轴刻度
                    },
                    axisLine: {
                        show: false,
                    },
                    min: "0",
                    max: "100",
                },
            ],
            series: [
                {
                    name: "人数",
                    type: "line",
                    stack: "总量",
                    data: [120, 132, 101, 134, 90, 230, 210],
                    smooth: true,
                    showSymbol: false,
                    itemStyle: {
                        normal: {
                            color: "#83BDFF",
                        },
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: "rgba(50, 129, 255, 0.2)",
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(255,255,255,0)",
                                    },
                                ],
                                false
                            ),
                            shadowColor: "rgba(0, 0, 0, 0.1)",
                            shadowBlur: 10,
                        },
                    },
                },
                {
                    name: "股票数量",
                    type: "line",
                    stack: "总量",
                    data: [220, 182, 191, 234, 290, 330, 310],
                    smooth: true,
                    showSymbol: false,
                    itemStyle: {
                        normal: {
                            color: "#FFD747",
                        },
                    },
                    areaStyle: {
                        // background: linear-gradient(360deg, rgba(255, 255, 255, 0) 0%, rgba(50, 129, 255, 0.06) 100%);
                        // background: linear-gradient(360deg, rgba(255, 255, 255, 0) 0%, rgba(255, 215, 71, 0.06) 100%);
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: "rgba(255, 215, 71, 0.2)",
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(255, 255, 255, 0)",
                                    },
                                ],
                                false
                            ),
                            shadowColor: "rgba(0, 0, 0, 0.1)",
                            shadowBlur: 10,
                        },
                    },
                },
            ],
            dataZoom: [
                {
                    type: "inside",
                },
                {
                    type: "slider",
                    height: "20px",
                },
            ],
            // dataZoom: [
            //     {
            //         type: "inside",
            //         xAxisIndex: [0, 1],
            //         start: 0,
            //         end: 100,
            //     },
            //     {
            //         height: "20px",
            //         show: true,
            //         xAxisIndex: [0, 1],
            //         type: "slider",
            //         // top: "80%",
            //         bottom: "0px",
            //         start: 0,
            //         end: 100,
            //     },
            // ],
        };
        var myChart = echarts.init(document.getElementById("main"));
        myChart.setOption(option);
    };
    componentDidMount() {
        this.getData2();
    }
    render() {
        function onChange(value) {
            console.log(`selected ${value}`);
        }

        function onBlur() {
            console.log("blur");
        }

        function onFocus() {
            console.log("focus");
        }

        function onSearch(val) {
            console.log("search:", val);
        }
        return (
            <div className={styles.container}>
                <div className={styles.search}>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="选择算法"
                                optionFilterProp="children"
                                onChange={onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.props.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="0">全部</Option>
                                <Option value="1">Lucy</Option>
                                <Option value="2">Tom</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item style={{ marginLeft: "12px" }}>
                            <RangePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                            />
                        </Form.Item>
                        <Form.Item style={{ float: "right" }}>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div>
                    <div
                        id="main"
                        style={{ width: "100%", height: "500px" }}
                    ></div>
                </div>
            </div>
        );
    }
}

// import React from "react";
// // import { DatePicker, Select } from "antd";
// import ChartComponent from "@/components/ChartComponent";
// import SelectOption from "@/components/SelectOption";

// let secArr = [
//     { key: "0", value: "多核" },
//     // { key: "1", value: "买入" },
//     // { key: "2", value: "卖出" },
// ];
// export default class cpu extends React.PureComponent {
//     state = {
//         info: {},
//         formArr: [
//             {
//                 label: "CPU",
//                 id: "cpu",
//                 initialValue: "0",
//                 component: SelectOption(secArr, { width: "200px" }),
//             },
//         ],
//     };
//     getSearchList = (params, form) => {
//         if (params.side == 0) {
//             params.side = "";
//         }
//         // console.log(params);
//         this.getData(params);
//     };
//     getData = (params, count = 0) => {
//         http.get({
//             url: "/sshInfo/cpu",
//             data: params,
//         }).then((res) => {
//             console.log(res);
//             let list = res.data;
//             let params = {
//                 theme: "light",
//                 title: {
//                     text: "CPU使用率",
//                 },
//                 data: list,
//                 xAxis: {
//                     name: "时间",
//                 },
//                 yAxis: {
//                     name: "使用率",
//                 },
//                 // xSeriesUnit:"",  //x轴单位
//                 ySeriesUnit: "%",
//                 gridRight: "10%",
//                 // level:[200,400,600,800,1000]
//             };
//             let option = getLineOption(params);
//             // console.log(option);
//             this.setState({
//                 info: option,
//             });
//         });
//     };
//     componentDidMount() {
//         this.getData();
//     }

//     render() {
//         let info = this.state.info;
//         return (
//             <div>
//                 <ChartComponent
//                     isShowSearchForm={false}
//                     // getSearchFormFields={this.state.formArr}
//                     getSearchList={this.getSearchList}
//                     dataSource={this.state.info}
//                 ></ChartComponent>
//             </div>
//         );
//     }
// }
