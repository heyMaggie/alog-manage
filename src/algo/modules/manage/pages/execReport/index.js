import React from "react";
import CurdComponent from "@/components/CurdComponent";
// import SelectOption from "@/components/SelectOption";
import { Input } from "antd";

const getUpdateFormFields = () => {};
const columns = (params) => {
    return [
        {
            title: "证券帐户",
            dataIndex: "accountId",
            width: 100,
        },
        {
            title: "订单ID",
            dataIndex: "uorderId",
            width: 100,
        },
        {
            title: "用户ID",
            dataIndex: "uuserId",
            width: 100,
        },
        {
            title: "应用标识",
            dataIndex: "applId",
            width: 120,
        },

        {
            title: "证券代码",
            dataIndex: "securityId",
            width: 120,
        },
        {
            title: "证券代码源",
            dataIndex: "securityIdSource",
            width: 120,
        },
        {
            title: "交易所订单编号",
            dataIndex: "orderId",
            width: 150,
        },
        {
            title: "客户订单编号",
            dataIndex: "clOrdId",
            width: 150,
        },
        {
            title: "执行编号",
            dataIndex: "execId",
            width: 120,
        },
        {
            title: "执行类型",
            dataIndex: "execType",
            width: 120,
        },
        {
            title: "订单状态",
            dataIndex: "ordStatus",
            width: 100,
        },
        {
            title: "成交价",
            dataIndex: "lastPx",
            width: 100,
        },
        {
            title: "成交数量",
            dataIndex: "lastQty",
            width: 150,
        },
        {
            title: "订单剩余数量",
            dataIndex: "leavesQty",
            width: 120,
        },
        {
            title: "累计执行数量",
            dataIndex: "cumQty",
            width: 120,
        },
        {
            title: "买卖方向",
            dataIndex: "side",
            width: 120,
        },
        {
            title: "回报交易单元",
            dataIndex: "reportingPbuid",
            width: 120,
        },
        {
            title: "申报交易单元",
            dataIndex: "submitingPubid",
            width: 120,
        },
        {
            title: "订单所有者类型",
            dataIndex: "ownerType",
            width: 150,
        },
        {
            title: "结算机构代码",
            dataIndex: "clearingFirm",
            width: 120,
        },
        {
            title: "回报时间",
            dataIndex: "transactTime",
            width: 160,
        },
        {
            title: "用户信息",
            dataIndex: "userInfo",
            width: 120,
        },

        {
            title: "营业部代码",
            dataIndex: "branchId",
            width: 120,
        },
        {
            title: "平仓标识",
            dataIndex: "positionEffect",
            width: 120,
        },
        {
            title: "备兑标志",
            dataIndex: "coveredOrUncovered",
            width: 100,
        },
        {
            title: "合约账户标识",
            dataIndex: "contractAccountCode",
            width: 120,
        },
        {
            title: "平台分区号",
            dataIndex: "partitionNo",
            width: 120,
        },
        {
            title: "回报记录号",
            dataIndex: "reportIndex",
            width: 120,
        },
    ];
};
let getSearchFormFields = () => {
    return [
        // {
        //     label: "期权编码",
        //     id: "optionId",
        //     component: <Input placeholder="请输入期权编码" />,
        // },
        // {
        //     label: "股东账户",
        //     id: "accoundId",
        //     component: <Input placeholder="请输入股东账户" />,
        // },
        {
            label: "订单号",
            id: "clOrdId",
            component: <Input placeholder="请输入订单号" />,
        },
    ];
};
export default class execReport extends React.PureComponent {
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
        // return
    };
    //删除记录
    handleDeleteRecord = (record) => {
        console.log("删除记录 ", record);
    };
    //填入更新数据
    setUpdateModal = ({ form, record }) => {};
    getData = (params = {}) => {
        // params.token = "";
        http.post({
            url: "/option/tb-exec-report/selectList",
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
                    // getUpdateFormFields={getUpdateFormFields}
                    // setUpdateModal={this.setUpdateModal}
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
