import React from "react";
import styles from "./style.module.less";
import { TimePicker, Form, Button, Icon, DatePicker, Select } from "antd";
import { connect } from "react-redux";
import TagLabel from "@/components/Tag";
class SystemMonitor extends React.PureComponent {
    state = {
        algoProviderArr: [], //算法厂商
    };
    getAlgoMonitor = () => {
        http.get({
            url: "/user/algoMonitor",
        }).then((res) => {
            console.log(res);
            // let idArr = [];
            if (res.data) {
                if (res.data.algoProvider && res.data.algoProvider.length > 0) {
                    this.setState({ algoProviderArr: res.data.algoProvider });
                    console.log(res.data.algoProvider);
                }
                //     // RiskType: [{ key: "1", value: "用户" },{ key: "2", value: "算法" },
                //     idArr = res.data.map((item) => {
                //         let obj = {};
                //         obj.key = item.id;
                //         obj.value = item.userName;
                //         return obj;
                //     });
            }
            // this.setState({
            //     userList: idArr,
            // });
        });
    };
    componentDidMount() {
        this.getAlgoMonitor();
    }
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.title}>系统监控</div>
                <div className={styles.chart}>
                    <div className={styles.ripple}>
                        <div className={styles.logo}>总线</div>
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
                    <div className={styles.gatherBox}>
                        <div className={styles.model}>
                            <div className={styles.lineDot}></div>
                            <div className={styles.manuName}>厂商</div>
                            <div className={styles.manuList}>
                                <div className={styles.manuItem}>
                                    <div className={styles.itemTitle}>
                                        厂商11111111111
                                    </div>
                                    <TagLabel
                                        record="正常"
                                        type="success"
                                    ></TagLabel>
                                </div>
                                <div className={styles.manuItem}>
                                    <div className={styles.itemTitle}>
                                        厂商11111111111
                                    </div>
                                    <TagLabel
                                        record="正常"
                                        type="success"
                                    ></TagLabel>
                                </div>
                                <div className={styles.manuItem}>
                                    <div className={styles.itemTitle}>
                                        厂商11111111111
                                    </div>
                                    <TagLabel
                                        record="正常"
                                        type="success"
                                    ></TagLabel>
                                </div>
                                <div className={styles.manuItem}>
                                    <div className={styles.itemTitle}>
                                        厂商11111111111
                                    </div>
                                    <TagLabel
                                        record="正常"
                                        type="success"
                                    ></TagLabel>
                                </div>
                            </div>
                        </div>
                        <div className={styles.model}>
                            <div className={styles.lineDot}></div>
                            <div className={styles.manuName}>厂商</div>
                            <div className={styles.manuList}>
                                <div>厂商11111111111</div>
                                <div>厂商22222222222</div>
                                <div>厂商33333333333</div>
                            </div>
                        </div>
                        <div className={styles.model}>
                            <div className={styles.lineDot}></div>
                            <div className={styles.manuName}>厂商</div>
                            <div className={styles.manuList}>
                                <div>厂商11111111111</div>
                                <div>厂商22222222222</div>
                                <div>厂商33333333333</div>
                            </div>
                        </div>
                        <div className={styles.model}>
                            <div className={styles.lineDot}></div>
                            <div className={styles.manuName}>厂商</div>
                            <div className={styles.manuList}>
                                <div>厂商11111111111</div>
                                <div>厂商22222222222</div>
                                <div>厂商33333333333</div>
                            </div>
                        </div>
                        <div className={styles.model}>
                            <div className={styles.lastlineDot}></div>
                            <div className={styles.manuName}>厂商</div>
                            <div className={styles.manuList}>
                                <div className={styles.manuItem}>
                                    <div className={styles.itemTitle}>
                                        厂商11111111111
                                    </div>
                                    <TagLabel
                                        record="正常"
                                        type="success"
                                    ></TagLabel>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div
                        id="main3"
                        style={{ width: "100%", height: "500px" }}
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
export default connect(mapStateToProps, null)(Form.create()(SystemMonitor));
