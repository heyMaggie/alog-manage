import React from "react";
import CurdComponent from "@/components/CurdComponent";
import SelectOption from "@/components/SelectOption";
import { Input, Modal } from "antd";

const getUpdateFormFields = () => {
    return [
        {
            label: "交换机编号",
            id: "switchId",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "交换机编号地址不能为空",
                },
            ],
            component: (
                <Input placeholder="请输入交换机编号" readOnly disabled />
            ),
        },
        {
            label: "IP地址",
            id: "ip",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "IP地址不能为空",
                },
            ],
            component: <Input placeholder="请输入IP地址" />,
        },
        {
            label: "网关",
            id: "gateway",
            rules: [
                {
                    required: true,
                    message: "网关不能为空",
                },
                {
                    message: "请输入正确的IP地址",
                    pattern:
                        /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/,
                },
            ],
            component: <Input placeholder="请输入网关" />,
        },
        {
            label: "Mac地址",
            id: "mac",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "Mac地址不能为空",
                },
                {
                    message: "请输入正确的mac地址,例如：1A-6F-38-C8-A4-07",
                    pattern: /^([a-f0-9]{2}-){5}[a-f0-9]{2}$/i,
                },
            ],
            component: <Input placeholder="请输入Mac地址" />,
        },
        {
            label: "子网掩码",
            id: "mask",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "子网掩码不能为空",
                },
                {
                    message: "请输入正确的IP地址",
                    pattern:
                        /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/,
                },
            ],
            component: <Input placeholder="请输入子网掩码" />,
        },
        // {
        //     label: "使能状态",
        //     id: "enable",
        //     initialValue: "",
        //     rules: [
        //         {
        //             required: true,
        //             message: "使能状态不能为空",
        //         },
        //     ],
        //     component: SelectOption(dict.enable),
        // },
    ];
};

let getSearchFormFields = () => {
    return [
        {
            label: "父级用户ID",
            id: "fatherId",
            component: <Input placeholder="请输入父级用户ID" />,
        },
        {
            label: "用户ID",
            id: "userId",
            component: <Input placeholder="请输入用户ID" />,
        },
        {
            label: "用户类型",
            id: "userType",
            // initialValue: "",
            component: SelectOption(dict.userType, {
                placeholder: "请选择用户类型",
                allowClear: true,
                style: {
                    width: 183,
                },
            }),
        },
        {
            label: "用户风控组别",
            id: "riskGroup",
            component: <Input placeholder="请输入用户风控组别" />,
        },
        {
            label: "柜台用户ID",
            id: "counterUserId",
            component: <Input placeholder="请输入柜台用户ID" />,
        },
        {
            label: "业务类型",
            id: "businessType",
            component: SelectOption(dict.businessType, {
                placeholder: "请选择业务类型",
                allowClear: true,
            }),
        },
    ];
};
export default class userInfo extends React.PureComponent {
    state = {
        searchLoading: false,
        selectRow: [],
        info: [],
        updateModalVisible: false,
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
    columns = (params) => {
        return [
            {
                title: "父级用户ID",
                dataIndex: "fatherId",
            },
            {
                title: "用户ID",
                dataIndex: "userId",
            },
            {
                title: "用户名",
                dataIndex: "userName",
                key: "userName",
            },
            {
                title: "用户类型",
                dataIndex: "userType",
                key: "userType",
            },
            {
                title: "用户风控组别",
                dataIndex: "riskGroup",
                width: 120,
            },
            {
                title: "柜台用户ID",
                dataIndex: "counterUserId",
            },
            {
                title: "业务类型",
                dataIndex: "businessType",
            },
            {
                title: "登录状态",
                dataIndex: "loginStatus",
            },
            {
                title: "注册时间",
                dataIndex: "createTime",
                key: "createTime",
            },
            {
                title: "操作",
                key: "operation",
                fixed: "right",
                width: 100,
                render: () => <a onClick={this.handleUpdate}>编辑</a>,
            },
        ];
    };
    //更新记录
    handleUpdate = () => {
        console.log("更新记录");
        this.setState({
            updateModalVisible: true,
        });
    };
    handleUpdateModalOk = () => {
        this.setState({
            updateModalVisible: false,
        });
    };
    handleUpdateModalCancel = () => {
        this.setState({
            updateModalVisible: false,
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
        http.post({
            // url: "/option/assetInfo/selectList",
            url: "/user/selectByCondition",
            data: params,
        }).then((res) => {
            console.log(res);
            //解析数据字典
            if (res.data.length > 0) {
                parseDict(res.data);
            } else {
                message.info("查询结果为空");
            }
            this.setState({
                info: res.data,
            });
        });
    };
    handleSearch = (params) => {
        console.log(params);
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
                    getUpdateFormFields={getUpdateFormFields}
                    setUpdateModal={this.setUpdateModal}
                    // updateRecord={this.handleUpdateRecord} // 不传 就没编辑
                    // deleteRecord={this.handleDeleteRecord} // 不传 就没删除
                    centered={true}
                    columns={this.columns}
                    dataSource={info}
                    scroll={scroll}
                    // rowSelection={rowSelection} //批量选择 操作
                ></CurdComponent>
                <Modal
                    title="修改记录"
                    visible={this.state.updateModalVisible}
                    onOk={this.handleUpdateModalOk}
                    onCancel={this.handleUpdateModalCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        );
    }
}
