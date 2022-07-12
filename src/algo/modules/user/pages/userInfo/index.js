import React from "react";
import CurdComponent from "@/components/CurdComponent";
import SelectOption from "@/components/SelectOption";
import Table from "@/components/Table";
// import UploadWrap from "@/components/UploadWrap";

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
        algoList: [],
        algoSecList: [],
        algoGroupList: [],
    };
    getInsertFormFields = () => {
        return [
            {
                label: "用户ID",
                id: "UserId",
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
                label: "用户密码",
                id: "UserPasswd",
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
                label: "用户名",
                id: "UserName",
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
                label: "父级用户ID",
                id: "UuserId",
                initialValue: "0",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: <Input placeholder="请输入" />,
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
                    SelectOption(this.state.algoGroupList, {
                        placeholder: "请选择算法权限组",
                    }),
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
                label: "用户ID",
                id: "UserId",
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
                label: "用户密码",
                id: "UserPasswd",
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
                label: "用户名",
                id: "UserName",
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
                label: "父级用户ID",
                id: "UuserId",
                initialValue: "0",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: <Input placeholder="请输入" />,
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
                component: SelectOption(this.state.algoGroupList, {
                    placeholder: "请选择算法权限组",
                }),
            },
        ];
    };
    getSearchFormFields = () => {
        return [
            {
                label: "用户ID",
                id: "userId",
                component: <Input placeholder="请输入" />,
            },
            {
                label: "用户类型",
                id: "userType",
                // initialValue: "1",
                component: SelectOption(dict.userType, {
                    placeholder: "请选择",
                    allowClear: true,
                    style: {
                        width: 183,
                    },
                }),
            },
            {
                label: "用户风控组",
                id: "riskGroup",
                component: SelectOption(this.state.riskList, {
                    placeholder: "请选择用户风控组",
                }),
            },
            {
                label: "算法权限组",
                id: "algoGroup",
                component: SelectOption(this.state.algoGroupList, {
                    placeholder: "请选择算法权限组",
                }),
            },
            {
                label: "父级用户名",
                id: "fatherId",
                component: <Input placeholder="请输入" />,
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
        params.UserType = params.UserType / 1;
        params.RiskGroup = params.RiskGroup / 1;
        params.AlgoGroup = params.AlgoGroup / 1;
        params.UuserId = params.UuserId / 1;
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
                    msg.substring(msg.indexOf("[") + 1, msg.indexOf("]"))
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
        params.id = this.record.id / 1;
        params.UserType = params.UserType / 1;
        params.RiskGroup = params.RiskGroup / 1;
        params.AlgoGroup = params.AlgoGroup / 1;
        params.UuserId = params.UuserId / 1;
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
                    msg.substring(msg.indexOf("[") + 1, msg.indexOf("]"))
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
        form.setFieldsValue({
            UserId: record.userId,
            UserName: record.userName,
            UserPasswd: record.userPasswd,
            UserType: record.userType + "",
            RiskGroup: record.riskGroup,
            AlgoGroup: record.algoGroup,
            UuserId: record.uuserId,
            // UserType: record.UserType,
        });
    };
    columns = (params) => {
        return [
            {
                title: "ID",
                dataIndex: "id",
                width: 80,
            },
            {
                title: "用户ID",
                dataIndex: "userId",
                width: 150,
            },
            {
                title: "用户名",
                dataIndex: "userName",
                key: "userName",
            },
            {
                title: "用户类型",
                dataIndex: "userTypeValue",
                // key: "userType",
            },
            {
                title: "用户风控组",
                dataIndex: "riskGroup",
                // width: 120,
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
                title: "算法权限组",
                dataIndex: "algoGroup",
                // width: 120,
                render: (text, record) => (
                    <div
                        onClick={(e) => {
                            this.handleUpdateAlgo(record);
                        }}
                    >
                        <Tooltip title="修改算法权限组">
                            {record.algoGroup}
                            <Icon type="edit" style={{ color: "#1899ff" }} />
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
            {
                title: "父级用户ID",
                dataIndex: "uuserId",
            },
            {
                title: "父级用户名",
                dataIndex: "fatherId",
            },
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
        params.UserType = params.UserType / 1;
        params.RiskGroup = params.RiskGroup / 1;
        params.AlgoGroup = params.AlgoGroup / 1;
        params.UuserId = params.UuserId / 1;
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
                    msg.substring(msg.indexOf("[") + 1, msg.indexOf("]"))
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
        params.UuserId = params.UuserId / 1;
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
                    msg.substring(msg.indexOf("[") + 1, msg.indexOf("]"))
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
        form.setFieldsValue({
            UserId: record.userId,
            UserName: record.userName,
            UserPasswd: record.userPasswd,
            UserType: record.userType + "",
            RiskGroup: record.riskGroup,
            AlgoGroup: record.algoGroup,
            UuserId: record.uuserId,
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
                    algoGroup: record.algoGroup + "",
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

        params.AlgoGroup = data.algoGroup / 1;

        params.AlgoProperty = this.record2.algoProperty;
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
                    msg.substring(msg.indexOf("[") + 1, msg.indexOf("]"))
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
        let newAlgoArr = Object.assign([], this.state.algoList);
        newAlgoArr.forEach((item) => (item.isShow = "否"));
        // console.log("0x" + e.target.value);
        // console.log(isNaN("0x" + e.target.value));
        if (!isNaN("0x" + str)) {
            let val = BigInt("0x" + str);
            let bin = val.toString(2);
            // console.log(bin);
            let showArr = bin
                .toString()
                .split("")
                .reverse()
                .map((item) => (item == "1" ? "是" : "否"));
            let showLen = showArr.length;
            let algoLen = this.state.algoList.length;
            let minLen = Math.min(showLen, algoLen);
            for (let i = 0; i < minLen; i++) {
                newAlgoArr[i].isShow = showArr[i];
            }
            this.setState({ algoList: newAlgoArr });
        }
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
                let dataArr = res.data;
                if (dataArr.length > 0) {
                    idArr = dataArr.map((item) => {
                        let obj = {};
                        obj.key = item.id;
                        obj.value = item.id;
                        return obj;
                    });
                    // console.log(idArr);
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
            url: "/algo/listAll",
            // data: params,
        }).then((res) => {
            console.log(res);
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
                // res.data.forEach((item) => (item.isShow = "是"));
                // console.log(idArr);
            }
            this.setState({
                algoSecList: idArr,
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
    getData = (params = {}, pagination = { current: 1, pageSize: 10 }) => {
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
    handleDownload = () => {
        window.location.href = window.baseURL + "/user/download";
    };
    componentDidMount() {
        this.getData();
        this.getAllRiskGroup();
        this.getAllAlgoGroup();
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
                    getInsertFormFields={this.getInsertFormFields}
                    insertRecord={this.handleInsertRecord}
                    // col="2"
                    width="600px"
                    pagination={this.state.pagination}
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

export default Form.create()(userInfo);
