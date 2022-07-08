import React from "react";
import CurdComponent from "@/components/CurdComponent";
import SelectOption from "@/components/SelectOption";
import { Input, Modal, Form, message, Icon, Tooltip } from "antd";
import Table from "@/components/Table";
import styles from "./style.module.less";

let getSearchFormFields = () => {
    return [
        {
            label: "用户ID",
            id: "userId",
            component: <Input placeholder="请输入" />,
        },
    ];
};
const getInsertFormFields = () => {
    return [
        {
            label: "用户ID",
            id: "userId",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: <Input />,
        },
        {
            label: "用户名",
            id: "userName",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: <Input />,
        },
        {
            label: "用户密码",
            id: "userPasswd",
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
            label: "柜台网关ID",
            id: "counterGwId",
            rules: [
                {
                    required: true,
                    message: "柜台网关Id不能为空",
                },
            ],
            component: <Input placeholder="请输入交换机编号" />,
        },
        {
            label: "来自柜台",
            id: "counterUserId",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: <Input />,
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
                style: {
                    width: 400,
                },
            }),
        },
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
        {
            label: "客户类型",
            id: "clientType",
            initialValue: "0",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: SelectOption(dict.clientType, {
                placeholder: "请选择",
                allowClear: false,
                style: {
                    width: 400,
                },
            }),
        },
        {
            label: "算法平台用户ID",
            id: "uuserId",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: <Input />,
        },
    ];
};
const getUpdateFormFields = () => {
    return [
        {
            label: "用户ID",
            id: "userId",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: <Input />,
        },
        {
            label: "用户名",
            id: "userName",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: <Input />,
        },
        {
            label: "用户密码",
            id: "userPasswd",
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
            label: "柜台网关ID",
            id: "counterGwId",
            rules: [
                {
                    required: true,
                    message: "柜台网关Id不能为空",
                },
            ],
            component: <Input placeholder="请输入交换机编号" />,
        },
        {
            label: "来自柜台",
            id: "counterUserId",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: <Input />,
        },
        {
            label: "业务类型",
            id: "businessType",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: SelectOption(dict.businessType, {
                placeholder: "请选择",
                allowClear: false,
                style: {
                    width: 400,
                },
            }),
        },
        // {
        //     label: "登录状态",
        //     id: "loginStatus",
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
        {
            label: "客户类型",
            id: "clientType",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: SelectOption(dict.clientType, {
                placeholder: "请选择",
                allowClear: false,
                style: {
                    width: 400,
                },
            }),
        },
        {
            label: "算法平台用户ID",
            id: "uuserId",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: <Input />,
        },
        {
            label: "更新时间",
            id: "createTime",
            initialValue: "",
            component: <Input placeholder="请输入" readOnly disabled />,
        },
    ];
};
class CounterGw extends React.PureComponent {
    columns = (params) => {
        return [
            {
                title: "用户ID",
                dataIndex: "userId",
            },
            {
                title: "用户名",
                dataIndex: "userName",
            },
            // {
            //     title: "柜台网关Id",
            //     dataIndex: "counterGwId",
            // },
            {
                title: "柜台网关ID",
                dataIndex: "counterGwId",
                render: (text, record) => (
                    <div
                        onClick={(e) => {
                            this.handleUpdateBtn(record);
                        }}
                    >
                        <Tooltip title="修改网关">
                            {record.counterGwId}
                            <Icon type="edit" style={{ color: "#1899ff" }} />
                        </Tooltip>
                    </div>
                ),
            },
            {
                title: "来自柜台",
                dataIndex: "counterUserId",
            },
            {
                title: "业务类型",
                dataIndex: "businessTypeValue",
            },
            {
                title: "登录状态",
                dataIndex: "loginStatusValue",
            },
            {
                title: "客户类型",
                dataIndex: "clientTypeValue",
            },
            {
                title: "算法平台用户ID",
                dataIndex: "uuserId",
                width: 150,
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
                title: "网关ID",
                dataIndex: "id",
                width: 100,
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
        updateModalVisible: false,
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
                    message.info("柜台用户信息查询结果为空");
                }
            })
            .catch((e) => {
                message.error("柜台用户信息查询失败");
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
        form.setFieldsValue({
            userId: record.userId,
            userName: record.userName,
            counterGwId: record.counterGwId,
            counterUserId: record.counterUserId,
            businessType: record.businessType + "",
            loginStatus: record.loginStatus + "",
            clientType: record.clientType + "",
            uuserId: record.uuserId,
            createTime: record.createTime,
            userPasswd: record.userPasswd,
        });
    };
    handleInsertRecord = (fromData) => {
        console.log("新增接口", fromData);
        let params = {
            UserId: fromData.userId,
            UserName: fromData.userName,
            UserPasswd: fromData.userPasswd,
            CounterUserId: fromData.counterUserId / 1,
            BusinessType: fromData.businessType / 1,
            ClientType: fromData.clientType / 1,
            UuserId: fromData.uuserId / 1,
            CounterGwId: fromData.counterGwId / 1,
        };
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
                    msg.substring(msg.indexOf("[") + 1, msg.indexOf("]"))
                );
            } else {
                message.error(msg);
            }
            this.isAction = true;
        });
    };
    handleUpdateRecord = ({ form }) => {
        let formData = form.getFieldsValue();
        let params = {
            Id: this.record.id,
            UserId: formData.userId,
            UserName: formData.userName,
            UserPasswd: formData.userPasswd,
            CounterUserId: formData.counterUserId / 1,
            BusinessType: formData.businessType / 1,
            ClientType: formData.clientType / 1,
            UuserId: formData.uuserId / 1,
            CounterGwId: formData.counterGwId / 1,
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
                    msg.substring(msg.indexOf("[") + 1, msg.indexOf("]"))
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
    getData = (params = {}, pagination = { current: 1, pageSize: 11 }) => {
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
    }
    render() {
        let scroll = { x: 1000, y: 445 };
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
                    getInsertFormFields={getInsertFormFields}
                    insertRecord={this.handleInsertRecord}
                    // col="2"
                    width="600px"
                    pagination={this.state.pagination}
                    // updateModalText="修改柜台网关Id"
                    getUpdateFormFields={getUpdateFormFields}
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
