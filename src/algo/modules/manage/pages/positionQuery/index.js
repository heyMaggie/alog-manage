import React from "react";
import { Input, TimePicker } from "antd";

import CurdComponent from "@/components/CurdComponent";
// import SelectOption from "@/components/SelectOption";

const getSearchFormFields = () => {
    return [
        {
            label: "证券帐户",
            id: "AccountID",
            // initialValue: "",
            component: <Input placeholder="请输入证券帐户" />,
        },
        {
            label: "证券代码",
            id: "SecurityID",
            // initialValue: "",
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

let columns = () => {
    return [
        {
            title: "序号",
            dataIndex: "Sno",
            key: "Sno",
            width: 80,
        },
        {
            title: "证券帐户",
            dataIndex: "AccountID",
            key: "AccountID",
            width: 120,
        },
        {
            title: "证券代码",
            dataIndex: "SecurityID",
            key: "SecurityID",
            width: 100,
        },
        {
            title: "持仓数量",
            dataIndex: "Quantity",
            key: "Quantity",
            width: 100,
        },
        {
            title: "买入价格",
            dataIndex: "Price",
            key: "Price",
            width: 100,
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
            width: 150,
        },
        {
            title: "盈亏",
            dataIndex: "ProfitAndLoss",
            key: "ProfitAndLoss",
            width: 100,
        },
        {
            title: "收益率",
            dataIndex: "RateOfReturn",
            key: "RateOfReturn",
            width: 100,
        },
        {
            title: "原始数量",
            dataIndex: "OriginQty",
            key: "OriginQty",
            width: 100,
        },
        {
            title: "原始开仓价格",
            dataIndex: "OriginOpenPrice",
            key: "OriginOpenPrice",
            width: 120,
        },
        {
            title: "可用数量",
            dataIndex: "FreeQty",
            key: "FreeQty",
            width: 100,
        },
        {
            title: "冻结数量",
            dataIndex: "FrozenQty",
            key: "FrozenQty",
            width: 100,
        },
        {
            title: "最后成交编号",
            dataIndex: "lastExecId",
            key: "lastExecId",
            width: 120,
        },
        {
            title: "更新时间",
            dataIndex: "updateTime",
            key: "updateTime",
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
            title: "证券帐户",
            dataIndex: "AccountID",
            key: "AccountID",
            width: 100,
        },
        {
            title: "证券代码",
            dataIndex: "SecurityID",
            key: "SecurityID",
            width: 100,
        },
        {
            title: "持仓数量",
            dataIndex: "Quantity",
            key: "Quantity",
            width: 100,
        },
        {
            title: "买入价格",
            dataIndex: "Price",
            key: "Price",
            width: 100,
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
            width: 150,
        },
        {
            title: "盈亏",
            dataIndex: "ProfitAndLoss",
            key: "ProfitAndLoss",
            width: 100,
        },
        {
            title: "收益率",
            dataIndex: "RateOfReturn",
            key: "RateOfReturn",
            width: 100,
        },
        {
            title: "原始数量",
            dataIndex: "OriginQty",
            key: "OriginQty",
            width: 100,
        },
        {
            title: "原始开仓价格",
            dataIndex: "OriginOpenPrice",
            key: "OriginOpenPrice",
            width: 120,
        },
        {
            title: "可用数量",
            dataIndex: "FreeQty",
            key: "FreeQty",
            width: 100,
        },
        {
            title: "冻结数量",
            dataIndex: "FrozenQty",
            key: "FrozenQty",
            width: 100,
        },
        {
            title: "最后成交编号",
            dataIndex: "11",
            key: "11",
            width: 100,
        },
        {
            title: "更新时间",
            dataIndex: "updateTime",
            width: 100,
        },
    ];
};
export default class Cccx extends React.PureComponent {
    state = {
        searchLoading: false,
        info: [],
        pagination: { total: 0 },
    };
    handleSearch = (params, pagination) => {
        // console.log("获取搜索栏数据 ", params);
        this.getData(params, pagination);
    };
    getData = (params, pagination = { current: 1, pageSize: 20 }) => {
        // console.log(pagination);
        // this.setState({ info: msg.content, pagination: pgn });
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
        let scroll = { x: 1200, y: 445 };
        let info = this.state.info;
        return (
            <CurdComponent
                // isShowSearchForm={false}
                onSearchClick={this.handleSearch}
                getSearchFormFields={getSearchFormFields}
                searchLoading={this.state.searchLoading}
                isShowInsert={false}
                rowKey="Sno"
                pagination={this.state.pagination}
                dataSource={info}
                // insertBtnText={"撤销"}
                // getInsertFormFields={getInsertFormFields}
                // insertRecord={this.handleInsertRecord}
                // getUpdateFormFields={getUpdateFormFields}
                // setUpdateModal={this.setUpdateModal}
                // updateRecord={this.handleUpdateRecord}
                // deleteRecord={this.handleDeleteRecord}
                centered={true}
                columns={columns}
                scroll={scroll}
                dtColumns={dtColumns()} //详情列表
                dtCol={2} //详情列数
                // dtWidth={800} //详情弹窗宽度
            ></CurdComponent>
        );
    }
}
