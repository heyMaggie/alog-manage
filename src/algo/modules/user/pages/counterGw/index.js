import React from "react";
import CurdComponent from "@/components/CurdComponent";
import SelectOption from "@/components/SelectOption";
import { Input, Modal, Form, message, Icon, Tooltip } from "antd";
import Table from "@/components/Table";
import styles from "./style.module.less";

let getSearchFormFields = () => {
    return [
        {
            label: "柜台用户编码",
            id: "userId",
            component: <Input placeholder="请输入" />,
        },
        {
            label: "用户名称",
            id: "algoUserName",
            component: <Input placeholder="请输入" />,
        },
    ];
};

class CounterGw extends React.PureComponent {
    getInsertFormFields = () => {
        return [
            {
                label: "用户名称",
                id: "uuserId",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        validator: checkLength(10),
                        trigger: ["change", "blur"],
                    },
                ],
                // component: <Input placeholder="请输入" />,
                component: SelectOption(this.state.userList, {
                    showSearch: true,
                    placeholder: "请选择",
                    allowClear: false,
                    filterOption: (input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0,
                    style: {
                        width: 400,
                    },
                }),
            },
            {
                label: "柜台用户编码",
                id: "userId",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        validator: checkLength(12),
                        trigger: ["change", "blur"],
                    },
                ],
                component: <Input placeholder="请输入" />,
            },
            {
                label: "柜台用户名称",
                id: "userName",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        validator: checkLength(32),
                        trigger: ["change", "blur"],
                    },
                ],
                component: <Input placeholder="请输入" />,
            },
            // {
            //     label: "用户密码",
            //     id: "userPasswd",
            //     initialValue: "",
            //     rules: [
            //         {
            //             required: true,
            //             message: "参数不能为空",
            //         },
            //         {
            //             validator: checkLength(32),
            //             trigger: ["change", "blur"],
            //         },
            //     ],
            //     component: <Input placeholder="请输入" />,
            // },
            // {
            //     label: "柜台网关ID",
            //     id: "counterGwId",
            //     rules: [
            //         {
            //             required: true,
            //             message: "柜台网关Id不能为空",
            //         },
            //         {
            //             validator: checkLength(10),
            //             trigger: ["change", "blur"],
            //         },
            //     ],
            //     component: <Input placeholder="请输入" />,
            // },
            {
                label: "业务类型",
                id: "businessType",
                initialValue: "1",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: SelectOption(dict.businessType, {
                    placeholder: "请选择",
                    allowClear: false,
                    onChange: this.selectChange,
                }),
            },
            {
                label: "柜台网关",
                id: "counterGwId",
                rules: [
                    {
                        required: true,
                        message: "柜台网关不能为空",
                    },
                    // {
                    //     max: 10,
                    //     message: "最大长度为10",
                    // },
                ],
                component: SelectOption(this.state.counterArr, {
                    placeholder: "请选择",
                    allowClear: false,
                }),
            },
            // {
            //     label: "来自柜台",
            //     id: "counterUserId",
            //     rules: [
            //         {
            //             required: true,
            //             message: "参数不能为空",
            //         },
            //         {
            //             validator: checkLength(10),
            //             trigger: ["change", "blur"],
            //         },
            //     ],
            //     component: <Input placeholder="请输入" />,
            // },
            // {
            //     label: "登录状态",
            //     id: "loginStatus",
            //     initialValue: "0",
            //     rules: [
            //         {
            //             required: true,
            //             message: "参数不能为空",
            //         },
            //     ],
            //     component: SelectOption(dict.loginStatus, {
            //         placeholder: "请选择",
            //         allowClear: false,
            //         style: {
            //             width: 400,
            //         },
            //     }),
            // },
            // {
            //     label: "客户类型",
            //     id: "clientType",
            //     initialValue: "0",
            //     rules: [
            //         {
            //             required: true,
            //             message: "参数不能为空",
            //         },
            //     ],
            //     component: SelectOption(dict.clientType, {
            //         placeholder: "请选择",
            //         allowClear: false,
            //         style: {
            //             width: 400,
            //         },
            //     }),
            // },

            {
                label: "终端信息",
                id: "TerminalInfo",
                rules: [
                    // {
                    //     validator: checkLength(256),
                    //     trigger: ["change", "blur"],
                    // },
                    {
                        max: 256,
                        message: "最大长度为256",
                    },
                ],
                component: <Input placeholder="请输入" />,
            },
            {
                label: "营业编号",
                id: "CustOrgId",
                rules: [
                    // {
                    //     validator: checkLength(256),
                    //     trigger: ["change", "blur"],
                    // },
                    {
                        max: 50,
                        message: "最大长度为50",
                    },
                ],
                component: <Input placeholder="请输入" />,
            },
            {
                label: "系统编号",
                id: "ClSystemId",
                rules: [
                    // {
                    //     validator: checkLength(256),
                    //     trigger: ["change", "blur"],
                    // },
                    {
                        max: 50,
                        message: "最大长度为50",
                    },
                ],
                component: <Input placeholder="请输入" />,
            },
        ];
    };
    getUpdateFormFields = () => {
        return this.getInsertFormFields();
        return [
            {
                label: "用户名称",
                id: "uuserId",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        validator: checkLength(10),
                        trigger: ["change", "blur"],
                    },
                ],
                component: <Input placeholder="请输入" />,
            },
            {
                label: "柜台用户编码",
                id: "userId",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        validator: checkLength(12),
                        trigger: ["change", "blur"],
                    },
                ],
                component: <Input placeholder="请输入" />,
            },
            {
                label: "柜台用户名称",
                id: "userName",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        validator: checkLength(32),
                        trigger: ["change", "blur"],
                    },
                ],
                component: <Input placeholder="请输入" />,
            },
            {
                label: "业务类型",
                id: "businessType",
                initialValue: "1",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: SelectOption(dict.businessType, {
                    placeholder: "请选择",
                    allowClear: false,
                    onChange: this.selectChange,
                }),
            },
            {
                label: "柜台网关",
                id: "counterGwId",
                rules: [
                    {
                        required: true,
                        message: "柜台网关不能为空",
                    },
                    // {
                    //     max: 10,
                    //     message: "最大长度为10",
                    // },
                ],
                component: SelectOption(this.state.counterArr, {
                    placeholder: "请选择",
                    allowClear: false,
                }),
            },
            {
                label: "终端信息",
                id: "TerminalInfo",
                rules: [
                    // {
                    //     validator: checkLength(256),
                    //     trigger: ["change", "blur"],
                    // },
                    {
                        max: 256,
                        message: "最大长度为256",
                    },
                ],
                component: <Input placeholder="请输入" />,
            },
            {
                label: "营业编号",
                id: "CustOrgId",
                rules: [
                    // {
                    //     validator: checkLength(256),
                    //     trigger: ["change", "blur"],
                    // },
                    {
                        max: 50,
                        message: "最大长度为50",
                    },
                ],
                component: <Input placeholder="请输入" />,
            },
            {
                label: "系统编号",
                id: "ClSystemId",
                rules: [
                    // {
                    //     validator: checkLength(256),
                    //     trigger: ["change", "blur"],
                    // },
                    {
                        max: 50,
                        message: "最大长度为50",
                    },
                ],
                component: <Input placeholder="请输入" />,
            },
        ];
    };
    // let keys = Object.keys(this.insertForm.getFieldsValue()).filter(
    //     (item) => item.includes("counterGwId")
    // );
    // console.log(this.insertForm.getFieldsValue());
    // if (keys.length > 0) {
    //     this.insertForm.resetFields(keys);
    // }
    selectChange = (val) => {
        // console.log("selectChange ", val);
        this.getCounterArr(val);
        if (this.updateForm) {
            this.updateForm.resetFields(["counterGwId"]);
        }
        if (this.insertForm) {
            // 清空柜台地址
            this.insertForm.resetFields(["counterGwId"]);
        }
    };
    columns = (params) => {
        return [
            {
                title: "用户账户",
                dataIndex: "uuserId",
                width: 150,
            },
            {
                title: "用户名称",
                dataIndex: "algoUserName",
                width: 150,
            },
            {
                title: "柜台用户编码",
                dataIndex: "userId",
                width: 150,
            },
            {
                title: "柜台用户名称",
                dataIndex: "userName",
                width: 150,
            },
            // {
            //     title: "柜台网关Id",
            //     dataIndex: "counterGwId",
            // },
            {
                // title: "柜台网关ID",
                // dataIndex: "counterGwId",
                title: "柜台网关",
                dataIndex: "gwAddr",
                width: 200,
                render: (text, record) => (
                    <div
                        onClick={(e) => {
                            this.handleUpdateBtn(record);
                        }}
                    >
                        <Tooltip title="修改网关">
                            {record.gwAddr}
                            <Icon
                                type="edit"
                                style={{
                                    paddingLeft: "5px",
                                    color: "#1899ff",
                                }}
                            />
                        </Tooltip>
                    </div>
                ),
            },
            // {
            //     title: "来自柜台",
            //     dataIndex: "counterUserId",
            // },
            {
                title: "业务类型",
                dataIndex: "businessTypeValue",
                width: 120,
            },
            {
                title: "登录状态",
                dataIndex: "loginStatusValue",
                width: 120,
            },
            // {
            //     title: "客户类型",
            //     dataIndex: "clientTypeValue",
            // },
            {
                title: "终端信息",
                dataIndex: "terminalInfo",
                width: 200,
            },
            {
                title: "营业编号",
                dataIndex: "custOrgid",
                // width: 100,
            },
            {
                title: "系统编号",
                dataIndex: "clSystemId",
                width: 200,
            },
            {
                title: "创建时间",
                dataIndex: "createTime",
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
            //                 this.handleUpdateBtn(record);
            //             }}
            //         >
            //             编辑
            //         </a>
            //     ),
            // },
        ];
    };
    columns2 = (params) => {
        return [
            {
                title: "柜台网关ID",
                dataIndex: "id",
                width: 120,
                ellipsis: true,
            },
            {
                title: "券商编码",
                dataIndex: "brokerCode",
                width: 135,
                ellipsis: true,
            },
            {
                title: "券商名称",
                dataIndex: "brokerName",
                width: 130,
                ellipsis: true,
            },
            {
                title: "支持的业务类型",
                dataIndex: "supportType",
                ellipsis: true,
            },
            {
                title: "柜台地址",
                dataIndex: "gwAddr",
                width: 180,
                ellipsis: true,
            },
            {
                title: "柜台状态",
                dataIndex: "status",
                ellipsis: true,
            },
            {
                title: "柜台版本号",
                dataIndex: "version",
                width: 120,
                ellipsis: true,
            },
        ];
    };

    state = {
        searchLoading: false,
        selectedRowKeys: [],
        info: [],
        updateArr: [],
        updataAllArr: [], //所有柜台
        counterArr: [],
        updateModalVisible: false,
        userList: [], //用户列表
    };
    //批量选择
    handleTableChange = (selectedRowKeys, row) => {
        // console.log("批量选择", selectedRowKeys, row);
        this.setState({
            selectedRowKeys: selectedRowKeys,
        });
    };
    getCounterInfo = (params = {}) => {
        // params.token = "";
        // console.log(this.record);
        params.businessType = this.record.businessType;
        // params.businessType = 0;
        http.post({
            url: "/counter-info/listAll",
            data: params,
        })
            .then((res) => {
                console.log("柜台信息", res);
                //解析数据字典
                if (res.data.length > 0) {
                    parseDict(res.data);
                    // // showTip(this);
                    this.setState(
                        {
                            updateModalVisible: true,
                            selectedRowKeys: [this.record.counterGwId],
                        },
                        () => {
                            this.setState(
                                {
                                    updateArr: res.data,
                                },
                                () => {
                                    this.refs.counterTable.querySelector(
                                        ".ant-table-body"
                                    ).style.height = "600px";
                                }
                            );
                        }
                    );
                } else {
                    message.info("获取柜台网关地址为空");
                    this.setState({
                        updateArr: [],
                    });
                }
            })
            .catch((e) => {
                message.error("获取柜台地址失败");
                this.setState({
                    updateArr: [],
                });
            });
    };
    getCounterArr = (type = 1) => {
        // console.log(this.record);
        let params = {};
        params.businessType = type;
        // params.businessType = 0;
        return http
            .post({
                url: "/counter-info/listAll",
                data: params,
            })
            .then((res) => {
                console.log("柜台信息", res);
                //解析数据字典
                if (res.data.length > 0) {
                    let arr = res.data.map((item) => {
                        return { key: item.id + "", value: item.gwAddr };
                    });
                    // console.log(arr);
                    this.setState({
                        counterArr: arr,
                    });
                } else {
                    message.info("获取柜台网关地址为空");
                    this.setState({
                        counterArr: [],
                    });
                }
            })
            .catch((e) => {
                // message.error("柜台用户信息查询失败");
                message.info("获取柜台网关地址失败");
                this.setState({
                    counterArr: [],
                });
            });
    };
    getUserSelectList = () => {
        http.get({
            url: "/user/listAll",
        }).then((res) => {
            let idArr = [];
            if (res.data && res.data.length) {
                // RiskType: [{ key: "1", value: "用户" },{ key: "2", value: "算法" },
                idArr = res.data.map((item) => {
                    let obj = {};
                    obj.key = item.id;
                    obj.value = item.userName;
                    return obj;
                });
            }
            this.setState({
                userList: idArr,
            });
        });
    };
    // 编辑按钮点击事件
    handleUpdateBtn = (record) => {
        console.log("更新记录", record);
        this.record = record;
        this.isInsert = false;
        this.isUpdate = true;
        this.getCounterInfo();
    };
    //填入更新数据
    setUpdateModal = ({ form, record }) => {
        // console.log(record, form);
        this.record = record;
        this.getCounterArr(record.businessType / 1).then(() => {
            form.setFieldsValue({
                userId: record.userId,
                userName: record.userName,
                counterGwId: record.counterGwId + "",
                // counterUserId: record.counterUserId,
                businessType: record.businessType + "",
                // loginStatus: record.loginStatus + "",
                // clientType: record.clientType + "",
                uuserId: record.uuserId,
                // createTime: record.createTime,
                // userPasswd: record.userPasswd,
                TerminalInfo: record.terminalInfo,
                CustOrgId: record.custOrgid,
                ClSystemId: record.clSystemId,
            });
        });
        // form.setFieldsValue({
        //     userId: record.userId,
        //     userName: record.userName,
        //     counterGwId: record.counterGwId + "",
        //     // counterUserId: record.counterUserId,
        //     businessType: record.businessType + "",
        //     // loginStatus: record.loginStatus + "",
        //     // clientType: record.clientType + "",
        //     uuserId: record.uuserId,
        //     // createTime: record.createTime,
        //     // userPasswd: record.userPasswd,
        //     TerminalInfo: record.terminalInfo,
        //     CustOrgId: record.custOrgid,
        //     ClSystemId: record.clSystemId,
        // });
    };
    handleInsertRecord = (formData) => {
        console.log("新增接口", formData);
        let params = {
            UserId: formData.userId,
            UserName: formData.userName,
            // UserPasswd: formData.userPasswd,
            // CounterUserId: formData.counterUserId / 1,
            BusinessType: formData.businessType / 1,
            // ClientType: formData.clientType / 1,
            UuserId: formData.uuserId / 1,
            CounterGwId: formData.counterGwId / 1,
            TerminalInfo: formData.TerminalInfo,
            CustOrgId: formData.CustOrgId,
            ClSystemId: formData.ClSystemId,
        };
        // console.log("新增 ", params);
        http.post({
            url: "/counter/addCounterUserInfo",
            data: params,
        }).then((res) => {
            let msg = res.message;
            if (res.code == 0) {
                message.success(msg);
                // this.getData();
            } else if (res.code == 20000) {
                message.error(
                    msg.substring(msg.indexOf("[") + 1, msg.lastIndexOf("]"))
                );
            } else {
                message.error(msg);
            }
            this.isAction = true;
        });
    };
    onInsertModalReady = ({ form }) => {
        this.insertForm = form;
    };
    onUpdateModalReady = ({ form }) => {
        this.updateForm = form;
    };
    handleUpdateRecord = ({ form }) => {
        let formData = form.getFieldsValue();
        let params = {
            Id: this.record.id,
            UserId: formData.userId,
            UserName: formData.userName,
            // UserPasswd: formData.userPasswd,
            // CounterUserId: formData.counterUserId / 1,
            BusinessType: formData.businessType / 1,
            // ClientType: formData.clientType / 1,
            UuserId: formData.uuserId / 1,
            CounterGwId: formData.counterGwId / 1,
            TerminalInfo: formData.TerminalInfo,
            CustOrgId: formData.CustOrgId,
            ClSystemId: formData.ClSystemId,
        };
        console.log("更新编辑记录", params);
        http.post({
            url: "/counter/updateCounterUserInfo",
            data: params,
        }).then((res) => {
            let msg = res.message;
            if (res.code == 0) {
                message.success(msg);
                // this.getData();
                // this.getData(this.searchParam, this.state.pagination);
            } else if (res.code == 20000) {
                message.error(
                    msg.substring(msg.indexOf("[") + 1, msg.lastIndexOf("]"))
                );
            } else {
                message.error(msg);
            }
            this.isAction = true;
        });
    };
    //弹窗确定
    handleUpdateModalOk = () => {
        if (this.state.selectedRowKeys.length == 0) {
            message.error("请选择柜台网关");
            return;
        }
        // console.log("selectedRowKeys", this.state.selectedRowKeys);
        // console.log("record", this.record);
        // return;
        this.handleUpdateRecord2();
    };
    //更新记录
    handleUpdateRecord2 = () => {
        // let formData = form.getFieldsValue();
        let params = {};
        params.UuserId = this.record.uuserId;
        params.BusinessType = this.record.businessType;
        // let dataArr = this.record.businessType.split("-");
        // console.log(dataArr);
        // if (dataArr.length == 2) {
        //     params.BusinessType = dataArr[0] / 1;
        // }
        params.GwId = this.state.selectedRowKeys[0] / 1;
        console.log("更新记录", params);
        // return;
        http.post({
            url: "/counter-user-info/updateUserCounterGw",
            data: params,
        }).then((res) => {
            console.log(res);
            this.isAction = true;
            //解析数据字典
            if (res.code == 0) {
                message.success("修改柜台网关Id成功");
                this.setState({
                    updateModalVisible: false,
                });
                this.getData(this.searchParam, this.state.pagination);
                // this.getData();
            } else {
                message.error("修改柜台网关Id失败");
            }
        });
    };
    handleUpdateModalCancel = () => {
        this.setState({
            updateModalVisible: false,
        });
    };
    getData = (params = {}, pagination = { current: 1, pageSize: 13 }) => {
        params = {
            ...params,
            pageId: pagination.current,
            pageNum: pagination.pageSize,
        };
        // params.token = "";
        http.post({
            url: "/counter-user-info/list",
            data: params,
        }).then((res) => {
            console.log(res);
            //解析数据字典
            if (res.data.records && res.data.records.length > 0) {
                // parseDict(res.data);
                parseDictValue(res.data.records);
                // showTip(this);
            } else {
                message.info("查询结果为空");
            }
            let pgn = {
                current: res.data.current,
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
        this.searchParam = params;
        this.getData(params, pagination);
    };
    componentDidMount() {
        this.getData();
        this.getCounterArr();
        this.getUserSelectList();
    }
    render() {
        let scroll = { x: 2200, y: 445 };
        let scroll2 = { x: 1000, y: 900 };
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
        let { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            type: "radio",
            onChange: this.handleTableChange,
        };
        return (
            <div>
                <CurdComponent
                    // rowKey={"index"}
                    // btnText2="查全部"
                    // isShowSearchForm={false}
                    onSearchClick={this.handleSearch}
                    getSearchFormFields={getSearchFormFields}
                    // searchLoading={this.state.searchLoading}
                    insertBtnText={"新增"} // 不传 就没新增按钮
                    getInsertFormFields={this.getInsertFormFields}
                    onInsertModalReady={this.onInsertModalReady}
                    onUpdateModalReady={this.onUpdateModalReady}
                    insertRecord={this.handleInsertRecord}
                    // col="2"
                    width="600px"
                    pagination={this.state.pagination}
                    // updateModalText="修改柜台网关Id"
                    getUpdateFormFields={this.getUpdateFormFields}
                    setUpdateModal={this.setUpdateModal}
                    updateRecord={this.handleUpdateRecord} // 不传 就没编辑
                    // deleteRecord={this.handleDeleteRecord} // 不传 就没删除
                    centered={true}
                    columns={this.columns}
                    dataSource={info}
                    scroll={scroll}
                    // rowSelection={rowSelection} //批量选择 操作
                >
                    <div
                        urlPrefix="/counter-user-info"
                        title="柜台用户"
                        sucCallback={this.getData}
                    ></div>
                </CurdComponent>
                <Modal
                    title={"修改柜台网关Id"}
                    visible={this.state.updateModalVisible}
                    onOk={this.handleUpdateModalOk}
                    onCancel={this.handleUpdateModalCancel}
                    width={1288}
                    centered
                >
                    <Form layout={"inline"}>
                        <div ref="counterTable" className="counterTable">
                            <Table
                                rowKey={"id"}
                                columns={this.columns2()}
                                dataSource={this.state.updateArr}
                                scroll={scroll2}
                                size="small"
                                rowSelection={rowSelection}
                                // handlePagination={this.handlePagination}
                                // pagination={this.props.pagination}
                                pagination={false}
                                // pagaSize={pagaSize}
                                // onDoubleClick={this.onDoubleClick}
                                // showDetail={dtColumns.length > 0}
                            ></Table>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(CounterGw);
