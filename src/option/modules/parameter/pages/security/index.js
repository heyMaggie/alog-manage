import React from "react";
import { Upload, message, Button, Icon } from "antd";
import CurdComponent from "@/components/CurdComponent";

const columns = (params) => {
    return [
        {
            title: "证券代码",
            dataIndex: "securityID",
            key: "securityID",
        },
        {
            title: "证券代码源",
            dataIndex: "securityIDSource",
            key: "securityIDSource",
        },
        {
            title: "证券名称",
            dataIndex: "securityName",
            key: "securityName",
        },
        {
            title: "昨收价",
            dataIndex: "preClosePx",
            key: "preClosePx",
        },
        {
            title: "证券状态",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "限价买数量上限",
            dataIndex: "buyQtyUpperLimit",
            key: "buyQtyUpperLimit",
        },
        {
            title: "限价卖数量上限",
            dataIndex: "sellQtyUpperLimit",
            key: "sellQtyUpperLimit",
        },
        {
            title: "市价买数量上限",
            dataIndex: "marketBuyQtyUpperLimit",
            key: "marketBuyQtyUpperLimit",
        },
        {
            title: "市价卖数量上限",
            dataIndex: "marketSellQtyUpperLimit",
            key: "marketSellQtyUpperLimit",
        },
        {
            title: "限价买数量单位",
            dataIndex: "buyQtyUint",
            key: "buyQtyUint",
        },
        {
            title: "限价卖数量单位",
            dataIndex: "sellQtyUint",
            key: "sellQtyUint",
        },
        {
            title: "市价买数量单位",
            dataIndex: "marketBuyQtyUint",
            key: "marketBuyQtyUint",
        },
        {
            title: "市价卖数量单位",
            dataIndex: "marketSellQtyUint",
            key: "marketSellQtyUint",
        },
        {
            title: "是否有涨跌限制",
            dataIndex: "hasPriceLimit",
            key: "hasPriceLimit",
        },
        {
            title: "涨跌限制类型",
            dataIndex: "limitType",
            key: "limitType",
        },
        {
            title: "上涨幅度",
            dataIndex: "limitUpRate",
            key: "limitUpRate",
        },
        {
            title: "下跌幅度",
            dataIndex: "limitDownRate",
            key: "limitDownRate",
        },
        {
            title: "上涨限价",
            dataIndex: "limitUpAbsolute",
            key: "limitUpAbsolute",
        },
        {
            title: "下跌限价",
            dataIndex: "limitDownAbsolute",
            key: "limitDownAbsolute",
        },
        {
            title: "上涨限价计算值",
            dataIndex: "upperLimitPrice",
            key: "upperLimitPrice",
        },
        {
            title: "下跌限价计算值",
            dataIndex: "lowerLimitPrice",
            key: "lowerLimitPrice",
        },
        {
            title: "手续费",
            dataIndex: "feeRate",
            key: "feeRate",
        },
        {
            title: "交易时间组",
            dataIndex: "tradeTimeGroup",
            key: "tradeTimeGroup",
        },
        {
            title: "更新时间",
            dataIndex: "updateTime",
            key: "updateTime",
        },
        {
            title: "用户属性",
            dataIndex: "property",
            key: "property",
        },
    ];
};
export default class security extends React.PureComponent {
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
        window.location.href = window.baseURL + "/security/download";
    };
    getData = (params) => {
        http.post({
            // url: "/assetInfo/selectList",
            url: "/security/selectList",
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
            // accept: ".xls,.xlsx",
            accept: ".xml",
            showUploadList: false,
            action: window.baseURL + "/security/upload",
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
        let scroll = { x: 3300, y: 445 };
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
                            <Icon type="upload" /> 证券信息上传
                        </Button>
                    </Upload>
                    <Button type="primary" onClick={this.handleDownload}>
                        <Icon type="download" /> 证券信息导出
                    </Button>
                </CurdComponent>
            </div>
        );
    }
}
