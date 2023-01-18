import React from "react";
import styles from "./style.module.less";
import { Form } from "antd";
import { connect } from "react-redux";
import TagLabel from "@/components/Tag";
class SystemMonitor extends React.PureComponent {
    state = {
        sysInfo: {
            algoOnlineCount: 0,
            algoStatus: 1,
            currentRespTime: "",
            currentReqTime: "",
        },
        terminalInfos: [], //交易终端
        algoProvider: [], //算法厂商
        stockPushInfos: [
            {
                market: 1,
                marketName: "上海交易所",
                currentPushTime: "",
            },
            {
                market: 2,
                marketName: "深圳交易所",
                currentPushTime: "",
            },
        ], //交易所
        quoteCount: [], //行情柜台
        counterInfos: [], //交易柜台
    };
    getAlgoMonitor = () => {
        http.get({
            url: "/user/algoMonitor",
        }).then((res) => {
            console.log(res.data);
            if (res.data) {
                this.setState({
                    sysInfo: res.data,
                });
                //交易终端
                if (
                    res.data.terminalInfos &&
                    res.data.terminalInfos.length > 0
                ) {
                    this.setState({
                        terminalInfos: res.data.terminalInfos,
                    });
                }
                //算法厂商
                if (res.data.algoProvider && res.data.algoProvider.length > 0) {
                    let algo = res.data.algoProvider.filter(
                        (item, index) => index < 3
                    );
                    this.setState({
                        algoProvider: algo,
                    });
                    // console.log(res.data.algoProvider);
                }
                //交易所
                if (
                    res.data.stockPushInfos &&
                    res.data.stockPushInfos.length > 0
                ) {
                    this.setState({
                        stockPushInfos: res.data.stockPushInfos,
                    });
                }
                // 行情柜台 todo ?? 返回了一个对象
                if (
                    res.data.quoteCount
                    //&& res.data.terminalInfos.length > 0
                ) {
                    this.setState({
                        quoteCount: [res.data.quoteCount],
                    });
                    console.log(this.state.quoteCount);
                }
                //交易柜台
                if (res.data.counterInfos && res.data.counterInfos.length > 0) {
                    this.setState({
                        counterInfos: res.data.counterInfos,
                    });
                }
            }
        });
    };
    componentDidMount() {
        this.getAlgoMonitor();
    }
    render() {
        let {
            sysInfo,
            terminalInfos,
            algoProvider,
            stockPushInfos,
            quoteCount,
            counterInfos,
        } = this.state;
        return (
            <div className={styles.container}>
                <div className={styles.center}>
                    <div>
                        <div className={styles.animateWave}>
                            <div className={styles.w0}></div>
                            <div className={styles.w1}></div>
                            <div className={styles.w2}></div>
                            <div className={styles.w3}></div>
                            <div className={styles.w4}></div>
                            <div className={styles.w5}></div>
                            <div className={styles.w6}></div>
                        </div>
                    </div>
                </div>
                <div className={styles.wrap}>
                    <div className={styles.cname}>总线</div>
                    <div className={styles.mid}>
                        {sysInfo.algoStatus == 1 ? (
                            <TagLabel
                                record={"正常"}
                                type="success"
                                color="#3281FF"
                                iconBg="rgba(255,255,255,0.48)"
                            ></TagLabel>
                        ) : (
                            <TagLabel
                                record={"异常"}
                                type="warn"
                                textColor="#F66328"
                                iconBg="#FCD5C5"
                            ></TagLabel>
                        )}

                        <div className={styles.number2}>
                            {sysInfo.algoOnlineCount}人在线
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.text}>
                            <div className={styles.up}>
                                最新报单时间：{sysInfo.currentReqTime}
                            </div>
                            <div className={styles.down}>
                                最新回报时间：{sysInfo.currentRespTime}
                            </div>
                        </div>
                    </div>
                </div>
                {/* 交易终端 */}
                <div
                    className={styles.content2}
                    style={{ width: "466px", left: "77px", top: "135px" }}
                >
                    <div className={styles.tit}>交易终端</div>
                    {/* <div className={styles.item}>
                        <div className={styles.label}>mornano</div>
                        <div className={styles.status}>
                            <TagLabel
                                record={"正常"}
                                type="success"
                                color="#3281FF"
                                iconBg="rgba(255,255,255,0.48)"
                            ></TagLabel>
                        </div>
                        <div className={styles.number}>15人在线</div>
                        <div className={styles.text}>
                            <div className={styles.up}>
                                最新报单时间：{"2022.10.29 10:22:17"}
                            </div>
                            <div className={styles.down}>
                                最新回报时间：{"2022.10.29 10:22:17"}
                            </div>
                        </div>
                    </div> */}
                    {terminalInfos.length > 0 &&
                        terminalInfos.map((item) => {
                            console.log(item);
                            let res = (
                                <div className={styles.item}>
                                    <div className={styles.label}>
                                        {item.terminalName}
                                    </div>
                                    <div className={styles.status}>
                                        {item.status == 1 ? (
                                            <TagLabel
                                                record={"正常"}
                                                type="success"
                                                color="#3281FF"
                                                iconBg="rgba(255,255,255,0.48)"
                                            ></TagLabel>
                                        ) : (
                                            <TagLabel
                                                record={"异常"}
                                                type="warn"
                                                textColor="#F66328"
                                                iconBg="#FCD5C5"
                                            ></TagLabel>
                                        )}
                                    </div>
                                    <div className={styles.number}>
                                        {item.onlineCount}人在线
                                    </div>
                                    <div className={styles.text}>
                                        <div className={styles.up}>
                                            最新报单时间：
                                            {item.currentReqTime}
                                        </div>
                                        <div className={styles.down}>
                                            最新回报时间：
                                            {item.currentRespTime}
                                        </div>
                                    </div>
                                </div>
                            );
                            return res;
                        })}
                </div>
                {/* 厂商 */}
                <div
                    className={styles.content2}
                    style={{ left: "116px", top: "420px" }}
                >
                    <div className={styles.tit}>厂商</div>
                    {/* <div className={styles.item}>
                        <div className={styles.label}>自诚</div>
                        <div className={styles.status}>
                            <TagLabel
                                record={"正常"}
                                type="success"
                                color="#3281FF"
                                iconBg="rgba(255,255,255,0.48)"
                            ></TagLabel>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.up}>最新报单时间：{""}</div>
                            <div className={styles.down}>
                                最新回报时间：{"2022.10.29 10:22:17"}
                            </div>
                        </div>
                    </div> */}
                    {algoProvider.length > 0 &&
                        algoProvider.map((item) => {
                            let res = (
                                <div className={styles.item}>
                                    <div className={styles.label}>
                                        {item.userName}
                                    </div>
                                    <div className={styles.status}>
                                        {item.userStatus == 1 ? (
                                            <TagLabel
                                                record={"正常"}
                                                type="success"
                                                color="#3281FF"
                                                iconBg="rgba(255,255,255,0.48)"
                                            ></TagLabel>
                                        ) : (
                                            <TagLabel
                                                record={"异常"}
                                                type="warn"
                                                textColor="#F66328"
                                                iconBg="#FCD5C5"
                                            ></TagLabel>
                                        )}
                                    </div>
                                    <div className={styles.text}>
                                        <div className={styles.up}>
                                            最新报单时间：{item.currentReqTime}
                                        </div>
                                        <div className={styles.down}>
                                            最新回报时间：
                                            {item.currentRespTime}
                                        </div>
                                    </div>
                                </div>
                            );
                            return res;
                        })}
                </div>
                {/* 交易所 */}
                <div className={styles.content}>
                    <div className={styles.tit}>交易所</div>
                    {/* <div className={styles.item}>
                        <div
                            className={styles.label}
                            style={{ paddingRight: "16px" }}
                        >
                            深交所
                        </div>
                        <div className={styles.text}>
                            最新回报时间：{"2022.10.29 10:22:17"}
                        </div>
                    </div> */}
                    {stockPushInfos.length > 0 &&
                        stockPushInfos.map((item) => {
                            let res = (
                                <div className={styles.item}>
                                    <div
                                        className={styles.label}
                                        style={{ paddingRight: "16px" }}
                                    >
                                        {item.marketName}
                                    </div>
                                    <div className={styles.text}>
                                        最新回报时间：{item.currentPushTime}
                                    </div>
                                </div>
                            );
                            return res;
                        })}
                </div>
                {/* 券商行情柜台 */}
                <div
                    className={styles.content}
                    style={{ width: "468px", left: "1070px", top: "115px" }}
                >
                    <div className={styles.tit}>券商行情柜台</div>
                    {/* <div className={styles.item}>
                        <div className={styles.label}>192.168.0.1:3717631</div>
                        <div className={styles.status}>
                            <TagLabel
                                record={"正常"}
                                type="success"
                                color="#3281FF"
                                iconBg="rgba(255,255,255,0.48)"
                            ></TagLabel>
                        </div>
                        <div className={styles.text}>
                            最新行情时间：{"2022.10.29 10:22:17"}
                        </div>
                    </div> */}
                    {quoteCount.length > 0 &&
                        quoteCount.map((item) => {
                            let res = (
                                <div className={styles.item}>
                                    <div className={styles.label}>
                                        {item.addr}
                                    </div>
                                    <div className={styles.status}>
                                        {item.status == 1 ? (
                                            <TagLabel
                                                record={"正常"}
                                                type="success"
                                                color="#3281FF"
                                                iconBg="rgba(255,255,255,0.48)"
                                            ></TagLabel>
                                        ) : (
                                            <TagLabel
                                                record={"异常"}
                                                type="warn"
                                                textColor="#F66328"
                                                iconBg="#FCD5C5"
                                            ></TagLabel>
                                        )}
                                    </div>
                                    <div className={styles.text}>
                                        最新行情时间：{item.currentPushTime}
                                    </div>
                                </div>
                            );
                            return res;
                        })}
                </div>
                {/* 券商交易柜台 */}
                <div
                    className={styles.content2}
                    style={{ width: "468px", left: "1098px", top: "440px" }}
                >
                    <div className={styles.tit}>券商交易柜台</div>
                    {/* <div className={styles.item}>
                        <div className={styles.label}>自诚</div>
                        <div className={styles.status}>
                            <TagLabel
                                record={"正常"}
                                type="success"
                                color="#3281FF"
                                iconBg="rgba(255,255,255,0.48)"
                            ></TagLabel>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.up}>
                                最新报单时间：{"2022.10.29 10:22:17"}
                            </div>
                            <div className={styles.down}>
                                最新回报时间：{"2022.10.29 10:22:17"}
                            </div>
                        </div>
                    </div> */}
                    {counterInfos.length > 0 &&
                        counterInfos.map((item) => {
                            let res = (
                                <div className={styles.item}>
                                    <div className={styles.label}>
                                        {item.gwAddr}
                                    </div>
                                    <div className={styles.status}>
                                        {item.status == 1 ? (
                                            <TagLabel
                                                record={"正常"}
                                                type="success"
                                                color="#3281FF"
                                                iconBg="rgba(255,255,255,0.48)"
                                            ></TagLabel>
                                        ) : (
                                            <TagLabel
                                                record={"异常"}
                                                type="warn"
                                                textColor="#F66328"
                                                iconBg="#FCD5C5"
                                            ></TagLabel>
                                        )}
                                    </div>
                                    <div className={styles.text}>
                                        <div className={styles.up}>
                                            最新报单时间：{item.currentReqTime}
                                        </div>
                                        <div className={styles.down}>
                                            最新回报时间：
                                            {item.currentRespTime}
                                        </div>
                                    </div>
                                </div>
                            );
                            return res;
                        })}
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
export default connect(mapStateToProps, null)(Form.create()(SystemMonitor));
