import React from "react";
import CurdComponent from "@/components/CurdComponent";
// import SelectOption from "@/components/SelectOption";
// import UploadWrap from "@/components/UploadWrap";
import { Input } from "antd";

const columns = (params) => {
    return [
        {
            title: "保证金账户",
            dataIndex: "assetAccount",
            width: 120,
        },
        {
            title: "用户ID",
            dataIndex: "id",
            width: 100,
        },
        {
            title: "余额",
            dataIndex: "balance",
            width: 100,
        },
        {
            title: "冻结资金",
            dataIndex: "frozen",
            width: 100,
        },
        {
            title: "实时保证金",
            dataIndex: "marginAmount",
            width: 120,
        },
        {
            title: "注册时间",
            dataIndex: "createTime",
            width: 150,
        },
        {
            title: "更新时间",
            dataIndex: "updateTime",
            width: 150,
        },
        {
            title: "版本号",
            dataIndex: "version",
            width: 100,
        },
    ];
};
let getSearchFormFields = () => {
    return [
        // {
        //     label: "保证金账户",
        //     id: "assetAccount",
        //     component: <Input placeholder="请输入保证金账户" />,
        // },
        {
            label: "用户ID",
            // id: "userId",
            id: "id",
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
        http.post({
            // url: "/option/tb-asset-info/queryList",
            url: "asset-info/list",
            data: params,
        }).then((res) => {
            console.log(res);
            //解析数据字典
            if (res.data.length > 0) {
                parseDict(res.data);
                showTip(this);
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
                        urlPrefix="/asset-info"
                        noUpload={true}
                        title="资金信息"
                        sucCallback={this.getData}
                    ></div>
                </CurdComponent>
            </div>
        );
    }
}
