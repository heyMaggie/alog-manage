import React from "react";
import CurdComponent from "@/components/CurdComponent";
// import SelectOption from "@/components/SelectOption";
import { Input } from "antd";

// const getUpdateFormFields = () => {};
const columns = (params) => {
    return [
        {
            title: "子单ID",
            dataIndex: "id",
            width: 100,
        },
        {
            title: "账户ID",
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
            width: 100,
        },
        {
            title: "订单数量 ",
            dataIndex: "orderQty",
            width: 120,
        },
        {
            title: "订单价格",
            dataIndex: "price",
            width: 120,
        },
        {
            title: "止损价",
            dataIndex: "stopPx",
            width: 120,
        },
        {
            title: "订单类型",
            dataIndex: "orderType",
            width: 180,
        },
        {
            title: "买卖方向",
            dataIndex: "side",
            width: 100,
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
            title: "累计成交数量 ",
            dataIndex: "cumQty",
            width: 150,
        },
        {
            title: "剩余未成交数量 ",
            dataIndex: "leavesQty",
            width: 150,
        },
        {
            title: "证券代码源",
            dataIndex: "securityIdSource",
            width: 120,
        },
        {
            title: "母单篮子ID",
            dataIndex: "basketId",
            width: 150,
        },
        {
            title: "订单编号",
            dataIndex: "clOrdId",
            width: 150,
        },
        {
            title: "子单状态",
            dataIndex: "childOrdStatus",
            width: 120,
        },
        {
            title: "请求用户ID",
            dataIndex: "reqUserId",
            width: 150,
        },
        {
            title: "错误码",
            dataIndex: "errorCode",
            width: 100,
        },
        {
            title: "错误信息",
            dataIndex: "errorMsg",
            width: 180,
        },
        {
            title: "证券账户",
            dataIndex: "accountId",
            width: 150,
        },
        {
            title: "序列号",
            dataIndex: "seq",
            width: 100,
        },
        {
            title: "柜台序列号",
            dataIndex: "counterSeq",
            width: 120,
        },
        {
            title: "交易时间",
            dataIndex: "transactTime",
            width: 180,
        },
        {
            title: "撤单时间",
            dataIndex: "cancelTime",
            width: 180,
        },
        {
            title: "成交计数",
            dataIndex: "execCount",
            width: 120,
        },
        {
            title: "累计成交金额",
            dataIndex: "cumAmount",
            width: 150,
        },
        {
            title: "成交记录ID",
            dataIndex: "version",
            width: 120,
        },
    ];
};
const getSearchFormFields = () => {
    return [
        {
            label: "子单ID",
            id: "id",
            component: <Input placeholder="请输入" />,
        },
        {
            label: "用户ID",
            id: "uuserId",
            component: <Input placeholder="请输入" />,
        },
        {
            label: "篮子ID",
            id: "basketId",
            component: <Input placeholder="请输入" />,
        },
        {
            label: "算法ID",
            id: "algorithmId",
            initialValue: "",
            component: <Input placeholder="请输入" />,
        },
        {
            label: "证券代码",
            id: "securityId",
            initialValue: "",
            component: <Input placeholder="请输入" />,
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
    handleSearch = (params, pagination) => {
        // console.log("获取搜索栏数据 ", params);
        this.getData(params, pagination);
    };
    getData = (params = {}, pagination = { current: 1, pageSize: 11 }) => {
        // params.token = "";
        params = {
            ...params,
            pageId: pagination.current,
            pageNum: pagination.pageSize,
        };
        http.post({
            url: "/new-trade-order/list",
            data: params,
        }).then((res) => {
            console.log(res);
            //解析数据字典
            if (res.data.records && res.data.records.length > 0) {
                parseDict(res.data.records);
                showStip(this);
            } else {
                message.info("查询结果为空");
            }
            let pgn = {
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: res.data.total || 0,
            };
            this.setState({
                info: res.data.records,
                pagination: pgn,
            });
        });
    };
    componentDidMount() {
        this.getData();
    }
    render() {
        let scroll = { x: 4200, y: 445 };
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
                    pagination={this.state.pagination}
                    // getUpdateFormFields={getUpdateFormFields}
                    // setUpdateModal={this.setUpdateModal}
                    // updateRecord={this.handleUpdateRecord} // 不传 就没编辑
                    // deleteRecord={this.handleDeleteRecord} // 不传 就没删除
                    centered={true}
                    columns={columns}
                    dataSource={info}
                    scroll={scroll}
                    // rowSelection={rowSelection} //批量选择 操作
                >
                    <div
                        urlPrefix="/new-trade-order"
                        noUpload={true}
                        title="子单信息"
                        sucCallback={this.getData}
                    ></div>
                </CurdComponent>
            </div>
        );
    }
}
