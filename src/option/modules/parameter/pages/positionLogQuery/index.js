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
            title: "期权ID",
            dataIndex: "uoptionId",
            width: 100,
        },
        {
            title: "股东账户ID",
            dataIndex: "uaccountId",
            width: 120,
        },
        {
            title: "持仓ID",
            dataIndex: "uposId",
            width: 100,
        },
        {
            title: "用户ID",
            dataIndex: "uuserId",
            width: 100,
        },
        {
            title: "组合策略持仓ID",
            dataIndex: "ustrategy_pos_id",
            width: 150,
        },

        {
            title: "前权利持仓",
            dataIndex: "fromRightsQty",
            width: 150,
        },
        {
            title: "前义务持仓",
            dataIndex: "fromObligQty",
            width: 100,
        },
        {
            title: "前备兑持仓",
            dataIndex: "fromCoverQty",
            width: 150,
        },
        {
            title: "前权利冻结仓",
            dataIndex: "fromRightsFrozenQty",
            width: 100,
        },
        {
            title: "前义务冻结仓",
            dataIndex: "fromObligFrozenQty",
            width: 150,
        },
        {
            title: "前备兑冻结仓",
            dataIndex: "fromCoverFrozenQty",
            width: 100,
        },
        {
            title: "后权利持仓",
            dataIndex: "toRightsQty",
            width: 100,
        },
        {
            title: "后义务持仓",
            dataIndex: "toObligQty",
            width: 100,
        },
        {
            title: "后备兑持仓",
            dataIndex: "toCoverQty",
            width: 100,
        },
        {
            title: "后权利冻结仓",
            dataIndex: "toRightsFrozenQty",
            width: 100,
        },
        {
            title: "后义务冻结仓",
            dataIndex: "toObligFrozenQty",
            width: 100,
        },
        {
            title: "后备兑冻结仓",
            dataIndex: "toCoverFrozenQty",
            width: 100,
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            width: 100,
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
    ];
};
export default class exerciseRecordQuery extends React.PureComponent {
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
            url: "/option/tb-position-log/queryList",
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
                ></CurdComponent>
            </div>
        );
    }
}
