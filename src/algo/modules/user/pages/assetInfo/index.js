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
            width: 150,
        },
        {
            title: "用户ID",
            dataIndex: "id",
            width: 150,
        },
        {
            title: "余额",
            dataIndex: "balance",
            width: 150,
        },
        {
            title: "冻结资金",
            dataIndex: "frozen",
            width: 150,
        },
        {
            title: "实时保证金",
            dataIndex: "marginAmount",
            width: 150,
        },
        {
            title: "注册时间",
            dataIndex: "createTime",
            // width: 200,
        },
        {
            title: "更新时间",
            dataIndex: "updateTime",
            // width: 200,
        },
        // {
        //     title: "资金版本号",
        //     dataIndex: "vers",
        //     width: 100,
        // },
        {
            title: "版本号",
            dataIndex: "version",
            width: 120,
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
            // label: "用户ID",
            label: <span>用&nbsp;&nbsp;户&nbsp;ID</span>,
            // id: "userId",
            id: "id",
            component: <Input placeholder="请输入" />,
        },
    ];
};
const getInsertFormFields = () => {
    return [
        {
            label: "保证金账户",
            id: "assetAccount",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
                {
                    validator: checkLength(32),
                    trigger: ["change", "blur"],
                },
            ],
            component: <Input placeholder="请输入" />,
        },
        {
            label: "用户ID",
            id: "id",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
                {
                    validator: checkLength(10),
                    trigger: ["change", "blur"],
                },
            ],
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
        },
        {
            label: "余额",
            id: "balance",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
                {
                    validator: checkLength(20),
                    trigger: ["change", "blur"],
                },
            ],
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
        },
        {
            label: "冻结资金",
            id: "frozen",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
                {
                    validator: checkLength(20),
                    trigger: ["change", "blur"],
                },
            ],
            component: <Input placeholder="请输入" />,
        },
        {
            label: "实时保证金",
            id: "marginAmount",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
                {
                    validator: checkLength(20),
                    trigger: ["change", "blur"],
                },
            ],
            component: <Input placeholder="请输入" />,
        },
    ];
};
const getUpdateFormFields = () => {
    return [
        {
            label: "保证金账户",
            id: "assetAccount",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
                {
                    validator: checkLength(32),
                    trigger: ["change", "blur"],
                },
            ],
            component: <Input placeholder="请输入" />,
        },
        {
            label: "用户ID",
            id: "id",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
                {
                    validator: checkLength(10),
                    trigger: ["change", "blur"],
                },
            ],
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
        },
        {
            label: "余额",
            id: "balance",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
                {
                    validator: checkLength(20),
                    trigger: ["change", "blur"],
                },
            ],
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
        },
        {
            label: "冻结资金",
            id: "frozen",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
                {
                    validator: checkLength(20),
                    trigger: ["change", "blur"],
                },
            ],
            component: <Input placeholder="请输入" />,
        },
        {
            label: "实时保证金",
            id: "marginAmount",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
                {
                    validator: checkLength(20),
                    trigger: ["change", "blur"],
                },
            ],
            component: <Input placeholder="请输入" />,
        },
        {
            label: "注册时间",
            id: "createTime",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" readOnly disabled />
            ),
        },
        {
            label: "更新时间",
            id: "updateTime",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" readOnly disabled />
            ),
        },
        {
            label: "版本号",
            id: "version",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: <Input placeholder="请输入" readOnly disabled />,
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
            Id: fromData.id / 1,
            AssetAccount: fromData.assetAccount,
            Balance: fromData.balance / 1,
            Frozen: fromData.frozen / 1,
            MarginAmount: fromData.marginAmount / 1,
        };
        http.post({
            url: "/asset-info/addAssetInfo",
            data: params,
        }).then((res) => {
            let msg = res.message;
            if (res.code == 0) {
                message.success(msg);
                // this.getData();
            } else if (res.code == 20000) {
                message.error(
                    msg.substring(msg.indexOf("[") + 1, msg.lastIndexOf("]"))
                );
            } else {
                message.error(msg);
            }
            this.isAction = true;
        });
    };
    //更新记录
    handleUpdateRecord = ({ form }) => {
        console.log(form.getFieldsValue());
        // return;
        let fromData = form.getFieldsValue();
        let params = {
            Id: fromData.id / 1,
            AssetAccount: fromData.assetAccount,
            Balance: fromData.balance / 1,
            Frozen: fromData.frozen / 1,
            MarginAmount: fromData.marginAmount / 1,
        };
        // 发送更新请求
        http.post({
            url: "/asset-info/updateAssetInfo",
            data: params,
        }).then((res) => {
            let msg = res.message;
            if (res.code == 0) {
                message.success(msg);
                // this.getData();
            } else if (res.code == 20000) {
                message.error(
                    msg.substring(msg.indexOf("[") + 1, msg.lastIndexOf("]"))
                );
            } else {
                message.error(msg);
            }
            this.isAction = true;
        });
    };
    //填入更新数据
    setUpdateModal = ({ form, record }) => {
        // console.log(record, form);
        this.record = record;
        form.setFieldsValue({
            assetAccount: record.assetAccount,
            id: record.id,
            balance: record.balance,
            frozen: record.frozen,
            marginAmount: record.marginAmount,
            createTime: record.createTime,
            updateTime: record.updateTime,
            version: record.version,
        });
    };
    getData = (params = {}, pagination = { current: 1, pageSize: 13 }) => {
        // params.token = "";
        params = {
            ...params,
            pageId: pagination.current,
            pageNum: pagination.pageSize,
        };
        http.post({
            // url: "/option/tb-asset-info/queryList",
            url: "asset-info/list",
            data: params,
        }).then((res) => {
            console.log(res);
            //解析数据字典
            if (res.data.records && res.data.records.length > 0) {
                parseDict(res.data.records);
                // showTip(this);
            } else {
                message.info("查询结果为空");
            }
            let pgn = {
                current: res.data.current,
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
        let scroll = { x: 900, y: 445 };
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
