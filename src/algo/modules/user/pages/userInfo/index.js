import React from "react";
import CurdComponent from "@/components/CurdComponent";
import SelectOption from "@/components/SelectOption";
// import UploadWrap from "@/components/UploadWrap";

import { Input, Modal, Switch, Form, message, Tooltip, Icon } from "antd";
import styles from "./style.module.less";

let getSearchFormFields = () => {
    return [
        {
            label: "父级用户ID",
            id: "fatherId",
            component: <Input placeholder="请输入" />,
        },
        {
            label: "用户ID",
            id: "userId",
            component: <Input placeholder="请输入" />,
        },
        {
            label: "用户类型",
            id: "userType",
            // initialValue: "",
            component: SelectOption(dict.userType, {
                placeholder: "请选择",
                allowClear: true,
                style: {
                    width: 183,
                },
            }),
        },
        {
            label: "用户风控组别",
            id: "riskGroup",
            component: <Input placeholder="请输入" />,
        },
        // {
        //     label: "柜台用户ID",
        //     id: "counterUserId",
        //     component: <Input placeholder="请输入柜台用户ID" />,
        // },
        // {
        //     label: "业务类型",
        //     id: "businessType",
        //     component: SelectOption(dict.businessType, {
        //         placeholder: "请选择业务类型",
        //         allowClear: true,
        //     }),
        // },
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
                // width: 120,
                render: (text, record) => (
                    <div
                        onClick={(e) => {
                            this.handleUpdate(record);
                        }}
                    >
                        <Tooltip title="修改网关">
                            {record.riskGroup}
                            <Icon type="edit" style={{ color: "#1899ff" }} />
                        </Tooltip>
                    </div>
                ),
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
            // {
            //     title: "操作",
            //     key: "operation",
            //     fixed: "right",
            //     width: 100,
            //     render: (text, record) => (
            //         <a
            //             onClick={(e) => {
            //                 this.handleUpdate(record);
            //             }}
            //         >
            //             编辑
            //         </a>
            //     ),
            // },
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
                this.getRiskGroup(record.riskGroup);
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
                // message.success(res.message);
                showTip(this, res.message);
                this.isAction = true;
                this.getData();
            } else {
                message.error(res.message);
                this.isAction = true;
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
            // let enableArr = enable.split("");
            let enableArr = enable.split("").map((item) => item == 1);
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
                showTip(this);
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
    handleDownload = () => {
        window.location.href = window.baseURL + "/user/download";
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
        // let formItemLayout = {
        //     labelCol,
        //     wrapperCol,
        // };
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
                >
                    <div
                        urlPrefix="/user"
                        title="用户信息"
                        sucCallback={this.getData}
                    ></div>
                </CurdComponent>

                <Modal
                    title={"修改记录"}
                    visible={this.state.updateModalVisible}
                    onOk={this.handleUpdateModalOk}
                    onCancel={this.handleUpdateModalCancel}
                    width={788}
                    centered
                >
                    <Form layout={"vertical"}>
                        <div>
                            <div className={styles.tit}>
                                <div className={styles.text}>风控组</div>
                            </div>
                            <div className={styles.rowFlex}>
                                <Form.Item label="用户名">
                                    {getFieldDecorator("userName")(
                                        <Input placeholder="请输入" disabled />
                                    )}
                                </Form.Item>
                                <div style={{ width: 60 }}></div>
                                <Form.Item
                                    // className={styles.marLose14}
                                    label="修改风控组"
                                >
                                    {getFieldDecorator("riskGroup", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入",
                                            },
                                        ],
                                    })(
                                        <Input
                                            placeholder=""
                                            onChange={this.inputChange}
                                        />
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <div>
                            <div
                                className={styles.tit}
                                title="账户总委托笔数超过【风控启用数量】后,在【时间量(s)】时间内,委托数量不能超过【时间量总委托笔数】,超过的数量将会被拒绝"
                            >
                                <div className={styles.text}>
                                    时间量总委托笔数
                                </div>
                                <div className={styles.swi}>
                                    <Form.Item>
                                        {getFieldDecorator("byte0", {
                                            valuePropName: "checked",
                                        })(
                                            <Switch size="small" disabled>
                                                {/* <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio> */}
                                            </Switch>
                                        )}
                                        <div className={styles.swiText}>
                                            是否启用
                                        </div>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className={styles.rowFlex}>
                                <Form.Item
                                    style={{ width: 20 + "%" }}
                                    label={
                                        <label title="当委托数量到达该阈值时才启用【时间量总委托笔数】风控">
                                            风控启用委托数量
                                        </label>
                                    }
                                    // {...formItemLayout}
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
                                        initialValue: "0",
                                    })(
                                        <Input
                                            placeholder="请输入"
                                            suffix="笔"
                                            disabled={true}
                                        />
                                    )}
                                </Form.Item>
                                <div style={{ width: 60 }}></div>
                                <Form.Item
                                    style={{ width: 20 + "%" }}
                                    label={
                                        <label title="账户总委托笔数超过【风控启用数量】后,在【时间量(s)】时间内,委托数量不能超过【时间量总委托笔数】,超过的数量将会被拒绝">
                                            时间量总委托笔数
                                        </label>
                                    }
                                    // {...formItemLayout}
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
                                        initialValue: "0",
                                    })(
                                        <Input
                                            placeholder="请输入"
                                            suffix="笔"
                                            disabled={true}
                                        />
                                    )}
                                </Form.Item>
                            </div>
                            <Form.Item
                                className={styles.marLose14}
                                label={
                                    <label title="时间段，建议[1-10]">
                                        时间量
                                    </label>
                                }
                                // {...formItemLayout}
                            >
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
                                    initialValue: "0",
                                })(
                                    <Input
                                        placeholder="请输入"
                                        suffix="秒"
                                        disabled={true}
                                    />
                                )}
                            </Form.Item>
                        </div>
                        <div>
                            <div
                                className={styles.tit}
                                title="账户/算法委托总数不能超过【总委托笔数】"
                            >
                                <div className={styles.text}>总委托笔数</div>
                                <div className={styles.swi}>
                                    <Form.Item>
                                        {getFieldDecorator("byte1", {
                                            valuePropName: "checked",
                                        })(
                                            <Switch size="small" disabled>
                                                {/* <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio> */}
                                            </Switch>
                                        )}
                                        <div className={styles.swiText}>
                                            是否启用
                                        </div>
                                    </Form.Item>
                                </div>
                            </div>
                            <Form.Item
                                label={
                                    <label title="委托笔数阈值">
                                        总委托笔数
                                    </label>
                                }
                                // {...formItemLayout}
                            >
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
                                    initialValue: "0",
                                })(
                                    <Input
                                        placeholder="请输入"
                                        suffix="笔"
                                        disabled={true}
                                    />
                                )}
                            </Form.Item>
                        </div>
                        <div>
                            <div
                                className={styles.tit}
                                title="账户/算法总委托数超过【风控启用委托数量】后,客户总撤单比超过【撤单比%】后,不允许撤单;
撤单比=成功撤单笔数/成功下单笔数*100%=成功撤单笔数/(总委托笔数-成功撤单笔数-总废单笔数)*100%"
                            >
                                <div className={styles.text}>撤单比</div>
                                <div className={styles.swi}>
                                    <Form.Item>
                                        {getFieldDecorator("byte2", {
                                            valuePropName: "checked",
                                        })(
                                            <Switch size="small" disabled>
                                                {/* <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio> */}
                                            </Switch>
                                        )}
                                        <div className={styles.swiText}>
                                            是否启用
                                        </div>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className={styles.rowFlex}>
                                <Form.Item
                                    label={
                                        <label title="当委托数量到达该阈值时才启用【撤单比】风控">
                                            风控启用委托数量
                                        </label>
                                    }
                                    // {...formItemLayout}
                                >
                                    {getFieldDecorator(
                                        "cancelEntrustItemThreshold",
                                        {
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
                                            initialValue: "0",
                                        }
                                    )(
                                        <Input
                                            placeholder="请输入"
                                            suffix="笔"
                                            disabled={true}
                                        />
                                    )}
                                </Form.Item>
                                <div style={{ width: 60 }}></div>
                                <Form.Item
                                    label={
                                        <label title="撤单比阈值">撤单比</label>
                                    }
                                    // {...formItemLayout}
                                >
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
                                        initialValue: "0",
                                    })(
                                        <Input
                                            placeholder="请输入"
                                            suffix="%"
                                            disabled={true}
                                        />
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <div>
                            <div
                                className={styles.tit}
                                title="账户/算法总委托数超过【风控启用委托数量】后,客户总废单比超过【废单比%】后,不允许再进行委托;
废单比=总废单笔数/(成功下单笔数+总废单笔数)*100%"
                            >
                                <div className={styles.text}>废单比</div>
                                <div className={styles.swi}>
                                    <Form.Item>
                                        {getFieldDecorator("byte3", {
                                            valuePropName: "checked",
                                        })(
                                            <Switch size="small" disabled>
                                                {/* <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio> */}
                                            </Switch>
                                        )}
                                        <div className={styles.swiText}>
                                            是否启用
                                        </div>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className={styles.rowFlex}>
                                <Form.Item
                                    label={
                                        <label title="当委托数量到达该阈值时才启用【废单比】风控">
                                            风控启用委托数量
                                        </label>
                                    }
                                    // {...formItemLayout}
                                >
                                    {getFieldDecorator(
                                        "failedEntrustItemThreshold",
                                        {
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
                                            initialValue: "0",
                                        }
                                    )(
                                        <Input
                                            placeholder="请输入"
                                            suffix="笔"
                                            disabled={true}
                                        />
                                    )}
                                </Form.Item>
                                <div style={{ width: 60 }}></div>
                                <Form.Item
                                    label={
                                        <label title="废单比阈值">废单比</label>
                                    }
                                    // {...formItemLayout}
                                >
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
                                        initialValue: "0",
                                    })(
                                        <Input
                                            placeholder="请输入"
                                            suffix="%"
                                            disabled={true}
                                        />
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <div>
                            <div
                                className={styles.tit}
                                title="账户/算法总委托笔数超过【风控启用委托数量】后,账户委托成交比小于【委托成交比(%)】后,后续委托前端会有相应体术(不影响委托);"
                            >
                                <div className={styles.text}>委托成交比</div>
                                <div className={styles.swi}>
                                    <Form.Item>
                                        {getFieldDecorator("byte4", {
                                            valuePropName: "checked",
                                        })(
                                            <Switch size="small" disabled>
                                                {/* <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio> */}
                                            </Switch>
                                        )}
                                        <div className={styles.swiText}>
                                            是否启用
                                        </div>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className={styles.rowFlex}>
                                <Form.Item
                                    label={
                                        <label title="当委托数量到达该阈值时才启用【成交委托比】风控">
                                            风控启用委托数量
                                        </label>
                                    }
                                    // {...formItemLayout}
                                >
                                    {getFieldDecorator(
                                        "entrustExecEntrustItemThreshold",
                                        {
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
                                            initialValue: "0",
                                        }
                                    )(
                                        <Input
                                            placeholder="请输入"
                                            suffix="笔"
                                            disabled={true}
                                        />
                                    )}
                                </Form.Item>
                                <div style={{ width: 60 }}></div>
                                <Form.Item
                                    label={
                                        <label title="委托成交比阈值">
                                            委托成交比
                                        </label>
                                    }
                                    // {...formItemLayout}
                                >
                                    {getFieldDecorator(
                                        "entrustExecRatioLimit",
                                        {
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
                                            initialValue: "0",
                                        }
                                    )(
                                        <Input
                                            placeholder="请输入"
                                            suffix="%"
                                            disabled={true}
                                        />
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <div>
                            <div
                                className={styles.tit}
                                title="账户/算法净买入额度不能超过【净买入额度】超过阈值后，不允许委托;
净买入额度=成功买入总委托金额-成功卖出总委托金额-成功撤单买入总金额"
                            >
                                <div className={styles.text}>净买入额度</div>
                                <div className={styles.swi}>
                                    <Form.Item>
                                        {getFieldDecorator("byte5", {
                                            valuePropName: "checked",
                                        })(
                                            <Switch size="small" disabled>
                                                {/* <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio> */}
                                            </Switch>
                                        )}
                                        <div className={styles.swiText}>
                                            是否启用
                                        </div>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className={styles.rowFlex}>
                                <Form.Item
                                    label={
                                        <label title="当委托数量到达该阈值时才启用【净买入额度】风控">
                                            风控启用委托数量
                                        </label>
                                    }
                                    // {...formItemLayout}
                                >
                                    {getFieldDecorator(
                                        "netBuyEntrustItemThreshold",
                                        {
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
                                            initialValue: "0",
                                        }
                                    )(
                                        <Input
                                            placeholder="请输入"
                                            suffix="笔"
                                            disabled={true}
                                        />
                                    )}
                                </Form.Item>
                                <div style={{ width: 60 }}></div>
                                <Form.Item
                                    label={
                                        <label title="净买入额度阈值">
                                            净买入额度
                                        </label>
                                    }
                                    // {...formItemLayout}
                                >
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
                                        initialValue: "0",
                                    })(
                                        <Input
                                            placeholder="请输入"
                                            suffix="元"
                                            disabled={true}
                                        />
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <div>
                            <div
                                className={styles.tit}
                                title="账户撤单频率在【时间量(s)】时间内,撤单数量不能超过【撤单频率笔数】,超过的撤单将会被拒绝;"
                            >
                                <div className={styles.text}>账户撤单频率</div>
                                <div className={styles.swi}>
                                    <Form.Item>
                                        {getFieldDecorator("byte6", {
                                            valuePropName: "checked",
                                        })(
                                            <Switch size="small" disabled>
                                                {/* <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio> */}
                                            </Switch>
                                        )}
                                        <div className={styles.swiText}>
                                            是否启用
                                        </div>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className={styles.rowFlex}>
                                <Form.Item
                                    label={
                                        <label title="撤单频率笔数阈值">
                                            撤单频率笔数
                                        </label>
                                    }
                                    // {...formItemLayout}
                                >
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
                                        initialValue: "0",
                                    })(
                                        <Input
                                            placeholder="请输入"
                                            suffix="笔"
                                            disabled={true}
                                        />
                                    )}
                                </Form.Item>
                                <div style={{ width: 60 }}></div>
                                <Form.Item
                                    label={
                                        <label title="时间段，建议[1-10]">
                                            时间量
                                        </label>
                                    }
                                    // {...formItemLayout}
                                >
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
                                        initialValue: "0",
                                    })(
                                        <Input
                                            placeholder="请输入"
                                            suffix="秒"
                                            disabled={true}
                                        />
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <div>
                            <div
                                className={styles.tit}
                                title="账户/算法同笔撤单间隔不能小于【撤单间隔】阈值,【撤单间隔】之内的同比撤单将会被拒绝"
                            >
                                <div className={styles.text}>撤单间隔</div>
                                <div className={styles.swi}>
                                    <Form.Item>
                                        {getFieldDecorator("byte7", {
                                            valuePropName: "checked",
                                        })(
                                            <Switch size="small" disabled>
                                                {/* <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio> */}
                                            </Switch>
                                        )}
                                        <div className={styles.swiText}>
                                            是否启用
                                        </div>
                                    </Form.Item>
                                </div>
                            </div>
                            <Form.Item
                                label={
                                    <label title="撤单间隔阈值">撤单间隔</label>
                                }
                                // {...formItemLayout}
                            >
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
                                    initialValue: "0",
                                })(
                                    <Input
                                        placeholder="请输入"
                                        suffix="秒"
                                        disabled={true}
                                    />
                                )}
                            </Form.Item>
                        </div>
                        <div>
                            <div
                                className={styles.tit}
                                title="在【时间量(s)】时间内，账户下单频率笔数不能超过【下单频率笔数】,账户下单总量不能超过【下单总量】,账户下单总金额不能超过【下单总金额】,超过上面的任意一个将会拒绝该委托"
                            >
                                <div className={styles.text}>下单频率</div>
                                <div className={styles.swi}>
                                    <Form.Item>
                                        {getFieldDecorator("byte8", {
                                            valuePropName: "checked",
                                        })(
                                            <Switch size="small" disabled>
                                                {/* <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio> */}
                                            </Switch>
                                        )}
                                        <div className={styles.swiText}>
                                            是否启用
                                        </div>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className={styles.rowFlex}>
                                <Form.Item
                                    label={
                                        <label title="下单频率笔数阈值">
                                            下单频率笔数
                                        </label>
                                    }
                                    // {...formItemLayout}
                                >
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
                                        initialValue: "0",
                                    })(
                                        <Input
                                            placeholder="请输入"
                                            suffix="笔"
                                            disabled={true}
                                        />
                                    )}
                                </Form.Item>
                                <div style={{ width: 60 }}></div>
                                <Form.Item
                                    label={
                                        <label title="时间段，建议[1-10]">
                                            时间量
                                        </label>
                                    }
                                    // {...formItemLayout}
                                >
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
                                        initialValue: "0",
                                    })(
                                        <Input
                                            placeholder="请输入"
                                            suffix="秒"
                                            disabled={true}
                                        />
                                    )}
                                </Form.Item>
                            </div>
                            <div
                                className={
                                    styles.rowFlex + " " + styles.marLose14
                                }
                            >
                                <Form.Item
                                    label={
                                        <label title="下单总量笔数阈值">
                                            下单总量
                                        </label>
                                    }
                                    // {...formItemLayout}
                                >
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
                                        initialValue: "0",
                                    })(
                                        <Input
                                            placeholder="请输入"
                                            suffix="股"
                                            disabled={true}
                                        />
                                    )}
                                </Form.Item>
                                <div style={{ width: 60 }}></div>
                                <Form.Item
                                    label={
                                        <label title="下单总金额阈值">
                                            下单总金额
                                        </label>
                                    }
                                    // {...formItemLayout}
                                >
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
                                        initialValue: "0",
                                    })(
                                        <Input
                                            placeholder="请输入"
                                            suffix="元"
                                            disabled={true}
                                        />
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(userInfo);
