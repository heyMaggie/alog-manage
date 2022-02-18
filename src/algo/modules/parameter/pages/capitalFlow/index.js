import React from "react";
import CurdComponent from "@/components/CurdComponent";
// import SelectOption from "@/components/SelectOption";
import { Input } from "antd";

const getUpdateFormFields = () => {
    return [
        {
            label: "交换机编号",
            id: "switchId",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "交换机编号地址不能为空",
                },
            ],
            component: (
                <Input placeholder="请输入交换机编号" readOnly disabled />
            ),
        },
        {
            label: "IP地址",
            id: "ip",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "IP地址不能为空",
                },
            ],
            component: <Input placeholder="请输入IP地址" />,
        },
        {
            label: "网关",
            id: "gateway",
            rules: [
                {
                    required: true,
                    message: "网关不能为空",
                },
                {
                    message: "请输入正确的IP地址",
                    pattern:
                        /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/,
                },
            ],
            component: <Input placeholder="请输入网关" />,
        },
        {
            label: "Mac地址",
            id: "mac",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "Mac地址不能为空",
                },
                {
                    message: "请输入正确的mac地址,例如：1A-6F-38-C8-A4-07",
                    pattern: /^([a-f0-9]{2}-){5}[a-f0-9]{2}$/i,
                },
            ],
            component: <Input placeholder="请输入Mac地址" />,
        },
        {
            label: "子网掩码",
            id: "mask",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "子网掩码不能为空",
                },
                {
                    message: "请输入正确的IP地址",
                    pattern:
                        /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/,
                },
            ],
            component: <Input placeholder="请输入子网掩码" />,
        },
        // {
        //     label: "使能状态",
        //     id: "enable",
        //     initialValue: "",
        //     rules: [
        //         {
        //             required: true,
        //             message: "使能状态不能为空",
        //         },
        //     ],
        //     component: SelectOption(dict.enable),
        // },
    ];
};

const columns = (params) => {
    return [
        {
            title: "期权ID",
            dataIndex: "uoptionId",
            width: 100,
        },
        {
            title: "股东账户ID",
            dataIndex: "uaccountId",
            width: 120,
        },
        {
            title: "持仓ID",
            dataIndex: "uposId",
            width: 100,
        },
        {
            title: "组合策略持仓ID",
            dataIndex: "ustrategyPosId",
            width: 200,
        },
        {
            title: "执行编号",
            dataIndex: "execId",
            width: 100,
        },
        {
            title: "成交前余额",
            dataIndex: "fromBalance",
            width: 120,
        },
        {
            title: "成交前余额",
            dataIndex: "fromFrozen",
            width: 120,
        },
        {
            title: "成交后余额",
            dataIndex: "toBalance",
            width: 120,
        },
        {
            title: "成交后冻结",
            dataIndex: "toFrozen",
            width: 120,
        },
        // 字典
        {
            title: "资金交易类型",
            dataIndex: "tradeType",
            width: 150,
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            width: 100,
        },
    ];
};
let getSearchFormFields = () => {
    return [
        {
            label: "期权编码",
            id: "optionId",
            component: <Input placeholder="请输入期权编码" />,
        },
        // {
        //     label: "用户ID",
        //     id: "uaccountId",
        //     component: <Input placeholder="请输入用户ID" />,
        // },
    ];
};
export default class CapitalFlow extends React.PureComponent {
    state = {
        searchLoading: false,
        selectRow: [],
        info: [],
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
    //更新记录
    handleUpdateRecord = ({ form }) => {
        console.log(form.getFieldsValue());
        // return;
        let params = form.getFieldsValue();
        params.name = this.record.name;
        http.post({
            url: "/option/tcp/uoeMore/1011",
            data: params,
        }).then((res) => {
            console.log(res);
            message.success(res.msg);
            this.isAction = true;
            this.getData();
        });
    };
    //删除记录
    handleDeleteRecord = (record) => {
        console.log("删除记录 ", record);
    };
    //填入更新数据
    setUpdateModal = ({ form, record }) => {
        // console.log(record, form);
        this.record = record;
        form.setFieldsValue({
            switchId: record.switchId,
            ip: record.ip,
            mask: record.mask,
            mac: record.mac,
            gateway: record.gateway,
            enable: record.enable + "",
        });
    };
    getData = (params = {}) => {
        // params.token = "";
        http.post({
            url: "/option/tb-asset/selectByCondition",
            data: params,
        }).then((res) => {
            console.log(res);
            //解析数据字典
            if (res.data.length > 0) {
                parseDict(res.data);
                showStip(this);
            } else {
                message.info("查询结果为空");
            }
            this.setState({
                info: res.data,
            });
        });
    };
    handleSearch = (params) => {
        this.getData(params);
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
        return (
            <div>
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
                    getUpdateFormFields={getUpdateFormFields}
                    setUpdateModal={this.setUpdateModal}
                    // updateRecord={this.handleUpdateRecord} // 不传 就没编辑
                    // deleteRecord={this.handleDeleteRecord} // 不传 就没删除
                    centered={true}
                    columns={columns}
                    dataSource={info}
                    scroll={scroll}
                    // rowSelection={rowSelection} //批量选择 操作
                ></CurdComponent>
            </div>
        );
    }
}
