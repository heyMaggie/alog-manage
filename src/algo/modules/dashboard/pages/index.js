import React from "react";
// import styles from "./style.module.less";
import "./main.less";
import "./style.less";
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
    state = {
        activeName: "0",
        summaryObj: {
            user_cnt: "0",
            algo_cnt: "0",
            trade_vol: "0",
            order_cnt: "0",
            provider_cnt: "0",
            total_user_cnt: "",
        },
        market_rate: {
            huge: "0",
            big: "0",
            middle: "0",
            small: "0",
        },
        algo_nameList: [],
        selectIndex: "0",
        assessList: [],
        pageTotal: 0,
        pageObj: { page: 1, pageNum: 4 },
        algoContrastList: [],
    };

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
                left: "34px",
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
                        // padding: [0, 0, 0, 20],
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
        // this.getData({
        //     securityId: "",
        //     uuserId: "",
        //     startTime: "",
        //     endTime: "",
        //     countWay: "0",
        // });
        // this.getSelectList();
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
        let { summaryObj, market_rate } = this.state;
        let sonItem = {};
        return (
            <div>
                <div class="echart-container">
                    <div class="showBorder">
                        <div class="card">
                            <div class="card-title line-img">用户数量</div>
                            {/* <el-tooltip :content="`用户总数量：${summaryObj.total_user_cnt}`" placement="top">
                        <img class="query-icon" src="../../assets/icon/query.png"
                    /></el-tooltip> */}
                            <div class="circular">
                                <span class="number">
                                    {summaryObj.user_cnt}
                                    <span class="unit">(个)</span>
                                </span>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-title line-img">算法数量</div>
                            {/* <el-tooltip :content="`算法总数量：${summaryObj.total_algo_cnt}`" placement="top">
                        <img class="query-icon" src="../../assets/icon/query.png"
                    /></el-tooltip> */}
                            <div class="circular special-green">
                                <span class="number">
                                    {summaryObj.algo_cnt}
                                    <span class="unit">(个)</span>
                                </span>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-title">交易量</div>
                            <div class="blue-card">
                                <span class="number">
                                    {Number(summaryObj.trade_vol).toFixed(2)}
                                    <div class="unit">(元)</div>
                                </span>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-title line-img">订单数</div>
                            {/* <el-tooltip content="说明：订单总数量" placement="top">
                        <img class="query-icon" src="../../assets/icon/query.png"
                    /></el-tooltip>  */}
                            <div class="circular">
                                <span class="number">
                                    {summaryObj.order_cnt}
                                    <span class="unit">(个)</span>
                                </span>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-title">买卖占比</div>
                            <div class="medium-blue-card" id="pie2"></div>
                        </div>
                        <div class="card">
                            <div class="card-title line-img">厂商总数</div>
                            {/* <el-tooltip :content="`厂商总数量：${summaryObj.total_provider_cnt}`" placement="top">
                        <img class="query-icon" src="../../assets/icon/query.png"
                    /></el-tooltip> */}
                            <div class="circular special-pink">
                                <span class="number">
                                    {summaryObj.provider_cnt}
                                    <span class="unit">(个)</span>
                                </span>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-title line-img">资金占比</div>
                            {/* <el-tooltip content="说明：XXX" placement="top">
                        <img class="query-icon" src="../../assets/icon/query.png"
                    /></el-tooltip>  */}
                            <div class="gather">
                                <div class="min-blue-card">
                                    <span class="number">
                                        {Number(market_rate.huge).toFixed(1)}
                                        <span class="unit">%</span>
                                    </span>
                                    <div class="explain">超大市值</div>
                                </div>
                                <div class="min-blue-card">
                                    <span class="number">
                                        {Number(market_rate.big).toFixed(1)}
                                        <span class="unit">%</span>
                                    </span>
                                    <div class="explain">大市值</div>
                                </div>
                                <div class="min-blue-card">
                                    <span class="number">
                                        {Number(market_rate.middle).toFixed(1)}
                                        <span class="unit">%</span>
                                    </span>
                                    <div class="explain">中市值</div>
                                </div>
                                <div class="min-blue-card">
                                    <span class="number">
                                        {Number(market_rate.small).toFixed(1)}
                                        <span class="unit">%</span>
                                    </span>
                                    <div class="explain">小市值</div>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-title line-img">完成度</div>
                            <div id="water-polo" class="water-polo"></div>
                        </div>
                    </div>
                    <div className="showClounm">
                        <div>
                            <div class="pane-card">
                                {/* <div v-for="(sonItem, j) in assessList" :key="sonItem.provider"> */}
                                <div>
                                    <div class="rowlist">
                                        <div class="rowtitle">
                                            {sonItem.provider}
                                        </div>
                                        <div class="blue-mincard">
                                            <div class="tit">
                                                <img src="../../assets/icon/1aa.png" />
                                                用户数量
                                            </div>
                                            <div class="number">
                                                {sonItem.user_cnt}
                                            </div>
                                        </div>
                                        <div class="blue-mincard">
                                            <div class="tit">
                                                <img src="../../assets/icon/2bb.png" />
                                                交易量
                                            </div>
                                            <div class="number">
                                                <span class="symbol">￥</span>
                                                {Number(
                                                    sonItem.trade_vol
                                                ).toFixed(2)}
                                            </div>
                                        </div>
                                        <div class="blue-mincard">
                                            <div class="tit">
                                                <img src="../../assets/icon/3cc.png" />
                                                收益率
                                            </div>
                                            {/* <el-badge
                                                :value="sonItem.profit_rate > 0 ? '盈利' : '亏损'"
                                                class="item"
                                                :type="sonItem.profit_rate > 0 ? 'danger' : 'success'"
                                            >
                                                <div class="number">
                                                    <span class="symbol">{ sonItem.profit_rate > 0 ? '+' : ' ' }</span
                                                    >{ Number(sonItem.profit_rate).toFixed(1) }<span class="unit">%</span>
                                                </div>
                                            </el-badge> */}
                                        </div>
                                        <div class="blue-mincard">
                                            <div class="tit">
                                                <img src="../../assets/icon/4dd.png" />
                                                订单数量
                                            </div>
                                            <div class="number">
                                                {sonItem.order_cnt}
                                            </div>
                                        </div>
                                        <div class="blue-mincard">
                                            <div class="tit">
                                                <img src="../../assets/icon/5ee.png" />
                                                买卖占比
                                            </div>
                                            {/* <div
                                                :style="{ height: '50px', width: '300px' }"
                                                :id="`pieList${j}${i}`"
                                                :ref="`pieList${j}${i}`"
                                            ></div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <el-pagination
                                background
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :page-sizes="[10, 20, 30, 40]"
                                :current-page="pageObj.page"
                                :page-size="pageObj.pageNum"
                                layout=" ->, prev, pager, next, total, jumper"
                                :total="pageTotal"
                                style="margin-top: 20px"
                            >
                            </el-pagination> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
// export default Form.create()(RegularWay);
const mapStateToProps = (state, ownProps) => {
    return {
        path: state.RouterModel.path,
    };
};
export default connect(mapStateToProps, null)(Form.create()(RegularWay));
