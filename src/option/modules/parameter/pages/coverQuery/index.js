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
            title: "用户ID",
            dataIndex: "uuserId",
            width: 100,
        },
        {
            title: "申报交易单元ID",
            dataIndex: "upbuId",
            width: 150,
        },
        {
            title: "应用标识",
            dataIndex: "applId",
            width: 120,
        },
        {
            title: "申报交易单元",
            dataIndex: "submittingPbuid",
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
            title: "委托时间",
            dataIndex: "transactTime",
            width: 150,
        },
        {
            title: "用户私有信息",
            dataIndex: "userInfo",
            width: 120,
        },
        {
            title: "客户订单编号",
            dataIndex: "clOrdId",
            width: 150,
        },
        {
            title: "营业部代码",
            dataIndex: "branchId",
            width: 150,
        },
        {
            title: "订单状态",
            dataIndex: "orderStatus",
            width: 100,
        },
        {
            title: "订单限定",
            dataIndex: "orderRestrictions",
            width: 100,
        },
        {
            title: "买卖方向",
            dataIndex: "side",
            width: 150,
        },
        {
            title: "订单类别",
            dataIndex: "ordType",
            width: 100,
        },
        {
            title: "订单数量",
            dataIndex: "orderQty",
            width: 150,
        },
        {
            title: "价格",
            dataIndex: "price",
            width: 100,
        },
        {
            title: "合约帐户标识码",
            dataIndex: "contractAccountCode",
            width: 150,
        },
        {
            title: "客户订单编号",
            dataIndex: "clOrderId",
            width: 120,
        },
        {
            title: "备兑标志",
            dataIndex: "coveredOrUncoverd",
            width: 100,
        },
        {
            title: "累计成交金额",
            dataIndex: "cumExec",
            width: 120,
        },
        {
            title: "原始冻结价格",
            dataIndex: "origFrozenPrice",
            width: 120,
        },
        {
            title: "原始订单数量",
            dataIndex: "originOrdQty",
            width: 120,
        },
        {
            title: "最终扣除手续费",
            dataIndex: "finalFee",
            width: 150,
        },
        {
            title: "最多成交位数",
            dataIndex: "maxPriceLevel",
            width: 120,
        },
        {
            title: "最低成交数量",
            dataIndex: "minQty",
            width: 120,
        },
        {
            title: "平仓标识",
            dataIndex: "positionEffect",
            width: 100,
        },
        {
            title: "止损价",
            dataIndex: "stopPx",
            width: 100,
        },
        {
            title: "订单有效时间类型",
            dataIndex: "timeInForce",
            width: 150,
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
        {
            label: "股东账户",
            id: "accoundId",
            component: <Input placeholder="请输入股东账户" />,
        },
        {
            label: "订单号",
            id: "clOrdId",
            component: <Input placeholder="请输入订单号" />,
        },
    ];
};
export default class newOrderQuery extends React.PureComponent {
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
            url: "/tb-new-order/queryCoverList",
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
        let scroll = { x: 2000, y: 445 };
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
