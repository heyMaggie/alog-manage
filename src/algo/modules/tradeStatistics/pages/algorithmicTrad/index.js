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
import { connect } from "react-redux";

const { RangePicker } = DatePicker;
const { Option } = Select;
import moment from "moment";
import { lte } from "semver";
import { tuple } from "antd/lib/_util/type";
class AlgorithmicTrad extends React.PureComponent {
    state = {
        numberText: "笔",
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let noTime = values["pickerTime"].length < 1;
                let params = {
                    securityId: values.securityId,
                    algorithmId: values.algorithmId,
                    uuserId: values.uuserId,
                    countWay: values.countWay,
                    startTime: noTime
                        ? ""
                        : Date.parse(values["pickerTime"][0]),
                    endTime: noTime ? "" : Date.parse(values["pickerTime"][1]),
                };
                this.getData(params);
                this.setState({
                    numberText: values.countWay == "0" ? "笔" : "元",
                });
            }
        });
    };
    getData = (params, count = 0) => {
        http.post({
            url: "/statistics/algo",
            data: params,
        }).then((res) => {
            if (res.code == 0) {
                let data = res.data;
                let echartLen = Object.keys(data);
                echartLen.forEach((item) => {
                    this.generateChart(data[item], item);
                });
            } else {
                message.error("服务异常");
            }
        });
    };
    generateChart = (list, type) => {
        let lineObj = {
            algoOrder: { name: "母单信息", color: "#F78B7F" },
            childOrder: { name: "子单信息", color: "#FFD747" },
            dealAlgoOrder: { name: "成交信息", color: "#65D2FF" },
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
                    name: `单位：(${this.state.numberText})`,
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
                    nameTextStyle: {
                        padding: [0, 0, 0, 20],
                    },
                },
            ],
            series: [
                {
                    name: "算法单数",
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
    chartResize = () => {
        let domList2 = ["algoOrder", "childOrder", "dealAlgoOrder"];
        domList2.forEach((item) => {
            echarts.init(document.getElementById(item)).resize();
        });
    };
    componentDidMount() {
        this.getData({
            securityId: "",
            algorithmId: "",
            uuserId: "",
            startTime: "",
            endTime: "",
            countWay: "0",
        });
    }
    render() {
        console.log(this.props.path);
        window.cpuResize = this.chartResize;
        if (this.props.path == "/main/tradeStatistics/algorithmicTrad") {
            window.addEventListener("resize", window.cpuResize);
        } else {
            window.removeEventListener("resize", window.cpuResize);
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.container}>
                <div className={styles.search}>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator("countWay", {
                                initialValue: "0",
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
                                    <Option value="0">笔数</Option>
                                    <Option value="1">金额</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item style={{ marginLeft: "12px" }}>
                            {getFieldDecorator("algorithmId", {
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
                            {getFieldDecorator("length", {
                                initialValue: "",
                            })(
                                <Select
                                    showSearch
                                    style={{ width: 160 }}
                                    placeholder="选择算法"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="">全部算法</Option>
                                    <Option value="1">日内回转</Option>
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
                    <div id="algoOrder" className={styles.chartBox}></div>
                    <div id="childOrder" className={styles.chartBox}></div>
                    <div id="dealAlgoOrder" className={styles.chartBox}></div>
                    {/* <div
                        id="main_1"
                        style={{ width: "48%", height: "500px", float: "left" }}
                    ></div>
                    <div
                        id="main_2"
                        style={{
                            width: "48%",
                            height: "500px",
                            float: "right",
                        }}
                    ></div> */}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        path: state.RouterModel.path,
    };
};
export default connect(mapStateToProps, null)(Form.create()(AlgorithmicTrad));
