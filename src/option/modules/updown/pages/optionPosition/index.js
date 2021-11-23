import React from "react";
import { Upload, message, Button, Icon } from "antd";
import CurdComponent from "@/components/CurdComponent";

const columns = (params) => {
    return [
        {
            title: "用户ID",
            dataIndex: "uuserId",
            key: "uuserId",
        },
        {
            title: "期权ID",
            dataIndex: "uoptionId",
            key: "uoptionId",
        },
        {
            title: "股东账户ID",
            dataIndex: "uaccountId",
            key: "uaccountId",
        },
        {
            title: "权利仓",
            dataIndex: "rightsQty",
            key: "rightsQty",
        },
        {
            title: "义务仓",
            dataIndex: "obligQty",
            key: "obligQty",
        },
        {
            title: "备兑持仓",
            dataIndex: "coverQty",
            key: "coverQty",
        },
        {
            title: "权利冻结仓",
            dataIndex: "rightsFrozenQty",
            key: "rightsFrozenQty",
        },
        {
            title: "义务冻结仓",
            dataIndex: "obligFrozenQty",
            key: "obligFrozenQty",
        },
        {
            title: "备兑冻结仓",
            dataIndex: "coverFrozenQty",
            key: "coverFrozenQty",
        },
        {
            title: "权利价格",
            dataIndex: "rightsPrice",
            key: "rightsPrice",
        },
        {
            title: "义务价格",
            dataIndex: "obligPrice",
            key: "obligPrice",
        },
        {
            title: "当日权利仓开仓数量",
            dataIndex: "cumRightsQty",
            key: "cumRightsQty",
        },
        {
            title: "当日义务仓开仓数量",
            dataIndex: "cumObligQty",
            key: "cumObligQty",
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
            title: "行权标识",
            dataIndex: "excercise",
            key: "excercise",
        },
        {
            title: "买平权利仓",
            dataIndex: "close_rights_qty",
            key: "close_rights_qty",
        },
        {
            title: "备平权利仓",
            dataIndex: "cover_rights_qty",
            key: "cover_rights_qty",
        },
        {
            title: "买平冻结仓",
            dataIndex: "close_rights_frozen_qty",
            key: "close_rights_frozen_qty",
        },
        {
            title: "备平冻结仓",
            dataIndex: "cover_rights_frozen_qty",
            key: "cover_rights_frozen_qty",
        },
        {
            title: "日权利仓开仓",
            dataIndex: "day_rights_qty",
            key: "day_rights_qty",
        },
        {
            title: "日义务仓开仓",
            dataIndex: "day_oblig_qty",
            key: "day_oblig_qty",
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
export default class positionLimit extends React.PureComponent {
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
        window.location.href = window.baseURL + "/tb-option-position/download";
    };
    getData = (params) => {
        http.get({
            // url: "/assetInfo/selectList",
            url: "/tb-option-position/selectList",
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
            action: window.baseURL + "/tb-option-position/upload",
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
                            <Icon type="upload" /> 期权持仓上传
                        </Button>
                    </Upload>
                    <Button type="primary" onClick={this.handleDownload}>
                        <Icon type="download" /> 期权持仓导出
                    </Button>
                </CurdComponent>
            </div>
        );
    }
}
