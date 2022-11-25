import React from "react";
import CurdComponent from "@/components/CurdComponent";
// import SelectOption from "@/components/SelectOption";
import { Input } from "antd";
import TagLabel from "@/components/Tag";

// import UploadWrap from "@/components/UploadWrap";

const columns = (params) => {
    return [
        {
            title: "ID",
            dataIndex: "id",
            width: 100,
        },
        {
            title: "用户ID",
            dataIndex: "uuserId",
            width: 100,
        },
        // {
        //     title: "会话token",
        //     dataIndex: "token",
        //     width: 320,
        // },
        {
            title: "客户端类型",
            dataIndex: "clientType",
            width: 120,
        },
        {
            title: "状态",
            dataIndex: "sessionStatus",
            width: 170,
            render: (text, record) => {
                // console.log(record);
                // return (
                //     <TagLabel
                //         record={record.sessionStatus}
                //         type="warn"
                //     ></TagLabel>
                // );
                if (record.sessionStatus.indexOf("1") == 0) {
                    return (
                        <div>
                            <TagLabel
                                record={record.sessionStatus}
                                type="success"
                            ></TagLabel>
                        </div>
                    );
                } else if (
                    record.sessionStatus.indexOf("2") == 0 ||
                    record.sessionStatus.indexOf("3") == 0
                ) {
                    return (
                        <TagLabel
                            record={record.sessionStatus}
                            type="warn"
                        ></TagLabel>
                    );
                } else if (record.sessionStatus.indexOf("4") == 0) {
                    return <TagLabel record={record.sessionStatus}></TagLabel>;
                }
                return <TagLabel record={record.sessionStatus}></TagLabel>;
            },
        },
        {
            title: "套接字",
            dataIndex: "socket",
            width: 100,
        },
        {
            title: "服务索引",
            dataIndex: "serverId",
            width: 100,
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            width: 200,
        },
        {
            title: "更新时间",
            dataIndex: "updateTime",
            width: 200,
        },
        {
            title: "服务器地址端口",
            dataIndex: "serverIp",
            width: 180,
        },
    ];
};
let getSearchFormFields = () => {
    return [
        {
            // label: "用户ID",
            label: <span>用&nbsp;&nbsp;户&nbsp;ID</span>,
            id: "uuserId",
            component: <Input placeholder="请输入" />,
        },
    ];
};
export default class session extends React.PureComponent {
    state = {
        searchLoading: false,
        selectRow: [],
        info: [],
        pagination: { total: 0 },
    };
    //批量选择
    handleTableChange = (selectedRowKeys) => {
        console.log("批量选择");
        this.setState({
            selectRow: selectedRowKeys,
        });
    };

    handleInsertRecord = (params) => {
        console.log(params);
    };
    //更新记录
    handleUpdateRecord = ({ form }) => {
        console.log(form.getFieldsValue());
        // return;
        let params = form.getFieldsValue();
        params.name = this.record.name;
        http.post({
            url: "/option/tcp/uoeMore/1011",
            data: params,
        }).then((res) => {
            console.log(res);
            message.success(res.msg);
            this.isAction = true;
            this.getData();
        });
    };
    //删除记录
    handleDeleteRecord = (record) => {
        console.log("删除记录 ", record);
    };
    //填入更新数据
    setUpdateModal = ({ form, record }) => {
        // console.log(record, form);
        this.record = record;
        form.setFieldsValue({
            switchId: record.switchId,
            ip: record.ip,
            mask: record.mask,
            mac: record.mac,
            gateway: record.gateway,
            enable: record.enable + "",
        });
    };
    getData = (params = {}, pagination = { current: 1, pageSize: 13 }) => {
        params = {
            ...params,
            pageId: pagination.current,
            pageNum: pagination.pageSize,
        };
        // params.token = "";
        http.post({
            // url: "/option/tb-asset-info/queryList",
            url: "/session/list",
            data: params,
        }).then((res) => {
            console.log(res);
            //解析数据字典
            if (res.data.records && res.data.records.length > 0) {
                parseDict(res.data.records);
                // showTip(this);
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
        this.getData(params, pagination);
    };
    componentDidMount() {
        this.getData();
    }
    render() {
        let scroll = { x: 1000, y: 445 };
        let info = this.state.info;
        //批量
        // let { selectRow } = this.state;
        // const rowSelection = {
        //     selectRow,
        //     onChange: this.handleTableChange,
        // };
        return (
            <div>
                <CurdComponent
                    // rowKey={"index"}
                    // btnText2="查全部"
                    // isShowSearchForm={false}
                    onSearchClick={this.handleSearch}
                    getSearchFormFields={getSearchFormFields}
                    // searchLoading={this.state.searchLoading}
                    // insertBtnText={"新增UOE配置"} // 不传 就没新增按钮
                    // getInsertFormFields={getInsertFormFields}
                    // insertRecord={this.handleInsertRecord}
                    // col="2"
                    width="600px"
                    pagination={this.state.pagination}
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
                    <div
                        urlPrefix="/session"
                        noUpload={true}
                        title="用户会话"
                        sucCallback={this.getData}
                    ></div>
                </CurdComponent>
            </div>
        );
    }
}
