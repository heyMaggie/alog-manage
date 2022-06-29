import React from "react";
import CurdComponent from "@/components/CurdComponent";
import SelectOption from "@/components/SelectOption";
// import UploadWrap from "@/components/UploadWrap";
import { Input } from "antd";

// const getUpdateFormFields = () => {
//     return []
// };

const columns = (params) => {
    return [
        {
            title: "用户ID",
            dataIndex: "uuserId",
            key: "uuserId",
        },
        {
            title: "股东账户",
            dataIndex: "accountId",
            key: "accountId",
        },
        {
            title: "市场代码",
            dataIndex: "marketValue",
        },
        {
            title: "账户类型",
            dataIndex: "accountTypeValue",
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
        },
    ];
};
const getInsertFormFields = () => {
    return [
        {
            label: "用户ID",
            id: "uuserId",
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
            label: "股东账户",
            id: "accountId",
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
            label: "市场代码",
            id: "market",
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
            label: "账户类型",
            id: "accountType",
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
            label: "用户ID",
            id: "uuserId",
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
            label: "股东账户",
            id: "accountId",
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
            label: "市场代码",
            id: "market",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            // component: (
            //     // <Input placeholder="请输入" readOnly disabled />
            //     <Input placeholder="请输入" />
            // ),
            component: SelectOption(dict.market, {
                placeholder: "请选择",
                allowClear: false,
                style: {
                    width: 183,
                },
            }),
        },
        {
            label: "账户类型",
            id: "accountType",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "IP地址不能为空",
                },
            ],
            component: <Input placeholder="请输入" />,
        },
        // {
        //     label: "网关",
        //     id: "gateway",
        //     rules: [
        //         {
        //             required: true,
        //             message: "网关不能为空",
        //         },
        //         {
        //             message: "请输入正确的IP地址",
        //             pattern:
        //                 /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/,
        //         },
        //     ],
        //     component: <Input placeholder="请输入网关" />,
        // },
        // {
        //     label: "Mac地址",
        //     id: "mac",
        //     initialValue: "",
        //     rules: [
        //         {
        //             required: true,
        //             message: "Mac地址不能为空",
        //         },
        //         {
        //             message: "请输入正确的mac地址,例如：1A-6F-38-C8-A4-07",
        //             pattern: /^([a-f0-9]{2}-){5}[a-f0-9]{2}$/i,
        //         },
        //     ],
        //     component: <Input placeholder="请输入Mac地址" />,
        // },
        // {
        //     label: "子网掩码",
        //     id: "mask",
        //     initialValue: "",
        //     rules: [
        //         {
        //             required: true,
        //             message: "子网掩码不能为空",
        //         },
        //         {
        //             message: "请输入正确的IP地址",
        //             pattern:
        //                 /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/,
        //         },
        //     ],
        //     component: <Input placeholder="请输入子网掩码" />,
        // },
    ];
};
let getSearchFormFields = () => {
    return [
        {
            label: "用户ID",
            id: "uuserId",
            component: <Input placeholder="请输入" />,
        },
        {
            label: "股东账户",
            id: "accountId",
            component: <Input placeholder="请输入" />,
        },
        // {
        //     label: "合约简称",
        //     id: "contractName",
        //     component: <Input placeholder="请输入合约简称" />,
        // },
        // {
        //     label: "合约账户标识",
        //     id: "contractAccountCode",
        //     component: <Input placeholder="请输入合约账户标识" />,
        // },
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

    handleInsertRecord = (params) => {
        console.log("新增接口", params);
        // http.post({
        //     url: "/option/tcp/uoeMore/1011",
        //     data: params,
        // }).then((res) => {
        //     console.log(res);
        //     message.success(res.msg);
        //     this.isAction = true;
        //     this.getData();
        // });
    };
    //更新记录
    handleUpdateRecord = ({ form }) => {
        console.log(form.getFieldsValue());
        // return;
        let params = form.getFieldsValue();
        params.name = this.record.name;
        //发送更新请求
        // http.post({
        //     url: "/option/tcp/uoeMore/1011",
        //     data: params,
        // }).then((res) => {
        //     console.log(res);
        //     message.success(res.msg);
        //     this.isAction = true;
        //     this.getData();
        // });
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
            uuserId: record.uuserId,
            market: record.market + "",
            accountType: record.accountType + "",
            accountId: record.accountId,
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
            url: "/stockHolder/list",
            data: params,
        }).then((res) => {
            console.log(res);
            //解析数据字典
            if (res.data.records && res.data.records.length > 0) {
                //parseDict(res.data.records);
                parseDictValue(res.data.records);
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
                        urlPrefix="/stockHolder"
                        title="股东信息"
                        sucCallback={this.getData}
                    ></div>
                </CurdComponent>
            </div>
        );
    }
}
