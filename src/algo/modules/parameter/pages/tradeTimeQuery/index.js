import React from "react";
import CurdComponent from "@/components/CurdComponent";
// import SelectOption from "@/components/SelectOption";
import { Input } from "antd";

const getUpdateFormFields = () => {};
// let getSearchFormFields = () => {
//     return [
//         // {
//         //     label: "期权编码",
//         //     id: "optionId",
//         //     component: <Input placeholder="请输入期权编码" />,
//         // },
//         {
//             label: "交易时间组",
//             id: "tradeTimeGroup",
//             component: <Input placeholder="请输入交易时间组" />,
//         },
//         // {
//         //     label: "订单号",
//         //     id: "clOrdId",
//         //     component: <Input placeholder="请输入订单号" />,
//         // },
//     ];
// };
const columns = (params) => {
    return [
        {
            title: "id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "交易时间组",
            dataIndex: "tradeTimeGroup",
            key: "tradeTimeGroup",
        },
        {
            title: "开始时间",
            dataIndex: "startTime",
            key: "startTime",
        },
        {
            title: "结束时间",
            dataIndex: "stopTime",
            key: "stopTime",
        },
        {
            title: "交易时间类型",
            dataIndex: "timeType",
            key: "timeType",
        },
        {
            title: "交易类型",
            dataIndex: "tradeType",
            key: "tradeType",
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
        },
        {
            title: "更新时间",
            dataIndex: "updateTime",
            key: "updateTime",
        },
    ];
};

export default class tradeTimeQuery extends React.PureComponent {
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
            url: "/option/tb-trade-time/selectList",
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
                    onSearchClick={this.handleSearch}
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
