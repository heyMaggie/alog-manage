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
                lineStyle: {
                    color: "#BDBEBF",
                },
            },
            axisPointer: {
                link: { xAxisIndex: "all" },
                label: {
                    backgroundColor: "#777",
                },
            },
            legend: {
                data: ["人数", "股票量"],
                left: 0,
            },
            grid: {
                left: "1%",
                right: "4%",
                bottom: "3%",
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
                },
                {
                    name: "股票量",
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
                },
            ],
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
                        style={{ width: "100%", height: "600px" }}
                    ></div>
                </div>
            </div>
        );
    }
}
