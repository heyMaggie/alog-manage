import React from "react";
import styles from "./style.module.less";
import echarts from "echarts";
import { connect } from "react-redux";
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
import moment from "moment";
class Ram extends React.PureComponent {
    state = {};
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let noTime = values["pickerTime"].length < 1;
                let params = {
                    hostId: values.hostId,
                    startTime: noTime
                        ? ""
                        : moment(values["pickerTime"][0]).format(
                              "YYYY-MM-DD HH:mm:ss"
                          ),
                    endTime: noTime
                        ? ""
                        : moment(values["pickerTime"][1]).format(
                              "YYYY-MM-DD HH:mm:ss"
                          ),
                };
                this.getData(params);
            }
        });
    };
    getData = (params, count = 0) => {
        console.log(params, "传入的参数");
        http.post({
            data: params,
            url: "/ssh/ram",
        }).then((res) => {
            if (res.code == 0) {
                let list = res.data;
                let seriesList = list.series;
                let maxGB = (list.memTotal / 1024 / 2024).toFixed(0);
                let isNull = false;
                if (seriesList.length == 0) {
                    message.error("该时间段暂无数据");
                    isNull = true;
                } else {
                    isNull = false;
                    seriesList.forEach((item) => {
                        item.data = item.y;
                        item.smooth = true;
                        item.showSymbol = false;
                        item.itemStyle = {
                            normal: {
                                color: "#65A6FF",
                            },
                        };
                    });
                }
                let option = {
                    textStyle: {
                        color: "#333",
                    },
                    tooltip: {
                        show: false,
                        trigger: "axis",
                        backgroundColor: "#1F2329",
                        boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.15)",
                        borderColor: "#1F2329",
                        textStyle: {
                            color: "#fff",
                        },
                    },
                    legend: {
                        // data: ["CPU1"],
                        left: 0,
                    },
                    grid: {
                        left: "2%",
                        right: "0%",
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
                        data: list.x,
                    },
                    yAxis: [
                        {
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
                            position: "right",
                            // nameTextStyle: {
                            //     padding: [0, 0, 0, 0],
                            // },
                        },
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
                            // nameTextStyle: {
                            //     padding: [0, 15, 0, 0],
                            // },
                            max: isNull ? 16 : maxGB,
                            min: "0",
                            // max: maxGB,
                        },
                    ],
                    series: list.series,
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
                myChart.resize();
                myChart.setOption(option);
            } else {
                message.error("服务异常");
            }
        });
    };
    chartResize = () => {
        var dom1 = document.getElementById("main2");
        echarts.init(dom1).resize();
    };
    componentDidMount() {
        let yesterday = moment(new Date()).format("YYYY-MM-DD");
        this.getData({
            hostId: "1",
            startTime: `${yesterday} 00:00:00`,
            endTime: `${yesterday} 23:59:59`,
        });
    }
    render() {
        window.cpuResize = this.chartResize;
        if (this.props.path == "/main/chart/ram") {
            window.addEventListener("resize", window.cpuResize);
        } else {
            window.removeEventListener("resize", window.cpuResize);
        }
        const { getFieldDecorator } = this.props.form;
        let yesterday = moment(new Date()).format("YYYY-MM-DD");
        let dataFormatter = "YYYY-MM-DD HH:mm:ss";
        return (
            <div className={styles.container}>
                <div className={styles.search}>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator("hostId", {
                                initialValue: "1",
                            })(
                                <Select
                                    showSearch
                                    style={{ width: 160 }}
                                    placeholder="选择内存"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="">全部</Option>
                                    <Option value="1">80</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item style={{ marginLeft: "12px" }}>
                            {getFieldDecorator("pickerTime", {
                                initialValue: [
                                    moment(
                                        `${yesterday} 00:00:00`,
                                        dataFormatter
                                    ),
                                    moment(
                                        `${yesterday} 23:59:59`,
                                        dataFormatter
                                    ),
                                ],
                            })(
                                <RangePicker
                                    style={{ width: 432 }}
                                    showTime
                                    format={dataFormatter}
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
const mapStateToProps = (state, ownProps) => {
    return {
        path: state.RouterModel.path,
    };
};
export default connect(mapStateToProps, null)(Form.create()(Ram));
// export default Form.create()(Ram);
