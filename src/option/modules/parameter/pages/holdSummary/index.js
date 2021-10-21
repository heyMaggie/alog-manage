import React from "react";
import { Upload, message, Button, Icon } from "antd";
import CurdComponent from "@/components/CurdComponent";

const columns = (params) => {
    return [
        {
            title: "用户ID",
            dataIndex: "userId",
            key: "userId",
        },
        {
            title: "证券帐户",
            dataIndex: "accountId",
            key: "accountId",
        },
        {
            title: "证券代码",
            dataIndex: "securityId",
            key: "securityId",
        },
        {
            title: "实时持仓数量",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "当天前的原始持仓的数量",
            dataIndex: "originQty",
            key: "originQty",
            width: "200px",
        },
        {
            title: "当天前的原始持仓的平均开仓价格",
            dataIndex: "originOpenPrice",
            key: "originOpenPrice",
            width: "250px",
        },
        {
            title: "当前可卖持仓数量",
            dataIndex: "freeQty",
            key: "freeQty",
            width: "160px",
        },
        {
            title: "持仓冻结数量",
            dataIndex: "frozenQty",
            key: "frozenQty",
        },
        {
            title: "平均买入价格",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "盈亏",
            dataIndex: "profitAndLoss",
            key: "profitAndLoss",
        },
        {
            title: "收益率",
            dataIndex: "rateOfReturn",
            key: "rateOfReturn",
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
        {
            title: "最后交易所执行编号",
            dataIndex: "lastExecId",
            key: "lastExecId",
            width: "160px",
        },
    ];
};
export default class serverSetting extends React.PureComponent {
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
        window.location.href = window.baseURL + "/holdSummary/download";
    };
    getData = (params) => {
        http.post({
            // url: "/assetInfo/selectList",
            url: "/holdSummary/selectList",
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
            action: window.baseURL + "/holdSummary/upload",
            onChange(info) {
                if (info.file.status !== "uploading") {
                    // console.log(info.file, info.fileList);
                }
                if (info.file.status === "done") {
                    if (info.file.response.code == 10000) {
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
        let scroll = { x: 2000, y: 445 };
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
                            <Icon type="upload" /> 持仓上传
                        </Button>
                    </Upload>
                    <Button type="primary" onClick={this.handleDownload}>
                        <Icon type="download" /> 持仓导出
                    </Button>
                </CurdComponent>
            </div>
        );
    }
}
