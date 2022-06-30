import React from "react";
import CurdComponent from "@/components/CurdComponent";
// import SelectOption from "@/components/SelectOption";
import { Input } from "antd";

const columns = (params) => {
    return [
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: "券商编码",
            dataIndex: "brokerCode",
            key: "brokerCode",
        },
        {
            title: "支持业务类型",
            dataIndex: "supportTypeValue",
        },
        {
            title: "柜台地址",
            dataIndex: "gwAddr",
            key: "gwAddr",
        },
        {
            title: "柜台版本号",
            dataIndex: "version",
            key: "version",
        },
        {
            title: "柜台状态",
            dataIndex: "statusValue",
        },
    ];
};
const getSearchFormFields = () => {
    return [
        {
            label: "柜台地址",
            id: "gwAddr",
            component: <Input placeholder="请输入" />,
        },
    ];
};
const getInsertFormFields = () => {
    return [
        {
            label: "券商编码",
            id: "brokerCode",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
        },
        {
            label: "支持业务类型",
            id: "supportType",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
        },
        {
            label: "柜台地址",
            id: "gwAddr",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "IP地址不能为空",
                },
            ],
            component: <Input placeholder="请输入" />,
        },
        {
            label: "柜台版本号",
            id: "version",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
        },
        {
            label: "柜台状态",
            id: "status",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "IP地址不能为空",
                },
            ],
            component: <Input placeholder="请输入" />,
        },
    ];
};
const getUpdateFormFields = () => {
    return [
        {
            label: "ID",
            id: "id",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: <Input placeholder="请输入" />,
        },
        {
            label: "券商编码",
            id: "brokerCode",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
        },
        {
            label: "支持业务类型",
            id: "supportType",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
        },
        {
            label: "柜台地址",
            id: "gwAddr",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "IP地址不能为空",
                },
            ],
            component: <Input placeholder="请输入" />,
        },
        {
            label: "柜台版本号",
            id: "version",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
        },
        {
            label: "柜台状态",
            id: "status",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "IP地址不能为空",
                },
            ],
            component: <Input placeholder="请输入" />,
        },
    ];
};
export default class uoeSetting extends React.PureComponent {
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

    handleInsertRecord = (fromData) => {
        console.log("新增接口", fromData);
        let params = {
            BrokerCode: fromData.brokerCode,
            BrokerName: fromData.brokerName,
            SupportType: fromData.supportType / 1,
            GwAddr: fromData.gwAddr,
            Version: fromData.version,
            Status: fromData.status / 1,
        };
        http.post({
            url: "/counter-info/addCounterInfo",
            data: params,
        }).then((res) => {
            if (res.code == 0) {
                message.success(res.message);
                this.isAction = true;
                this.getData();
            } else {
                message.error("新增柜台信息失败");
                this.isAction = true;
            }
        });
    };
    //更新记录
    handleUpdateRecord = ({ form }) => {
        console.log(form.getFieldsValue());
        // return;
        let fromData = form.getFieldsValue();
        let params = {
            BrokerCode: fromData.brokerCode,
            BrokerName: fromData.brokerName,
            SupportType: fromData.supportType / 1,
            GwAddr: fromData.gwAddr,
            Version: fromData.version,
            Status: fromData.status / 1,
        };
        // 发送更新请求
        http.post({
            url: "/counter-info/updateCounterInfo",
            data: params,
        }).then((res) => {
            if (res.code == 0) {
                message.success(res.message);
                this.isAction = true;
                this.getData();
            } else {
                message.error("新增柜台信息失败");
                this.isAction = true;
            }
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
            id: record.id,
            brokerCode: record.brokerCode,
            supportType: record.supportType / 1,
            gwAddr: record.gwAddr,
            version: record.version,
            status: record.status / 1,
        });
    };
    getData = (params = {}, pagination = { current: 1, pageSize: 11 }) => {
        params = {
            ...params,
            pageId: pagination.current,
            pageNum: pagination.pageSize,
        };
        http.post({
            // url: "/option/assetInfo/selectList",
            url: "/counter/list",
            data: params,
        }).then((res) => {
            console.log(res);
            //解析数据字典
            if (res.data.records && res.data.records.length > 0) {
                parseArrDictValue(res.data.records, "status", "counterStatus");
                parseArrDictValue(
                    res.data.records,
                    "supportType",
                    "supportType"
                );
            } else {
                message.info("查询结果为空");
            }
            let pgn = {
                current: pagination.current,
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
        let scroll = { x: 1200, y: 445 };
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
                    insertBtnText={"新增"} // 不传 就没新增按钮
                    getInsertFormFields={getInsertFormFields}
                    insertRecord={this.handleInsertRecord}
                    // col="2"
                    width="600px"
                    pagination={this.state.pagination}
                    getUpdateFormFields={getUpdateFormFields}
                    setUpdateModal={this.setUpdateModal}
                    updateRecord={this.handleUpdateRecord} // 不传 就没编辑
                    // deleteRecord={this.handleDeleteRecord} // 不传 就没删除
                    centered={true}
                    columns={columns}
                    dataSource={info}
                    scroll={scroll}
                    // rowSelection={rowSelection} //批量选择 操作
                >
                    <div
                        urlPrefix="/counter"
                        // noUpload={true}
                        title="柜台信息"
                        sucCallback={this.getData}
                    ></div>
                </CurdComponent>
            </div>
        );
    }
}
