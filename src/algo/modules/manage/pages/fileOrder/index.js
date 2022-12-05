import React from "react";
import CurdComponent from "@/components/CurdComponent";
import SelectOption from "@/components/SelectOption";
import { Input, Modal, Form, message, Icon, Tooltip } from "antd";
import Table from "@/components/Table";

let getSearchFormFields = () => {
    return [
        {
            label: "文件类型",
            id: "type",
            component: SelectOption(dict.fileTypeList, {
                placeholder: "请选择文件类型",
                allowClear: true,
                // onChange: this.inputChange,
            }),
        },
        {
            label: "用户编码",
            // label: <span>用&nbsp;&nbsp;户&nbsp;ID</span>,
            id: "userId",
            component: <Input placeholder="请输入用户编码" />,
        },
    ];
};

class FileOrder extends React.PureComponent {
    columns = (params) => {
        return [
            {
                title: "用户编码",
                dataIndex: "userId",
                width: 150,
            },
            {
                title: "文件名",
                dataIndex: "fileName",
            },
            {
                title: "创建时间",
                dataIndex: "updateTime",
                width: 220,
            },
            {
                title: "错误信息",
                dataIndex: "errCode",
                width: 300,
            },
            {
                title: "下载",
                key: "operation",
                fixed: "right",
                width: 100,
                render: (text, record) =>
                    record.fileType == 0 ? null : (
                        <a
                            onClick={(e) => {
                                this.handleUpdateBtn(record);
                            }}
                        >
                            下载
                        </a>
                    ),
            },
        ];
    };

    state = {
        searchLoading: false,
        selectedRowKeys: [],
        info: [],
        updateArr: [],
        updateModalVisible: false,
        // fileTypeList: [],
    };

    // 下载按钮点击事件
    handleUpdateBtn = (record) => {
        console.log("下载按钮", record);
        this.record = record;
        let downFilePath = `${window.baseURL}/file-scan/downloadFileScan?fileName=${record.fileName}&filePath=${record.filePath}`;

        downFilePath = encodeURI(downFilePath);
        console.log(downFilePath);
        window.location.href = encodeURI(downFilePath, "utf-8");
        // this.getDownLoadFile(record);
    };
    getDownLoadFile = (record) => {
        let params = {
            fileName: record.fileName,
            filePath: record.filePath,
        };
        http.get({
            url: "/file-scan/downloadFileScan",
            data: params,
        })
            .then((res) => {
                let blob = new Blob([res], {
                    type: "application/vnd.ms-excel", // 这边的类型需要改
                });
                let url = window.URL.createObjectURL(blob);
                let link = document.createElement("a");
                link.style.display = "none";
                link.download = record.fileName; //  这边的名字需要改
                link.href = url;
                document.body.appendChild(link);
                link.click();
            })
            .catch((e) => {
                message.error("下载失败");
            });
    };
    getData = (params = {}, pagination = { current: 1, pageSize: 13 }) => {
        params = {
            ...params,
            pageId: pagination.current,
            pageNum: pagination.pageSize,
        };
        http.post({
            url: "/file-scan/pageList",
            data: params,
        }).then((res) => {
            console.log(res);
            //解析数据字典
            if (res.data.records && res.data.records.length > 0) {
                parseArrDict(res.data.records, "errCode", "retCode");
            } else {
                message.info("查询结果为空");
            }
            let pgn = {
                current: res.data.current,
                pageSize: pagination.pageSize,
                total: res.data.total || 0,
            };
            this.setState({
                info: res.data.records,
                pagination: pgn,
            });
        });
    };
    handleSearch = (params, pagination) => {
        this.searchParam = params;
        // console.log(params, "params");
        this.getData(params, pagination);
    };
    componentDidMount() {
        this.getData();
    }
    render() {
        let scroll = { x: 1000, y: 445 };
        let info = this.state.info;

        return (
            <div>
                <CurdComponent
                    onSearchClick={this.handleSearch}
                    getSearchFormFields={getSearchFormFields}
                    width="600px"
                    pagination={this.state.pagination}
                    centered={true}
                    columns={this.columns}
                    dataSource={info}
                    scroll={scroll}
                >
                    <div
                        upLoadCSvUrl="/file-scan/uploadFile"
                        noDownload={true}
                        title="文件"
                        sucCallback={this.getData}
                        type=".csv"
                    ></div>
                </CurdComponent>
            </div>
        );
    }
}
export default Form.create()(FileOrder);
