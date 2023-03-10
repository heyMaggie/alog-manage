import React from "react";
import styles from "./style.module.less";
import echarts from "echarts";
import {
    TimePicker,
    Form,
    Button,
    Icon,
    DatePicker,
    Select,
    Input,
} from "antd";
import { connect } from "react-redux";

const { RangePicker } = DatePicker;
const { Option } = Select;
class RegularWay extends React.PureComponent {
    state = { numberText: "笔", userList: [] };
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
                    if (
                        !data["tradeOrder"].length &&
                        !data["cancelTradeOrder"].length &&
                        !data["dealTradeOrder"].length
                    ) {
                        message.error("该时间段暂无数据");
                    }
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
        if (list.length == 1) {
            list.push({ x: "", y: list[0].y });
        }
        let lineObj = {
            tradeOrder: { name: "普通单信息", color: "#F78B7F" },
            cancelTradeOrder: { name: "撤单信息", color: "#FFD747" },
            dealTradeOrder: { name: "成交信息", color: "#72DF5A" },
        };
        let isNull = list.length ? false : true;
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
                left: isNull ? 15 : "0px",
                right: "55px",
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
                    min: isNull ? 0 : null,
                    max: isNull ? 100 : null,
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
                        padding: [0, 43, 0, 20],
                    },
                    axisLabel: {
                        margin: 55,
                        textStyle: {
                            align: "left",
                        },
                    },
                    nameTextStyle: {
                        padding: [0, 55, 0, 0],
                        // padding: [0, 0, 0, -250],
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
    chartResize = () => {
        let domList = ["tradeOrder", "cancelTradeOrder", "dealTradeOrder"];
        domList.forEach((item) => {
            echarts.init(document.getElementById(item)).resize();
        });
    };
    componentDidMount() {
        this.getData({
            securityId: "",
            uuserId: "",
            startTime: "",
            endTime: "",
            countWay: "0",
        });
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
        // });
    };
    render() {
        window.cpuResize = this.chartResize;
        if (this.props.path == "/main/tradeStatistics/regularWay") {
            window.addEventListener("resize", window.cpuResize);
        } else {
            window.removeEventListener("resize", window.cpuResize);
        }
        const { getFieldDecorator } = this.props.form;
        const { userList } = this.state;
        const children = userList.map((d) => (
            <Option key={d.id}>{d.userName}</Option>
        ));
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
                            <Form.Item label="交易类型">
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
                                                .indexOf(input.toLowerCase()) >=
                                            0
                                        }
                                    >
                                        <Option value="0">笔数</Option>
                                        <Option value="1">金额</Option>
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item
                                label="证券代码"
                                style={{ marginLeft: "12px" }}
                            >
                                {getFieldDecorator("securityId", {
                                    initialValue: "",
                                })(
                                    <Input placeholder="请输入证券代码" />
                                    // <Select
                                    //     showSearch
                                    //     style={{ width: 160 }}
                                    //     placeholder="选择股票"
                                    //     optionFilterProp="children"
                                    //     filterOption={(input, option) =>
                                    //         option.props.children
                                    //             .toLowerCase()
                                    //             .indexOf(input.toLowerCase()) >= 0
                                    //     }
                                    // >
                                    //     <Option value="">全部股票</Option>
                                    //     <Option value="000001">平安银行</Option>
                                    // </Select>
                                )}
                            </Form.Item>
                            <Form.Item
                                label="用户名称"
                                style={{ marginLeft: "12px" }}
                            >
                                {getFieldDecorator("uuserId")(
                                    // <Input placeholder="" />
                                    <Select
                                        allowClear={true}
                                        showSearch
                                        style={{ width: 160 }}
                                        placeholder="请输入用户名"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.props.children
                                                .toLowerCase()
                                                .indexOf(input.toLowerCase()) >=
                                            0
                                        }
                                    >
                                        {children}
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item
                                label="日期"
                                style={{ marginLeft: "12px" }}
                            >
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
// export default Form.create()(RegularWay);
const mapStateToProps = (state, ownProps) => {
    return {
        path: state.RouterModel.path,
        activeMenu: state.RouterModel.activeMenu,
    };
};
export default connect(mapStateToProps, null)(Form.create()(RegularWay));
