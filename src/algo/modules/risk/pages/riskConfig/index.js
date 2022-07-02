import React from "react";
import CurdComponent from "@/components/CurdComponent";
import SelectOption from "@/components/SelectOption";
import { Input, Modal, Radio, Form, Button, Switch, Col } from "antd";
import styles from "./style.module.less";

let getSearchFormFields = () => {
    return [
        {
            label: "风控组ID",
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
        disabled0: false,
        disabled1: false,
        disabled2: false,
        disabled3: false,
        disabled4: false,
        disabled5: false,
        disabled6: false,
        disabled7: false,
        disabled8: false,
        configShow: false, // 风控是否显示
    };
    columns = (params) => {
        return [
            {
                title: "风控组ID",
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
                dataIndex: "RiskTypeValue",
                width: 100,
            },
            {
                title: "风控启用委托数量",
                dataIndex: "EntrustItemThreshold",
                width: 200,
            },
            {
                title: "时间量:总委托笔数",
                dataIndex: "EntrustItemLimit",
                width: 200,
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
                title: "撤单比(%) ",
                dataIndex: "CancelRatioLimit",
                width: 110,
            },
            {
                title: "废单比:风控启用委托数量",
                dataIndex: "FailedEntrustItemThreshold",
                key: "FailedEntrustItemThreshold",
                width: 200,
            },
            {
                title: "废单比(%) ",
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
                title: "委托成交比(%) ",
                dataIndex: "EntrustExecRatioLimit",
                key: "EntrustExecRatioLimit",
            },
            {
                title: "净买入额度:风控启用委托数量",
                dataIndex: "NetBuyEntrustItemThreshold",
                key: "NetBuyEntrustItemThreshold",
                width: 240,
            },
            {
                title: "净买入额度",
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
                title: "下单总量(股数)",
                dataIndex: "TradeQtyLimit",
                key: "TradeQtyLimit",
            },
            {
                title: "下单总金额(元)",
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
        this.typeChange(record.RiskType);
        this.setState(
            {
                updateModalVisible: true,
                disabled0: false,
                disabled1: false,
                disabled2: false,
                disabled3: false,
                disabled4: false,
                disabled5: false,
                disabled6: false,
                disabled7: false,
                disabled8: false,
            },
            () => {
                let config = record;
                let enable = (record.RiskEnable / 1)
                    .toString(2)
                    .padStart(9, "0");
                let enableArr = enable.split("").map((item) => item == 1);
                // console.log(enableArr);
                // return;
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
                    riskName: config.RiskName,
                    riskType: config.RiskType,
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
            } else {
                message.error("输入内容不正确,请完善");
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
        for (let i = 0; i <= 8; i++) {
            let key = "byte" + i;
            if (data[key]) {
                data[key] = 1;
            } else {
                data[key] = 0;
            }
        }
        data.riskEnable =
            ("0b" +
                data.byte8 +
                data.byte7 +
                data.byte6 +
                data.byte5 +
                data.byte4 +
                data.byte3 +
                data.byte2 +
                data.byte1 +
                data.byte0) /
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
            let msg = res.message;
            if (res.code == 0) {
                message.success(msg);
                this.setState({
                    updateModalVisible: false,
                });
                this.getData();
            } else if (res.code == 20000) {
                message.error(
                    msg.substring(msg.indexOf("[") + 1, msg.indexOf("HTTP"))
                );
            } else {
                message.error(msg);
            }
        });
    };
    //修改风控组
    updateRiskGroup = (data) => {
        console.log(data);
        let enable =
            ("0b" +
                Number(data.byte8) +
                Number(data.byte7) +
                Number(data.byte6) +
                Number(data.byte5) +
                Number(data.byte4) +
                Number(data.byte3) +
                Number(data.byte2) +
                Number(data.byte1) +
                Number(data.byte0)) /
            1;
        // console.log(enable);
        // return enable;
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
                RadioSecond: data.entrustSeconds + "", // 总委托:时间量(s)
                Threshold: data.entrustItemThreshold + "", // 风控启用委托数量
                TradeLimit: data.entrustItemLimit + "", // 时间量:总委托笔数
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
                RadioSecond: data.cancelRatioLimit + "", // 撤单比(s)
                Threshold: data.cancelEntrustItemThreshold + "", // 撤单比:风控启用委托数量
                TradeLimit: "0",
                TradeAmount: "0",
                RiskName: "",
            },
            {
                RiskType: "5", // 风控类型:废单比 (bit3)
                RadioSecond: data.failedRatioLimit + "", // 废单比(s)
                Threshold: data.failedEntrustItemThreshold + "", // 废单比:风控启用委托数量
                TradeLimit: "0",
                TradeAmount: "0",
                RiskName: "",
            },
            {
                RiskType: "6", // 风控类型:委托成交比 (bit4)
                RadioSecond: data.entrustExecRatioLimit + "", // 委托成交比(s) , 仅显示
                Threshold: data.entrustExecEntrustItemThreshold + "", // 委托成交比:风控启用委托数量
                TradeLimit: "0",
                TradeAmount: "0",
                RiskName: "",
            },
            {
                RiskType: "7", // 风控类型:净买入额度 (bit5)
                RadioSecond: "0",
                Threshold: data.netBuyEntrustItemThreshold + "", // 净买入额度:风控启用委托数量
                TradeLimit: data.netBuyAmountLimit * 10000 + "", // 净买入额度
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
                Threshold: data.tradeQtyLimit + "", // 下单总量(股数)
                TradeLimit: data.tradeItemLimit + "", // 下单频率笔数
                TradeAmount: data.tradeAmountLimit * 10000 + "", // 下单总金额(元)
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
            if (res.data && res.data.length > 0) {
                let dataObj = JSON.parse(res.data);
                console.log(dataObj);
                if (dataObj.TotalCount > 0) {
                    arr = dataObj.Datas;
                    // console.log(arr);
                    // parseDict(arr);
                    parseDictValue(arr);
                }
            } else {
                message.info(res.message || "查询结果为空", 4);
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
    handleSearch = (params, pagination) => {
        console.log(params);
        if (params.id == "" && params.riskName == "") {
            // console.log("getData");
            this.getData(params, pagination);
        } else {
            // console.log("getDataByParams");
            this.getDataByParams(params, pagination);
        }
    };
    formChange = (idx) => {
        // console.log("formChange!", idx);
        if (this.isInsert) {
            let formData = this.props.form.getFieldsValue();
            let stateKey = "disabled" + idx;
            let formKey = "byte" + idx;
            this.setState({ [stateKey]: formData[formKey] == 1 });
        }
    };
    typeChange = (type) => {
        console.log("typeChange", type);
        if (type == 1) {
            //用户
            this.setState({
                configShow: true,
            });
        } else {
            //算法
            this.setState({
                configShow: false,
            });
        }
    };
    componentDidMount() {
        this.getData();
    }
    render() {
        let scroll = { x: 4000, y: 445 };
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
        // let pagination = { pageSize: 12 };
        let pageSize = 12;
        // console.log(byte0);
        return (
            <div className={styles.userInfo}>
                <CurdComponent
                    rowKey={"Id"}
                    pageSize={pageSize}
                    // isShowSearchForm={false}
                    // btnText2="查全部"
                    onSearchClick={this.handleSearch}
                    getSearchFormFields={getSearchFormFields}
                    // hasSlot={true}
                    // searchLoading={this.state.searchLoading}
                    insertBtnText={"新增风控"} // 不传 就没新增按钮
                    // hasSlot={true}
                    hasSearchSlot={true}
                    addBtn={
                        <Button
                            type="primary"
                            icon="plus"
                            onClick={this.handleInsertBtn}
                        >
                            新增风控
                        </Button>
                    }
                    // getInsertFormFields={getInsertFormFields}
                    // insertRecord={this.handleInsertRecord}
                    // col="2"
                    width="600px"
                    // pagination={pagination}
                    // getUpdateFormFields={getUpdateFormFields}
                    // setUpdateModal={this.setUpdateModal}
                    // updateRecord={this.handleUpdateRecord} // 不传 就没编辑
                    // deleteRecord={this.handleDeleteRecord} // 不传 就没删除
                    centered={true}
                    columns={this.columns}
                    dataSource={info}
                    scroll={scroll}
                    pageSize={11}
                    // rowSelection={rowSelection} //批量选择 操作
                >
                    <div
                        urlPrefix="/risk"
                        title="风控配置"
                        sucCallback={this.getData}
                    ></div>
                </CurdComponent>
                <Modal
                    title={modalTitle}
                    visible={this.state.updateModalVisible}
                    onOk={this.handleUpdateModalOk}
                    onCancel={this.handleUpdateModalCancel}
                    width={788}
                    wrapClassName="riskConfig"
                    centered
                >
                    <Form layout={"vertical"}>
                        <div>
                            <div className={styles.tit}>
                                <div className={styles.text}>风控组</div>
                            </div>
                            <div className={styles.rowFlex}>
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
                                <div style={{ width: 60 }}></div>
                                <Form.Item
                                    label={
                                        <label
                                            title="用户:该风控只能给用户使用
                            算法:该风控只能给算法使用"
                                        >
                                            风控组类型
                                        </label>
                                    }
                                >
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
                                            onChange: (record) => {
                                                this.typeChange(record);
                                            },
                                        })
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <div
                            className={this.state.configShow ? "" : styles.hide}
                        >
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
                                            <Switch
                                                size="small"
                                                onChange={() =>
                                                    this.formChange(0)
                                                }
                                            >
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
                                                message: "请输入1-13位正整数",
                                                pattern: /^\d{1,13}$/i,
                                            },
                                        ],
                                        initialValue: "0",
                                    })(
                                        <Input
                                            placeholder="请输入"
                                            suffix="笔"
                                            disabled={this.state.disabled0}
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
                                                message: "请输入1-13位正整数",
                                                pattern: /^\d{1,13}$/i,
                                            },
                                        ],
                                        initialValue: "0",
                                    })(
                                        <Input
                                            placeholder="请输入"
                                            suffix="笔"
                                            disabled={this.state.disabled0}
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
                                            message: "请输入0-10的正整数",
                                            pattern: /^([0-9]|(1[0-0]))$/i,
                                        },
                                    ],
                                    initialValue: "0",
                                })(
                                    <Input
                                        placeholder="请输入"
                                        suffix="秒"
                                        disabled={this.state.disabled0}
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
                                            <Switch
                                                size="small"
                                                onChange={() =>
                                                    this.formChange(1)
                                                }
                                            >
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
                                            message: "请输入1-13位正整数",
                                            pattern: /^\d{1,13}$/i,
                                        },
                                    ],
                                    initialValue: "0",
                                })(
                                    <Input
                                        placeholder="请输入"
                                        suffix="笔"
                                        disabled={this.state.disabled1}
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
                                            <Switch
                                                size="small"
                                                onChange={() =>
                                                    this.formChange(2)
                                                }
                                            >
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
                                                    message:
                                                        "请输入1-13位正整数",
                                                    pattern: /^\d{1,13}$/i,
                                                },
                                            ],
                                            initialValue: "0",
                                        }
                                    )(
                                        <Input
                                            placeholder="请输入"
                                            suffix="笔"
                                            disabled={this.state.disabled2}
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
                                                message:
                                                    "请输入0%-100% 之间的数",
                                                pattern: new RegExp(
                                                    "(^(\\d|[1-9]\\d)(\\.\\d{1,2})?$)|(^100$)"
                                                ),
                                            },
                                        ],
                                        initialValue: "0",
                                    })(
                                        <Input
                                            placeholder="请输入"
                                            suffix="%"
                                            disabled={this.state.disabled2}
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
                                            <Switch
                                                size="small"
                                                onChange={() =>
                                                    this.formChange(3)
                                                }
                                            >
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
                                                    message:
                                                        "请输入1-13位正整数",
                                                    pattern: /^\d{1,13}$/i,
                                                },
                                            ],
                                            initialValue: "0",
                                        }
                                    )(
                                        <Input
                                            placeholder="请输入"
                                            suffix="笔"
                                            disabled={this.state.disabled3}
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
                                                message:
                                                    "请输入0%-100% 之间的数",
                                                pattern: new RegExp(
                                                    "(^(\\d|[1-9]\\d)(\\.\\d{1,2})?$)|(^100$)"
                                                ),
                                            },
                                        ],
                                        initialValue: "0",
                                    })(
                                        <Input
                                            placeholder="请输入"
                                            suffix="%"
                                            disabled={this.state.disabled3}
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
                                            <Switch
                                                size="small"
                                                onChange={() =>
                                                    this.formChange(4)
                                                }
                                            >
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
                                                    message:
                                                        "请输入1-13位正整数",
                                                    pattern: /^\d{1,13}$/i,
                                                },
                                            ],
                                            initialValue: "0",
                                        }
                                    )(
                                        <Input
                                            placeholder="请输入"
                                            suffix="笔"
                                            disabled={this.state.disabled4}
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
                                                    message:
                                                        "请输入0%-65535% 之间的数",
                                                    pattern:
                                                        /^([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-5][0-9][0-9][0-9][0-9]|6[0-4][0-9][0-9][0-9]|65[0-4][0-9][0-9]|655[0-2][0-9]|6553[0-5])$/,
                                                },
                                            ],
                                            initialValue: "0",
                                        }
                                    )(
                                        <Input
                                            placeholder="请输入"
                                            suffix="%"
                                            disabled={this.state.disabled4}
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
                                            <Switch
                                                size="small"
                                                onChange={() =>
                                                    this.formChange(5)
                                                }
                                            >
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
                                                    message:
                                                        "请输入1-13位正整数",
                                                    pattern: /^\d{1,13}$/i,
                                                },
                                            ],
                                            initialValue: "0",
                                        }
                                    )(
                                        <Input
                                            placeholder="请输入"
                                            suffix="笔"
                                            disabled={this.state.disabled5}
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
                                                message:
                                                    "请输入正数,最多保留4位小数",
                                                pattern:
                                                    /^0$|^[1-9]\d{0,15}$|^[1-9]\d{0,15}\.{1}\d{1,4}$|^0\.{1}\d{1,4}$/i,
                                            },
                                        ],
                                        initialValue: "0",
                                    })(
                                        <Input
                                            placeholder="请输入"
                                            suffix="元"
                                            disabled={this.state.disabled5}
                                        />
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <div
                            className={this.state.configShow ? "" : styles.hide}
                        >
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
                                            <Switch
                                                size="small"
                                                onChange={() =>
                                                    this.formChange(6)
                                                }
                                            >
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
                                                message: "请输入1-13位正整数",
                                                pattern: /^\d{1,13}$/i,
                                            },
                                        ],
                                        initialValue: "0",
                                    })(
                                        <Input
                                            placeholder="请输入"
                                            suffix="笔"
                                            disabled={this.state.disabled6}
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
                                                message: "请输入0-10的正整数",
                                                pattern: /^([0-9]|(1[0-0]))$/i,
                                            },
                                        ],
                                        initialValue: "0",
                                    })(
                                        <Input
                                            placeholder="请输入"
                                            suffix="秒"
                                            disabled={this.state.disabled6}
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
                                            <Switch
                                                size="small"
                                                onChange={() =>
                                                    this.formChange(7)
                                                }
                                            >
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
                                            message: "请输入0-10的正整数",
                                            pattern: /^([0-9]|(1[0-0]))$/i,
                                        },
                                    ],
                                    initialValue: "0",
                                })(
                                    <Input
                                        placeholder="请输入"
                                        suffix="秒"
                                        disabled={this.state.disabled7}
                                    />
                                )}
                            </Form.Item>
                        </div>
                        <div
                            className={this.state.configShow ? "" : styles.hide}
                        >
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
                                            <Switch
                                                size="small"
                                                onChange={() =>
                                                    this.formChange(8)
                                                }
                                            >
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
                                                message: "请输入1-13位正整数",
                                                pattern: /^\d{1,13}$/i,
                                            },
                                        ],
                                        initialValue: "0",
                                    })(
                                        <Input
                                            placeholder="请输入"
                                            suffix="笔"
                                            disabled={this.state.disabled8}
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
                                                message: "请输入0-10的正整数",
                                                pattern: /^([0-9]|(1[0-0]))$/i,
                                            },
                                        ],
                                        initialValue: "0",
                                    })(
                                        <Input
                                            placeholder="请输入"
                                            suffix="秒"
                                            disabled={this.state.disabled8}
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
                                            disabled={this.state.disabled8}
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
                                                message:
                                                    "请输入正数,最多保留4位小数",
                                                pattern:
                                                    /^0$|^[1-9]\d{0,15}$|^[1-9]\d{0,15}\.{1}\d{1,4}$|^0\.{1}\d{1,4}$/i,
                                            },
                                        ],
                                        initialValue: "0",
                                    })(
                                        <Input
                                            placeholder="请输入"
                                            suffix="元"
                                            disabled={this.state.disabled8}
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

export default Form.create()(riskConfigManage);
