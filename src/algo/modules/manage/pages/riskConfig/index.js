import React from "react";
import CurdComponent from "@/components/CurdComponent";
import SelectOption from "@/components/SelectOption";
import { Input, Modal, Radio, Form, Button } from "antd";
import styles from "./style.module.less";

let getSearchFormFields = () => {
    return [
        {
            label: "风控组Id",
            id: "id",
            component: <Input placeholder="请输入" />,
        },
        {
            label: "风控组名称",
            id: "riskName",
            component: <Input placeholder="请输入" />,
        },
    ];
};

class riskConfigManage extends React.PureComponent {
    state = {
        searchLoading: false,
        selectRow: [],
        info: [],
        updateModalVisible: false,
        userRiskConfig: {},
    };
    columns = (params) => {
        return [
            {
                title: "风控组Id",
                dataIndex: "Id",
                width: 100,
            },
            {
                title: "风控组名称",
                dataIndex: "RiskName",
                width: 150,
            },
            {
                title: "风控类型",
                dataIndex: "RiskType",
                width: 100,
            },
            {
                title: "风控启用委托数量",
                dataIndex: "EntrustItemThreshold",
                width: 150,
            },
            {
                title: "时间量:总委托笔数",
                dataIndex: "EntrustItemLimit",
                width: 150,
            },
            {
                title: "总委托:时间量(s)",
                dataIndex: "EntrustSeconds",
                width: 150,
            },
            {
                title: "总委托笔数",
                dataIndex: "EntrustTotalThreshold",
                key: "EntrustTotalThreshold",
            },
            {
                title: "撤单比:风控启用委托数量",
                dataIndex: "CancelEntrustItemThreshold",
                key: "CancelEntrustItemThreshold",
                width: 200,
            },
            {
                title: "撤单比(s) x100",
                dataIndex: "CancelRatioLimit",
                width: 100,
            },
            {
                title: "废单比:风控启用委托数量",
                dataIndex: "FailedEntrustItemThreshold",
                key: "FailedEntrustItemThreshold",
                width: 200,
            },
            {
                title: "废单比(s) x100",
                dataIndex: "FailedRatioLimit",
                key: "FailedRatioLimit",
            },
            {
                title: "委托成交比:风控启用委托数量",
                dataIndex: "EntrustExecEntrustItemThreshold",
                key: "EntrustExecEntrustItemThreshold",
                width: 240,
            },
            {
                title: "委托成交比(s) x100",
                dataIndex: "EntrustExecRatioLimit",
                key: "EntrustExecRatioLimit",
            },
            {
                title: "净买入额度:风控启用委托数量",
                dataIndex: "NetBuyEntrustItemThreshold",
                key: "NetBuyEntrustItemThreshold",
                width: 220,
            },
            {
                title: "净买入额度 x10000",
                dataIndex: "NetBuyAmountLimit",
                key: "NetBuyAmountLimit",
            },
            {
                title: "撤单频率笔数",
                dataIndex: "CancelItemLimit",
                key: "CancelItemLimit",
            },
            {
                title: "撤单:时间量(s)",
                dataIndex: "CancelSeconds",
                key: "CancelSeconds",
            },
            {
                title: "撤单间隔(s)",
                dataIndex: "CancelGapSeconds",
                key: "CancelGapSeconds",
            },
            {
                title: "下单频率笔数",
                dataIndex: "TradeItemLimit",
                key: "TradeItemLimit",
            },
            {
                title: "下单频率:时间量(s)",
                dataIndex: "TradeSeconds",
                key: "TradeSeconds",
            },
            {
                title: "下单总量(股数)x100",
                dataIndex: "TradeQtyLimit",
                key: "TradeQtyLimit",
            },
            {
                title: "下单总金额(元)x100",
                dataIndex: "TradeAmountLimit",
                key: "TradeAmountLimit",
            },
            {
                title: "操作",
                key: "operation",
                fixed: "right",
                width: 100,
                render: (text, record) => (
                    <a
                        onClick={(e) => {
                            this.handleUpdateBtn(record);
                        }}
                    >
                        编辑
                    </a>
                ),
            },
        ];
    };
    // 新增按钮点击事件
    handleInsertBtn = (params) => {
        this.isInsert = true;
        this.isUpdate = false;
        this.setState({
            updateModalVisible: true,
        });
        this.props.form.resetFields();
    };
    // 编辑按钮点击事件
    handleUpdateBtn = (record) => {
        console.log("更新记录", record);
        this.record = record;
        this.isInsert = false;
        this.isUpdate = true;
        this.setState(
            {
                updateModalVisible: true,
            },
            () => {
                let config = record;
                let enable = (record.RiskEnable / 1)
                    .toString(2)
                    .padStart(9, "0");
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
                    riskName: config.RiskName,
                    entrustItemThreshold: config.EntrustItemThreshold,
                    entrustItemLimit: config.EntrustItemLimit,
                    entrustSeconds: config.EntrustSeconds,
                    entrustTotalThreshold: config.EntrustTotalThreshold,
                    cancelEntrustItemThreshold:
                        config.CancelEntrustItemThreshold,
                    cancelRatioLimit: config.CancelRatioLimit,
                    failedEntrustItemThreshold:
                        config.FailedEntrustItemThreshold,
                    failedRatioLimit: config.FailedRatioLimit,
                    entrustExecEntrustItemThreshold:
                        config.EntrustExecEntrustItemThreshold,
                    entrustExecRatioLimit: config.EntrustExecRatioLimit,
                    netBuyEntrustItemThreshold:
                        config.NetBuyEntrustItemThreshold,
                    netBuyAmountLimit: config.NetBuyAmountLimit,
                    cancelItemLimit: config.CancelItemLimit,
                    cancelSeconds: config.CancelSeconds,
                    cancelGapSeconds: config.CancelGapSeconds,
                    tradeItemLimit: config.TradeItemLimit,
                    tradeSeconds: config.TradeSeconds,
                    tradeQtyLimit: config.TradeQtyLimit,
                    tradeAmountLimit: config.TradeAmountLimit,
                });
                // this.props.form.setFieldsValue({
                //     riskGroup: record.riskGroup + "",
                //     userName: record.userName,
                // });
            }
        );
    };

    //弹窗确定
    handleUpdateModalOk = () => {
        this.props.form.validateFields((err) => {
            if (!err) {
                let data = this.props.form.getFieldsValue();
                // console.log(data);
                if (this.isInsert) {
                    console.log("新增风控");
                    this.addRiskGroup(data);
                } else {
                    console.log("修改风控");
                    this.updateRiskGroup(data);
                }
            }
        });
    };
    handleUpdateModalCancel = () => {
        this.setState({
            updateModalVisible: false,
        });
    };

    //新增风控组
    addRiskGroup = (data) => {
        data.riskEnable =
            ("0b" +
                data.byte0 +
                data.byte1 +
                data.byte2 +
                data.byte3 +
                data.byte4 +
                data.byte5 +
                data.byte6 +
                data.byte7 +
                data.byte8) /
                1 +
            "";
        // let params = {
        //     userId: data.userId,
        //     riskGroup: data.riskGroup / 1,
        // };
        console.log(data);
        // return;
        http.post({
            url: "/risk/addRisk",
            data: data,
        }).then((res) => {
            // console.log(res);
            if (res.code == 0) {
                message.success(res.message);
                this.setState({
                    updateModalVisible: false,
                });
                this.getData();
            }
        });
    };
    //修改风控组
    updateRiskGroup = (data) => {
        console.log(data);
        let enable =
            ("0b" +
                data.byte0 +
                data.byte1 +
                data.byte2 +
                data.byte3 +
                data.byte4 +
                data.byte5 +
                data.byte6 +
                data.byte7 +
                data.byte8) /
            1;
        // console.log(enable);
        let riskArr = [
            {
                RiskType: "0", // 修改风控名
                RadioSecond: "0",
                Threshold: "0",
                TradeLimit: "0",
                TradeAmount: "0",
                RiskName: data.riskName,
            },
            {
                RiskType: "1", // 修改风控使能
                RadioSecond: enable + "",
                Threshold: "0",
                TradeLimit: "0",
                TradeAmount: "0",
                RiskName: "",
            },
            {
                RiskType: "2", // 风控类型:时间量总委托笔数 (bit0)
                RadioSecond: data.entrustItemLimit + "", // 时间量:总委托笔数
                Threshold: data.entrustItemThreshold + "", // 风控启用委托数量
                TradeLimit: data.entrustSeconds + "", // 总委托:时间量(s)
                TradeAmount: "0",
                RiskName: "",
            },
            {
                RiskType: "3", // 风控类型:总委托笔数 (bit1)
                RadioSecond: "0",
                Threshold: data.entrustTotalThreshold + "", // 总委托笔数,客户委托总数不超过总委托笔数
                TradeLimit: "0",
                TradeAmount: "0",
                RiskName: "",
            },
            {
                RiskType: "4", // 风控类型:撤单比 (bit2)
                RadioSecond: data.cancelRatioLimit + "", // 撤单比(s) x100
                Threshold: data.cancelEntrustItemThreshold + "", // 撤单比:风控启用委托数量
                TradeLimit: "0",
                TradeAmount: "0",
                RiskName: "",
            },
            {
                RiskType: "5", // 风控类型:废单比 (bit3)
                RadioSecond: data.failedRatioLimit + "", // 废单比(s) x100
                Threshold: data.failedEntrustItemThreshold + "", // 废单比:风控启用委托数量
                TradeLimit: "0",
                TradeAmount: "0",
                RiskName: "",
            },
            {
                RiskType: "6", // 风控类型:委托成交比 (bit4)
                RadioSecond: data.entrustExecRatioLimit + "", // 委托成交比(s) x100, 仅显示
                Threshold: data.entrustExecEntrustItemThreshold + "", // 委托成交比:风控启用委托数量
                TradeLimit: "0",
                TradeAmount: "0",
                RiskName: "",
            },
            {
                RiskType: "7", // 风控类型:净买入额度 (bit5)
                RadioSecond: "0",
                Threshold: data.netBuyEntrustItemThreshold + "", // 净买入额度:风控启用委托数量
                TradeLimit: data.netBuyAmountLimit + "", // 净买入额度 x10000
                TradeAmount: "0",
                RiskName: "",
            },
            {
                RiskType: "8", // 风控类型:撤单频率 (bit6)
                RadioSecond: data.cancelSeconds + "", // 撤单:时间量(s)
                Threshold: "0",
                TradeLimit: data.cancelItemLimit + "", // 撤单频率笔数
                TradeAmount: "0",
                RiskName: "",
            },
            {
                RiskType: "9", // 风控类型:同笔撤单间隔 (bit7)
                RadioSecond: data.cancelGapSeconds + "", // 撤单间隔(s)
                Threshold: "0",
                TradeLimit: "0",
                TradeAmount: "0",
                RiskName: "",
            },
            {
                RiskType: "10", // 风控类型:下单频率 (bit8)
                RadioSecond: data.tradeSeconds + "", // 下单频率:时间量(s)
                Threshold: data.tradeQtyLimit + "", // 下单总量(股数)x100
                TradeLimit: data.tradeItemLimit + "", // 下单频率笔数
                TradeAmount: data.tradeAmountLimit + "", // 下单总金额(元)x100
                RiskName: "",
            },
        ];
        //判断名字 是否改变
        if (data.riskName == this.record.RiskName) {
            riskArr.shift();
        }
        let params = {
            RiskGroup: this.record.Id, // 风控组
            RiskPara: riskArr,
        };
        console.log(params);
        // return;
        http.post({
            url: "/risk/modifyRiskConfig",
            data: params,
        }).then((res) => {
            console.log(res);
            if (res.code == 0) {
                message.success(res.message);
                this.setState({
                    updateModalVisible: false,
                });
                this.getData();
            } else {
                message.error("风控配置修改失败！");
            }
        });
    };
    //查询风控列表
    getData = (params = {}) => {
        // return;
        http.get({
            url: "/risk/queryRisk",
            // data: params,
        }).then((res) => {
            // console.log(res);
            let arr = [];
            if (res.data.length > 0) {
                let dataObj = JSON.parse(res.data);
                // console.log(dataObj);
                if (dataObj.TotalCount > 0) {
                    arr = dataObj.Datas;
                    // console.log(arr);
                    parseDict(arr);
                }
            } else {
                message.info("查询结果为空");
            }
            this.setState({
                info: arr,
            });
        });
    };
    getDataByParams = (params = {}) => {
        http.post({
            url: "/risk/queryRiskConfig",
            data: params,
        }).then((res) => {
            console.log(res);
            if (res.code == "20000") {
                message.info("查询结果为空");
                this.setState({
                    info: [],
                });
                return;
            }
            let arr = [];
            if (res.data.length > 0) {
                let dataObj = JSON.parse(res.data);
                arr = [dataObj];
                console.log(arr);
            } else {
                message.info("查询结果为空");
            }
            this.setState({
                info: arr,
            });
        });
    };
    handleSearch = (params) => {
        console.log(params);
        if (params.id == "" && params.riskName == "") {
            // console.log("getData");
            this.getData(params);
        } else {
            // console.log("getDataByParams");
            this.getDataByParams(params);
        }
    };
    componentDidMount() {
        this.getData();
    }
    render() {
        let scroll = { x: 3000, y: 445 };
        let info = this.state.info;
        //批量
        // let { selectRow } = this.state;
        // const rowSelection = {
        //     selectRow,
        //     onChange: this.handleTableChange,
        // };
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
        let modalTitle = "新增记录";
        if (this.isUpdate) {
            modalTitle = "修改记录";
        }
        return (
            <div className={styles.userInfo}>
                <CurdComponent
                    rowKey={"Id"}
                    // isShowSearchForm={false}
                    // btnText2="查全部"
                    onSearchClick={this.handleSearch}
                    getSearchFormFields={getSearchFormFields}
                    // hasSlot={true}
                    // searchLoading={this.state.searchLoading}
                    // insertBtnText={"新增风控"} // 不传 就没新增按钮
                    hasSlot={true}
                    children={
                        <Button type="primary" onClick={this.handleInsertBtn}>
                            新增风控
                        </Button>
                    }
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
                    title={modalTitle}
                    visible={this.state.updateModalVisible}
                    onOk={this.handleUpdateModalOk}
                    onCancel={this.handleUpdateModalCancel}
                    width={1420}
                    centered
                >
                    <Form layout={"inline"}>
                        <div>
                            <div className={styles.tit}>风控组</div>
                            <Form.Item label="风控组名称">
                                {getFieldDecorator("riskName", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入",
                                        },
                                    ],
                                })(<Input placeholder="请输入" />)}
                            </Form.Item>
                            <Form.Item label="风控组类型">
                                {getFieldDecorator("riskType", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请选择",
                                        },
                                    ],
                                    initialValue: "2",
                                })(
                                    SelectOption(dict.riskType, {
                                        placeholder: "请选择",
                                        disabled: this.isUpdate,
                                    })
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
                                    <Radio.Group>
                                        <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio>
                                    </Radio.Group>
                                )}
                            </Form.Item>
                            <Form.Item
                                label="风控启用委托数量"
                                {...formItemLayout}
                            >
                                {getFieldDecorator("entrustItemThreshold", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入",
                                        },
                                        {
                                            message: "请输入正整数",
                                            pattern: /^\d+$/i,
                                        },
                                    ],
                                })(<Input placeholder="请输入" />)}
                            </Form.Item>
                            <Form.Item
                                label="时间量总委托笔数"
                                {...formItemLayout}
                            >
                                {getFieldDecorator("entrustItemLimit", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入",
                                        },
                                        {
                                            message: "请输入正整数",
                                            pattern: /^\d+$/i,
                                        },
                                    ],
                                })(<Input placeholder="请输入" />)}
                            </Form.Item>

                            <Form.Item label="时间量" {...formItemLayout}>
                                {getFieldDecorator("entrustSeconds", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入",
                                        },
                                        {
                                            message: "请输入正整数",
                                            pattern: /^\d+$/i,
                                        },
                                    ],
                                })(<Input placeholder="请输入" />)}
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
                                    <Radio.Group>
                                        <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio>
                                    </Radio.Group>
                                )}
                            </Form.Item>
                            <Form.Item label="总委托笔数" {...formItemLayout}>
                                {getFieldDecorator("entrustTotalThreshold", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入",
                                        },
                                        {
                                            message: "请输入正整数",
                                            pattern: /^\d+$/i,
                                        },
                                    ],
                                })(<Input placeholder="请输入" />)}
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
                                    <Radio.Group>
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
                                    "cancelEntrustItemThreshold",
                                    {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入",
                                            },
                                        ],
                                    }
                                )(<Input placeholder="请输入" />)}
                            </Form.Item>
                            <Form.Item label="撤单比" {...formItemLayout}>
                                {getFieldDecorator("cancelRatioLimit", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入",
                                        },
                                        {
                                            message: "请输入正整数",
                                            pattern: /^\d+$/i,
                                        },
                                    ],
                                })(<Input placeholder="请输入" />)}
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
                                    <Radio.Group>
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
                                    "failedEntrustItemThreshold",
                                    {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入",
                                            },
                                        ],
                                    }
                                )(<Input placeholder="请输入" />)}
                            </Form.Item>
                            <Form.Item label="废单比" {...formItemLayout}>
                                {getFieldDecorator("failedRatioLimit", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入",
                                        },
                                        {
                                            message: "请输入正整数",
                                            pattern: /^\d+$/i,
                                        },
                                    ],
                                })(<Input placeholder="请输入" />)}
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
                                    <Radio.Group>
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
                                    "entrustExecEntrustItemThreshold",
                                    {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入",
                                            },
                                        ],
                                    }
                                )(<Input placeholder="请输入" />)}
                            </Form.Item>
                            <Form.Item label="委托成交比" {...formItemLayout}>
                                {getFieldDecorator("entrustExecRatioLimit", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入",
                                        },
                                        {
                                            message: "请输入正整数",
                                            pattern: /^\d+$/i,
                                        },
                                    ],
                                })(<Input placeholder="请输入" />)}
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
                                    <Radio.Group>
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
                                    "netBuyEntrustItemThreshold",
                                    {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入",
                                            },
                                        ],
                                    }
                                )(<Input placeholder="请输入" />)}
                            </Form.Item>
                            <Form.Item label="净买入额度" {...formItemLayout}>
                                {getFieldDecorator("netBuyAmountLimit", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入",
                                        },
                                        {
                                            message: "请输入正整数",
                                            pattern: /^\d+$/i,
                                        },
                                    ],
                                })(<Input placeholder="请输入" />)}
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
                                    <Radio.Group>
                                        <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio>
                                    </Radio.Group>
                                )}
                            </Form.Item>
                            <Form.Item label="撤单频率笔数" {...formItemLayout}>
                                {getFieldDecorator("cancelItemLimit", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入",
                                        },
                                        {
                                            message: "请输入正整数",
                                            pattern: /^\d+$/i,
                                        },
                                    ],
                                })(<Input placeholder="请输入" />)}
                            </Form.Item>
                            <Form.Item label="时间量" {...formItemLayout}>
                                {getFieldDecorator("cancelSeconds", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入",
                                        },
                                        {
                                            message: "请输入正整数",
                                            pattern: /^\d+$/i,
                                        },
                                    ],
                                })(<Input placeholder="请输入" />)}
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
                                    <Radio.Group>
                                        <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio>
                                    </Radio.Group>
                                )}
                            </Form.Item>
                            <Form.Item label="撤单间隔" {...formItemLayout}>
                                {getFieldDecorator("cancelGapSeconds", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入",
                                        },
                                        {
                                            message: "请输入正整数",
                                            pattern: /^\d+$/i,
                                        },
                                    ],
                                })(<Input placeholder="请输入" />)}
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
                                    <Radio.Group>
                                        <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio>
                                    </Radio.Group>
                                )}
                            </Form.Item>
                            <Form.Item label="下单频率笔数" {...formItemLayout}>
                                {getFieldDecorator("tradeItemLimit", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入",
                                        },
                                        {
                                            message: "请输入正整数",
                                            pattern: /^\d+$/i,
                                        },
                                    ],
                                })(<Input placeholder="请输入" />)}
                            </Form.Item>
                            <Form.Item label="时间量" {...formItemLayout}>
                                {getFieldDecorator("tradeSeconds", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入",
                                        },
                                        {
                                            message: "请输入正整数",
                                            pattern: /^\d+$/i,
                                        },
                                    ],
                                })(<Input placeholder="请输入" />)}
                            </Form.Item>
                            <Form.Item label="下单总量" {...formItemLayout}>
                                {getFieldDecorator("tradeQtyLimit", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入",
                                        },
                                        {
                                            message: "请输入正整数",
                                            pattern: /^\d+$/i,
                                        },
                                    ],
                                })(<Input placeholder="请输入" />)}
                            </Form.Item>
                            <Form.Item label="下单总金额" {...formItemLayout}>
                                {getFieldDecorator("tradeAmountLimit", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入",
                                        },
                                        {
                                            message: "请输入正整数",
                                            pattern: /^\d+$/i,
                                        },
                                    ],
                                })(<Input placeholder="请输入" />)}
                            </Form.Item>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(riskConfigManage);