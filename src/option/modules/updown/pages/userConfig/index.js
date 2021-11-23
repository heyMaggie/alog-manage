import React from "react";
import { Upload, message, Button, Icon } from "antd";
import CurdComponent from "@/components/CurdComponent";

const columns = (params) => {
    return [
        {
            title: "股东账户ID",
            dataIndex: "uaccountId",
            key: "uaccountId",
        },
        {
            title: "交易单元",
            dataIndex: "upbuId",
            key: "upbuId",
        },
        {
            title: "申报交易单元",
            dataIndex: "submitPbuId",
            key: "submitPbuId",
        },
        {
            title: "订单所有者类型",
            dataIndex: "ownerType",
            key: "ownerType",
        },
        {
            title: "结算机构代码",
            dataIndex: "clearingFirm",
            key: "clearingFirm",
        },
        {
            title: "营业分支代码",
            dataIndex: "branchId",
            key: "branchId",
        },
        {
            title: "订单限定-orderRestrictions",
            dataIndex: "orderRestrict",
            key: "orderRestrict",
        },
        {
            title: "订单限定-orderRestrictions",
            dataIndex: "orderRestrictions",
            key: "orderRestrictions",
        },
        {
            title: "版本号",
            dataIndex: "vers",
            key: "vers",
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
export default class userConfig extends React.PureComponent {
    state = {
        searchLoading: false,
        info: [],
    };
    //获取搜索栏数据
    handleSearch = (params) => {
        // console.log("获取搜索栏数据", params);
        this.getData(params);
    };
    handleDownload = () => {
        window.location.href = window.baseURL + "/tb-user-config/download";
    };
    getData = (params) => {
        http.get({
            // url: "/assetInfo/selectList",
            url: "/tb-user-config/selectList",
            data: params,
        }).then((res) => {
            console.log(res);
            //解析数据字典
            if (res.data.length > 0) {
                parseDict(res.data);
                this.setState({
                    info: res.data,
                });
            } else {
                message.info("查询结果为空");
            }
        });
    };
    componentDidMount() {
        this.getData();
    }
    render() {
        let that = this;
        let props = {
            name: "file",
            // accept: ".xlsx",
            accept: ".xml",
            showUploadList: false,
            action: window.baseURL + "/tb-user-config/upload",
            onChange(info) {
                if (info.file.status !== "uploading") {
                    // console.log(info.file, info.fileList);
                }
                if (info.file.status === "done") {
                    if (info.file.response.code == 0) {
                        message.success(`${info.file.name} 上传成功`);
                        that.getData();
                    } else {
                        message.error(`${info.file.response.message}`);
                    }
                } else if (info.file.status === "error") {
                    message.error(`${info.file.name} 上传失败`);
                }
            },
        };
        let scroll = { x: 1000, y: 445 };
        let info = this.state.info;
        return (
            <div>
                <CurdComponent
                    rowKey={"id"}
                    isShowSearchForm={false}
                    // onSearchClick={this.handleSearch}
                    // getSearchFormFields={this.state.formArr}
                    // getSearchFormFields={getSearchFormFields}
                    // searchLoading={this.state.searchLoading}
                    hasSlot={true}
                    // insertBtnText={"文件上传"} // 不传 就没新增按钮
                    // getInsertFormFields={getInsertFormFields}
                    // insertRecord={this.handleInsertRecord}
                    // col="2"
                    // width="600px"
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
                    <Upload {...props}>
                        <Button type="primary">
                            <Icon type="upload" /> 用户配置上传
                        </Button>
                    </Upload>
                    <Button type="primary" onClick={this.handleDownload}>
                        <Icon type="download" /> 用户配置导出
                    </Button>
                </CurdComponent>
            </div>
        );
    }
}
