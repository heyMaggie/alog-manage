import React from "react";
import CurdComponent from "@/components/CurdComponent";
// import SelectOption from "@/components/SelectOption";
import { Input } from "antd";

const getUpdateFormFields = () => {};
const columns = (params) => {
    return [
        {
            title: "用户ID",
            dataIndex: "uuserId",
            key: "uuserId",
            width: 80,
        },
        {
            title: "证券代码",
            dataIndex: "securityId",
            key: "securityId",
            width: 100,
        },
        {
            title: "业务类型",
            dataIndex: "businessType",
            width: 100,
        },
        {
            title: "母单订单号",
            dataIndex: "algoOrderId",
            width: 120,
        },
        {
            title: "子单订单号",
            dataIndex: "childOrderId",
            width: 120,
        },
        {
            title: "执行编号",
            dataIndex: "execId",
            width: 120,
        },

        {
            title: "订单状态",
            dataIndex: "childOrdStatus",
            width: 120,
        },
        {
            title: "成交价",
            dataIndex: "lastPx",
            width: 120,
        },
        {
            title: "成交数量",
            dataIndex: "lastQty",
            width: 150,
        },
        {
            title: "订单剩余数量",
            dataIndex: "leavesQty",
            width: 150,
        },
        {
            title: "累计执行数量",
            dataIndex: "cumQty",
            width: 120,
        },
        {
            title: "成交时间",
            dataIndex: "transactTime",
            width: 180,
        },
        // {
        //     title: "成交记录ID",
        //     dataIndex: "version",
        //     width: 100,
        // },
    ];
};
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
            url: "/order-deal/list",
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
        let scroll = { x: 1500, y: 445 };
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
                >
                    <div
                        urlPrefix="/order-deal"
                        noUpload={true}
                        title="成交回执"
                        sucCallback={this.getData}
                    ></div>
                </CurdComponent>
            </div>
        );
    }
}
