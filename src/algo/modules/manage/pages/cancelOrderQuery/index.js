import React from "react";
import CurdComponent from "@/components/CurdComponent";
// import SelectOption from "@/components/SelectOption";
import { Input } from "antd";

const getUpdateFormFields = () => {};
const columns = (params) => {
    return [
        // {
        //     title: "股东账户ID",
        //     dataIndex: "uaccountId",
        //     width: 100,
        // },
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
            title: "取消标志",
            dataIndex: "cancelFlag",
            width: 120,
        },
        {
            title: "原始订单号",
            dataIndex: "origAlgoOrderId",
            width: 120,
        },
        {
            title: "证券代码",
            dataIndex: "origAlgoOrderId",
            width: 120,
        },
        {
            title: "撤单订单状态",
            dataIndex: "algoOrdStatus",
            width: 120,
        },
        {
            title: "母单在篮子表中的状态",
            dataIndex: "basketStatus",
            width: 150,
        },
        {
            title: "请求用户ID",
            dataIndex: "reqUserId",
            width: 150,
        },
        {
            title: "错误码",
            dataIndex: "errorCode",
            width: 150,
        },
        {
            title: "错误信息",
            dataIndex: "errorMsg",
            width: 100,
        },
        {
            title: "客户端序列号",
            dataIndex: "seq",
            width: 150,
        },
        {
            title: "交易时间",
            dataIndex: "transactTime",
            width: 150,
        },
       
    ];
};
// console.log(columns().length);
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
            label: "原始订单编号",
            id: "origClOrdId",
            component: <Input placeholder="请输入原始订单编号" />,
        },
    ];
};
export default class cancelOrderQuery extends React.PureComponent {
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
            url: "/cancel-algo-order/list",
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
                    isShowSearchForm={false}
                    // btnText2="查全部"
                    // onSearchClick={this.handleSearch}
                    // getSearchFormFields={getSearchFormFields}
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
