import React from "react";
import styles from "./style.module.less";
import echarts from "echarts";
import { TimePicker, Form, Button, Icon, DatePicker, Select } from "antd";

const { RangePicker } = DatePicker;
const { Option } = Select;
class OnlineUser extends React.PureComponent {
    state = { number: "笔" };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let noTime = values["pickerTime"].length < 1;
                let params = {
                    securityId: values.securityId,
                    uuserId: values.uuserId,
                    startTime: noTime
                        ? ""
                        : Date.parse(values["pickerTime"][0]),
                    endTime: noTime ? "" : Date.parse(values["pickerTime"][1]),
                };
                this.setState({
                    number: values.number,
                });
                this.getData(params);
            }
        });
    };
    getData = (params, count = 0) => {
        http.post({
            url: "/statistics/trade",
            data: params,
        }).then((res) => {
            if (res.code == 0) {
                if (res.data.length == 0) {
                    message.error("该时间段暂无数据");
                } else {
                    let data = res.data;
                    let echartLen = Object.keys(data);
                    echartLen.forEach((item) => {
                        this.generateChart(data[item], item);
                    });
                }
            } else {
                message.error("服务异常");
            }
        });
    };
    generateChart = (list, type) => {
        let lineObj = {
            tradeOrder: { name: "普通单信息", color: "#F78B7F" },
            cancelTradeOrder: { name: "撤单信息", color: "#FFD747" },
            dealTradeOrder: { name: "成交信息", color: "#72DF5A" },
        };
        let option = {
            title: {
                top: "12px",
                left: "32px",
                text: "{a|}  " + lineObj[type].name,
                textStyle: {
                    color: "#333333",
                    fontSize: 14,
                    fontWeight: 500,
                    rich: {
                        a: {
                            backgroundColor: "#3281FF",
                            height: 10,
                            width: 2,
                        },
                    },
                },
            },
            textStyle: {
                color: "#333",
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
            dataset: {
                dimensions: ["x", "y"],
                source: list,
            },
            grid: {
                left: "34px",
                right: "32px",
                bottom: "24px",
                top: "75px",
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
                axisLabel: {
                    // interval: 0,
                    // rotate: 30,
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
                    name: `单位：(${this.state.number})`,
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
                    // nameLocation: "200px",
                    nameTextStyle: {
                        align: "center",
                        padding: [0, 0, 0, 20],
                    },
                },
            ],
            series: [
                {
                    name: "普通单数",
                    type: "line",
                    smooth: true,
                    showSymbol: false,
                    // symbol: "circle",
                    itemStyle: {
                        normal: {
                            color: lineObj[type].color,
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
                                        color: lineObj[type].color,
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
            ],
        };
        var myChart = echarts.init(document.getElementById(type));
        myChart.setOption(option);
        myChart.resize();
    };
    componentDidMount() {
        this.getData({
            securityId: "",
            uuserId: "",
            startTime: "",
            endTime: "",
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.container}>
                <div className={styles.search}>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator("number", {
                                initialValue: "笔",
                            })(
                                <Select
                                    showSearch
                                    style={{ width: 160 }}
                                    placeholder="选择单位"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="笔">笔数</Option>
                                    <Option value="元">金额</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item style={{ marginLeft: "12px" }}>
                            {getFieldDecorator("securityId", {
                                initialValue: "",
                            })(
                                <Select
                                    showSearch
                                    style={{ width: 160 }}
                                    placeholder="选择股票"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="">全部股票</Option>
                                    <Option value="000001">平安银行</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item style={{ marginLeft: "12px" }}>
                            {getFieldDecorator("uuserId", {
                                initialValue: "",
                            })(
                                <Select
                                    showSearch
                                    style={{ width: 160 }}
                                    placeholder="选择用户"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="">全部用户</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item style={{ marginLeft: "12px" }}>
                            {getFieldDecorator("pickerTime", {
                                initialValue: [],
                            })(
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
                <div className={styles.chart}>
                    <div id="tradeOrder" className={styles.chartBox}></div>
                    <div
                        id="cancelTradeOrder"
                        className={styles.chartBox}
                    ></div>
                    <div id="dealTradeOrder" className={styles.chartBox}></div>
                </div>
            </div>
        );
    }
}
export default Form.create()(OnlineUser);
