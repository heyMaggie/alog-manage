import React from "react";
import CurdComponent from "@/components/CurdComponent";
import SelectOption from "@/components/SelectOption";
// import UploadWrap from "@/components/UploadWrap";
import { Input } from "antd";
import md5 from "js-md5"; //全局引入
import { connect } from "react-redux";

// const getUpdateFormFields = () => {
//     return []
// };

const columns = (params) => {
    return [
        {
            title: "ID",
            dataIndex: "id",
            width: 100,
        },
        {
            title: "系统用户编码",
            dataIndex: "user_id",
            // width: 100,
        },
        {
            title: "系统用户名称",
            dataIndex: "user_name",
            // width: 140,
        },
        {
            title: "角色编码",
            dataIndex: "role_id",
            // width: 100,
        },
        {
            title: "角色名称",
            dataIndex: "role_name",
            // width: 140,
        },
        {
            title: "系统用户状态",
            dataIndex: "statusValue",
            // width: 100,
        },
        {
            title: "创建时间",
            dataIndex: "create_time",
            width: 240,
        },
    ];
};

let getSearchFormFields = () => {
    return [
        {
            label: "系统用户名称",
            // label: <span>用&nbsp;户&nbsp;名&nbsp;称</span>,
            id: "user_name",
            component: <Input placeholder="请输入" />,
        },
    ];
};
//export default
class systemUser extends React.PureComponent {
    getInsertFormFields = () => {
        return [
            {
                label: "系统用户编码（*ID名称只能为字母或字母与数字的组合）",
                id: "user_id",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        message: "请检查格式",
                        pattern: /^(?![0-9]+$)[a-zA-Z0-9]+$/i,
                    },
                    // {
                    //     validator: checkLength(10),
                    //     trigger: ["change", "blur"],
                    // },
                    {
                        max: 10,
                        message: "最大长度为10",
                    },
                ],
                component: <Input placeholder="请输入" />,
            },
            {
                label: "系统用户名称",
                id: "user_name",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    // {
                    //     validator: checkLength(20),
                    //     trigger: ["change", "blur"],
                    // },
                    {
                        message: "请检查格式",
                        pattern: /^\S*$/i,
                    },
                    {
                        max: 10,
                        message: "最大长度为10",
                    },
                ],
                component: (
                    // <Input placeholder="请输入" readOnly disabled />
                    <Input placeholder="请输入" />
                ),
            },
            {
                label: "角色名称",
                id: "role_id",
                // initialValue: this.state.roleList[0]
                //     ? this.state.roleList[0].key
                //     : "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: SelectOption(this.state.roleList, {
                    placeholder: "请选择",
                    allowClear: false,
                    style: {
                        width: 400,
                    },
                }),
            },
            {
                label: "设置密码",
                id: "password",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        max: 20,
                        message: "最大长度为20",
                    },
                ],
                component: <Input.Password placeholder="请输入" />,
            },
            {
                label: "确认密码",
                id: "password2",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        max: 20,
                        message: "最大长度为20",
                    },
                ],
                component: <Input.Password placeholder="请输入" />,
            },
        ];
    };
    getUpdateFormFields = () => {
        return [
            {
                label: "系统用户编码（*ID名称只能为字母或字母与数字的组合）",
                id: "user_id",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        message: "请检查格式",
                        pattern: /^(?![0-9]+$)[a-zA-Z0-9]+$/i,
                    },
                    // {
                    //     validator: checkLength(20),
                    //     trigger: ["change", "blur"],
                    // },
                    {
                        max: 10,
                        message: "最大长度为10",
                    },
                ],
                component: <Input placeholder="请输入" disabled />,
            },
            {
                label: "系统用户名称",
                id: "user_name",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    // {
                    //     validator: checkLength(20),
                    //     trigger: ["change", "blur"],
                    // },
                    {
                        message: "请检查格式",
                        pattern: /^\S*$/i,
                    },
                    {
                        max: 10,
                        message: "最大长度为10",
                    },
                ],
                component: (
                    // <Input placeholder="请输入" readOnly disabled />
                    <Input placeholder="请输入" />
                ),
            },
            {
                label: "系统用户状态",
                id: "status",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: SelectOption(dict.authStatus, {
                    placeholder: "请选择",
                    allowClear: false,
                }),
            },
            {
                label: "角色名称",
                id: "role_id",
                // initialValue: this.state.roleList[0]
                //     ? this.state.roleList[0].key
                //     : "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: SelectOption(this.state.roleList, {
                    placeholder: "请选择",
                    allowClear: false,
                    style: {
                        width: 400,
                    },
                }),
            },
            {
                label: "原密码",
                id: "passwordOld",
                initialValue: "",
                rules: [
                    {
                        max: 20,
                        message: "最大长度为20",
                    },
                ],
                component: <Input.Password placeholder="请输入" />,
            },
            {
                label: "设置密码",
                id: "password",
                initialValue: "",
                rules: [
                    {
                        max: 20,
                        message: "最大长度为20",
                    },
                ],
                component: <Input.Password placeholder="请输入" />,
            },
            {
                label: "确认密码",
                id: "password2",
                initialValue: "",
                rules: [
                    {
                        max: 20,
                        message: "最大长度为20",
                    },
                ],
                component: <Input.Password placeholder="请输入" />,
            },
        ];
    };
    state = {
        searchLoading: false,
        selectRow: [],
        info: [],
        pagination: { total: 0 },
        roleList: [], //角色列表
    };
    //批量选择
    handleTableChange = (selectedRowKeys) => {
        console.log("批量选择");
        this.setState({
            selectRow: selectedRowKeys,
        });
    };

    handleInsertRecord = (formData) => {
        console.log("新增接口", formData);
        let role = this.state.roleList.filter(
            (item) => item.role_id == formData.role_id
        );
        let params = {
            oper_type: 1, //oper_type // 操作类型  1-新增， 2-修改   3-删除
            user_id: formData.user_id,
            user_name: formData.user_name,
            role_id: role[0].role_id,
            role_name: role[0].role_name,
            password: md5(formData.password),
        };
        // console.log(params);
        if (formData.password != formData.password2) {
            message.error("密码与确认密码不一致");
            window.comfirmOk = "fail";
            return;
        }
        // return;
        http.post({
            url: "/tell-info/userModify",
            data: params,
        }).then((res) => {
            console.log(res);
            if (res.code == 200) {
                message.success("新增成功");
                // this.getData();
            } else {
                message.error(res.msg || "新增失败");
                window.comfirmOk = "fail";
            }
        });
    };
    //更新记录
    handleUpdateRecord = ({ form }) => {
        let formData = form.getFieldsValue();
        console.log("更新记录", form.getFieldsValue());
        console.log(this.record);
        if (formData.password != formData.password2) {
            message.error("密码与确认密码不一致");
            window.comfirmOk = "fail";
            return;
        }
        if (formData.passwordOld) {
            // console.log("passwordOld", formData.passwordOld);
            this.checkPassword(form).then((res) => {
                if (res.code == 200) {
                    // console.log("checkPassword 成功", formData);
                    if (formData.password.length == 0) {
                        message.error("密码不能为空");
                        window.comfirmOk = "fail";
                        return;
                    }
                    this.updateUser(form);
                } else {
                    message.error("原密码校验失败");
                    window.comfirmOk = "fail";
                }
            });
        } else {
            // console.log(formData.passwordOld, "不更新");
            this.updateUser(form);
        }
    };
    checkPassword = (form) => {
        let formData = form.getFieldsValue();
        let params = {
            user_id: formData.user_id,
            ori_passwd: md5(formData.passwordOld),
        };
        // console.log(params);
        // return;
        return http.post({
            url: "/tell-info/checkPassword",
            data: params,
        });
    };
    updateUser = (form) => {
        let formData = form.getFieldsValue();
        // console.log("更新记录", form.getFieldsValue());
        let role = this.state.roleList.filter(
            (item) => item.role_id == formData.role_id
        );
        // if (formData.password.length == 0) {
        //     message.error("密码不能为空");
        //     window.comfirmOk = "fail";
        //     return;
        // }
        let params = {
            oper_type: 2, //oper_type // 操作类型  1-新增， 2-修改   3-删除
            user_id: formData.user_id,
            user_name: formData.user_name,
            role_id: role[0].role_id,
            role_name: role[0].role_name,
            status: formData.status / 1,
            // password: md5(formData.password),
            password: formData.password ? md5(formData.password) : "",
        };
        console.log(params);
        // return;
        http.post({
            url: "/tell-info/userModify",
            data: params,
        }).then((res) => {
            console.log(res);
            // let msg = res.message;
            if (res.code == 200) {
                message.success("修改成功");
            } else {
                message.error(res.msg || "修改失败");
                window.comfirmOk = "fail";
            }
        });
    };
    //删除记录
    handleDeleteRecord = (record) => {
        console.log("删除记录 ", record);
        let params = {
            oper_type: 3, //oper_type // 操作类型  1-新增， 2-修改   3-删除
            user_id: record.user_id,
        };
        http.post({
            url: "/tell-info/userModify",
            data: params,
        }).then((res) => {
            // console.log(res);
            if (res.code == 200) {
                message.success("删除成功");
            }
            this.getData();
        });
    };
    //填入更新数据
    setUpdateModal = ({ form, record }) => {
        // console.log(record, form);
        this.record = record;
        form.setFieldsValue({
            user_id: record.user_id,
            user_name: record.user_name,
            role_id: record.role_id,
            status: record.status + "",
            // role_name: role[0].role_name,
            passwordOld: "",
            password: "",
            password2: "",
        });
    };
    getRoleList = (
        params = {},
        pagination = { current: 1, pageSize: 10000 }
    ) => {
        params = {
            ...params,
            scene: 1,
            role_id: 0,
            // role_name: "",
            page: pagination.current,
            limit: pagination.pageSize,
        };
        // console.log(params);
        http.post({
            url: "/tell-info/roleList",
            data: params,
        }).then((res) => {
            // console.log("getRoleList", res);
            //解析数据字典
            if (res.list && res.list.length > 0) {
                let roleList = res.list
                    .filter((item) => item.status == 1)
                    .map((item) => {
                        return {
                            role_id: item.role_id,
                            role_name: item.role_name,
                            key: item.role_id,
                            value: item.role_name,
                        };
                    });
                if (
                    JSON.stringify(roleList) !=
                    JSON.stringify(this.state.roleList)
                ) {
                    this.setState({
                        roleList: roleList,
                    });
                }
                // this.setState({
                //     roleList: roleList,
                // });
            }
        });
    };
    getData = (params = {}, pagination = { current: 1, pageSize: 13 }) => {
        params = {
            ...params,
            page: pagination.current,
            limit: pagination.pageSize,
        };
        http.post({
            // url: "/stockHolder/list",
            url: "/tell-info/authUserList",
            data: params,
        }).then((res) => {
            // console.log(res);

            //解析数据字典
            if (res.list && res.list.length > 0) {
                let userList = res.list;
                // parseDictValue(userList);
                parseArrDictValue(userList, "status", "authStatus");
            } else {
                message.info("查询结果为空");
            }
            let pgn = {
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: res.total || 0,
            };
            // this.setState({
            //     info: res.list ? res.list : [],
            //     pagination: pgn,
            // });
            if (JSON.stringify(res.list) != JSON.stringify(this.state.info)) {
                this.setState({
                    info: res.list ? res.list : [],
                    pagination: pgn,
                });
            }
        });
    };
    handleSearch = (params, pagination) => {
        this.getData(params, pagination);
    };
    componentDidMount() {
        this.getData();
        this.getRoleList();
    }
    getInfo = () => {
        // this.getData();
        this.getRoleList();
    };
    debounceGet = () => {
        if (window.getInfoTimer) {
            // console.log("清除 请求");
            clearTimeout(window.getInfoTimer);
            window.getInfoTimer = undefined;
        }
        window.getInfoTimer = setTimeout(window.login, 400);
    };
    render() {
        let scroll = { x: 1000, y: 445 };
        let info = this.state.info;
        //批量
        // let { selectRow } = this.state;
        // const rowSelection = {
        //     selectRow,
        //     onChange: this.handleTableChange,
        // };
        window.login = this.getInfo;
        this.debounceGet();
        return (
            <div>
                <CurdComponent
                    // rowKey={"index"}
                    // isShowSearchForm={false}
                    // btnText2="查全部"
                    onSearchClick={this.handleSearch}
                    getSearchFormFields={getSearchFormFields}
                    // searchLoading={this.state.searchLoading}
                    insertBtnText={"新增用户"} // 不传 就没新增按钮
                    getInsertFormFields={this.getInsertFormFields}
                    insertRecord={this.handleInsertRecord}
                    insertModalText={"新增用户"}
                    updateModalText={"修改用户"}
                    // col="1"
                    width="668px"
                    pagination={this.state.pagination}
                    getUpdateFormFields={this.getUpdateFormFields}
                    setUpdateModal={this.setUpdateModal}
                    updateRecord={this.handleUpdateRecord} // 不传 就没编辑
                    deleteRecord={this.handleDeleteRecord} // 不传 就没删除
                    centered={true}
                    columns={columns}
                    dataSource={info}
                    scroll={scroll}
                    // rowSelection={rowSelection} //批量选择 操作
                >
                    {/* <div
                        urlPrefix="/stockHolder"
                        title="系统用户"
                        sucCallback={this.getData}
                    ></div> */}
                </CurdComponent>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        path: state.RouterModel.path,
    };
};
export default connect(mapStateToProps, null)(systemUser);
