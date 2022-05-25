import React from "react";
import CurdComponent from "@/components/CurdComponent";
// import SelectOption from "@/components/SelectOption";
import { Input } from "antd";

const getUpdateFormFields = () => {};
const columns = (params) => {
    return [
        {
            title: "个人账户",
            dataIndex: "uuserId",
            width: 100,
        },
        {
            title: "篮子批次号",
            dataIndex: "basketId",
            width: 120,
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
            title: "证券代码",
            dataIndex: "securityId",
            width: 120,
        },
        {
            title: "市场代码",
            dataIndex: "market",
        },
        {
            title: "所有方向",
            dataIndex: "side",
        },
        // {
        //     title: "母单订单数量 ",
        //     dataIndex: "algoOrderQty",
        //     width: 120,
        // },
        {
            title: "策略参数",
            dataIndex: "strategyParam",
            width: 120,
        },
        {
            title: "客户端序列号",
            dataIndex: "seq",
            width: 150,
        },
        {
            title: "策略状态",
            dataIndex: "algorithmStatus",
            width: 150,
        },
        {
            title: "母单状态",
            dataIndex: "algoOrdStatus",
        },
        {
            title: "母单在篮子表中的状态",
            dataIndex: "basketStatus",
            width: 160,
        },
        {
            title: "请求用户ID",
            dataIndex: "reqUserId",
        },
        {
            title: "错误码",
            dataIndex: "errorCode",
            width: 100,
        },
        {
            title: "错误信息",
            dataIndex: "errorMsg",
        },
        {
            title: "个人账户",
            dataIndex: "userId",
        },
        {
            title: "算法平台账户",
            dataIndex: "algoUserId",
        },
        {
            title: "股东账户",
            dataIndex: "accountId",
        },
        {
            title: "证券代码源",
            dataIndex: "securityIdSource",
        },
        {
            title: "交易时间",
            dataIndex: "transactTime",
        },
        {
            title: "母单订单数量 ",
            dataIndex: "algoOrderQty",
            width: 120,
        },
        {
            title: "子单买订单数量 ",
            dataIndex: "buyOrderQty",
            width: 120,
        },
        {
            title: "子单卖订单数量 ",
            dataIndex: "sellOrderQty",
            width: 120,
        },
        {
            title: "累计成交买订单数量 ",
            dataIndex: "buyCumQty",
            width: 120,
        },
        {
            title: "累计成交卖订单数量 ",
            dataIndex: "sellCumQty",
            width: 120,
        },
        {
            title: "子单买撤单数量 ",
            dataIndex: "buyCancelQty",
            width: 120,
        },
        {
            title: "子单卖撤单数量 ",
            dataIndex: "sellCancelQty",
            width: 120,
        },
        {
            title: "累计买撤单成功数量 ",
            dataIndex: "buyCancelledCumQty",
            width: 120,
        },
        {
            title: "累计卖撤单成功数量 ",
            dataIndex: "sellCancelledCumQty",
            width: 120,
        },
        {
            title: "平均买入价格",
            dataIndex: "buyPrice",
        },
        {
            title: "平均卖出价格",
            dataIndex: "sellPrice",
        },
        {
            title: "平均买入开仓价格",
            dataIndex: "buyOpenPrice",
        },
        {
            title: "平均买入平仓价格",
            dataIndex: "buyClosePrice",
        },
        {
            title: "平均卖出开仓价格",
            dataIndex: "sellOpenPrice",
        },
        {
            title: "平均卖出平仓价格",
            dataIndex: "sellClosePrice",
        },

        {
            title: "盈亏",
            dataIndex: "profitAndLoss",
        },
        {
            title: "收益率",
            dataIndex: "rateOfReturn",
        },
        {
            title: "成功下单的买入总委托金额",
            dataIndex: "buySuccAmount",
        },
        {
            title: "成功撤单的买入总委托金额",
            dataIndex: "sellSuccAmount",
        },
        {
            title: "子单买订单总条数",
            dataIndex: "buyItemTotal",
        },
        {
            title: "子单卖订单总条数",
            dataIndex: "sellItemTotal",
        },
        {
            title: "子单买订单成功条数",
            dataIndex: "buyItemCount",
        },
        {
            title: "子单卖订单成功条数",
            dataIndex: "sellItemCount",
        },
        {
            title: "累计成交买订单条数",
            dataIndex: "buyItemCum",
        },
        {
            title: "累计成交卖订单条数",
            dataIndex: "sellItemCum",
        },

        {
            title: "子单买撤单条数",
            dataIndex: "buyCancelItemCount",
        },
        {
            title: "子单卖撤单条数",
            dataIndex: "sellCancelItemCount",
        },
        {
            title: "累计买撤单成功条数",
            dataIndex: "buyCancelledItemCum",
        },
        {
            title: "累计卖撤单成功条数",
            dataIndex: "sellCancelledItemCum",
        },
        {
            title: "风控自成交子单数计数",
            dataIndex: "selfExecCount",
        },
        {
            title: "成交记录ID",
            dataIndex: "version",
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
            url: "/new-algo-order/list",
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
        let scroll = { x: 6000, y: 445 };
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
