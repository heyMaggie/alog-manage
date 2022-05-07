import React from "react";
import CurdComponent from "@/components/CurdComponent";
// import SelectOption from "@/components/SelectOption";
import { Input, Modal, Radio, Form, message, Switch } from "antd";
import styles from "./style.module.less";

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
            id: "user_id",
            component: <Input placeholder="请输入用户ID" />,
        },
    ];
};
const getUpdateFormFields = () => {
    return [
        {
            label: "用户ID",
            id: "userId",
            component: <Input readOnly disabled />,
        },
        {
            label: "用户名",
            id: "userName",
            component: <Input readOnly disabled />,
        },
        {
            label: "柜台网关Id",
            id: "counterGwId",
            rules: [
                {
                    required: true,
                    message: "柜台网关Id不能为空",
                },
            ],
            component: <Input placeholder="请输入交换机编号" />,
        },
        {
            label: "来自柜台",
            id: "counterUserId",
            component: <Input readOnly disabled />,
        },
        {
            label: "业务类型",
            id: "businessType",
            component: <Input readOnly disabled />,
        },
        {
            label: "登录状态",
            id: "loginStatus",
            component: <Input readOnly disabled />,
        },
        {
            label: "客户类型",
            id: "clientType",
            component: <Input readOnly disabled />,
        },
        {
            label: "算法平台用户Id",
            id: "uuserId",
            component: <Input readOnly disabled />,
        },
        {
            label: "创建时间",
            id: "createTime",
            component: <Input readOnly disabled />,
        },
    ];
};
class CounterGw extends React.PureComponent {
    columns = (params) => {
        return [
            {
                title: "用户ID",
                dataIndex: "userId",
            },
            {
                title: "用户名",
                dataIndex: "userName",
            },
            {
                title: "柜台网关Id",
                dataIndex: "counterGwId",
            },
            {
                title: "来自柜台",
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
                title: "客户类型",
                dataIndex: "clientType",
            },
            {
                title: "算法平台用户Id",
                dataIndex: "uuserId",
                width: 150,
            },
            {
                title: "创建时间",
                dataIndex: "createTime",
            },
        ];
    };

    state = {
        searchLoading: false,
        selectRow: [],
        info: [],
        updateModalVisible: false,
        riskGroup: [],
        userRiskConfig: {},
    };
    //填入更新数据
    setUpdateModal = ({ form, record }) => {
        // console.log(record, form);
        this.record = record;
        form.setFieldsValue({
            userId: record.userId,
            userName: record.userName,
            counterGwId: record.counterGwId,
            counterUserId: record.counterUserId,
            businessType: record.businessType,
            loginStatus: record.loginStatus,
            clientType: record.clientType,
            uuserId: record.uuserId,
            createTime: record.createTime,
        });
    };
    getData = (params = {}) => {
        // params.token = "";
        http.get({
            url: "/counter-user-info/list",
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
    //更新记录
    handleUpdateRecord = ({ form }) => {
        let formData = form.getFieldsValue();
        let params = {};
        params.UuserId = this.record.uuserId;
        params.BusinessType = 1;
        let dataArr = this.record.businessType.split("-");
        console.log(dataArr);
        if (dataArr.length == 2) {
            params.BusinessType = dataArr[0] / 1;
        }
        params.GwId = formData.counterGwId / 1;
        console.log("更新记录", params);
        // return;
        http.post({
            url: "/counter-user-info/updateUserCounterGw",
            data: params,
        }).then((res) => {
            console.log(res);
            this.isAction = true;
            //解析数据字典
            if (res.code == 0) {
                message.success("修改柜台网关Id成功");
                this.getData();
            } else {
                message.error("修改柜台网关Id失败");
            }
        });
    };
    componentDidMount() {
        this.getData();
    }
    render() {
        let scroll = { x: 1000, y: 445 };
        let info = this.state.info;
        let { getFieldDecorator } = this.props.form;
        let labelCol = {
            xs: 12,
        };
        let wrapperCol = {
            xs: 24 - labelCol.xs,
        };
        let formItemLayout = {
            labelCol,
            wrapperCol,
        };
        return (
            <div>
                <CurdComponent
                    // rowKey={"index"}
                    // btnText2="查全部"
                    isShowSearchForm={false}
                    // onSearchClick={this.handleSearch}
                    // getSearchFormFields={getSearchFormFields}
                    // searchLoading={this.state.searchLoading}
                    // insertBtnText={"新增UOE配置"} // 不传 就没新增按钮
                    // getInsertFormFields={getInsertFormFields}
                    // insertRecord={this.handleInsertRecord}
                    // col="2"
                    width="600px"
                    updateModalText="修改柜台网关Id"
                    getUpdateFormFields={getUpdateFormFields}
                    setUpdateModal={this.setUpdateModal}
                    updateRecord={this.handleUpdateRecord} // 不传 就没编辑
                    // deleteRecord={this.handleDeleteRecord} // 不传 就没删除
                    centered={true}
                    columns={this.columns}
                    dataSource={info}
                    scroll={scroll}
                    // rowSelection={rowSelection} //批量选择 操作
                ></CurdComponent>
            </div>
        );
    }
}
export default Form.create()(CounterGw);
