import React from "react";
import { Upload, message, Button, Icon } from "antd";
import CurdComponent from "@/components/CurdComponent";

const columns = (params) => {
    return [
        {
            title: "组合策略编码",
            dataIndex: "strategyID",
            key: "strategyID",
        },
        {
            title: "组合策略名称",
            dataIndex: "strategyName",
            key: "strategyName",
        },
        {
            title: "组合自动解除日配置",
            dataIndex: "autoSplitDayParam",
            key: "autoSplitDayParam",
            width: 160,
        },
        {
            title: "成份合约到期日要求",
            dataIndex: "lastTradeDayParam",
            key: "lastTradeDayParam",
            width: 160,
        },
        {
            title: "成份合约标的要求",
            dataIndex: "underlyingSecurityParam",
            key: "underlyingSecurityParam",
        },
        {
            title: "是否适用非标合约",
            dataIndex: "nonStandardOptionFlag",
            key: "nonStandardOptionFlag",
        },
        {
            title: "成份合约个数",
            dataIndex: "noLegs",
            key: "noLegs",
        },
        {
            title: "期权1认购或认沽",
            dataIndex: "legCallOrPut1",
            key: "legCallOrPut1",
        },
        {
            title: "期权1持仓类型",
            dataIndex: "legSide1",
            key: "legSide1",
        },
        {
            title: "期权1单份组合策略包含的此合约张数",
            dataIndex: "legPositionQty1",
            key: "legPositionQty1",
            width: 280,
        },
        {
            title: "期权1行权价高低顺序",
            dataIndex: "legExercisePriceSeq1",
            key: "legExercisePriceSeq1",
            width: 170,
        },
        {
            title: "期权1到期日顺序",
            dataIndex: "legLastTradeDaySeq1",
            key: "legLastTradeDaySeq1",
        },
        {
            title: "期权2认购或认沽",
            dataIndex: "legCallOrPut2",
            key: "legCallOrPut2",
        },
        {
            title: "期权2持仓类型",
            dataIndex: "legSide2",
            key: "legSide2",
        },
        {
            title: "期权2单份组合策略包含的此合约张数",
            dataIndex: "legPositionQty2",
            key: "legPositionQty2",
            width: 280,
        },
        {
            title: "期权2行权价高低顺序",
            dataIndex: "legExercisePriceSeq2",
            key: "legExercisePriceSeq2",
            width: 170,
        },
        {
            title: "期权2到期日顺序",
            dataIndex: "legLastTradeDaySeq2",
            key: "legLastTradeDaySeq2",
        },
        {
            title: "期权3认购或认沽",
            dataIndex: "legCallOrPut3",
            key: "legCallOrPut3",
        },
        {
            title: "期权3持仓类型",
            dataIndex: "legSide3",
            key: "legSide3",
        },
        {
            title: "期权3单份组合策略包含的此合约张数",
            dataIndex: "legPositionQty3",
            key: "legPositionQty3",
            width: 280,
        },
        {
            title: "期权3行权价高低顺序",
            dataIndex: "legExercisePriceSeq3",
            key: "legExercisePriceSeq3",
            width: 170,
        },
        {
            title: "期权3到期日顺序",
            dataIndex: "legLastTradeDaySeq3",
            key: "legLastTradeDaySeq3",
        },
        {
            title: "期权4认购或认沽",
            dataIndex: "legCallOrPut4",
            key: "legCallOrPut4",
        },
        {
            title: "期权4持仓类型",
            dataIndex: "legSide4",
            key: "legSide4",
        },
        {
            title: "期权4单份组合策略包含的此合约张数",
            dataIndex: "legPositionQty4",
            key: "legPositionQty4",
            width: 280,
        },
        {
            title: "期权4行权价高低顺序",
            dataIndex: "legExercisePriceSeq4",
            key: "legExercisePriceSeq4",
            width: 170,
        },
        {
            title: "期权4到期日顺序",
            dataIndex: "legLastTradeDaySeq4",
            key: "legLastTradeDaySeq4",
        },
    ];
};
export default class combinationStrategy extends React.PureComponent {
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
            window.baseURL.replace("/option", "") +
            "/tb-strategy-config-info/download";
    };
    getData = (params) => {
        http.request({
            method: "get",
            url: "/tb-strategy-config-info/selectList",
            baseURL: window.baseURL.replace("/option", ""),
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
            action:
                window.baseURL.replace("/option", "") +
                "/tb-strategy-config-info/upload",
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
        let scroll = { x: 4600, y: 445 };
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
                            <Icon type="upload" /> 组合持仓配置上传
                        </Button>
                    </Upload>
                    <Button type="primary" onClick={this.handleDownload}>
                        <Icon type="download" /> 组合持仓配置导出
                    </Button>
                </CurdComponent>
            </div>
        );
    }
}
