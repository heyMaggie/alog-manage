import React from "react";
import CurdComponent from "@/components/CurdComponent";
import SelectOption from "@/components/SelectOption";
import { Input, Modal, Form, message, Switch, Tooltip, Icon } from "antd";
import styles from "./style.module.less";

let getSearchFormFields = () => {
    return [
        {
            label: "算法名称",
            id: "algoName",
            component: <Input placeholder="请输入" />,
        },
    ];
};

class algoConfig extends React.PureComponent {
    getInsertFormFields = () => {
        return [
            {
                label: "算法名称",
                id: "AlgoName",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: <Input placeholder="请输入" />,
            },
            {
                label: "算法厂商名",
                id: "ProviderName",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: <Input placeholder="请输入" />,
            },
            {
                label: "算法类型",
                id: "AlgorithmType",
                initialValue: "1",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: SelectOption(dict.algorithmType, {
                    placeholder: "请选择",
                    // allowClear: true,
                    style: {
                        width: 400,
                    },
                }),
            },
            {
                label: "算法类型名称",
                id: "AlgorithmTypeName",
                // initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: <Input placeholder="请输入" />,
            },
            {
                label: "是否显示",
                id: "algorithmShow",
                initialValue: false,
                valuePropName: "checked",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: <Switch size="small" />,
            },
            {
                label: "是否可用",
                id: "algorithmEnable",
                initialValue: false,
                valuePropName: "checked",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: <Switch size="small" />,
            },
            {
                label: "算法所需参数",
                id: "Parameter",
                initialValue: "",
                rules: [
                    // {
                    //     required: true,
                    //     message: "参数不能为空",
                    // },
                ],
                component: <Input placeholder="请输入" />,
            },
            {
                label: "算法风控组",
                id: "RiskGroup",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        message: "请输入正整数",
                        pattern: /^[1-9][0-9]*$/i,
                    },
                ],
                component: (
                    // <Input placeholder="请输入" readOnly disabled />
                    <Input placeholder="请输入" onChange={this.inputChange} />
                ),
                // component: SelectOption(dict.algorithmType, {
                //     placeholder: "请选择",
                //     // allowClear: true,
                //     style: {
                //         width: 400,
                //     },
                // }),
            },
        ];
    };
    getUpdateFormFields = () => {
        return [
            {
                label: "算法名称",
                id: "AlgoName",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: <Input placeholder="请输入" />,
            },
            {
                label: "算法厂商名",
                id: "ProviderName",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: <Input placeholder="请输入" />,
            },
            {
                label: "算法类型",
                id: "AlgorithmType",
                initialValue: "1",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: SelectOption(dict.algorithmType, {
                    placeholder: "请选择",
                    // allowClear: true,
                    style: {
                        width: 400,
                    },
                }),
            },
            {
                label: "算法类型名称",
                id: "AlgorithmTypeName",
                // initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: <Input placeholder="请输入" />,
            },
            {
                label: "是否显示",
                id: "algorithmShow",
                // initialValue: "",
                valuePropName: "checked",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: <Switch size="small" />,
            },
            {
                label: "是否可用",
                id: "algorithmEnable",
                // initialValue: "",
                valuePropName: "checked",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: <Switch size="small" />,
            },
            {
                label: "算法所需参数",
                id: "Parameter",
                initialValue: "",
                rules: [
                    // {
                    //     required: true,
                    //     message: "参数不能为空",
                    // },
                ],
                component: <Input placeholder="请输入" />,
            },
            {
                label: "算法风控组",
                id: "RiskGroup",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        message: "请输入正整数",
                        pattern: /^[1-9][0-9]*$/i,
                    },
                ],
                component: (
                    // <Input placeholder="请输入" readOnly disabled />
                    <Input placeholder="请输入" onChange={this.inputChange} />
                ),
            },
        ];
    };
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
                dataIndex: "algorithmTypeValue",
            },
            {
                title: "算法类型名称",
                dataIndex: "algorithmTypeName",
            },
            {
                title: "是否显示",
                dataIndex: "algorithmShow",
                key: "algorithmShow",
                render: (text, record) => (
                    <div
                        onDoubleClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <Switch
                            checked={record.algorithmShow == 2}
                            size="small"
                            onChange={(e) => {
                                // console.log(text, record);
                                this.onSwitchChange(e, record, 1);
                            }}
                        />
                    </div>
                ),
            },
            {
                title: "是否可用",
                dataIndex: "algorithmEnable",
                key: "algorithmEnable",
                render: (text, record) => (
                    <div
                        onDoubleClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <Switch
                            checked={record.algorithmEnable == 1}
                            size="small"
                            onChange={(e) => {
                                // console.log(text, record);
                                this.onSwitchChange(e, record, 2);
                            }}
                        />
                    </div>
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
                render: (text, record) => (
                    <div
                        onClick={(e) => {
                            this.handleUpdate(record);
                        }}
                    >
                        <Tooltip title="修改风控组">
                            {record.riskGroup}
                            <Icon type="edit" style={{ color: "#1899ff" }} />
                        </Tooltip>
                    </div>
                ),
            },
            {
                title: "创建时间",
                dataIndex: "createTime",
                key: "createTime",
                width: 180,
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

    state = {
        searchLoading: false,
        selectRow: [],
        info: [],
        updateModalVisible: false,
        riskGroup: [],
        userRiskConfig: {},
        pagination: { total: 0 },
    };
    // type 1 : 是否显示    type:2  是否可用
    onSwitchChange = (val, record, type) => {
        // console.log(val, record, type);
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
        // console.log("paramVal", paramVal);
        // console.log("algorithmStatus", algorithmStatus);

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
            // this.isAction = true;
            if (res.code == 0) {
                message.success("修改管理状态成功");
                // showTip(this, "修改管理状态成功");
                // this.isAction = true;
                this.getData(this.searchParam, this.state.pagination);
            } else {
                message.error("修改管理状态失败");
                // this.isAction = true;
            }
        });
    };
    handleInsertRecord = (params) => {
        // {
        //     "AlgoName": "日内回转(ZC)test",
        //     "ProviderName": "自诚科技test",
        //     "UuserId": 1,
        //     "AlgorithmType": 1,
        //     "AlgorithmTypeName": "自诚科技_1test",
        //     "AlgorithmStatus": 3,
        //     "Parameter": "{\"side\":2, \"qty\":\"null\"}",
        //     "RiskGroup": 1
        // }
        let status = 0;
        if (params.algorithmShow) {
            if (params.algorithmEnable) {
                status = 3;
            } else {
                status = 2;
            }
        } else {
            if (params.algorithmEnable) {
                status = 1;
            }
        }
        params.AlgorithmStatus = status;
        params.AlgorithmType = params.AlgorithmType / 1;
        params.RiskGroup = params.RiskGroup / 1;
        console.log("新增接口", params);
        // return;
        http.post({
            url: "/algo/addAlgoInfo",
            data: params,
        }).then((res) => {
            console.log(res);
            message.success(res.message);
            // this.isAction = true;
            // this.getData(this.searchParam, this.state.pagination);
        });
    };
    //填入更新数据
    setUpdateModal = ({ form, record }) => {
        // console.log(record, form);
        this.record = record;
        // {
        //     "AlgoName": "日内回转(ZC)test",
        //     "ProviderName": "自诚科技test",
        //     "UuserId": 1,
        //     "AlgorithmType": 1,
        //     "AlgorithmTypeName": "自诚科技_1test",
        //     "AlgorithmStatus": 3,
        //     "Parameter": "{\"side\":2, \"qty\":\"null\"}",
        //     "RiskGroup": 1
        // }
        let formData = {
            AlgoName: record.algoName,
            ProviderName: record.providerName,
            // UuserId: record.UuserId,
            AlgorithmType: record.algorithmType + "",
            AlgorithmTypeName: record.algorithmTypeName,
            // AlgorithmStatus: record.AlgorithmStatus + "",
            Parameter: record.parameter,
            RiskGroup: record.riskGroup,
        };
        if (record.algorithmStatus == 0) {
            formData.algorithmShow = 0;
            formData.algorithmEnable = 0;
        } else if (record.algorithmStatus == 1) {
            formData.algorithmShow = 0;
            formData.algorithmEnable = 1;
        } else if (record.algorithmStatus == 2) {
            formData.algorithmShow = 2;
            formData.algorithmEnable = 0;
        } else if (record.algorithmStatus == 3) {
            formData.algorithmShow = 2;
            formData.algorithmEnable = 1;
        }
        formData.algorithmShow = formData.algorithmShow == 2;
        formData.algorithmEnable = formData.algorithmEnable == 1;
        form.setFieldsValue(formData);
    };
    handleUpdateRecord = ({ form }) => {
        // params = {
        //     UserId: "atest0000003",
        //     UserName: "test3",
        //     UserPasswd: "test_0000003",
        //     UserType: 1,
        //     // RiskGroup: 1,
        //     // AlgoGroup: 1,
        //     // AlgoProperty: "20",
        //     UuserId: 1,
        // };
        let params = form.getFieldsValue();
        params.id = this.record.id;
        let status = 0;
        if (params.algorithmShow) {
            if (params.algorithmEnable) {
                status = 3;
            } else {
                status = 2;
            }
        } else {
            if (params.algorithmEnable) {
                status = 1;
            }
        }
        params.AlgorithmStatus = status;
        params.AlgorithmType = params.AlgorithmType / 1;
        params.RiskGroup = params.RiskGroup / 1;
        console.log("修改接口", params);
        // return;
        http.post({
            url: "/algo/updateAlgoInfo",
            data: params,
        }).then((res) => {
            // console.log(res);
            message.success(res.message);
            // this.isAction = true;
            // this.getData(this.searchParam, this.state.pagination);
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
                this.getRiskGroup(record.riskGroup);
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
            let msg = res.message;
            if (res.code == 0) {
                message.success(res.message);
                // showTip(this, "修改算法风控组成功");
                // this.isAction = true;
                this.getData(this.searchParam, this.state.pagination);
            } else if (res.code == 20000) {
                message.error(
                    msg.substring(msg.indexOf("[") + 1, msg.indexOf("\n"))
                );
            } else {
                message.error(msg);
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
                message.error("风控配置组不存在,请重新填写！");
                return;
            }
        });
    };
    getData = (params = {}, pagination = { current: 1, pageSize: 11 }) => {
        params = {
            ...params,
            pageId: pagination.current,
            pageNum: pagination.pageSize,
        };
        http.post({
            url: "/algo/list",
            data: params,
        }).then((res) => {
            // console.log(res);
            // console.log(this.state.pagination);
            //解析数据字典
            if (res.data.records && res.data.records.length > 0) {
                res.data.records.forEach((item) => {
                    // console.log(item.algorithmShow);
                    if (item.algorithmStatus == 0) {
                        item.algorithmShow = 0;
                        item.algorithmEnable = 0;
                    } else if (item.algorithmStatus == 1) {
                        item.algorithmShow = 0;
                        item.algorithmEnable = 1;
                    } else if (item.algorithmStatus == 2) {
                        item.algorithmShow = 2;
                        item.algorithmEnable = 0;
                    } else if (item.algorithmStatus == 3) {
                        item.algorithmShow = 2;
                        item.algorithmEnable = 1;
                    }
                });
                parseDictValue(res.data.records);
                // showTip(this);
            } else {
                message.info("查询结果为空");
            }
            let pgn = {
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: res.data.total || 0,
            };
            this.setState({
                info: res.data.records,
                pagination: pgn,
            });
        });
    };
    handleSearch = (params, pagination) => {
        // console.log(params);
        this.searchParam = params;
        this.getData(params, pagination);
    };
    componentDidMount() {
        this.getData();
    }
    render() {
        let scroll = { x: 1000, y: 445 };
        let info = this.state.info;
        let { getFieldDecorator } = this.props.form;
        return (
            <div>
                <CurdComponent
                    // rowKey={"index"}
                    // btnText2="查全部"
                    // isShowSearchForm={false}
                    onSearchClick={this.handleSearch}
                    getSearchFormFields={getSearchFormFields}
                    // searchLoading={this.state.searchLoading}
                    insertBtnText={"新增算法"} // 不传 就没新增按钮
                    // insertModalText={"新增算法"}
                    getInsertFormFields={this.getInsertFormFields}
                    insertRecord={this.handleInsertRecord}
                    // col="2"
                    width="600px"
                    pagination={this.state.pagination}
                    getUpdateFormFields={this.getUpdateFormFields}
                    setUpdateModal={this.setUpdateModal}
                    updateRecord={this.handleUpdateRecord} // 不传 就没编辑
                    deleteRecord={this.handleDeleteRecord} // 不传 就没删除
                    dtWidth="1200px"
                    dtColumns={this.columns()} //详情列表
                    centered={true}
                    columns={this.columns}
                    dataSource={info}
                    scroll={scroll}
                    // rowSelection={rowSelection} //批量选择 操作
                >
                    <div
                        urlPrefix="/algo"
                        title="算法信息"
                        sucCallback={this.getData}
                    ></div>
                </CurdComponent>
                <Modal
                    title={"修改风控组"}
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
                                <Form.Item label="算法Id">
                                    {getFieldDecorator("algoId")(
                                        <Input placeholder="请输入" disabled />
                                    )}
                                </Form.Item>
                                <div style={{ width: 60 }}></div>
                                <Form.Item label="算法名称">
                                    {getFieldDecorator("algoName")(
                                        <Input placeholder="" disabled />
                                    )}
                                </Form.Item>
                            </div>
                            <Form.Item
                                className={styles.marLose14}
                                label={
                                    <label title="请输入已配置成功的风控组,否则风控组不能修改成功!">
                                        修改风控组
                                    </label>
                                }
                                // {...formItemLayout}
                            >
                                {getFieldDecorator("riskGroup", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入",
                                        },
                                    ],
                                    // initialValue: "0",
                                })(
                                    <Input
                                        placeholder=""
                                        onChange={this.inputChange}
                                    />
                                )}
                            </Form.Item>
                        </div>
                        <div style={{ display: "none" }}>
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
                        <div style={{ display: "none" }}>
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
                        <div style={{ display: "none" }}>
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
                        <div style={{ display: "none" }}>
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
export default Form.create()(algoConfig);
