import React from "react";
import CurdComponent from "@/components/CurdComponent";
import SelectOption from "@/components/SelectOption";
import Table from "@/components/Table";
// import UploadWrap from "@/components/UploadWrap";
import {
    Input,
    Modal,
    Switch,
    Button,
    Form,
    message,
    Tooltip,
    Icon,
    Select,
    Tree,
} from "antd";
import styles from "./style.module.less";
import md5 from "js-md5"; //全局引入
const { TreeNode } = Tree;

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

        expandedKeys: ["0-0-0", "0-0-1"],
        autoExpandParent: true,
        checkedKeys: ["0-0-0"],
        treeData: [
            {
                title: "0-0",
                key: "0-0",
                children: [
                    {
                        title: "0-0-0",
                        key: "0-0-0",
                        children: [
                            { title: "0-0-0-0", key: "0-0-0-0" },
                            { title: "0-0-0-1", key: "0-0-0-1" },
                            { title: "0-0-0-2", key: "0-0-0-2" },
                        ],
                    },
                    {
                        title: "0-0-1",
                        key: "0-0-1",
                        children: [
                            { title: "0-0-1-0", key: "0-0-1-0" },
                            { title: "0-0-1-1", key: "0-0-1-1" },
                            { title: "0-0-1-2", key: "0-0-1-2" },
                        ],
                    },
                    {
                        title: "0-0-2",
                        key: "0-0-2",
                    },
                ],
            },
            {
                title: "0-1",
                key: "0-1",
                children: [
                    { title: "0-1-0-0", key: "0-1-0-0" },
                    { title: "0-1-0-1", key: "0-1-0-1" },
                    { title: "0-1-0-2", key: "0-1-0-2" },
                ],
            },
            {
                title: "0-2",
                key: "0-2",
            },
        ],
    };
    onExpand = (expandedKeys) => {
        console.log("onExpand", expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            // autoExpandParent: false,
        });
    };

    onCheck = (checkedKeys) => {
        console.log("onCheck", checkedKeys);
        this.setState({ checkedKeys });
    };

    renderTreeNodes = (data) => {
        // console.log(data);
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} {...item} />;
        });
    };
    getInsertFormFields = () => {
        return [
            {
                label: "用户编码",
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
                    placeholder: "请选择",
                    // allowClear: true,
                    style: {
                        width: 400,
                    },
                }),
            },
            {
                label: "管理员用户",
                id: "UuserId",
                initialValue: [],
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    // {
                    //     validator: checkLength(10),
                    //     trigger: ["change", "blur"],
                    // },
                ],
                component: (
                    <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="请选择"
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
                label: "用户风控组",
                id: "RiskGroup",
                initialValue: "",
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
                    }),
            },
            {
                label: "算法权限组",
                id: "AlgoGroup",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component:
                    // <Input placeholder="请输入" readOnly disabled />
                    SelectOption(this.state.algoSecList, {
                        placeholder: "请选择算法权限组",
                    }),
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
                label: "机构编码",
                id: "OrganizaId",
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
                label: "机构名称",
                id: "OrganizaName",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        validator: checkLength(28),
                        trigger: ["change", "blur"],
                    },
                ],
                component: <Input placeholder="请输入" />,
            },
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
    getUpdateFormFields = () => {
        return [
            {
                label: "用户编码",
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
                label: "用户密码",
                id: "UserPasswd",
                initialValue: "",
                rules: [
                    // {
                    //     required: true,
                    //     message: "参数不能为空",
                    // },
                    {
                        validator: checkLength(32),
                        trigger: ["change", "blur"],
                    },
                ],
                component: <Input placeholder="需修改密码，请输入新密码" />,
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
                    placeholder: "请选择",
                    // allowClear: true,
                    style: {
                        width: 400,
                    },
                }),
            },
            {
                label: "管理员用户",
                id: "UuserId",
                initialValue: [],
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    // {
                    //     validator: checkLength(10),
                    //     trigger: ["change", "blur"],
                    // },
                ],
                component: (
                    <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="请选择"
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
                label: "用户风控组",
                id: "RiskGroup",
                initialValue: "",
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
                    }),
            },
            {
                label: "算法权限组",
                id: "AlgoGroup",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: SelectOption(this.state.algoSecList, {
                    placeholder: "请选择算法权限组",
                }),
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
                label: "机构编码",
                id: "OrganizaId",
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
                label: "机构名称",
                id: "OrganizaName",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        validator: checkLength(28),
                        trigger: ["change", "blur"],
                    },
                ],
                component: <Input placeholder="请输入" />,
            },
        ];
    };
    getSearchFormFields = () => {
        return [
            {
                label: <span>角&nbsp;色&nbsp;名&nbsp;称</span>,
                id: "role_name",
                component: <Input placeholder="请输入" />,
            },
        ];
    };

    columns = (params) => {
        return [
            {
                title: "ID",
                dataIndex: "id",
                width: 80,
            },
            {
                title: "角色ID",
                dataIndex: "role_id",
                width: 100,
            },
            {
                title: "角色名称",
                dataIndex: "role_name",
                width: 160,
            },
            {
                title: "权限",
                dataIndex: "role_desc",
            },
            {
                title: "状态",
                dataIndex: "statusValue",
                width: 100,
            },
            {
                title: "创建时间",
                dataIndex: "create_time",
                width: 180,
            },
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
        params.RiskGroup = params.RiskGroup / 1;
        params.AlgoGroup = params.AlgoGroup / 1;
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
        // console.log(record, form);
        this.record = record;
        console.log(this.record, "this.record");
        let parentId = [];
        if (this.record.parentInfos.length) {
            this.record.parentInfos.forEach((item) => {
                parentId.push(item.muserId);
            });
        }
        console.log(parentId, "parentIdparentId");
        form.setFieldsValue({
            UserId: record.userId,
            UserName: record.userName,
            UserPasswd: "",
            UserType: record.userType + "",
            RiskGroup: record.riskGroup,
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
                    algoGroup: record.algoGroup + "",
                    userId: record.userId,
                });
            }
        );
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
                    riskType: config.RiskType + "",
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
    handleUpdateModalOk = () => {
        let data = this.props.form.getFieldsValue();
        // data.userId = this.record.id;
        console.log(data);
        console.log("treedata ", this.state.treeData);
        console.log("checked", this.state.checkedKeys);

        // this.setState({
        //     updateModalVisible: false,
        // });
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
    };
    getData = (params = {}, pagination = { current: 1, pageSize: 12 }) => {
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
            // url: "algo-assess/v1/auth/rolelist",
            data: params,
        }).then((res) => {
            console.log(res);
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
            this.setState({
                info: res.list,
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
        let scroll2 = { x: 1000, y: 450 };
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
                    hasSearchSlot={true}
                    addBtn={
                        <Button
                            type="primary"
                            icon="plus"
                            onClick={this.handleInsertBtn}
                        >
                            新增角色
                        </Button>
                    }
                    getInsertFormFields={this.getInsertFormFields}
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
                    {/* <div
                        urlPrefix="/user"
                        title="角色管理"
                        sucCallback={this.getData}
                    ></div> */}
                </CurdComponent>

                <Modal
                    title={"新增角色"}
                    visible={this.state.updateModalVisible}
                    onOk={this.handleUpdateModalOk}
                    onCancel={this.handleUpdateModalCancel}
                    width={788}
                    centered
                >
                    <Form layout={"vertical"}>
                        <div>
                            <div
                                className={styles.rowFlex}
                                style={{
                                    position: "relative",
                                }}
                                id="area"
                            >
                                <Form.Item label="角色ID">
                                    {getFieldDecorator("userId")(
                                        <Input placeholder="请输入" />
                                    )}
                                </Form.Item>
                                <div style={{ width: 60 }}></div>
                                <Form.Item
                                    // className={styles.marLose14}
                                    label="角色名称"
                                >
                                    {getFieldDecorator("riskGroup", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入",
                                            },
                                        ],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </div>
                        </div>
                        <div>
                            <div className={styles.tit}>
                                <div className={styles.text}>权限</div>
                            </div>
                        </div>
                        <div className={styles.treeWrap}>
                            <Tree
                                checkable
                                className={styles.tree}
                                onExpand={this.onExpand}
                                // expandedKeys={this.state.expandedKeys}
                                defaultExpandAll={true}
                                autoExpandParent={this.state.autoExpandParent}
                                onCheck={this.onCheck}
                                checkedKeys={this.state.checkedKeys}
                                onSelect={this.onSelect}
                                selectable={false}
                                // selectedKeys={this.state.selectedKeys}
                            >
                                {this.renderTreeNodes(this.state.treeData)}
                            </Tree>
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
                                            修改算法风控组
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
                                        })
                                        // <Input
                                        //     placeholder=""
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

export default Form.create()(userInfo);
