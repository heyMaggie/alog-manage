import React from "react";
import { Input, TimePicker } from "antd";

import CurdComponent from "@/components/CurdComponent";
// import SelectOption from "@/components/SelectOption";

const getSearchFormFields = () => {
    return [
        {
            label: "证券帐户",
            id: "AccountID",
            component: <Input placeholder="请输入证券帐户" />,
        },
        {
            label: "客户订单编号",
            id: "ClOrdID",
            // initialValue: "",
            component: <Input placeholder="请输入订单编号" />,
        },
        {
            label: "证券代码",
            id: "SecurityID",
            component: <Input placeholder="请输入证券代码" />,
        },
        {
            label: "开始时间",
            id: "startTime",
            component: <TimePicker placeholder="请输入开始时间" />,
        },
        {
            label: "结束时间",
            id: "endTime",
            component: <TimePicker placeholder="请输入结束时间" />,
        },
    ];
};
const getInsertFormFields = () => {
    return [];
};
const getUpdateFormFields = () => {
    return [];
};

const columns = () => {
    return [
        {
            title: "序号",
            dataIndex: "Sno",
            key: "Sno",
            width: 70,
        },
        {
            title: "证券帐户",
            dataIndex: "AccountID",
            key: "AccountID",
            width: 120,
        },
        {
            title: "客户订单编号",
            dataIndex: "ClOrdID",
            key: "ClOrdID",
            width: 100,
        },
        {
            title: "证券代码",
            dataIndex: "SecurityID",
            key: "SecurityID",
            width: 100,
        },
        {
            title: "订单类别",
            dataIndex: "OrdType",
            key: "OrdType",
            width: 100,
        },
        {
            title: "买卖方向",
            dataIndex: "Side",
            key: "Side",
            width: 100,
        },
        {
            title: "订单数量",
            dataIndex: "OrderQty",
            key: "OrderQty",
            width: 100,
        },
        {
            title: "价格",
            dataIndex: "Price",
            key: "Price",
            width: 100,
        },
        {
            title: "订单状态",
            dataIndex: "OrdStatus",
            key: "OrdStatus",
            width: 100,
        },
        {
            title: "委托时间",
            dataIndex: "TransactTime",
            key: "TransactTime",
            width: 150,
        },
        {
            title: "申报交易单元",
            dataIndex: "SubmittingPBUID",
            key: "SubmittingPBUID",
            width: 150,
        },
        {
            title: "证券代码源",
            dataIndex: "SecurityIDSource",
            key: "SecurityIDSource",
            width: 120,
        },
        {
            title: "订单所有者类型",
            dataIndex: "OwnerType",
            key: "OwnerType",
            width: 150,
        },
        {
            title: "结算机构代码",
            dataIndex: "ClearingFirm",
            key: "ClearingFirm",
            width: 120,
        },

        {
            title: "用户私有信息",
            dataIndex: "UserInfo",
            key: "UserInfo",
            width: 150,
        },
        {
            title: "营业部代码",
            dataIndex: "BranchID",
            key: "BranchID",
            width: 120,
        },
        {
            title: "订单限定",
            dataIndex: "OrderRestrictions",
            key: "OrderRestrictions",
            width: 100,
        },
        // {
        //     title: "止损价",
        //     dataIndex: "StopPx",
        //     key: "StopPx",
        //     width: 100,
        // },
        {
            title: "最低成交数量",
            dataIndex: "MinQty",
            key: "MinQty",
            width: 150,
        },
        {
            title: "最多成交价位数",
            dataIndex: "MaxPriceLevels",
            key: "MaxPriceLevels",
            width: 150,
        },
        {
            title: "订单有效时间类型",
            dataIndex: "TimeInForce",
            key: "TimeInForce",
            width: 150,
        },
    ];
};
let dtColumns = () => {
    return [
        {
            title: "序号",
            dataIndex: "Sno",
            key: "Sno",
            width: 100,
        },
        {
            title: "申报交易单元",
            dataIndex: "SubmittingPBUID",
            key: "SubmittingPBUID",
            width: 150,
        },
        {
            title: "客户订单编号",
            dataIndex: "ClOrdID",
            key: "ClOrdID",
            width: 150,
        },
        {
            title: "证券代码",
            dataIndex: "SecurityID",
            key: "SecurityID",
            width: 100,
        },
        {
            title: "证券代码源",
            dataIndex: "SecurityIDSource",
            key: "SecurityIDSource",
            width: 120,
        },
        {
            title: "订单所有者类型",
            dataIndex: "OwnerType",
            key: "OwnerType",
            width: 150,
        },
        {
            title: "结算机构代码",
            dataIndex: "ClearingFirm",
            key: "ClearingFirm",
            width: 120,
        },
        {
            title: "订单类别",
            dataIndex: "OrdType",
            key: "OrdType",
            width: 100,
        },
        {
            title: "买卖方向",
            dataIndex: "Side",
            key: "Side",
            width: 100,
        },
        {
            title: "订单数量",
            dataIndex: "OrderQty",
            key: "OrderQty",
            width: 100,
        },
        {
            title: "价格",
            dataIndex: "Price",
            key: "Price",
            width: 100,
        },
        {
            title: "订单状态",
            dataIndex: "OrdStatus",
            key: "OrdStatus",
            width: 100,
        },
        {
            title: "委托时间",
            dataIndex: "TransactTime",
            key: "TransactTime",
            width: 150,
        },
        {
            title: "用户私有信息",
            dataIndex: "UserInfo",
            key: "UserInfo",
            width: 150,
        },
        {
            title: "证券帐户",
            dataIndex: "AccountID",
            key: "AccountID",
            width: 120,
        },
        {
            title: "营业部代码",
            dataIndex: "BranchID",
            key: "BranchID",
            width: 120,
        },
        {
            title: "订单限定",
            dataIndex: "OrderRestrictions",
            key: "OrderRestrictions",
            width: 100,
        },
        // {
        //     title: "止损价",
        //     dataIndex: "StopPx",
        //     key: "StopPx",
        //     width: 100,
        // },
        {
            title: "最低成交数量",
            dataIndex: "MinQty",
            key: "MinQty",
            width: 150,
        },
        {
            title: "最多成交价位数",
            dataIndex: "MaxPriceLevels",
            key: "MaxPriceLevels",
            width: 150,
        },
        {
            title: "订单有效时间类型",
            dataIndex: "TimeInForce",
            key: "TimeInForce",
            width: 150,
        },
    ];
};

export default class Ddcx extends React.PureComponent {
    state = {
        searchLoading: false,
        info: [],
        pagination: { total: 0 },
    };
    // console.log(params);
    // console.log(params.startTime.format("YYYY:MM:DD HH:mm:SS"));
    //获取搜索栏数据
    handleSearch = (params, pagination) => {
        // console.log("获取搜索栏数据 ", params);
        this.getData(params, pagination);
    };
    // this.setState({ searchLoading: true });
    // setTimeout(() => {
    //     if (this.state.searchLoading) {
    //         this.setState({ searchLoading: false });
    //     }
    // }, 2000);
    getData = (params, pagination = { current: 1, pageSize: 20 }) => {
        // console.log(pagination);
        let loginMsg = {
            funcNo: "cmdOrderInfo",
            page: pagination.current,
            num: pagination.pageSize,
            ...params,
        };
        console.log(loginMsg);
        ipc.send("SendPackage", loginMsg);
        ipc.on("cmdOrderInfo", (event, msg) => {
            console.log(msg);
            parseDict(msg.content);
            let current = pagination.current;
            let pageSize = pagination.pageSize;
            msg.content.forEach(
                (item, index) =>
                    (item.Sno = (current - 1) * pageSize + (1 + index))
            );
            let pgn = {
                current: current,
                pageSize: pageSize,
                total: msg.head.count,
            };
            this.setState({ info: msg.content, pagination: pgn });
        });
    };
    // handleInsertRecord = ({ form }) => {
    //     console.log(form.getFieldsValue());
    // };
    // //更新记录
    // handleUpdateRecord = ({ form }) => {
    //   console.log(form.getFieldsValue());
    // };
    // //删除记录
    // handleDeleteRecord = record => {
    //   console.log("删除记录 ", record);
    // };
    //填入更新数据
    // setUpdateModal = ({ form, record }) => {
    //     form.setFieldsValue({
    //         userName1: record.v_gthth,
    //     });
    // };
    componentDidMount() {
        this.getData();
    }
    render() {
        let scroll = { x: 3000, y: 445 };
        let info = this.state.info;
        return (
            <CurdComponent
                // isShowSearchForm={false}
                onSearchClick={this.handleSearch}
                getSearchFormFields={getSearchFormFields}
                // searchLoading={this.state.searchLoading}
                rowKey="Sno"
                isShowInsert={false}
                // insertBtnText={"撤销"}
                // getInsertFormFields={getInsertFormFields}
                // insertRecord={this.handleInsertRecord}
                // getUpdateFormFields={getUpdateFormFields}
                // setUpdateModal={this.setUpdateModal}
                // updateRecord={this.handleUpdateRecord}
                // deleteRecord={this.handleDeleteRecord}
                pagination={this.state.pagination}
                centered={true}
                columns={columns}
                dataSource={info}
                scroll={scroll}
                dtColumns={dtColumns()} //详情列表
                dtCol={2} //详情列数
                // dtWidth={800} //详情弹窗宽度
            ></CurdComponent>
        );
    }
}
