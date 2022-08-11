import React from "react";
import CurdComponent from "@/components/CurdComponent";
import SelectOption from "@/components/SelectOption";
import { Input, AutoComplete } from "antd";

let columns = (params) => {
    return [
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: "算法厂商",
            dataIndex: "provider_name",
        },
        {
            title: "算法类型",
            dataIndex: "algo_typeValue",
        },
        {
            title: "算法名称",
            dataIndex: "algo_name",
        },
        {
            title: "股票代码",
            dataIndex: "sec_id",
        },
        {
            title: "股票名称",
            dataIndex: "sec_name",
        },
        {
            title: "开仓率(%)",
            dataIndex: "open_rate",
        },
        {
            title: "收益率(%)",
            dataIndex: "income_rate",
        },
        {
            title: "基点",
            dataIndex: "basis_point",
        },
        {
            title: "创建时间",
            dataIndex: "create_time",
        },
    ];
};

export default class algoBest extends React.PureComponent {
    state = {
        searchLoading: false,
        selectRow: [],
        info: [],
        pagination: { current: 1, pageSize: 11, total: 0 },
        providerList: [],
        algoList: [],
        algoInfoList: [],
        securityList: [],
        currentDataLists: [],
        currentDataListsAdd: [],
        securityObj: {},
    };
    getSearchFormFields = () => {
        return [
            {
                label: "算法厂商",
                id: "provider_id",
                component: SelectOption(this.state.providerList, {
                    placeholder: "请选择",
                    allowClear: true,
                    // onChange: this.inputChange,
                }),
            },
            // {
            //     label: "算法类型",
            //     id: "algo_type",
            //     component: SelectOption(dict.algorithmType, {
            //         placeholder: "请选择",
            //         allowClear: true,
            //     }),
            // },
            {
                label: "算法",
                id: "algo_id",
                component: SelectOption(this.state.algoList, {
                    placeholder: "请选择",
                    allowClear: true,
                }),
            },
            {
                label: "股票代码",
                id: "sec_id",
                // component: <Input placeholder="请输入：接口返回？" />,
                component: (
                    <AutoComplete
                        dataSource={this.state.currentDataLists}
                        onChange={this.handleChange}
                        allowClear={true}
                    />
                ),
            },
        ];
    };
    handleChange = (value) => {
        // console.log(value);
        if (value) {
            const { securityList } = this.state;
            let currentDataLists = securityList.filter((item) =>
                item.toUpperCase().includes(value.toUpperCase())
            );
            // console.log(currentDataLists);
            let optionArr = [];
            if (currentDataLists.length > 0) {
                optionArr =
                    currentDataLists.length > 10
                        ? currentDataLists.slice(0, 10)
                        : currentDataLists;
            }
            this.setState({ currentDataLists: optionArr });
        } else {
            const { securityList } = this.state;
            let currentDataLists = securityList;
            let optionArr = [];
            if (currentDataLists.length > 0) {
                optionArr =
                    currentDataLists.length > 10
                        ? currentDataLists.slice(0, 10)
                        : currentDataLists;
            }
            this.setState({ currentDataLists: optionArr });
        }
    };
    handleChange2 = (value) => {
        if (value) {
            const { securityList } = this.state;
            let currentDataLists = securityList.filter((item) =>
                item.toUpperCase().includes(value.toUpperCase())
            );
            // console.log(currentDataLists);
            let optionArr = [];
            if (currentDataLists.length > 0) {
                optionArr =
                    currentDataLists.length > 10
                        ? currentDataLists.slice(0, 10)
                        : currentDataLists;
            }
            this.setState({ currentDataLists2: optionArr });
        } else {
            const { securityList } = this.state;
            let currentDataLists = securityList;
            let optionArr = [];
            if (currentDataLists.length > 0) {
                optionArr =
                    currentDataLists.length > 10
                        ? currentDataLists.slice(0, 10)
                        : currentDataLists;
            }
            this.setState({ currentDataLists2: optionArr });
        }
    };
    getInsertFormFields = () => {
        return [
            // {
            //     label: "算法厂商",
            //     id: "provider_id",
            //     initialValue: "",
            //     rules: [
            //         {
            //             required: true,
            //             message: "参数不能为空",
            //         },
            //     ],
            //     // component: <Input placeholder="请输入" />,
            //     component: SelectOption(this.state.providerList, {
            //         placeholder: "请选择",
            //         // onChange: this.inputChange,
            //     }),
            // },
            {
                label: "算法",
                id: "algo_id",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                // component: <Input placeholder="请输入" />,
                component: SelectOption(this.state.algoList, {
                    placeholder: "请选择",
                    // onChange: this.inputChange,
                }),
            },
            {
                label: "股票代码",
                id: "sec_id",
                initialValue: "000001",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                // component: (
                //     // <Input placeholder="请输入" readOnly disabled />
                //     <Input placeholder="请输入" />
                // ),
                component: (
                    <AutoComplete
                        dataSource={this.state.currentDataLists2}
                        allowClear={true}
                        onChange={this.handleChange2}
                    />
                ),
            },
            {
                label: "开仓率",
                id: "open_rate",
                initialValue: "0",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    // {
                    //     message: "请输入0%-100% 之间的数",
                    //     pattern: new RegExp(
                    //         "(^(\\d|[1-9]\\d)(\\.\\d{1,2})?$)|(^100$)"
                    //     ),
                    // },
                    {
                        message: "请输入数字",
                        pattern: new RegExp("^\\d+$"),
                    },
                ],
                component: <Input placeholder="请输入" suffix="%" />,
            },
            {
                label: "收益率",
                id: "income_rate",
                initialValue: "0",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        message: "请输入数字",
                        pattern: new RegExp("^\\d+$"),
                    },
                ],
                component: <Input placeholder="请输入" suffix="%" />,
            },
            {
                label: "基点",
                id: "basis_point",
                initialValue: "0",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        message: "请输入数字",
                        pattern: new RegExp("^\\d+$"),
                    },
                ],
                component: <Input placeholder="请输入" />,
            },
        ];
    };
    getUpdateFormFields = () => {
        return [
            // {
            //     label: "算法厂商",
            //     id: "provider_id",
            //     initialValue: "",
            //     rules: [
            //         {
            //             required: true,
            //             message: "参数不能为空",
            //         },
            //     ],
            //     // component: <Input placeholder="请输入" />,
            //     component: SelectOption(this.state.providerList, {
            //         placeholder: "请选择",
            //         // onChange: this.inputChange,
            //     }),
            // },
            {
                label: "算法",
                id: "algo_id",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                // component: <Input placeholder="请输入" />,
                component: SelectOption(this.state.algoList, {
                    placeholder: "请选择",
                    disabled: true,
                    // onChange: this.inputChange,
                }),
            },
            {
                label: "股票代码",
                id: "sec_id",
                initialValue: "000001",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: (
                    // <Input placeholder="请输入" readOnly disabled />
                    <Input placeholder="请输入" disabled />
                ),
            },
            {
                label: "开仓率",
                id: "open_rate",
                initialValue: "0",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    // {
                    //     message: "请输入0%-100% 之间的数",
                    //     pattern: new RegExp(
                    //         "(^(\\d|[1-9]\\d)(\\.\\d{1,2})?$)|(^100$)"
                    //     ),
                    // },
                    {
                        message: "请输入数字",
                        pattern: new RegExp("^\\d+$"),
                    },
                ],
                component: <Input placeholder="请输入" suffix="%" />,
            },
            {
                label: "收益率",
                id: "income_rate",
                initialValue: "0",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        message: "请输入数字",
                        pattern: new RegExp("^\\d+$"),
                    },
                ],
                component: <Input placeholder="请输入" suffix="%" />,
            },
            {
                label: "基点",
                id: "basis_point",
                initialValue: "0",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        message: "请输入数字",
                        pattern: new RegExp("^\\d+$"),
                    },
                ],
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

    handleInsertRecord = (fromData) => {
        console.log("新增接口", fromData);
        // let provider = this.state.providerList.find(
        //     (item) => item.key == fromData.provider_id
        // );
        // if (!provider) {
        //     message.error("算法厂商名不存在");
        //     return;
        // }
        let algo = this.state.algoInfoList.find(
            (item) => item.id == fromData.algo_id
        );
        console.log(algo);
        if (!algo) {
            message.error("算法不存在");
            return;
        }
        let sec = this.state.securityList.find(
            (item) => item == fromData.sec_id
        );
        // console.log(this.state.securityList,sec);
        if (!sec) {
            message.error("股票代码不存在");
            return;
        }
        let params = {
            provider_id: algo.uuserId / 1,
            provider_name: algo.algoName,
            sec_id: fromData.sec_id,
            sec_name: this.securityObj[sec],
            algo_id: algo.id / 1,
            algo_type: algo.algorithmType / 1,
            algo_name: algo.algoName,
            open_rate: fromData.open_rate / 1,
            income_rate: fromData.income_rate / 1,
            basis_point: fromData.basis_point / 1,
        };
        // console.log(params);
        // return;
        pfhttp
            .post({
                url: "/algo-assess/v1/assess/add-optimize-base",
                data: params,
            })
            .then((res) => {
                console.log(res);
                let msg = res.msg;
                if (res.code == 0) {
                    message.success(msg);
                    // this.getData();
                } else if (res.code == 20000) {
                    message.error(
                        msg.substring(
                            msg.indexOf("[") + 1,
                            msg.lastIndexOf("]")
                        )
                    );
                } else {
                    message.error(msg);
                }
                this.isAction = true;
            });
    };
    //更新记录
    handleUpdateRecord = ({ form }) => {
        // console.log(form.getFieldsValue());
        // console.log(this.record);
        let formData = form.getFieldsValue();
        let params = {
            id: this.record.id,
            provider_id: this.record.provider_id / 1,
            provider_name: this.record.provider_name,
            sec_id: this.record.sec_id,
            sec_name: this.record.sec_name,
            algo_id: this.record.algo_id / 1,
            algo_type: this.record.algo_type / 1,
            algo_name: this.record.algo_name,
            open_rate: formData.open_rate / 1,
            income_rate: formData.income_rate / 1,
            basis_point: formData.basis_point / 1,
        };
        // console.log(params);
        // return;
        // 发送更新请求
        pfhttp
            .post({
                url: "/algo-assess/v1/assess/update-optimize-base",
                data: params,
            })
            .then((res) => {
                let msg = res.msg;
                if (res.code == 0) {
                    message.success(msg);
                    // this.getData();
                } else if (res.code == 20000) {
                    message.error(
                        msg.substring(
                            msg.indexOf("[") + 1,
                            msg.lastIndexOf("]")
                        )
                    );
                } else {
                    message.error(msg);
                }
                this.isAction = true;
            });
    };
    //删除记录
    handleDeleteRecord = (record) => {
        console.log("删除记录 ", record);
    };
    //填入更新数据
    setUpdateModal = ({ form, record }) => {
        this.record = record;
        form.setFieldsValue({
            // provider_id: record.uuserId / 1,
            // provider_name: record.algoName,
            sec_id: record.sec_id,
            // sec_name: record.sec_name,
            algo_id: record.algo_id,
            // algo_type: record.algo_id,
            // algo_name: record.algo_id,
            open_rate: record.open_rate,
            income_rate: record.income_rate,
            basis_point: record.basis_point,
        });
    };
    getData = (params = {}, pagination = { current: 1, pageSize: 11 }) => {
        if (!params.provider_id) {
            params.provider_id = 0;
        } else {
        }
        if (!params.algo_id) {
            params.algo_id = 0;
        }
        if (!params.sec_id) {
            params.sec_id = "";
        }
        params.provider_id = params.provider_id / 1;
        params.algo_id = params.algo_id / 1;
        params.algo_type = 1;
        params = {
            ...params,
            page: pagination.current / 1,
            limit: pagination.pageSize / 1,
        };
        // console.log(params);
        pfhttp
            .post({
                // url: "/risk/queryRisk",
                url: "/algo-assess/v1/assess/select-optimize-base",
                data: params,
            })
            .then((res) => {
                // console.log(res);
                // return;
                //解析数据字典
                if (res.data && res.data.length > 0) {
                    // parseDict(res.data.records);
                    parseArrDictValue(res.data, "algo_type", "algorithmType");
                    // parseDictValue(res.data);
                    // showTip(this);
                } else {
                    message.info("查询结果为空");
                }
                let pgn = {
                    // current: res.data.current,
                    // pageSize: pagination.pageSize,
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: res.total || 0,
                };
                let resArr = res.data;
                if (!res.data) {
                    resArr = [];
                }
                this.setState({
                    info: resArr,
                    pagination: pgn,
                });
            });
    };
    //获取所有厂商
    getProvider = (params = {}) => {
        // return;
        http.get({
            // url: "/risk/queryRisk",
            url: "/algo/listProvider",
            data: params,
        }).then((res) => {
            // console.log(res);
            let idArr = [];
            if (res.data && res.data.length > 0) {
                let dataArr = res.data;
                if (dataArr.length > 0) {
                    idArr = dataArr.map((item) => {
                        let obj = {};
                        // obj.key = item.providerName + "-" + item.uuserId;
                        // obj.value = item.providerName + "-" + item.uuserId;
                        obj.key = item.id;
                        // obj.value = item.userName + "-" + item.id;
                        obj.value = item.userName;
                        return obj;
                    });
                    // console.log(idArr);
                }
            }
            this.setState({
                providerList: idArr,
            });
        });
    };
    //获取所有T0算法
    getT0AlgoList = (params = {}) => {
        // return;
        http.get({
            // url: "/risk/queryRisk",
            url: "/algo/listAll",
            data: params,
        }).then((res) => {
            // console.log(res);
            let idArr = [];
            let infoArr = [];
            if (res.data && res.data.length > 0) {
                let dataArr = res.data;
                if (dataArr.length > 0) {
                    infoArr = dataArr;
                    idArr = dataArr.map((item) => {
                        let obj = {};
                        obj.key = item.id;
                        obj.value = item.algoName;
                        return obj;
                    });
                    // console.log(idArr);
                }
            }
            this.setState({
                algoList: idArr,
                algoInfoList: infoArr,
            });
        });
    };
    //获取所有股票
    getSecurityList = (params = {}) => {
        // return;
        http.get({
            // url: "/risk/queryRisk",
            url: "/security/listAll",
            data: params,
        }).then((res) => {
            // console.log(res);
            let optionArr = [];
            let securityIdArr = [];
            this.securityObj = {};
            if (res.data && res.data.length > 0) {
                let dataArr = res.data;
                if (dataArr.length > 0) {
                    dataArr.forEach((item) => {
                        let sec = item.securityId.trim();
                        if (!securityIdArr.includes(sec)) {
                            securityIdArr.push(sec);
                            this.securityObj[sec] = item.securityName;
                        }
                    });
                    if (securityIdArr.length > 0) {
                        optionArr =
                            securityIdArr.length > 10
                                ? securityIdArr.slice(0, 10)
                                : securityIdArr;
                    }
                }
            }
            this.setState({
                securityList: securityIdArr,
                currentDataLists: optionArr,
            });
        });
    };
    handleSearch = (params, pagination) => {
        this.getData(params, pagination);
    };
    componentDidMount() {
        this.getData();
        this.getProvider();
        this.getT0AlgoList();
        this.getSecurityList();
    }

    render() {
        let scroll = { x: 1200, y: 445 };
        let info = this.state.info;
        //批量
        // let { selectRow } = this.state;
        // const rowSelection = {
        //     selectRow,
        //     onChange: this.handleTableChange,
        // };
        return (
            <div>
                <CurdComponent
                    // rowKey={"index"}
                    // btnText2="查全部"
                    // isShowSearchForm={false}
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
                    insertModalText="新增T0优选算法"
                    updateModalText="修改T0优选算法"
                    centered={true}
                    columns={columns}
                    dataSource={info}
                    scroll={scroll}
                    // rowSelection={rowSelection} //批量选择 操作
                >
                    <div
                        urlPrefix="/security"
                        title="算法优选"
                        sucCallback={this.getData}
                    ></div>
                </CurdComponent>
            </div>
        );
    }
}
