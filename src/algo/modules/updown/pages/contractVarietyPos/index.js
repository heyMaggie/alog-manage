import React from "react";
import { Upload, message, Button, Icon } from "antd";
import CurdComponent from "@/components/CurdComponent";

const columns = (params) => {
    return [
        {
            title: "事务ID",
            dataIndex: "txId",
            key: "txId",
        },
        {
            title: "标的物ID",
            dataIndex: "usecurityId",
            key: "usecurityId",
        },
        {
            title: "持仓限额ID",
            dataIndex: "uposLimitId",
            key: "uposLimitId",
        },
        {
            title: "股东账户ID",
            dataIndex: "uaccountId",
            key: "uaccountId",
        },
        {
            title: "权利仓持仓",
            dataIndex: "rightsPosQty",
            key: "rightsPosQty",
        },
        {
            title: "总持仓",
            dataIndex: "positionQty",
            key: "positionQty",
        },
        {
            title: "单日买入量",
            dataIndex: "dayBuyQty",
            key: "dayBuyQty",
        },
    ];
};
export default class contractVarietyPos extends React.PureComponent {
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
        window.location.href =
            window.baseURL + "/tb-contract-variety-pos/download";
    };
    getData = (params) => {
        http.request({
            // url: "/option/assetInfo/selectList",
            method: "post",
            url: "/tb-contract-variety-pos/selectList",
            // baseURL: window.baseURL.replace("/option", ""),
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
            action:
                window.baseURL.replace("/option", "") +
                "/tb-contract-variety-pos/upload",
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
                    dtColumns={columns()}
                    // rowSelection={rowSelection} //批量选择 操作
                >
                    <Upload {...props}>
                        <Button type="primary">
                            <Icon type="upload" /> 合约品种持仓上传
                        </Button>
                    </Upload>
                    <Button type="primary" onClick={this.handleDownload}>
                        <Icon type="download" /> 合约品种持仓导出
                    </Button>
                </CurdComponent>
            </div>
        );
    }
}
