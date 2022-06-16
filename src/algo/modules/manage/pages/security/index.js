import React from "react";
import CurdComponent from "@/components/CurdComponent";
// import SelectOption from "@/components/SelectOption";
import { Input } from "antd";

const columns = (params) => {
    return [
        {
            title: "证券代码",
            dataIndex: "securityId",
            key: "securityId",
        },
        {
            title: "证券代码源",
            dataIndex: "securityIdSource",
            key: "securityIdSource",
        },
        {
            title: "证券名称",
            dataIndex: "securityName",
            key: "securityName",
        },
        {
            title: "昨收价",
            dataIndex: "prevClosePx",
            key: "prevClosePx",
        },
        {
            title: "证券状态",
            dataIndex: "securityStatus",
            key: "securityStatus",
        },
        {
            title: "股票板块属性",
            dataIndex: "property",
            key: "property",
        },
        {
            title: "限价买数量上限",
            dataIndex: "buyQtyUpperLimit",
            key: "buyQtyUpperLimit",
        },
        {
            title: "限价卖数量上限",
            dataIndex: "sellQtyUpperLimit",
            key: "sellQtyUpperLimit",
        },
        {
            title: "市价买数量上限",
            dataIndex: "marketBuyQtyUpperLimit",
            key: "marketBuyQtyUpperLimit",
        },
        {
            title: "市价卖数量上限",
            dataIndex: "marketSellQtyUpperLimit",
            key: "marketSellQtyUpperLimit",
        },
        {
            title: "是否有涨跌限制",
            dataIndex: "hasPriceLimit",
            key: "hasPriceLimit",
        },
        {
            title: "涨跌限制类型",
            dataIndex: "limitType",
            key: "limitType",
        },
        {
            title: "上涨限价",
            dataIndex: "upperLimitPrice",
            key: "upperLimitPrice",
        },
        {
            title: "下跌限价",
            dataIndex: "lowerLimitPrice",
            key: "lowerLimitPrice",
        },
        {
            title: "更新时间",
            dataIndex: "updateTime",
            key: "updateTime",
        },
    ];
};
let getSearchFormFields = () => {
    return [
        {
            label: "证券代码",
            id: "securityId",
            component: <Input placeholder="请输入" />,
        },
    ];
};
export default class uoeSetting extends React.PureComponent {
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
        // return;
        let params = form.getFieldsValue();
        params.name = this.record.name;
        http.post({
            url: "/option/tcp/uoeMore/1011",
            data: params,
        }).then((res) => {
            console.log(res);
            message.success(res.msg);
            this.isAction = true;
            this.getData();
        });
    };
    //删除记录
    handleDeleteRecord = (record) => {
        console.log("删除记录 ", record);
    };
    //填入更新数据
    setUpdateModal = ({ form, record }) => {
        // console.log(record, form);
        this.record = record;
        form.setFieldsValue({
            switchId: record.switchId,
            ip: record.ip,
            mask: record.mask,
            mac: record.mac,
            gateway: record.gateway,
            enable: record.enable + "",
        });
    };
    getData = (params = {}) => {
        // params.token = "";
        http.get({
            url: "/security/list",
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
        let scroll = { x: 3000, y: 445 };
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
                    // btnText2="查全部"
                    // isShowSearchForm={false}
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
                        urlPrefix="/security"
                        title="证券信息"
                        sucCallback={this.getData}
                    ></div>
                </CurdComponent>
            </div>
        );
    }
}
