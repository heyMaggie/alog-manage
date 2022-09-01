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
class AlgorithmStatistical extends React.PureComponent {
    state = { userList: [] };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let noTime = values["pickerTime"].length < 1;
            let params = {
                algorithmId: values.algorithmId,
                startTime: noTime
                    ? ""
                    : Date.parse(values["pickerTime"][0]) * 1000,
                endTime: noTime
                    ? ""
                    : Date.parse(values["pickerTime"][1]) * 1000,
            };
            this.getData(params);
        });
    };
    getData = (params, count = 0) => {
        http.post({
            data: params,
            url: "/statistics/algorithmStatistics",
        }).then((res) => {
            if (res.code == 0) {
                let chartList = res.data;
                let dom1 = document.getElementById("main4");
                let isNull = false;
                if (chartList.length == 0) {
                    message.error("该时间段暂无数据");
                    isNull = true;
                } else {
                    isNull = false;
                }
                // else {
                let option = {
                    textStyle: {
                        color: "#333",
                    },
                    dataset: {
                        dimensions: ["x", "y1", "y2"],
                        source: chartList,
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
                    legend: {
                        data: ["标的数量", "人数"],
                        left: 0,
                    },
                    grid: {
                        left: "1%",
                        right: "20px",
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
                            name: "单位：（个）",
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
                            min: isNull ? 0 : null,
                            max: isNull ? 100 : null,
                            // nameGap: "40",
                            // nameTextStyle: {
                            //     padding: [0, 83, 0, 0],
                            // },
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
                            name: "标的数量",
                            type: "line",
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
                            name: "人数",
                            type: "line",
                            stack: "总量",
                            smooth: true,
                            showSymbol: false,
                            itemStyle: {
                                normal: {
                                    color: "#FFD747",
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
                };
                let myChart = echarts.init(dom1);
                myChart.resize();
                myChart.setOption(option);
                // }
            } else {
                message.error("服务异常");
            }
        });
    };
    chartResize = () => {
        var dom1 = document.getElementById("main4");
        echarts.init(dom1).resize();
    };
    componentDidMount() {
        this.getData({ algorithmId: "", startTime: "", endTime: "" });
        this.getSelectList();
    }
    getSelectList = () => {
        // 用户
        http.get({
            url: "/user/listAll",
        }).then((res3) => {
            this.setState({
                userList: res3.data,
            });
        });
    };
    render() {
        window.cpuResize = this.chartResize;
        if (this.props.path == "/main/algostatis/algoStatis") {
            window.addEventListener("resize", window.cpuResize);
        } else {
            window.removeEventListener("resize", window.cpuResize);
        }
        const { getFieldDecorator } = this.props.form;
        const { userList } = this.state;
        const children = userList.map((d) => (
            <Option key={d.id}>{d.userName}</Option>
        ));
        return (
            <div className={styles.container}>
                <div className={styles.search}>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator("algorithmId")(
                                // <Input placeholder="请输入算法ID" />
                                <Select
                                    allowClear={true}
                                    placeholder="请输入算法ID"
                                    showSearch
                                    style={{ width: 160 }}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {children}
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
                <div>
                    <div
                        id="main4"
                        style={{ width: "100%", height: "500px" }}
                    ></div>
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
export default connect(
    mapStateToProps,
    null
)(Form.create()(AlgorithmStatistical));
