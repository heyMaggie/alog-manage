import React from "react";
import { Upload, message, Button, Icon } from "antd";
import CurdComponent from "@/components/CurdComponent";

const columns = (params) => {
    return [
        {
            title: "风控类型",
            dataIndex: "riskType",
            key: "riskType",
        },
        {
            title: "风控启用委托数量",
            dataIndex: "entrustItemThreshold",
            key: "entrustItemThreshold",
        },
        {
            title: "时间量:总委托笔数",
            dataIndex: "entrustItemLimit",
            key: "entrustItemLimit",
        },
        {
            title: "总委托:时间量(s)",
            dataIndex: "entrustSeconds",
            key: "entrustSeconds",
        },
        {
            title: "总委托笔数",
            dataIndex: "entrustTotalThreshold",
            key: "entrustTotalThreshold",
        },
        {
            title: "撤单比:风控启用委托数量",
            dataIndex: "cancelEntrustItemThreshold",
            key: "cancelEntrustItemThreshold",
            width: 200,
        },
        {
            title: "撤单比(s) ",
            dataIndex: "cancelRatioLimit",
            key: "cancelRatioLimit",
        },
        {
            title: "废单比:风控启用委托数量",
            dataIndex: "failedEntrustItemThreshold",
            key: "failedEntrustItemThreshold",
            width: 200,
        },
        {
            title: "废单比(s) ",
            dataIndex: "failedRatioLimit",
            key: "failedRatioLimit",
        },
        {
            title: "委托成交比:风控启用委托数量",
            dataIndex: "entrustExecEntrustItemThreshold",
            key: "entrustExecEntrustItemThreshold",
            width: 240,
        },
        {
            title: "委托成交比(s) ",
            dataIndex: "entrustExecRatioLimit",
            key: "entrustExecRatioLimit",
        },
        {
            title: "净买入额度:风控启用委托数量",
            dataIndex: "netBuyEntrustItemThreshold",
            key: "netBuyEntrustItemThreshold",
            width: 220,
        },
        {
            title: "净买入额度",
            dataIndex: "netBuyAmountLimit",
            key: "netBuyAmountLimit",
        },
        {
            title: "撤单频率笔数",
            dataIndex: "cancelItemLimit",
            key: "cancelItemLimit",
        },
        {
            title: "撤单:时间量(s)",
            dataIndex: "cancelSeconds",
            key: "cancelSeconds",
        },
        {
            title: "撤单间隔(s)",
            dataIndex: "cancelGapSeconds",
            key: "cancelGapSeconds",
        },
        {
            title: "下单频率笔数",
            dataIndex: "tradeItemLimit",
            key: "tradeItemLimit",
        },
        {
            title: "下单频率:时间量(s)",
            dataIndex: "tradeSeconds",
            key: "tradeSeconds",
        },
        {
            title: "下单总量(股数)",
            dataIndex: "tradeQtyLimit",
            key: "tradeQtyLimit",
        },
        {
            title: "下单总金额(元)",
            dataIndex: "tradeAmountLimit",
            key: "tradeAmountLimit",
        },
        // {
        //     title: "更新时间",
        //     dataIndex: "updateTime",
        //     key: "updateTime",
        // },
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
        window.location.href = window.baseURL + "/risk/download";
    };
    getData = (params) => {
        http.get({
            // url: "/option/assetInfo/selectList",
            url: "/risk/list",
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
            action: window.baseURL + "/risk/upload",
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
        let scroll = { x: 3500, y: 445 };
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
                            <Icon type="upload" /> 算法风控配置上传
                        </Button>
                    </Upload>
                    <Button type="primary" onClick={this.handleDownload}>
                        <Icon type="download" /> 算法风控配置导出
                    </Button>
                </CurdComponent>
            </div>
        );
    }
}
