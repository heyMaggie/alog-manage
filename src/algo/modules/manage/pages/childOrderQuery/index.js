import React from "react";
import CurdComponent from "@/components/CurdComponent";
// import SelectOption from "@/components/SelectOption";
import { Input } from "antd";

const getUpdateFormFields = () => {};
const columns = (params) => {
    return [
        {
            title: "账户id",
            dataIndex: "uuserId",
            width: 100,
        },
        {
            title: "业务类型",
            dataIndex: "businessType",
            width: 100,
        },
        {
            title: "策略类型",
            dataIndex: "algorithmType",
            width: 100,
        },
        {
            title: "策略编号",
            dataIndex: "algorithmId",
            width: 100,
        },
        {
            title: "母单订单号",
            dataIndex: "algoOrderId",
            width: 120,
        },
        {
            title: "证券代码",
            dataIndex: "securityId",
            width: 120,
        },
        {
            title: "市场代码",
            dataIndex: "market",
        },
        {
            title: "订单数量 x100",
            dataIndex: "orderQty",
            width: 120,
        },
        {
            title: "订单价格 x10000",
            dataIndex: "price",
            width: 120,
        },
        {
            title: "止损价",
            dataIndex: "stopPx",
        },
        {
            title: "订单类型",
            dataIndex: "orderType",
        },
        {
            title: "买卖方向",
            dataIndex: "side",
        },
        {
            title: "平仓标识",
            dataIndex: "positionEffect",
            width: 120,
        },
        {
            title: "备兑标签",
            dataIndex: "coveredOrUncovered",
            width: 150,
        },
        {
            title: "累计成交数量 x100",
            dataIndex: "cumQty",
            width: 150,
        },
        {
            title: "剩余未成交数量 x100",
            dataIndex: "leavesQty",
        },
        {
            title: "证券代码源",
            dataIndex: "securityIdSource",
            width: 120,
        },
        {
            title: "母单篮子批次号",
            dataIndex: "basketId",
            width: 150,
        },
        {
            title: "订单编号",
            dataIndex: "clOrdId",
        },
        {
            title: "子单状态",
            dataIndex: "childOrdStatus",
        },
        {
            title: "请求用户ID",
            dataIndex: "reqUserId",
        },
        {
            title: "错误码",
            dataIndex: "errorCode",
            width:100
        },
        {
            title: "错误信息",
            dataIndex: "errorMsg",
        },
        {
            title: "证券账户",
            dataIndex: "accountId",
        },
        {
            title: "序列号",
            dataIndex: "seq",
        },
        {
            title: "柜台 序列号",
            dataIndex: "counter_seq",
        },
        {
            title: "交易时间",
            dataIndex: "transactTime",
        },
        {
            title: "撤单时间",
            dataIndex: "cancel_time",
        },
        {
            title: "成交计数",
            dataIndex: "exec_count",
            width: 120,
        },
        {
            title: "累计成交金额 x10000",
            dataIndex: "cum_amount",
            width: 120,
        },
        {
            title: "成交记录ID",
            dataIndex: "version",
            width: 120,
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
        http.get({
            url: "/new-trade-order/list",
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
        let scroll = { x: 4000, y: 445 };
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
                    isShowSearchForm={false}
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
