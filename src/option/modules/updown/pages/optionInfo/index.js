import React from "react";
import { Upload, message, Button, Icon } from "antd";
import CurdComponent from "@/components/CurdComponent";

const columns = (params) => {
    return [
        {
            title: "合约简称",
            dataIndex: "contractName",
            key: "contractName",
            width: 200,
        },
        {
            title: "合约代码",
            dataIndex: "contractCode",
            key: "contractCode",
            width: 150,
        },
        {
            title: "合约编码",
            dataIndex: "optionId",
            key: "optionId",
        },
        {
            title: "证券代码源",
            dataIndex: "optionIdSource",
            key: "optionIdSource",
        },
        {
            title: "标的资产",
            dataIndex: "usecurityId",
            key: "usecurityId",
        },
        {
            title: "合约类型",
            dataIndex: "contractType",
            key: "contractType",
        },
        {
            title: "合约单位",
            dataIndex: "contractUnit",
            key: "contractUnit",
        },
        {
            title: "到期月份",
            dataIndex: "expirateMonth",
            key: "expirateMonth",
        },
        {
            title: "行权日",
            dataIndex: "exerciseDate",
            key: "exerciseDate",
        },
        {
            title: "到期日",
            dataIndex: "expirateDate",
            key: "expirateDate",
        },
        {
            title: "交收日",
            dataIndex: "deliverDate",
            key: "deliverDate",
        },
        {
            title: "行权价格",
            dataIndex: "strikePrice",
            key: "strikePrice",
        },
        {
            title: "行权价格间距",
            dataIndex: "strikePriceStep",
            key: "strikePriceStep",
        },
        {
            title: "行权方式",
            dataIndex: "exerciseMethod",
            key: "exerciseMethod",
        },
        {
            title: "交割方式",
            dataIndex: "deliverMethod",
            key: "deliverMethod",
        },
        {
            title: "最小变动单位",
            dataIndex: "minChangeUnit",
            key: "minChangeUnit",
        },
        {
            title: "期权状态",
            dataIndex: "optionStatus",
            key: "optionStatus",
        },
        {
            title: "前收盘价",
            dataIndex: "prevClosePrice",
            key: "prevClosePrice",
        },
        {
            title: "线性浮动比例",
            dataIndex: "floatRatio",
            key: "floatRatio",
        },
        {
            title: "认购非线性比例参数1",
            dataIndex: "firstRatioCall",
            key: "firstRatioCall",
        },
        {
            title: "认购非线性比例参数2",
            dataIndex: "secondRatioCall",
            key: "secondRatioCall",
        },
        {
            title: "认沽非线性比例参数1",
            dataIndex: "firstRatioPut",
            key: "firstRatioPut",
        },
        {
            title: "认沽维持保证金参数2",
            dataIndex: "secondRatioPut",
            key: "secondRatioPut",
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
            dataIndex: "marketBuyQtyUpLimit",
            key: "marketBuyQtyUpLimit",
        },
        {
            title: "市价卖数量上限",
            dataIndex: "marketSellQtyUpLimit",
            key: "marketSellQtyUpLimit",
        },
        {
            title: "买数量单位",
            dataIndex: "buyQtyUnit",
            key: "buyQtyUnit",
        },
        {
            title: "卖数量单位",
            dataIndex: "sellQtyUnit",
            key: "sellQtyUnit",
        },
        {
            title: "价格档次",
            dataIndex: "priceTick",
            key: "priceTick",
        },
        {
            title: "涨价限制值",
            dataIndex: "upperLimitPrice",
            key: "upperLimitPrice",
        },
        {
            title: "跌价限制值",
            dataIndex: "lowerLimitPrice",
            key: "lowerLimitPrice",
        },
        {
            title: "今卖开每张保证金",
            dataIndex: "sellMargin",
            key: "sellMargin",
        },
        {
            title: "做市商标识",
            dataIndex: "marketMakeFlag",
            key: "marketMakeFlag",
        },
        {
            title: "交易时间组",
            dataIndex: "tradeTimeGroup",
            key: "tradeTimeGroup",
        },
        {
            title: "当日权利仓上限",
            dataIndex: "dayRightsUpper",
            key: "dayRightsUpper",
        },
        {
            title: "当日义务仓上限",
            dataIndex: "dayObligUpper",
            key: "dayObligUpper",
        },
        {
            title: "累计权利仓上限",
            dataIndex: "cumRightsUpper",
            key: "cumRightsUpper",
        },
        {
            title: "累计义务仓上限",
            dataIndex: "cumObligUpper",
            key: "cumObligUpper",
        },
        {
            title: "可用的组合策略",
            dataIndex: "availableStrategy",
            key: "availableStrategy",
        },
        {
            title: "策略自动解除日",
            dataIndex: "autoSplitDay",
            key: "autoSplitDay",
        },
    ];
};
export default class optionInfo extends React.PureComponent {
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
        window.location.href = window.baseURL + "/optionInfo/download";
    };
    getData = (params) => {
        http.get({
            // url: "/assetInfo/selectList",
            url: "/optionInfo/selectList",
            data: params,
        }).then((res) => {
            console.log(res);
            //解析数据字典
            if (res.data.length > 0) {
                parseArrDict(res.data, "optionIdSource", "securityIdSource");
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
            action: window.baseURL + "/optionInfo/upload",
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
        let scroll = { x: 4500, y: 445 };
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
                            <Icon type="upload" /> 期权信息上传
                        </Button>
                    </Upload>
                    <Button type="primary" onClick={this.handleDownload}>
                        <Icon type="download" /> 期权信息导出
                    </Button>
                </CurdComponent>
            </div>
        );
    }
}
