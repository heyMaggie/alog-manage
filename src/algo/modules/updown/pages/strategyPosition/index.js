import React from "react";
import { Upload, message, Button, Icon } from "antd";
import CurdComponent from "@/components/CurdComponent";

const columns = (params) => {
    return [
        {
            title: "期权ID1",
            dataIndex: "uoptionId1",
            key: "uoptionId1",
        },
        {
            title: "期权ID2",
            dataIndex: "uoptionId2",
            key: "uoptionId2",
        },
        {
            title: "期权ID3",
            dataIndex: "uoptionId3",
            key: "uoptionId3",
        },
        {
            title: "期权ID4",
            dataIndex: "uoptionId4",
            key: "uoptionId4",
        },
        {
            title: "策略代码",
            dataIndex: "strategyType",
            key: "strategyType",
        },
        {
            title: "持仓数量",
            dataIndex: "posQty",
            key: "posQty",
        },
        {
            title: "冻结持仓数量",
            dataIndex: "frozenQty",
            key: "frozenQty",
        },
        {
            title: "期权1持仓ID",
            dataIndex: "uposId1",
            key: "uposId1",
        },
        {
            title: "期权2持仓ID",
            dataIndex: "uposId2",
            key: "uposId2",
        },
        {
            title: "期权3持仓ID",
            dataIndex: "uposId3",
            key: "uposId3",
        },
        {
            title: "期权4持仓ID",
            dataIndex: "uposId4",
            key: "uposId4",
        },
        {
            title: "股东账户ID",
            dataIndex: "uaccountId",
            key: "uaccountId",
        },
        {
            title: "用户ID",
            dataIndex: "uuserId",
            key: "uuserId",
        },
        {
            title: "合约个数",
            dataIndex: "noLegs",
            key: "noLegs",
        },
    ];
};
export default class strategyPosition extends React.PureComponent {
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
            window.baseURL + "/option/tb-strategy-position/download";
    };
    getData = (params) => {
        http.get({
            // url: "/option/assetInfo/selectList",
            url: "/option/tb-strategy-position/selectList",
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
    //\U$1
    render() {
        let that = this;
        let props = {
            name: "file",
            accept: ".xml",
            showUploadList: false,
            action: window.baseURL + "/option/tb-strategy-position/upload",
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
                            <Icon type="upload" /> 组合持仓策略上传
                        </Button>
                    </Upload>
                    <Button type="primary" onClick={this.handleDownload}>
                        <Icon type="download" /> 组合持仓策略导出
                    </Button>
                </CurdComponent>
            </div>
        );
    }
}
