import React from "react";
import CurdComponent from "@/components/CurdComponent";
import SelectOption from "@/components/SelectOption";
import { Input, Modal, Radio, Form, message } from "antd";
import styles from "./style.module.less";

let getSearchFormFields = () => {
    return [
        {
            label: "父级用户ID",
            id: "fatherId",
            component: <Input placeholder="请输入父级用户ID" />,
        },
        {
            label: "用户ID",
            id: "userId",
            component: <Input placeholder="请输入用户ID" />,
        },
        {
            label: "用户类型",
            id: "userType",
            // initialValue: "",
            component: SelectOption(dict.userType, {
                placeholder: "请选择用户类型",
                allowClear: true,
                style: {
                    width: 183,
                },
            }),
        },
        {
            label: "用户风控组别",
            id: "riskGroup",
            component: <Input placeholder="请输入用户风控组别" />,
        },
        // {
        //     label: "柜台用户ID",
        //     id: "counterUserId",
        //     component: <Input placeholder="请输入柜台用户ID" />,
        // },
        {
            label: "业务类型",
            id: "businessType",
            component: SelectOption(dict.businessType, {
                placeholder: "请选择业务类型",
                allowClear: true,
            }),
        },
    ];
};

class userInfo extends React.PureComponent {
    state = {
        searchLoading: false,
        selectRow: [],
        info: [],
        updateModalVisible: false,
        riskGroup: [],
        userRiskConfig: {},
    };
    //批量选择
    handleTableChange = (selectedRowKeys) => {
        console.log("批量选择");
        this.setState({
            selectRow: selectedRowKeys,
        });
    };

    handleInsertRecord = (params) => {
        console.log(params);
    };
    columns = (params) => {
        return [
            {
                title: "父级用户ID",
                dataIndex: "fatherId",
            },
            {
                title: "用户ID",
                dataIndex: "userId",
            },
            {
                title: "用户名",
                dataIndex: "userName",
                key: "userName",
            },
            {
                title: "用户类型",
                dataIndex: "userType",
                key: "userType",
            },
            {
                title: "用户风控组别",
                dataIndex: "riskGroup",
                width: 120,
            },
            // {
            //     title: "柜台用户ID",
            //     dataIndex: "counterUserId",
            // },
            // {
            //     title: "业务类型",
            //     dataIndex: "businessType",
            // },
            // {
            //     title: "登录状态",
            //     dataIndex: "loginStatus",
            // },
            {
                title: "注册时间",
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
    //填入更新记录
    handleUpdate = (record) => {
        console.log("更新记录", record);
        this.record = record;
        this.setState(
            {
                updateModalVisible: true,
                riskGroup: [],
            },
            () => {
                this.getRiskGroup(record.id);
                this.props.form.setFieldsValue({
                    riskGroup: record.riskGroup + "",
                    userName: record.userName,
                });
            }
        );
    };

    handleUpdateModalOk = () => {
        let data = this.props.form.getFieldsValue();
        data.userId = this.record.id;
        console.log(data);
        this.updateUserRiskGroup(data);

        this.setState({
            updateModalVisible: false,
        });
    };
    handleUpdateModalCancel = () => {
        this.setState({
            updateModalVisible: false,
        });
    };
    //删除记录
    handleDeleteRecord = (record) => {
        console.log("删除记录 ", record);
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
    //修改用户风控组
    updateUserRiskGroup = (data) => {
        let params = {
            userId: data.userId,
            riskGroup: data.riskGroup / 1,
        };
        console.log(params);
        // return;
        http.post({
            url: "/risk/modifyUserRiskGroup",
            data: params,
        }).then((res) => {
            // console.log(res);
            if (res.code == 0) {
                message.success(res.message);
                this.getData();
            }
        });
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
                byte0: enableArr[8],
                byte1: enableArr[7],
                byte2: enableArr[6],
                byte3: enableArr[5],
                byte4: enableArr[4],
                byte5: enableArr[3],
                byte6: enableArr[2],
                byte7: enableArr[1],
                byte8: enableArr[0],
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
        http.post({
            // url: "/option/assetInfo/selectList",
            url: "/user/selectByCondition",
            data: params,
        }).then((res) => {
            console.log(res);
            //解析数据字典
            if (res.data.length > 0) {
                parseDict(res.data);
            } else {
                message.info("查询结果为空");
            }
            this.setState({
                info: res.data,
            });
        });
    };
    handleSearch = (params) => {
        console.log(params);
        this.getData(params);
    };
    componentDidMount() {
        this.getData();
    }
    render() {
        let scroll = { x: 1000, y: 445 };
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

        return (
            <div className={styles.userInfo}>
                <CurdComponent
                    // rowKey={"index"}
                    // isShowSearchForm={false}
                    // btnText2="查全部"
                    onSearchClick={this.handleSearch}
                    getSearchFormFields={getSearchFormFields}
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
                    title={"修改记录"}
                    visible={this.state.updateModalVisible}
                    onOk={this.handleUpdateModalOk}
                    onCancel={this.handleUpdateModalCancel}
                    width={1370}
                    centered
                >
                    <Form layout={"inline"}>
                        <div>
                            <div className={styles.tit}>修改风控组</div>
                            <Form.Item label="用户名">
                                {getFieldDecorator("userName")(
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
                                    initialValue: "",
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
                                    initialValue: "",
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
                                    initialValue: "",
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
                                    initialValue: "",
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
                                    initialValue: "",
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
                                    initialValue: "",
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
                                    initialValue: "",
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
                                    initialValue: "",
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
                                    initialValue: "",
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

export default Form.create()(userInfo);
