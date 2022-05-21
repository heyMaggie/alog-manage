import React from "react";
import CurdComponent from "@/components/CurdComponent";
// import SelectOption from "@/components/SelectOption";
import { Input, Modal, Radio, Form, message, Switch } from "antd";
import styles from "./style.module.less";

let getSearchFormFields = () => {
    return [
        // {
        //     label: "保证金账户",
        //     id: "assetAccount",
        //     component: <Input placeholder="请输入保证金账户" />,
        // },
        {
            label: "用户ID",
            // id: "userId",
            id: "user_id",
            component: <Input placeholder="请输入用户ID" />,
        },
    ];
};
class algoConfig extends React.PureComponent {
    columns = (params) => {
        return [
            {
                title: "算法名称",
                dataIndex: "algoName",
                key: "algoName",
            },
            {
                title: "算法厂商ID",
                dataIndex: "uuserId",
                key: "uuserId",
            },
            {
                title: "算法厂商名",
                dataIndex: "providerName",
                key: "providerName",
            },
            {
                title: "算法类型",
                dataIndex: "algorithmType",
                key: "algorithmType",
            },
            // {
            //     title: "算法状态",
            //     dataIndex: "algorithmStatus",
            //     key: "algorithmStatus",
            // },
            {
                title: "是否显示",
                dataIndex: "algorithmShow",
                key: "algorithmShow",
                render: (text, record) => (
                    <Switch
                        checked={record.algorithmShow == 1}
                        size="small"
                        onChange={(e) => {
                            // console.log(text, record);
                            this.onSwitchChange(e, record, 1);
                        }}
                    />
                ),
            },
            {
                title: "是否可用",
                dataIndex: "algorithmEnable",
                key: "algorithmEnable",
                render: (text, record) => (
                    <Switch
                        checked={record.algorithmEnable == 1}
                        size="small"
                        onChange={(e) => {
                            // console.log(text, record);
                            this.onSwitchChange(e, record, 2);
                        }}
                    />
                ),
            },
            {
                title: "算法所需参数",
                dataIndex: "parameter",
                key: "parameter",
            },
            {
                title: "算法风控组",
                dataIndex: "riskGroup",
                key: "riskGroup",
            },
            {
                title: "创建时间",
                dataIndex: "createTime",
                key: "createTime",
            },
            {
                title: "操作",
                key: "operation",
                fixed: "right",
                width: 100,
                render: (text, record) => (
                    <a
                        onClick={(e) => {
                            this.handleUpdate(record);
                        }}
                    >
                        编辑
                    </a>
                ),
            },
        ];
    };

    state = {
        searchLoading: false,
        selectRow: [],
        info: [],
        updateModalVisible: false,
        riskGroup: [],
        userRiskConfig: {},
    };
    // type 1 : 是否显示    type:2  是否可用
    onSwitchChange = (val, record, type) => {
        console.log(val, record, type);
        // console.log(type);
        let algorithmStatus;
        let paramVal = 0;
        if (type == 1) {
            //是否显示
            paramVal = val ? 2 : 0;
            algorithmStatus = paramVal + record.algorithmEnable;
        } else {
            //是否可用
            paramVal = val ? 1 : 0;
            algorithmStatus = record.algorithmShow + paramVal;
        }
        console.log("paramVal", paramVal);
        console.log("algorithmStatus", algorithmStatus);

        let params = {
            AlgorithmId: record.id,
            algorithmStatus: algorithmStatus,
        };
        // return;
        http.post({
            url: "/algo/updateAlgoStatus",
            data: params,
        }).then((res) => {
            console.log(res);
            this.isAction = true;
            if (res.code == 0) {
                message.success("修改管理状态成功");
                this.getData();
            } else {
                message.error("修改管理状态失败");
            }
        });
    };
    //填入更新数据
    setUpdateModal = ({ form, record }) => {
        // console.log(record, form);
        this.record = record;
        form.setFieldsValue({
            switchId: record.switchId,
            ip: record.ip,
            mask: record.mask,
            mac: record.mac,
            gateway: record.gateway,
            enable: record.enable + "",
        });
    };
    //填入更新记录
    handleUpdate = (record) => {
        console.log("更新记录", record);
        this.record = record;
        this.setState(
            {
                updateModalVisible: true,
            },
            () => {
                this.getRiskGroup(record.id);
                this.props.form.setFieldsValue({
                    algoId: record.id + "",
                    algoName: record.algoName,
                    riskGroup: record.riskGroup,
                });
            }
        );
    };

    handleUpdateModalOk = () => {
        let data = this.props.form.getFieldsValue();
        data.userId = this.record.id;
        console.log(data);
        this.updateRiskGroup(data);
        this.setState({
            updateModalVisible: false,
        });
    };
    handleUpdateModalCancel = () => {
        this.setState({
            updateModalVisible: false,
        });
    };
    //修改用户风控组
    updateRiskGroup = (data) => {
        let params = {
            algoId: data.algoId,
            riskGroup: data.riskGroup / 1,
        };
        console.log(params);
        // return;
        http.post({
            url: "/risk/modifyAlgoRiskGroup",
            data: params,
        }).then((res) => {
            // console.log(res);
            if (res.code == 0) {
                message.success(res.message);
                this.getData();
            }
        });
    };
    inputChange = (e) => {
        let val = e.target.value;
        if (this.inputTimeout) {
            clearTimeout(this.inputTimeout);
        }
        this.inputTimeout = setTimeout(() => {
            this.getRiskGroup(val);
        }, 1000);
    };
    //查询用户风控配置
    getRiskGroup = (id) => {
        let params = {
            id: id / 1,
        };
        // console.log(params);
        http.post({
            url: "/risk/queryRiskConfig",
            data: params,
        }).then((res) => {
            console.log(res);
            if (res.code != 0) {
                message.error("查询风控配置组失败！");
                return;
            }
            let config = JSON.parse(res.data);
            // this.setState({ userRiskConfig: config });
            // console.log(config);
            let enable = (config.RiskEnable / 1).toString(2).padStart(9, "0");
            let enableArr = enable.split("");
            // console.log(enableArr);
            this.props.form.setFieldsValue({
                // riskGroup: record.riskGroup + "",
                byte0: enableArr[0],
                byte1: enableArr[1],
                byte2: enableArr[2],
                byte3: enableArr[3],
                byte4: enableArr[4],
                byte5: enableArr[5],
                byte6: enableArr[6],
                byte7: enableArr[7],
                byte8: enableArr[8],
                // riskName: config.RiskName,
                entrustItemThreshold: config.EntrustItemThreshold,
                entrustItemLimit: config.EntrustItemLimit,
                entrustSeconds: config.EntrustSeconds,
                entrustTotalThreshold: config.EntrustTotalThreshold,
                cancelEntrustItemThreshold: config.CancelEntrustItemThreshold,
                cancelRatioLimit: config.CancelRatioLimit,
                failedEntrustItemThreshold: config.FailedEntrustItemThreshold,
                failedRatioLimit: config.FailedRatioLimit,
                entrustExecEntrustItemThreshold:
                    config.EntrustExecEntrustItemThreshold,
                entrustExecRatioLimit: config.EntrustExecRatioLimit,
                netBuyEntrustItemThreshold: config.NetBuyEntrustItemThreshold,
                netBuyAmountLimit: config.NetBuyAmountLimit,
                cancelItemLimit: config.CancelItemLimit,
                cancelSeconds: config.CancelSeconds,
                cancelGapSeconds: config.CancelGapSeconds,
                tradeItemLimit: config.TradeItemLimit,
                tradeSeconds: config.TradeSeconds,
                tradeQtyLimit: config.TradeQtyLimit,
                tradeAmountLimit: config.TradeAmountLimit,
            });
        });
    };
    getData = (params = {}) => {
        // params.token = "";
        http.get({
            url: "/algo/list",
            data: params,
        }).then((res) => {
            console.log(res);
            //解析数据字典
            if (res.data.length > 0) {
                res.data.forEach((item) => {
                    // console.log(item.algorithmShow);
                    if (item.algorithmStatus == 0) {
                        item.algorithmShow = 0;
                        item.algorithmEnable = 0;
                    } else if (item.algorithmStatus == 1) {
                        item.algorithmShow = 0;
                        item.algorithmEnable = 1;
                    } else if (item.algorithmStatus == 2) {
                        item.algorithmShow = 1;
                        item.algorithmEnable = 0;
                    } else if (item.algorithmStatus == 3) {
                        item.algorithmShow = 1;
                        item.algorithmEnable = 1;
                    }
                });
                parseDict(res.data);
                showStip(this);
            } else {
                message.info("查询结果为空");
            }
            this.setState({
                info: res.data,
            });
        });
    };
    handleSearch = (params) => {
        this.getData(params);
    };
    componentDidMount() {
        this.getData();
    }
    render() {
        let scroll = { x: 1000, y: 445 };
        let info = this.state.info;
        let { getFieldDecorator } = this.props.form;
        let labelCol = {
            xs: 12,
        };
        let wrapperCol = {
            xs: 24 - labelCol.xs,
        };
        let formItemLayout = {
            labelCol,
            wrapperCol,
        };
        return (
            <div>
                <CurdComponent
                    // rowKey={"index"}
                    // btnText2="查全部"
                    isShowSearchForm={false}
                    // onSearchClick={this.handleSearch}
                    // getSearchFormFields={getSearchFormFields}
                    // searchLoading={this.state.searchLoading}
                    // insertBtnText={"新增UOE配置"} // 不传 就没新增按钮
                    // getInsertFormFields={getInsertFormFields}
                    // insertRecord={this.handleInsertRecord}
                    // col="2"
                    width="600px"
                    // getUpdateFormFields={getUpdateFormFields}
                    // setUpdateModal={this.setUpdateModal}
                    // updateRecord={this.handleUpdateRecord} // 不传 就没编辑
                    // deleteRecord={this.handleDeleteRecord} // 不传 就没删除
                    centered={true}
                    columns={this.columns}
                    dataSource={info}
                    scroll={scroll}
                    // rowSelection={rowSelection} //批量选择 操作
                ></CurdComponent>
                <Modal
                    title="修改记录"
                    visible={this.state.updateModalVisible}
                    onOk={this.handleUpdateModalOk}
                    onCancel={this.handleUpdateModalCancel}
                    width={1370}
                    centered
                >
                    <Form layout={"inline"}>
                        <div>
                            <div className={styles.tit}>修改风控组</div>
                            <Form.Item label="算法Id">
                                {getFieldDecorator("algoId")(
                                    <Input placeholder="" readOnly />
                                )}
                            </Form.Item>
                            <Form.Item label="算法名称">
                                {getFieldDecorator("algoName")(
                                    <Input placeholder="" readOnly />
                                )}
                            </Form.Item>
                            <Form.Item label="修改风控组">
                                {getFieldDecorator("riskGroup", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请选择",
                                        },
                                    ],
                                })(
                                    // SelectOption(this.state.riskGroup, {
                                    //     placeholder: "请选择",
                                    // })
                                    <Input
                                        placeholder=""
                                        onChange={this.inputChange}
                                    />
                                )}
                            </Form.Item>
                        </div>
                        <div>
                            <div className={styles.tit}>时间量总委托笔数</div>
                            <Form.Item label="是否启用">
                                {getFieldDecorator("byte0", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请选择是否启用",
                                        },
                                    ],
                                    initialValue: "1",
                                })(
                                    <Radio.Group disabled>
                                        <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio>
                                    </Radio.Group>
                                )}
                            </Form.Item>
                            <Form.Item
                                label="风控启用委托数量"
                                {...formItemLayout}
                            >
                                {getFieldDecorator("entrustItemThreshold")(
                                    <Input placeholder="" readOnly />
                                )}
                            </Form.Item>
                            <Form.Item
                                label="时间量总委托笔数"
                                {...formItemLayout}
                            >
                                {getFieldDecorator("entrustItemLimit")(
                                    <Input placeholder="" readOnly />
                                )}
                            </Form.Item>

                            <Form.Item label="时间量" {...formItemLayout}>
                                {getFieldDecorator("entrustSeconds")(
                                    <Input placeholder="" readOnly />
                                )}
                            </Form.Item>
                        </div>
                        <div>
                            <div className={styles.tit}>总委托笔数</div>
                            <Form.Item label="是否启用">
                                {getFieldDecorator("byte1", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请选择是否启用",
                                        },
                                    ],
                                    initialValue: "1",
                                })(
                                    <Radio.Group disabled>
                                        <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio>
                                    </Radio.Group>
                                )}
                            </Form.Item>
                            <Form.Item label="总委托笔数" {...formItemLayout}>
                                {getFieldDecorator("entrustTotalThreshold")(
                                    <Input placeholder="" readOnly />
                                )}
                            </Form.Item>
                        </div>
                        <div>
                            <div className={styles.tit}>撤单比</div>
                            <Form.Item label="是否启用">
                                {getFieldDecorator("byte2", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请选择是否启用",
                                        },
                                    ],
                                    initialValue: "1",
                                })(
                                    <Radio.Group disabled>
                                        <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio>
                                    </Radio.Group>
                                )}
                            </Form.Item>
                            <Form.Item
                                label="风控启用委托数量"
                                {...formItemLayout}
                            >
                                {getFieldDecorator(
                                    "cancelEntrustItemThreshold"
                                )(<Input placeholder="" readOnly />)}
                            </Form.Item>
                            <Form.Item label="撤单比" {...formItemLayout}>
                                {getFieldDecorator("cancelRatioLimit")(
                                    <Input placeholder="" readOnly />
                                )}
                            </Form.Item>
                        </div>
                        <div>
                            <div className={styles.tit}>废单比</div>
                            <Form.Item label="是否启用">
                                {getFieldDecorator("byte3", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请选择是否启用",
                                        },
                                    ],
                                    initialValue: "1",
                                })(
                                    <Radio.Group disabled>
                                        <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio>
                                    </Radio.Group>
                                )}
                            </Form.Item>
                            <Form.Item
                                label="风控启用委托数量"
                                {...formItemLayout}
                            >
                                {getFieldDecorator(
                                    "failedEntrustItemThreshold"
                                )(<Input placeholder="" readOnly />)}
                            </Form.Item>
                            <Form.Item label="废单比" {...formItemLayout}>
                                {getFieldDecorator("failedRatioLimit")(
                                    <Input placeholder="" readOnly />
                                )}
                            </Form.Item>
                        </div>
                        <div>
                            <div className={styles.tit}>委托成交比</div>
                            <Form.Item label="是否启用">
                                {getFieldDecorator("byte4", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请选择是否启用",
                                        },
                                    ],
                                    initialValue: "1",
                                })(
                                    <Radio.Group disabled>
                                        <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio>
                                    </Radio.Group>
                                )}
                            </Form.Item>
                            <Form.Item
                                label="风控启用委托数量"
                                {...formItemLayout}
                            >
                                {getFieldDecorator(
                                    "entrustExecEntrustItemThreshold"
                                )(<Input placeholder="" readOnly />)}
                            </Form.Item>
                            <Form.Item label="委托成交比" {...formItemLayout}>
                                {getFieldDecorator("entrustExecRatioLimit")(
                                    <Input placeholder="" readOnly />
                                )}
                            </Form.Item>
                        </div>
                        <div>
                            <div className={styles.tit}>净买入额度</div>
                            <Form.Item label="是否启用">
                                {getFieldDecorator("byte5", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请选择是否启用",
                                        },
                                    ],
                                    initialValue: "1",
                                })(
                                    <Radio.Group disabled>
                                        <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio>
                                    </Radio.Group>
                                )}
                            </Form.Item>
                            <Form.Item
                                label="风控启用委托数量"
                                {...formItemLayout}
                            >
                                {getFieldDecorator(
                                    "netBuyEntrustItemThreshold"
                                )(<Input placeholder="" readOnly />)}
                            </Form.Item>
                            <Form.Item label="净买入额度" {...formItemLayout}>
                                {getFieldDecorator("netBuyAmountLimit")(
                                    <Input placeholder="" readOnly />
                                )}
                            </Form.Item>
                        </div>
                        <div>
                            <div className={styles.tit}>账户撤单频率</div>
                            <Form.Item label="是否启用">
                                {getFieldDecorator("byte6", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请选择是否启用",
                                        },
                                    ],
                                    initialValue: "1",
                                })(
                                    <Radio.Group disabled>
                                        <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio>
                                    </Radio.Group>
                                )}
                            </Form.Item>
                            <Form.Item label="撤单频率笔数" {...formItemLayout}>
                                {getFieldDecorator("cancelItemLimit")(
                                    <Input placeholder="" readOnly />
                                )}
                            </Form.Item>
                            <Form.Item label="时间量" {...formItemLayout}>
                                {getFieldDecorator("cancelSeconds")(
                                    <Input placeholder="" readOnly />
                                )}
                            </Form.Item>
                        </div>
                        <div>
                            <div className={styles.tit}>撤单间隔</div>
                            <Form.Item label="是否启用">
                                {getFieldDecorator("byte7", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请选择是否启用",
                                        },
                                    ],
                                    initialValue: "1",
                                })(
                                    <Radio.Group disabled>
                                        <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio>
                                    </Radio.Group>
                                )}
                            </Form.Item>
                            <Form.Item label="撤单间隔" {...formItemLayout}>
                                {getFieldDecorator("cancelGapSeconds")(
                                    <Input placeholder="" readOnly />
                                )}
                            </Form.Item>
                        </div>
                        <div>
                            <div className={styles.tit}>下单频率</div>
                            <Form.Item label="是否启用">
                                {getFieldDecorator("byte8", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请选择是否启用",
                                        },
                                    ],
                                    initialValue: "1",
                                })(
                                    <Radio.Group disabled>
                                        <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio>
                                    </Radio.Group>
                                )}
                            </Form.Item>
                            <Form.Item label="下单频率笔数" {...formItemLayout}>
                                {getFieldDecorator("tradeItemLimit")(
                                    <Input placeholder="" readOnly />
                                )}
                            </Form.Item>
                            <Form.Item label="时间量" {...formItemLayout}>
                                {getFieldDecorator("tradeSeconds")(
                                    <Input placeholder="" readOnly />
                                )}
                            </Form.Item>
                            <Form.Item label="下单总量" {...formItemLayout}>
                                {getFieldDecorator("tradeQtyLimit")(
                                    <Input placeholder="" readOnly />
                                )}
                            </Form.Item>
                            <Form.Item label="下单总金额" {...formItemLayout}>
                                {getFieldDecorator("tradeAmountLimit")(
                                    <Input placeholder="" readOnly />
                                )}
                            </Form.Item>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(algoConfig);
