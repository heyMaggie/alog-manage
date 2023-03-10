import React from "react";
import CurdComponent from "@/components/CurdComponent";
import SelectOption from "@/components/SelectOption";
import Table from "@/components/Table";
import { Select } from "antd";
// import UploadWrap from "@/components/UploadWrap";
import { connect } from "react-redux";

import {
    Input,
    Modal,
    Switch,
    Form,
    message,
    Tooltip,
    Icon,
    AutoComplete,
} from "antd";
import styles from "./style.module.less";
import md5 from "js-md5"; //全局引入
class userInfo extends React.PureComponent {
    state = {
        searchLoading: false,
        selectRow: [],
        info: [],
        updateModalVisible: false,
        updateModalVisible2: false,
        riskGroup: [],
        userRiskConfig: {},
        pagination: { total: 0 },
        riskList: [], //算法列表
        parentInfoList: [], //操作人用户列表
        algoList: [],
        algoSecList: [],
        seUserType: "1", //新增编辑选择的用户类型
        organizationList: [], //机构名称
    };
    getInsertFormFields = () => {
        return [
            {
                label: "用户类型",
                id: "UserType",
                initialValue: "1",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: SelectOption(dict.userType, {
                    onChange: this.userTypeChange,
                    placeholder: "请选择",
                    // allowClear: true,
                    style: {
                        width: 400,
                    },
                }),
            },
            {
                label: "机构名称",
                id: "OrganizaName",
                initialValue: "",
                hidden:
                    this.state.seUserType != 1 && this.state.seUserType != 3
                        ? true
                        : false,
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    // {
                    //     validator: checkLength(28),
                    //     trigger: ["change", "blur"],
                    // },
                ],
                component: (
                    <AutoComplete
                        dataSource={this.state.organizationList}
                        placeholder="请输入机构名称"
                        filterOption={(inputValue, option) =>
                            option.props.children
                                .toUpperCase()
                                .indexOf(inputValue.toUpperCase()) !== -1
                        }
                    />
                ),
                // component: SelectOption(this.state.organizationList, {
                //     placeholder: "请选择机构名称",
                // }),
            },
            {
                label: "产品",
                id: "UuserId",
                initialValue: [],
                hidden: this.state.seUserType != 1 ? true : false,
                // rules: this.validateIsRequired(),
                component: (
                    <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="请选择"
                        showSearch={true}
                        filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {this.state.parentInfoList.map((item, index) => {
                            return (
                                <Select.Option
                                    key={item.id}
                                    value={item.id / 1}
                                >
                                    {item.userName}
                                </Select.Option>
                            );
                        })}
                    </Select>
                ),
            },
            {
                label: "用户账户",
                id: "UserId",
                initialValue: "",
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
                label: "用户名称",
                id: "UserName",
                initialValue: "",
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
                label: "用户密码",
                id: "UserPasswd",
                initialValue: "",
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
                component: <Input.Password placeholder="请输入" />,
            },
            {
                label: "用户状态",
                id: "UserStatus",
                initialValue: "1",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: SelectOption(dict.userStatus, {
                    placeholder: "请选择",
                    // allowClear: true,
                    style: {
                        width: 400,
                    },
                }),
            },
            {
                label: "证件号码",
                id: "IdentityId",
                initialValue: "",
                hidden: this.state.seUserType != 1 ? true : false,
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        validator: checkLength(18),
                        trigger: ["change", "blur"],
                    },
                ],
                component: <Input placeholder="请输入" />,
            },
            {
                label: "用户风控组",
                id: "RiskGroup",
                initialValue: "",
                hidden: this.state.seUserType != 1 ? true : false,
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component:
                    // <Input placeholder="请输入" readOnly disabled />
                    SelectOption(this.state.riskList, {
                        placeholder: "请选择用户风控组",
                        showSearch: true,
                        filterOption: (input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0,
                    }),
            },
            {
                label: "算法权限组",
                id: "AlgoGroup",
                initialValue: "",
                hidden: this.state.seUserType != 1 ? true : false,
                // rules: [
                //     {
                //         required: true,
                //         message: "参数不能为空",
                //     },
                // ],
                component:
                    // <Input placeholder="请输入" readOnly disabled />
                    SelectOption(this.state.algoSecList, {
                        placeholder: "请选择算法权限组",
                        showSearch: true,
                        filterOption: (input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0,
                    }),
            },
            // {
            //     label: "机构编码",
            //     id: "OrganizaId",
            //     initialValue: "",
            //     rules: [
            //         {
            //             required: true,
            //             message: "参数不能为空",
            //         },
            //         {
            //             validator: checkLength(12),
            //             trigger: ["change", "blur"],
            //         },
            //     ],
            //     component: <Input placeholder="请输入" />,
            // },
            // {
            //     label: "算法属性",
            //     id: "AlgoProperty",
            //     initialValue: "",
            //     rules: [
            //         // {
            //         //     required: true,
            //         //     message: "参数不能为空",
            //         // },
            //     ],
            //     component: <Input placeholder="请输入" />,
            // },
        ];
    };
    beforeInsertFun = (next) => {
        // console.log("beforeInsertFun----------");
        this.setState({ seUserType: 1 }, next);
    };
    getUpdateFormFields = () => {
        return [
            {
                label: "机构名称",
                id: "OrganizaName",
                initialValue: "",
                hidden:
                    this.state.seUserType != 1 && this.state.seUserType != 3
                        ? true
                        : false,
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    // {
                    //     validator: checkLength(28),
                    //     trigger: ["change", "blur"],
                    // },
                ],
                component: (
                    <AutoComplete
                        dataSource={this.state.organizationList}
                        placeholder="请输入机构名称"
                        filterOption={(inputValue, option) =>
                            option.props.children
                                .toUpperCase()
                                .indexOf(inputValue.toUpperCase()) !== -1
                        }
                    />
                ),
                // component: SelectOption(this.state.organizationList, {
                //     placeholder: "请选择机构名称",
                // }),
            },
            {
                label: "产品",
                id: "UuserId",
                initialValue: [],
                hidden: this.state.seUserType != 1 ? true : false,
                // rules: this.validateIsRequired(),
                component: (
                    <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="请选择"
                        showSearch={true}
                        filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {this.state.parentInfoList.map((item, index) => {
                            return (
                                <Select.Option
                                    key={item.id}
                                    value={item.id / 1}
                                >
                                    {item.userName}
                                </Select.Option>
                            );
                        })}
                    </Select>
                ),
            },
            {
                label: "用户类型",
                id: "UserType",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: SelectOption(dict.userType, {
                    onChange: this.userTypeChange,
                    placeholder: "请选择",
                    // allowClear: true,
                    style: {
                        width: 400,
                    },
                }),
            },
            {
                label: "用户账户",
                id: "UserId",
                initialValue: "",
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
                label: "用户名称",
                id: "UserName",
                initialValue: "",
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
                label: "用户密码",
                id: "UserPasswd",
                initialValue: "",
                // rules: [
                //     // {
                //     //     required: true,
                //     //     message: "参数不能为空",
                //     // },
                //     {
                //         validator: checkLength(32),
                //         trigger: ["change", "blur"],
                //     },
                // ],
                component: <Input.Password placeholder="请输入" />,
            },
            {
                label: "用户状态",
                id: "UserStatus",
                initialValue: "1",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: SelectOption(dict.userStatus, {
                    placeholder: "请选择",
                    // allowClear: true,
                    style: {
                        width: 400,
                    },
                }),
            },
            {
                label: "证件号码",
                id: "IdentityId",
                initialValue: "",
                hidden: this.state.seUserType != 1 ? true : false,
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        validator: checkLength(18),
                        trigger: ["change", "blur"],
                    },
                ],
                component: <Input placeholder="请输入" />,
            },
            {
                label: "用户风控组",
                id: "RiskGroup",
                initialValue: "",
                hidden: this.state.seUserType != 1 ? true : false,
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component:
                    // <Input placeholder="请输入" readOnly disabled />
                    SelectOption(this.state.riskList, {
                        placeholder: "请选择用户风控组",
                        showSearch: true,
                        filterOption: (input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0,
                    }),
            },
            {
                label: "算法权限组",
                id: "AlgoGroup",
                initialValue: "",
                hidden: this.state.seUserType != 1 ? true : false,
                // rules: [
                //     {
                //         required: true,
                //         message: "参数不能为空",
                //     },
                // ],
                component:
                    // <Input placeholder="请输入" readOnly disabled />
                    SelectOption(this.state.algoSecList, {
                        placeholder: "请选择算法权限组",
                        showSearch: true,
                        filterOption: (input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0,
                    }),
            },
            // {
            //     label: "机构编码",
            //     id: "OrganizaId",
            //     initialValue: "",
            //     rules: [
            //         {
            //             required: true,
            //             message: "参数不能为空",
            //         },
            //         {
            //             validator: checkLength(12),
            //             trigger: ["change", "blur"],
            //         },
            //     ],
            //     component: <Input placeholder="请输入" />,
            // },
            // {
            //     label: "算法属性",
            //     id: "AlgoProperty",
            //     initialValue: "",
            //     rules: [
            //         // {
            //         //     required: true,
            //         //     message: "参数不能为空",
            //         // },
            //     ],
            //     component: <Input placeholder="请输入" />,
            // },
        ];
    };
    getSearchFormFields = () => {
        return [
            {
                label: <span>用&nbsp;户&nbsp;名&nbsp;称</span>,
                // label: (
                //     <span>用&nbsp;&nbsp;&nbsp;户&nbsp;&nbsp;&nbsp;名称</span>
                // ),
                id: "userName",
                component: <Input placeholder="请输入" />,
            },
            {
                // label: "用户ID",
                label: <span>用&nbsp;户&nbsp;账&nbsp;户</span>,
                id: "userId",
                component: <Input placeholder="请输入" />,
            },
            {
                // label: "用户类型",
                label: <span>用&nbsp;户&nbsp;类&nbsp;型</span>,
                id: "userType",
                // initialValue: "1",
                component: SelectOption(dict.userType, {
                    placeholder: "请选择",
                    allowClear: true,
                    style: {
                        width: 190,
                    },
                }),
            },
            {
                label: "用户风控组",
                id: "riskGroup",
                component: SelectOption(this.state.riskList, {
                    allowClear: true,
                    showSearch: true,
                    filterOption: (input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0,
                    style: {
                        width: 190,
                    },
                    placeholder: "请选择",
                }),
            },
            {
                label: "算法权限组",
                id: "algoGroup",
                component: SelectOption(this.state.algoSecList, {
                    allowClear: true,
                    placeholder: "请选择",
                    showSearch: true,
                    filterOption: (input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0,
                }),
            },
            {
                label: <span>机&nbsp;构&nbsp;名&nbsp;称</span>,
                id: "organizaName",
                component: (
                    <Select
                        style={{ width: 190 }}
                        placeholder="请选择"
                        allowClear={true}
                        showSearch={true}
                        filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {this.state.organizationList.map((item, index) => {
                            return (
                                <Select.Option key={item} value={item}>
                                    {item}
                                </Select.Option>
                            );
                        })}
                    </Select>
                    // <AutoComplete
                    //     dataSource={this.state.organizationList}
                    //     placeholder="请输入"
                    //     filterOption={(inputValue, option) =>
                    //         option.props.children
                    //             .toUpperCase()
                    //             .indexOf(inputValue.toUpperCase()) !== -1
                    //     }
                    // />
                ),
                // component: SelectOption(this.state.organizationList, {
                //     placeholder: "请选择",
                // }),
                // component: <Input placeholder="请输入" />,
            },
            {
                label: (
                    <span>
                        产
                        <span
                            style={{ display: "inline-block", width: "40px" }}
                        ></span>
                        品
                    </span>
                ),
                // label: "产品",
                id: "fatherId",
                component: (
                    <Select
                        style={{ width: 190 }}
                        placeholder="请选择"
                        allowClear={true}
                        showSearch={true}
                        filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {this.state.parentInfoList.map((item, index) => {
                            return (
                                <Select.Option
                                    key={item.id}
                                    value={item.id / 1}
                                >
                                    {item.userName}
                                </Select.Option>
                            );
                        })}
                    </Select>
                ),
            },
        ];
    };

    columns = (params) => {
        return [
            {
                title: "用户ID",
                dataIndex: "id",
                width: 100,
            },
            {
                title: "机构名称",
                dataIndex: "organizaName",
                width: 150,
            },
            {
                title: "产品",
                dataIndex: "parentName",
                width: 180,
            },
            {
                title: "用户类型",
                dataIndex: "userTypeValue",
                width: 170,
                // key: "userType",
                render: (text, record) => {
                    // console.log(record);
                    if (record.userType == 1) {
                        return (
                            <div className={styles.typeWrap}>
                                <span className={styles.userType1}>个</span>
                                <span>{record.userTypeValue}</span>
                            </div>
                        );
                    } else if (record.userType == 2) {
                        return (
                            <div className={styles.typeWrap}>
                                <span className={styles.userType2}>算</span>
                                <span>{record.userTypeValue}</span>
                            </div>
                        );
                    } else if (record.userType == 3) {
                        return (
                            <div className={styles.typeWrap}>
                                <span className={styles.userType3}>多</span>
                                <span>{record.userTypeValue}</span>
                            </div>
                        );
                    } else if (record.userType == 4) {
                        return (
                            <div className={styles.typeWrap}>
                                <span className={styles.userType4}>行</span>
                                <span>{record.userTypeValue}</span>
                            </div>
                        );
                    }
                    return (
                        <div className={styles.typeWrap}>
                            {record.userTypeValue}
                        </div>
                    );
                },
            },
            {
                title: "用户账户",
                dataIndex: "userId",
                width: 140,
            },
            {
                title: "用户名称",
                dataIndex: "userName",
                key: "userName",
                width: 140,
            },
            {
                title: "用户状态",
                dataIndex: "userStatusValue",
                width: 140,
            },
            {
                title: "证件号码",
                dataIndex: "identityId",
                width: 200,
            },

            {
                title: "用户风控组",
                dataIndex: "riskName",
                width: 150,
                render: (text, record) => (
                    <div
                        onClick={(e) => {
                            this.handleUpdate(record);
                        }}
                    >
                        <Tooltip title="修改风控组">
                            {record.riskName}
                            {this.authObj.isUpdate && record.riskName && (
                                <Icon
                                    type="edit"
                                    style={{ color: "#1899ff" }}
                                />
                            )}
                        </Tooltip>
                    </div>
                ),
            },
            {
                title: "算法权限组",
                dataIndex: "groupName",
                width: 120,
                render: (text, record) => (
                    <div
                        onClick={(e) => {
                            this.handleUpdateAlgo(record);
                        }}
                    >
                        <Tooltip title="修改算法权限组">
                            {record.groupName}
                            {this.authObj.isUpdate && record.groupName && (
                                <Icon
                                    type="edit"
                                    style={{ color: "#1899ff" }}
                                />
                            )}
                        </Tooltip>
                    </div>
                ),
            },
            // {
            //     title: "业务类型",
            //     dataIndex: "businessType",
            // },
            // {
            //     title: "登录状态",
            //     dataIndex: "loginStatus",
            // },
            // {
            //     title: "机构编码",
            //     dataIndex: "organizaId",
            //     width: 140,
            // },
            {
                title: "注册时间",
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
    columns2 = (params) => {
        return [
            {
                title: "算法ID",
                dataIndex: "id",
                width: 100,
                ellipsis: true,
            },
            {
                title: "算法名称",
                dataIndex: "algoName",
                width: 150,
                ellipsis: true,
            },
            {
                title: "算法厂商",
                dataIndex: "providerName",
                width: 150,
                ellipsis: true,
            },
            {
                title: "算法类型",
                dataIndex: "algorithmType",
                width: 150,
                ellipsis: true,
            },
            {
                title: "是否有权限",
                dataIndex: "isShow",
                width: 150,
                ellipsis: true,
                render: (text, record) => (
                    <div>
                        {text == "是" ? (
                            <span style={{ color: "red" }}>{text}</span>
                        ) : (
                            <span>{text}</span>
                        )}
                    </div>
                ),
            },
        ];
    };
    //批量选择
    handleTableChange = (selectedRowKeys) => {
        console.log("批量选择");
        this.setState({
            selectRow: selectedRowKeys,
        });
    };

    handleInsertRecord = (params) => {
        params.UserType = params.UserType / 1;
        params.RiskGroup = params.RiskGroup ? params.RiskGroup / 1 : "";
        params.AlgoGroup = params.AlgoGroup ? params.AlgoGroup / 1 : "";
        params.UserPasswd = md5(params.UserPasswd);
        params.UserStatus = params.UserStatus / 1;
        console.log("新增接口", params);
        http.post({
            url: "/user/addUserInfo",
            data: params,
        }).then((res) => {
            console.log(res);
            let msg = res.message;
            if (res.code == 0) {
                message.success(msg);
                this.getParentInfoList();
                this.getOrganizationList();
                // this.getData();
            } else if (res.code == 20000) {
                message.error(
                    msg.substring(msg.indexOf("[") + 1, msg.lastIndexOf("]"))
                );
            } else {
                message.error(msg);
            }
        });
    };
    //更新记录
    handleUpdateRecord = ({ form }) => {
        // console.log(form.getFieldsValue());
        // return;
        let params = form.getFieldsValue();
        params.Id = this.record.id / 1;
        params.UserType = params.UserType / 1;
        params.RiskGroup = params.RiskGroup / 1;
        params.AlgoGroup = params.AlgoGroup / 1;
        params.UuserId = params.UuserId;
        params.UserStatus = params.UserStatus / 1;
        // console.log(this.record);
        if (params.UserPasswd == "") {
            params.UserPasswd = this.record.userPasswd;
        } else {
            params.UserPasswd = md5(params.UserPasswd);
        }
        console.log(params);
        //发送更新请求
        http.post({
            url: "/user/updateUserInfo",
            data: params,
        }).then((res) => {
            console.log(res);
            let msg = res.message;
            if (res.code == 0) {
                message.success(msg);
                this.getParentInfoList();
                this.getOrganizationList();
                // this.getData();
            } else if (res.code == 20000) {
                message.error(
                    msg.substring(msg.indexOf("[") + 1, msg.lastIndexOf("]"))
                );
            } else {
                message.error(msg);
            }
            // this.isAction = true;
        });
    };
    //填入更新数据
    setUpdateModal = ({ form, record }) => {
        // console.log("setUpdateModal--------");
        // console.log(record, form);
        this.record = record;
        this.setState({
            seUserType: this.record.userType,
        });
        let parentId = [];
        if (this.record.parentInfos.length) {
            this.record.parentInfos.forEach((item) => {
                parentId.push(item.muserId);
            });
        }
        form.setFieldsValue({
            UserId: record.userId,
            UserName: record.userName,
            UserPasswd: "",
            UserType: record.userType + "",
            RiskGroup: record.riskGroup + "",
            AlgoGroup: record.algoGroup,
            UuserId: parentId,
            // UuserId: record.parentInfos,
            UserStatus: record.userStatus + "",
            IdentityId: record.identityId,
            OrganizaId: record.organizaId,
            OrganizaName: record.organizaName,
            // UserType: record.UserType,
        });
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
                    userId: record.userId,
                });
            }
        );
    };
    //修改算法权限组
    handleUpdateAlgo = (record) => {
        console.log("修改算法权限组", record);
        this.record2 = record;
        this.setState(
            {
                updateModalVisible2: true,
                algoGroup: [],
            },
            () => {
                this.getAlgoGroupById(record.algoGroup);
                this.props.form.setFieldsValue({
                    algoGroup: record.algoGroup,
                    userId: record.userId,
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
    handleUpdateModalOk2 = () => {
        let data = this.props.form.getFieldsValue();
        // let params = this.record2;
        let params = {};
        params.Id = this.record2.id / 1;
        params.UserId = this.record2.userId;
        params.UserName = this.record2.userName;
        params.UserPasswd = this.record2.userPasswd;
        params.UserType = this.record2.userType / 1;
        params.RiskGroup = this.record2.riskGroup / 1;
        params.UserStatus = this.record2.userStatus / 1;
        params.AlgoGroup = data.algoGroup / 1;
        // params.AlgoProperty = this.record2.algoProperty;
        params.UuserId = this.record2.uuserId / 1;
        // console.log(this.record2);
        // console.log("参数", params);
        //发送更新请求
        http.post({
            url: "/user/updateUserInfo",
            data: params,
        }).then((res) => {
            console.log(res);
            let msg = res.message;
            if (res.code == 0) {
                message.success(msg);
                this.getData(this.searchParam, this.state.pagination);
            } else if (res.code == 20000) {
                message.error(
                    msg.substring(msg.indexOf("[") + 1, msg.lastIndexOf("]"))
                );
            } else {
                message.error(msg);
            }
            // this.isAction = true;
        });
        // this.updateUserRiskGroup(data);
        this.setState({
            updateModalVisible2: false,
        });
    };
    handleUpdateModalCancel2 = () => {
        this.setState({
            updateModalVisible2: false,
        });
    };
    //删除记录
    handleDeleteRecord = (record) => {
        console.log("删除记录 ", record);
        let params = record;
        //     US_NORMAL = 1,  // 正常
        // US_LOGOFF,      // 注销
        // US_FROZEN,      // 冻结
        // US_DELETE,      // 删除
        record.userStatus = 4;
        console.log(params);
        // return;
        //发送更新请求
        http.post({
            url: "/user/updateUserInfo",
            data: params,
        }).then((res) => {
            console.log(res);
            let msg = res.message;
            if (res.code == 0) {
                message.success("删除成功");
                this.getData(this.searchParam, this.state.pagination);
            } else if (res.code == 20000) {
                message.error(
                    msg.substring(msg.indexOf("[") + 1, msg.lastIndexOf("]"))
                );
            } else {
                message.error("删除失败");
            }
            // this.isAction = true;
        });
    };
    inputChange = (e) => {
        // console.log(e);
        // let val = e.target.value;
        let val = e;
        // if (this.inputTimeout) {
        //     clearTimeout(this.inputTimeout);
        // }
        // this.inputTimeout = setTimeout(() => {
        //     this.getRiskGroup(val);
        // }, 1000);
        this.getRiskGroup(val);
    };
    //算法风控组 改变
    algoSelectChange = (e) => {
        // console.log(e);
        let val = e;
        this.getAlgoGroupById(val);
    };
    algoChange = (str) => {
        // console.log(str);
        let binArr = this.changePropToArr(str);
        let newAlgoArr = Object.assign([], this.state.algoList);
        // let newAlgoArr = JSON.parse(JSON.stringify(this.state.algoList));
        newAlgoArr.forEach((item) => (item.isShow = "否"));
        // console.log("算法列表 ", JSON.parse(JSON.stringify(newAlgoArr)));
        console.log("权限倒序数组 ", binArr);
        for (let i = 0; i < newAlgoArr.length; i++) {
            let algo = newAlgoArr[i];
            // console.log(algo.id, algo.isShow);
            for (let j = 0; j < binArr.length; j++) {
                // const element = array[j];
                if (algo.id == binArr.length - j) {
                    // console.log(i, j);
                    algo.isShow = binArr[j] == "1" ? "是" : "否";
                    break;
                }
            }
        }
        // console.log("newAlgoArr2 ", newAlgoArr);
    };
    changePropToArr = (str) => {
        let configArr = str.split("");
        // console.log(str);
        // console.log(configArr);
        let binArr = [];
        for (let j = 0; j < configArr.length; j++) {
            // let num = configArr[j] / 1;
            // 16进制 转 10进制    b => 11
            let num = parseInt(configArr[j], 16);
            // console.log(configArr[j], num);
            let tArr = num.toString(2).split("");
            if (tArr.length == 1) {
                tArr.unshift("0");
                tArr.unshift("0");
                tArr.unshift("0");
            }
            if (tArr.length == 2) {
                tArr.unshift("0");
                tArr.unshift("0");
            }
            if (tArr.length == 3) {
                tArr.unshift("0");
            }
            // console.log(tArr);
            binArr = binArr.concat(tArr);
        }
        // console.log(binArr);
        return binArr;
        // let newAlgoArr = JSON.parse(JSON.stringify(this.state.algoList));
        // newAlgoArr.forEach((item) => (item.isShow = "0"));
        // for (let i = 0; i < newAlgoArr.length; i++) {
        //     let algo = newAlgoArr[i];
        //     // console.log(algo.id, algo.isShow);
        //     for (let j = 0; j < binArr.length; j++) {
        //         // const element = array[j];
        //         if (algo.id == binArr.length - j) {
        //             // console.log(i, j);
        //             algo.isShow = binArr[j];
        //             break;
        //         }
        //     }
        // }
        // console.log(newAlgoArr);
        // this.setState({ algoList: newAlgoArr });
    };

    //获取产品
    getParentInfoList = (params = {}) => {
        // return;
        http.post({
            url: "/user/getParentInfo",
            data: params,
        }).then((res) => {
            if (res.data && res.data.length > 0) {
                this.setState({
                    parentInfoList: res.data,
                });
            }
        });
    };
    //获取机构名称
    getOrganizationList = (params = {}) => {
        // return;
        http.post({
            url: "/user/getOrganiza",
            data: params,
        }).then((res) => {
            let idArr = [];
            if (res.data && res.data.length > 0) {
                let dataArr = res.data;
                dataArr.map((item) => {
                    // let obj = {};
                    // obj.key = item.organizaName;
                    // obj.value = item.organizaName;
                    // return obj;
                    if (item.organizaName) {
                        idArr.push(item.organizaName);
                    }
                    // idArr.push(item.organizaName);
                    // return item.organizaName;
                });
                this.setState({
                    organizationList: idArr,
                });
            }
        });
    };
    //获取所有风控组
    getAllRiskGroup = (params = {}) => {
        // return;
        http.post({
            // url: "/risk/queryRisk",
            url: "/risk/riskList",
            data: params,
        }).then((res) => {
            // console.log(res);
            let idArr = [];
            if (res.data && res.data.length > 0) {
                // RiskType: [{ key: "1", value: "用户" },{ key: "2", value: "算法" },
                let dataArr = res.data.filter((item) => item.riskType == 1);
                if (dataArr.length > 0) {
                    idArr = dataArr.map((item) => {
                        let obj = {};
                        obj.key = item.id;
                        obj.value = item.riskName;
                        return obj;
                    });
                }
            }
            this.setState({
                riskList: idArr,
            });
        });
    };
    //获取所有风控组
    getAllAlgoGroup = () => {
        // return;
        http.get({
            // url: "/risk/queryRisk",
            url: "/algo-group-info/algoList",
            // data: params,
        }).then((res) => {
            console.log("算法风控组", res);
            let idArr = [];
            if (res.data && res.data.length > 0) {
                let dataArr = res.data;
                idArr = dataArr.map((item) => {
                    let obj = {};
                    obj.key = item.id;
                    obj.value = item.groupName;
                    return obj;
                });
                parseDict(res.data);
                // res.data.forEach((item) => (item.isShow = "是"));
                // console.log(idArr);
            }
            // console.log(res.data);
            this.setState({
                algoSecList: idArr,
            });
        });
    };
    //获取所有算法
    getAlgoList = () => {
        // return;
        http.get({
            // url: "/risk/queryRisk",
            url: "/algo/listAll",
            // data: params,
        }).then((res) => {
            // console.log("所有算法", res);
            let idArr = [];
            if (res.data && res.data.length > 0) {
                let dataArr = res.data;
                idArr = dataArr.map((item) => {
                    let obj = {};
                    obj.key = item.id;
                    obj.value = item.id;
                    return obj;
                });
                parseDict(res.data);
            }
            this.setState({
                algoList: res.data,
            });
        });
    };
    getAlgoGroupById = (gid, params = { pageId: 1, pageNum: 10000 }) => {
        if (gid !== undefined) {
            params.id = gid;
        }
        // return;
        http.post({
            // url: "/risk/queryRisk",
            url: "/algo-group-info/list",
            data: params,
        }).then((res) => {
            // console.log("getAlgoGroupById", res);
            let property = "";
            if (res.data && res.data.records && res.data.records.length > 0) {
                property = res.data.records[0].algoProperty;
                this.algoChange(property);
                this.props.form.setFieldsValue({
                    algoProperty: property,
                });
            }
        });
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
                // showTip(this, res.message);
                // this.isAction = true;
                this.getData(this.searchParam, this.state.pagination);
                // this.getData();
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
    getData = (params = {}, pagination = { current: 1, pageSize: 12 }) => {
        params = {
            ...params,
            pageId: pagination.current,
            pageNum: pagination.pageSize,
        };
        http.post({
            // url: "/option/assetInfo/selectList",
            url: "/user/selectByCondition",
            data: params,
        }).then((res) => {
            // console.log(res);
            //解析数据字典
            if (res.data.records && res.data.records.length > 0) {
                let userList = res.data.records;
                userList.forEach((item) => {
                    item.parentName = "";
                    let parentNameList = [];
                    if (item.parentInfos.length) {
                        item.parentInfos.forEach((sonItem) => {
                            parentNameList.push(sonItem.muserName);
                        });
                        item.parentName = parentNameList.join("，");
                    }
                });
                parseDictValue(userList);
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
    handleDownload = () => {
        window.location.href = window.baseURL + "/user/download";
    };
    componentDidMount() {
        this.getData();
        this.getAllRiskGroup();
        this.getAllAlgoGroup();
        this.getAlgoList();
        this.getParentInfoList();
        this.getOrganizationList();
    }
    validateIsRequired = (rule, value, callback) => {
        let arr = [];
        arr = [
            {
                required: this.state.seUserType == 1 ? true : false,
                message: "参数不能为空",
            },
        ];
        return arr;
    };
    userTypeChange = (value) => {
        this.setState({
            seUserType: value,
        });
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
        let { getFieldDecorator } = this.props.form;
        let scroll2 = { x: 1000, y: 450 };
        let cmpt = this.props.activeMenu.cmpt;
        // console.log(cmpt);
        let authObj = {
            isQuery: true,
            isAdd: true,
            isUpload: true,
            isDownload: true,
            isDelete: false,
            isUpdate: true,
        };
        // console.log("cmpt", cmpt);
        if (cmpt) {
            for (let i = 0; i < cmpt.length; i++) {
                let item = cmpt[i];
                // console.log(item);
                if (item.type == 1 && item.auth != 1) {
                    //查询 有权限
                    authObj.isQuery = false;
                }
                if (item.type == 2 && item.auth != 1) {
                    //新增 有权限
                    authObj.isAdd = false;
                }
                if (item.type == 3 && item.auth != 1) {
                    //上传 有权限
                    authObj.isUpload = false;
                }
                if (item.type == 4 && item.auth != 1) {
                    //下载 有权限
                    authObj.isDownload = false;
                }
                // if (item.type == 5 && item.auth != 1) {
                //     //下载报告 有权限 -- 绩效那边
                //     authObj.isExportPdf = false;
                // }
                if (item.type == 6 && item.auth == 1) {
                    //删除 有权限
                    authObj.isDelete = true;
                }
                if (item.type == 7 && item.auth != 1) {
                    //编辑 有权限
                    authObj.isUpdate = false;
                }
            }
        }
        this.authObj = authObj;
        return (
            <div className={styles.userInfo}>
                <CurdComponent
                    pageSize={10}
                    // rowKey={"index"}
                    // isShowSearchForm={false}
                    // btnText2="查全部"
                    onSearchClick={this.handleSearch}
                    getSearchFormFields={this.getSearchFormFields}
                    // searchLoading={this.state.searchLoading}
                    insertBtnText={"新增"} // 不传 就没新增按钮
                    getInsertFormFields={this.getInsertFormFields}
                    beforeInsertFun={this.beforeInsertFun}
                    insertRecord={this.handleInsertRecord}
                    // col="2"
                    width="600px"
                    pagination={this.state.pagination}
                    getUpdateFormFields={this.getUpdateFormFields}
                    setUpdateModal={this.setUpdateModal}
                    updateRecord={this.handleUpdateRecord} // 不传 就没编辑
                    deleteRecord={this.handleDeleteRecord} // 不传 就没删除
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
                            <div
                                className={styles.rowFlex}
                                style={{
                                    position: "relative",
                                }}
                                id="area"
                            >
                                <Form.Item label="用户ID">
                                    {getFieldDecorator("userId")(
                                        <Input placeholder="请输入" disabled />
                                    )}
                                </Form.Item>
                                <div style={{ width: 60 }}></div>
                                <Form.Item
                                    // className={styles.marLose14}
                                    label={
                                        <label title="请输入已配置成功的风控组,否则风控组不能修改成功!">
                                            修改风控组
                                        </label>
                                    }
                                >
                                    {getFieldDecorator("riskGroup", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入",
                                            },
                                        ],
                                    })(
                                        // <AutoComplete
                                        //     style={{ width: 200 }}
                                        //     dataSource={this.state.riskList}
                                        //     placeholder="请输入风控组ID"
                                        //     getPopupContainer={() =>
                                        //         document.getElementById("area")
                                        //     }
                                        //     onChange={this.inputChange}
                                        //     filterOption={(
                                        //         inputValue,
                                        //         option
                                        //     ) =>
                                        //         option.props.children
                                        //             .toUpperCase()
                                        //             .indexOf(
                                        //                 inputValue.toUpperCase()
                                        //             ) !== -1
                                        //     }
                                        // />
                                        SelectOption(this.state.riskList, {
                                            placeholder: "请选择",
                                            onChange: this.inputChange,
                                            getPopupContainer: () =>
                                                document.getElementById("area"),
                                            showSearch: true,
                                            filterOption: (input, option) =>
                                                option.props.children
                                                    .toLowerCase()
                                                    .indexOf(
                                                        input.toLowerCase()
                                                    ) >= 0,
                                        })
                                        // <Input
                                        //     placeholder=""
                                        //     onChange={this.inputChange}
                                        // />
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
                        {/* <div style={{ display: "none" }}> */}
                        <div className={styles.hide}>
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
                <Modal
                    title={"修改算法权限组"}
                    visible={this.state.updateModalVisible2}
                    onOk={this.handleUpdateModalOk2}
                    onCancel={this.handleUpdateModalCancel2}
                    width={1288}
                    centered
                >
                    <Form
                        layout={"vertical"}
                        style={{ maxHeight: "690px", overflow: "hidden" }}
                    >
                        <div>
                            <div
                                className={styles.rowFlex}
                                style={{
                                    position: "relative",
                                }}
                                id="algo1"
                            >
                                <Form.Item label="用户ID">
                                    {getFieldDecorator("userId")(
                                        <Input placeholder="请输入" disabled />
                                    )}
                                </Form.Item>
                                <div style={{ width: 60 }}></div>
                                <Form.Item
                                    // className={styles.marLose14}
                                    label={
                                        <label title="请输入已配置成功的风控组,否则风控组不能修改成功!">
                                            修改算法权限组
                                        </label>
                                    }
                                >
                                    {getFieldDecorator("algoGroup", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入",
                                            },
                                        ],
                                    })(
                                        SelectOption(this.state.algoSecList, {
                                            placeholder: "请选择",
                                            onChange: this.algoSelectChange,
                                            getPopupContainer: () =>
                                                document.getElementById(
                                                    "algo1"
                                                ),
                                            showSearch: true,
                                            filterOption: (input, option) =>
                                                option.props.children
                                                    .toLowerCase()
                                                    .indexOf(
                                                        input.toLowerCase()
                                                    ) >= 0,
                                        })
                                        // <Input
                                        //     placeholder=""
                                        //     onChange={this.inputChange}
                                        // />
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <div
                            className={styles.rowFlex}
                            style={{
                                position: "relative",
                            }}
                        >
                            <Form.Item label="算法权限">
                                {getFieldDecorator("algoProperty")(
                                    <Input placeholder="请输入" disabled />
                                )}
                            </Form.Item>
                        </div>
                        <div>
                            <Table
                                rowKey={"id"}
                                columns={this.columns2()}
                                dataSource={this.state.algoList}
                                scroll={scroll2}
                                size="small"
                                // rowSelection={rowSelection}
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
// export default Form.create()(userInfo);
const mapStateToProps = (state, ownProps) => {
    return {
        activeMenu: state.RouterModel.activeMenu,
    };
};
export default connect(mapStateToProps, null)(Form.create()(userInfo));
