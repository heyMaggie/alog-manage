import React from "react";
import styles from "./style.module.less";
import echarts from "echarts";
import moment from "moment";
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
class Cpu extends React.PureComponent {
    state = { hostList: [] };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
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
        });
    };
    getData = (params) => {
        http.post({
            data: params,
            url: "/ssh/cpu",
        }).then((res) => {
            if (res.code == 0) {
                let list = res.data;
                let seriesList = list.series;
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
                        // data: ["CPU1", "CPU2", "CPU3"],
                        left: "auto",
                        itemWidth: 35,
                        // left: "8",
                        // align: "left",
                    },
                    grid: {
                        // left: "1%",
                        // right: "40px",
                        left: "-30px",
                        right: "40px",
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
                        axisLabel: {
                            // showMaxLabel: true,
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
                                margin: 150,
                                textStyle: {
                                    align: "left",
                                },
                            },
                            nameTextStyle: {
                                padding: [0, 40, 0, 0],
                                // padding: [0, 0, 0, -250],
                            },
                            min: isNull ? 0 : null,
                            max: isNull ? 100 : null,
                            axisLabel: {
                                formatter: "{value}%",
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                },
                            },
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
                            left: 130,
                            right: 130,
                        },
                    ],
                };
                var dom1 = document.getElementById("main1");
                var myChart = echarts.init(dom1);
                myChart.resize();
                myChart.setOption(option);
            } else {
                message.error("服务异常");
            }
        });
    };
    chartResize = () => {
        // console.log(this);
        // console.time("echarts");
        var dom1 = document.getElementById("main1");
        echarts.init(dom1).resize();
        // console.timeEnd("echarts");
    };
    componentDidMount() {
        this.getHostList();
        let yesterday = moment(new Date()).format("YYYY-MM-DD");
        this.getData({
            hostId: "1",
            startTime: `${yesterday} 00:00:00`,
            endTime: `${yesterday} 23:59:59`,
        });
    }
    getHostList = () => {
        // 用户
        http.get({
            url: "/ssh-host-info/list",
        }).then((res) => {
            this.setState({
                hostList: res.data,
            });
        });
    };
    render() {
        console.log(this.props.path);
        window.cpuResize = this.chartResize;
        if (this.props.path == "/main/chart/cpu") {
            console.log("设置cpu resize 事件1");
            window.addEventListener("resize", window.cpuResize);
        } else {
            window.removeEventListener("resize", window.cpuResize);
            console.log("cpu摧毁");
        }
        const { getFieldDecorator } = this.props.form;
        let yesterday = moment(new Date()).format("YYYY-MM-DD");
        let dataFormatter = "YYYY-MM-DD HH:mm:ss";
        const { hostList } = this.state;
        const children = hostList.map((d) => (
            <Option key={d.id}>{d.hostName}</Option>
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
                            <Form.Item label="服务器">
                                {getFieldDecorator("hostId", {
                                    initialValue: "1",
                                })(
                                    <Select
                                        showSearch
                                        style={{ width: 160 }}
                                        placeholder="选择CPU"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.props.children
                                                .toLowerCase()
                                                .indexOf(input.toLowerCase()) >=
                                            0
                                        }
                                    >
                                        {children}
                                        {/* <Option value="">全部</Option>
                                    <Option value="1">80</Option> */}
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item
                                label="时间"
                                style={{ marginLeft: "12px" }}
                            >
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
                    <div id="main1" className={styles.chart}></div>
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
export default connect(mapStateToProps, null)(Form.create()(Cpu));
// export default Form.create()(Cpu);
