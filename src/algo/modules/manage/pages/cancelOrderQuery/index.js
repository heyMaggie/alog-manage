import React from "react";
import CurdComponent from "@/components/CurdComponent";
// import SelectOption from "@/components/SelectOption";
import { Input } from "antd";

const getUpdateFormFields = () => {};
const columns = (params) => {
    return [
        // {
        //     title: "个人账户",
        //     dataIndex: "uuserId",
        //     width: 100,
        // },
        {
            title: "用户ID",
            dataIndex: "uuserId",
            key: "uuserId",
            width: 100,
        },
        {
            title: "证券代码",
            dataIndex: "securityId",
            key: "securityId",
            width: 100,
        },
        {
            title: "篮子ID",
            dataIndex: "basketId",
            width: 120,
        },
        {
            title: "业务类型",
            dataIndex: "businessType",
            width: 100,
        },
        {
            title: "算法类型",
            dataIndex: "algorithmType",
            width: 140,
        },
        {
            title: "算法ID",
            dataIndex: "algorithmId",
            width: 100,
        },
        {
            title: "订单ID",
            dataIndex: "id",
            width: 120,
        },
        {
            title: "订单编号",
            dataIndex: "clOrdId",
            width: 150,
        },
        {
            title: "撤单订单状态",
            dataIndex: "childOrdStatus",
            width: 140,
        },
        {
            title: "柜台序列号",
            dataIndex: "counter_seq",
            width: 120,
        },
        {
            title: "原始订单号",
            dataIndex: "origTradeOrderId",
            width: 120,
        },
        {
            title: "母单订单号",
            dataIndex: "algoOrderId",
            width: 120,
        },
        // {
        //     title: "取消标志",
        //     dataIndex: "cancelFlag",
        //     width: 100,
        // },
        // {
        // {
        //     title: "母单在篮子表中的状态",
        //     dataIndex: "basketStatus",
        //     width: 180,
        // },
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
            width: 150,
        },
        {
            title: "客户端序列号",
            dataIndex: "seq",
            width: 150,
        },
        {
            title: "交易时间",
            dataIndex: "transactTime",
            width: 180,
        },
        {
            title: "请求时间",
            dataIndex: "reqTime",
            width: 180,
        },
    ];
};
// console.log(columns().length);
const getSearchFormFields = () => {
    return [
        {
            label: "用户ID",
            id: "uuserId",
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
export default class cancelOrderQuery extends React.PureComponent {
    state = {
        searchLoading: false,
        selectRow: [],
        info: [],
        pagination: { total: 0 },
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
    getData = (params = {}, pagination = { current: 1, pageSize: 11 }) => {
        params = {
            ...params,
            pageId: pagination.current,
            pageNum: pagination.pageSize,
        };
        // params.token = "";
        http.post({
            url: "/cancel-trade-order/list",
            data: params,
        }).then((res) => {
            console.log(res);
            //解析数据字典
            if (res.data.records && res.data.records.length > 0) {
                parseDict(res.data.records);
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
        this.getData(params, pagination);
    };
    componentDidMount() {
        this.getData();
    }
    render() {
        let scroll = { x: 1100, y: 445 };
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
                        urlPrefix="/cancel-trade-order"
                        noUpload={true}
                        title="撤单信息"
                        sucCallback={this.getData}
                    ></div>
                </CurdComponent>
            </div>
        );
    }
}
