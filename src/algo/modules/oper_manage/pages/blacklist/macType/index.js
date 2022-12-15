import React from "react";
import CurdComponent from "@/components/CurdComponent";
import { Input } from "antd";

const columns = (params) => {
    return [
        {
            title: "序号",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "mac地址",
            dataIndex: "mac",
            key: "mac",
        },
    ];
};
const getInsertFormFields = () => {
    return [
        {
            label: "mac地址",
            id: "mac",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
                {
                    validator: checkLength(20),
                    trigger: ["change", "blur"],
                },
            ],
            component: <Input placeholder="请输入mac地址" />,
        },
    ];
};
const getUpdateFormFields = () => {
    return [
        {
            label: "mac地址",
            id: "mac",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
                {
                    validator: checkLength(20),
                    trigger: ["change", "blur"],
                },
            ],
            component: <Input placeholder="请输入mac地址" />,
        },
    ];
};
let getSearchFormFields = () => {
    return [
        {
            label: "mac地址",
            id: "mac",
            component: <Input placeholder="请输入mac地址" />,
        },
    ];
};
export default class macType extends React.PureComponent {
    state = {
        searchLoading: false,
        selectRow: [],
        info: [],
        pagination: { total: 0 },
        current: 1,
    };

    //新增接口
    handleInsertRecord = (fromData) => {
        console.log("新增接口", fromData);
        let params = {
            mac: fromData.mac,
        };
        http.post({
            url: "/blacklist/addBlacklist",
            data: params,
        }).then((res) => {
            let msg = res.message;
            if (res.code == 0) {
                message.success(msg);
                this.getData();
            } else if (res.code == 20000) {
                message.error(
                    msg.substring(msg.indexOf("[") + 1, msg.lastIndexOf("]"))
                );
            } else {
                message.error(msg);
            }
            this.isAction = true;
        });
    };
    //更新记录
    handleUpdateRecord = ({ form }) => {
        console.log(form.getFieldsValue());
        // return;
        let fromData = form.getFieldsValue();
        let params = {
            id: this.record.id,
            mac: fromData.mac,
        };
        // 发送更新请求
        http.post({
            url: "/blacklist/updateBlacklist",
            data: params,
        }).then((res) => {
            let msg = res.message;
            if (res.code == 0) {
                message.success(msg);
                this.getData();
            } else if (res.code == 20000) {
                message.error(
                    msg.substring(msg.indexOf("[") + 1, msg.lastIndexOf("]"))
                );
            } else {
                message.error(msg);
            }
            this.isAction = true;
        });
    };
    //删除记录
    handleDeleteRecord = (record) => {
        console.log("删除记录 ", record);
        let params = {
            id: record.id,
        };
        // 发送更新请求
        http.post({
            url: "/blacklist/deleteBlacklist",
            data: params,
        }).then((res) => {
            let msg = res.message;
            if (res.code == 0) {
                message.success(msg);
                this.getData();
            } else if (res.code == 20000) {
                message.error(
                    msg.substring(msg.indexOf("[") + 1, msg.lastIndexOf("]"))
                );
            } else {
                message.error(msg);
            }
            this.isAction = true;
        });
    };
    //填入更新数据
    setUpdateModal = ({ form, record }) => {
        // console.log(record, form);
        this.record = record;
        form.setFieldsValue({
            mac: record.mac,
        });
    };
    getData = (params = {}, pagination = { current: 1, pageSize: 13 }) => {
        params = {
            ...params,
            pageId: pagination.current,
            pageNum: pagination.pageSize,
        };
        http.post({
            url: "/blacklist/queryMac",
            data: params,
        }).then((res) => {
            console.log(res);
            //解析数据字典
            if (res.data.records && res.data.records.length > 0) {
                //parseDict(res.data.records);
                parseDictValue(res.data.records);
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
    handleClick() {}
    render() {
        let scroll = { x: 1000, y: 395 };
        let info = this.state.info;
        return (
            <div>
                <CurdComponent
                    // rowKey={"index"}
                    // isShowSearchForm={false}
                    // btnText2="查全部"
                    onSearchClick={this.handleSearch}
                    getSearchFormFields={getSearchFormFields}
                    // searchLoading={this.state.searchLoading}
                    insertBtnText={"新增"} // 不传 就没新增按钮
                    getInsertFormFields={getInsertFormFields}
                    insertRecord={this.handleInsertRecord}
                    // col="2"
                    width="789px"
                    pagination={this.state.pagination}
                    getUpdateFormFields={getUpdateFormFields}
                    setUpdateModal={this.setUpdateModal}
                    updateRecord={this.handleUpdateRecord} // 不传 就没编辑
                    deleteRecord={this.handleDeleteRecord} // 不传 就没删除
                    centered={true}
                    columns={columns}
                    dataSource={info}
                    scroll={scroll}
                    // rowSelection={rowSelection} //批量选择 操作
                >
                    <div
                        urlPrefix="/stockHolder"
                        title="黑名单"
                        sucCallback={this.getData}
                        noUpload={true}
                    ></div>
                </CurdComponent>
            </div>
        );
    }
}
