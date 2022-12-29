import React from "react";
import styles from "./style.module.less";
import echarts from "echarts";
import { TimePicker, Form, Button, Icon, DatePicker, Select } from "antd";
import { connect } from "react-redux";

const { RangePicker } = DatePicker;
class OnlineUser extends React.PureComponent {
    state = {};
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let noTime = values["pickerTime"].length < 1;
                let params = {
                    startTime: noTime
                        ? ""
                        : Date.parse(values["pickerTime"][0]) * 1000,
                    endTime: noTime
                        ? ""
                        : Date.parse(values["pickerTime"][1]) * 1000,
                };
                this.getData(params);
            }
        });
    };
    getData = (params, count = 0) => {
        http.post({
            url: "/session/getOnline",
            data: params,
        }).then((res) => {
            if (res.code == 0) {
                let isNull = false;
                if (res.data.length == 0) {
                    message.error("该时间段暂无数据");
                    isNull = true;
                } else {
                    isNull = false;
                }
                let option = {
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
                        source: res.data,
                    },
                    grid: {
                        left: "35px",
                        right: "50px",
                        bottom: "9%",
                        top: "33px",
                        containLabel: true,
                    },
                    xAxis: {
                        type: "category",
                        boundaryGap: false,
                        // axisTick: {
                        //     interval: "auto",
                        //     alignWithLabel: true,
                        // },
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
                            // showMaxLabel: true,
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
                            // nameTextStyle: {
                            //     padding: [0, 0, 0, 40],
                            // },
                        },
                    ],
                    series: [
                        {
                            name: "在线人数",
                            type: "line",
                            smooth: true,
                            showSymbol: false,
                            // symbol: "circle",
                            itemStyle: {
                                normal: {
                                    color: "#65A6FF",
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
                    ],
                };
                var myChart = echarts.init(document.getElementById("main3"));
                myChart.resize();
                myChart.setOption(option);
            } else {
                message.error("服务异常");
            }
        });
    };
    chartResize = () => {
        var dom1 = document.getElementById("main3");
        echarts.init(dom1).resize();
    };
    componentDidMount() {
        this.getData({ startTime: "", endTime: "" });
    }
    render() {
        window.cpuResize = this.chartResize;
        if (this.props.path == "/main/chart/onlineUser") {
            window.addEventListener("resize", window.cpuResize);
        } else {
            window.removeEventListener("resize", window.cpuResize);
        }
        const { getFieldDecorator } = this.props.form;
        let cmpt = this.props.activeMenu.cmpt;
        // console.log(cmpt);
        let authObj = {
            isQuery: true,
            isAdd: true,
            isUpload: true,
            isDownload: true,
            isDelete: false,
            isUpdate: true,
        };
        // console.log("cmpt", cmpt);
        if (cmpt) {
            for (let i = 0; i < cmpt.length; i++) {
                let item = cmpt[i];
                // console.log(item);
                if (item.type == 1 && item.auth != 1) {
                    //查询 有权限
                    authObj.isQuery = false;
                }
                if (item.type == 2 && item.auth != 1) {
                    //新增 有权限
                    authObj.isAdd = false;
                }
                if (item.type == 3 && item.auth != 1) {
                    //上传 有权限
                    authObj.isUpload = false;
                }
                if (item.type == 4 && item.auth != 1) {
                    //下载 有权限
                    authObj.isDownload = false;
                }
                // if (item.type == 5 && item.auth != 1) {
                //     //下载报告 有权限 -- 绩效那边
                //     authObj.isExportPdf = false;
                // }
                if (item.type == 6 && item.auth == 1) {
                    //删除 有权限
                    authObj.isDelete = true;
                }
                if (item.type == 7 && item.auth != 1) {
                    //编辑 有权限
                    authObj.isUpdate = false;
                }
            }
        }
        this.authObj = authObj;
        return (
            <div className={styles.container}>
                {this.authObj.isQuery && (
                    <div className={styles.search}>
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                            <Form.Item label="时间">
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
                                    type="ghost"
                                    htmlType="submit"
                                    style={{ width: 76 }}
                                >
                                    确定
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                )}
                <div>
                    <div
                        id="main3"
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
        activeMenu: state.RouterModel.activeMenu,
    };
};
export default connect(mapStateToProps, null)(Form.create()(OnlineUser));
