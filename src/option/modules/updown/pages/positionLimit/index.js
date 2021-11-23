import React from "react";
import { Upload, message, Button, Icon } from "antd";
import CurdComponent from "@/components/CurdComponent";

const columns = (params) => {
    return [
        {
            title: "标的物ID",
            dataIndex: "usecurityId",
            key: "usecurityId",
        },
        {
            title: "股东账户ID",
            dataIndex: "uaccountId",
            key: "uaccountId",
        },
        {
            title: "持仓等级",
            dataIndex: "posLevel",
            key: "posLevel",
        },
        {
            title: "单权利仓持仓限额",
            dataIndex: "rightsPosLimitQty",
            key: "rightsPosLimitQty",
        },
        {
            title: "总持仓限额",
            dataIndex: "positionLimitQty",
            key: "positionLimitQty",
        },
        {
            title: "单日买入开仓限额",
            dataIndex: "dayBuyLimitQty",
            key: "dayBuyLimitQty",
            width: 200,
        },
    ];
};
export default class positionLimitUpdown extends React.PureComponent {
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
        window.location.href = window.baseURL + "/positionLimit/download";
    };
    getData = (params) => {
        http.get({
            // url: "/assetInfo/selectList",
            url: "/positionLimit/selectList",
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
            accept: ".xml",
            showUploadList: false,
            action: window.baseURL + "/positionLimit/upload",
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
                            <Icon type="upload" /> 持仓限额上传
                        </Button>
                    </Upload>
                    <Button type="primary" onClick={this.handleDownload}>
                        <Icon type="download" /> 持仓限额导出
                    </Button>
                </CurdComponent>
            </div>
        );
    }
}
