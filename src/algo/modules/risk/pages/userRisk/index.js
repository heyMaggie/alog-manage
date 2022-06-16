import React from "react";
import { Input, TimePicker } from "antd";

import CurdComponent from "@/components/CurdComponent";
// import SelectOption from "@/components/SelectOption";

let getSearchFormFields = () => {
    return [
        {
            label: "用户ID",
            id: "id",
            component: <Input placeholder="请输入" />,
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
            title: "用户ID",
            dataIndex: "id",
            width: 150,
        },
        {
            title: "子单买订单总条数",
            dataIndex: "buyItemTotal",
            width: 200,
        },
        {
            title: "子单卖订单总条数",
            dataIndex: "sellItemTotal",
            width: 200,
        },
        {
            title: "子单买订单成功条数",
            dataIndex: "buyItemCount",
            width: 200,
        },
        {
            title: "子单卖订单成功条数",
            dataIndex: "sellItemCount",
            width: 200,
        },
        {
            title: "累计成交买订单条数",
            dataIndex: "buyItemCum",
            width: 200,
        },
        {
            title: "累计成交卖订单条数",
            dataIndex: "sellItemCum",
            width: 200,
        },
        {
            title: "子单买撤单条数",
            dataIndex: "buyCancelItemCount",
            width: 200,
        },
        {
            title: "子单卖撤单条数",
            dataIndex: "sellCancelItemCount",
            width: 200,
        },
        {
            title: "累计买撤单成功条数",
            dataIndex: "buyCancelledItemCum",
            width: 200,
        },
        {
            title: "累计卖撤单成功条数",
            dataIndex: "sellCancelledItemCum",
            width: 200,
        },
        {
            title: "风控自成交子单数计数",
            dataIndex: "selfExecCount",
            width: 200,
        },
        {
            title: "成功下单的买入总委托金额",
            dataIndex: "buySuccAmount",
            width: 200,
        },
        {
            title: "成功下单的卖出总委托金额",
            dataIndex: "sellSuccAmount",
            width: 200,
        },
        {
            title: "成功撤单的买入总委托金额",
            dataIndex: "cancelBuySuccAmount",
            width: 200,
        },
    ];
};
let dtColumns = () => {
    return columns();
};
export default class userRisk extends React.PureComponent {
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
        http.post({
            url: "/user-risk-statistics/list",
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
                // rowKey="sno"
                // pagination={this.state.pagination}
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
            >
                <div
                    urlPrefix="/user-risk-statistics"
                    noUpload={true}
                    title="用户风险"
                    sucCallback={this.getData}
                ></div>
            </CurdComponent>
        );
    }
}
