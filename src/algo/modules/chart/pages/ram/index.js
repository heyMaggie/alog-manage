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
class Ram extends React.PureComponent {
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
    getData = (params, count = 0) => {
        http.get({
            url: "/ssh/ram",
        }).then((res) => {
            console.log(res.data, "请求成功");
            let list = res.data;
            if (res.code == 0) {
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
                    dataset: {
                        dimensions: ["x", "y"],
                        source: res.data,
                    },
                    legend: {
                        data: ["CPU1"],
                        left: 0,
                    },
                    grid: {
                        left: "1%",
                        right: "4%",
                        bottom: "9%",
                        top: "60px",
                        containLabel: true,
                    },
                    xAxis: {
                        type: "category",
                        boundaryGap: false,
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
                            name: "单位：（GB）",
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
                                    type: "dashed",
                                },
                            },
                            axisLabel: {
                                formatter: "{value} GB",
                            },
                            nameTextStyle: {
                                padding: [0, 15, 0, 0],
                            },
                            // nameGap: 10,
                        },
                        {
                            gridIndex: 0,
                            type: "value",
                            name: "单位（%）",
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
                            axisLabel: {
                                formatter: "{value}%",
                            },
                            nameTextStyle: {
                                padding: [0, 0, 0, 34],
                            },
                        },
                    ],
                    series: [
                        {
                            name: "CPU1",
                            type: "line",
                            smooth: true,
                            showSymbol: false,
                            itemStyle: {
                                normal: {
                                    color: "#65A6FF",
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
                };
                var myChart = echarts.init(document.getElementById("main2"));
                myChart.setOption(option);
            } else {
                message.error("服务异常");
            }
        });
    };
    componentDidMount() {
        this.getData();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        function onChange(value) {
            console.log(`selected ${value}`);
        }

        function onSearch(val) {
            console.log("search:", val);
        }
        return (
            <div className={styles.container}>
                <div className={styles.search}>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator("arithmetic")(
                                <Select
                                    showSearch
                                    style={{ width: 160 }}
                                    placeholder="选择内存"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        option.props.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="0">全部</Option>
                                    <Option value="1">CPU1</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item style={{ marginLeft: "12px" }}>
                            {getFieldDecorator("range-time-picker")(
                                <RangePicker
                                    style={{ width: 432 }}
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                />
                            )}
                        </Form.Item>
                        <Form.Item style={{ float: "right" }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: 76 }}
                            >
                                确定
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div>
                    <div
                        id="main2"
                        style={{ width: "100%", height: "500px" }}
                    ></div>
                </div>
            </div>
        );
    }
}
export default Form.create()(Ram);
