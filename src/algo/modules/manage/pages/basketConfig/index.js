import React from "react";
import CurdComponent from "@/components/CurdComponent";
import SelectOption from "@/components/SelectOption";
import { Input } from "antd";

const columns = (params) => {
    return [
        {
            title: "用户ID",
            dataIndex: "uuserId",
            width: 100,
        },
        {
            title: "篮子ID",
            dataIndex: "id",
        },
        {
            title: "篮子名称",
            dataIndex: "basketName",
            width: 200,
        },
        {
            title: "篮子描述",
            dataIndex: "remarks",
            width: 200,
        },
        {
            title: "篮子类型",
            dataIndex: "basketType",
            width: 120,
        },
        {
            title: "篮子状态",
            dataIndex: "status",
            width: 150,
        },
        {
            title: "篮子参数",
            dataIndex: "basketParam",
            width: 200,
        },
        {
            title: "开始时间",
            dataIndex: "startTime",
            width: 100,
        },
        {
            title: "结束时间",
            dataIndex: "endTime",
            width: 100,
        },
        {
            title: "包含的母单数",
            dataIndex: "basketNum",
        },
        {
            title: "算法类型",
            dataIndex: "algorithmType",
        },
        {
            title: "算法ID",
            dataIndex: "algorithmId",
        },

        {
            title: "请求用户ID",
            dataIndex: "reqUserId",
        },
        {
            title: "错误码",
            dataIndex: "errorCode",
            width: 100,
        },
        {
            title: "错误信息",
            dataIndex: "errorMsg",
        },
        {
            title: "客户端序列号",
            dataIndex: "seq",
            width: 150,
        },
        {
            title: "成交记录ID",
            dataIndex: "version",
        },
        {
            title: "更新时间",
            dataIndex: "updateTime",
            key: "updateTime",
            width: 180,
        },
    ];
};
const getSearchFormFields = () => {
    return [
        {
            label: "用户ID",
            label: <span>用&nbsp;&nbsp;户&nbsp;ID</span>,
            id: "uuserId",
            component: <Input placeholder="请输入" />,
        },
        {
            label: "篮子ID",
            label: <span>篮&nbsp;&nbsp;子&nbsp;ID</span>,
            id: "id",
            component: <Input placeholder="请输入" />,
        },
        {
            label: "篮子名称",
            id: "basketName",
            initialValue: "",
            component: <Input placeholder="请输入" />,
        },
        {
            label: "业务类型",
            id: "type",
            initialValue: "1",
            component: SelectOption(dict.businessTypeSelect, {
                placeholder: "请选择",
                // allowClear: true,
            }),
        },
    ];
};
export default class uoeSetting extends React.PureComponent {
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
        // params.token = "";
        params = {
            ...params,
            pageId: pagination.current,
            pageNum: pagination.pageSize,
        };
        console.log(params);
        if (params.type) {
            params.type = params.type / 1;
        } else {
            params.type = 1;
        }
        console.log(params);
        http.post({
            url: "/basket-info/list",
            data: params,
        }).then((res) => {
            console.log(res);
            // //解析数据字典
            // if (res.data.length > 0) {
            //     parseArrDict(res.data, "status", "basketStatus");
            //     parseDict(res.data);
            //     // showTip(this);
            // } else {
            //     message.info("查询结果为空");
            // }
            // this.setState({
            //     info: res.data,
            // });
            if (res.data.records && res.data.records.length > 0) {
                parseArrDict(res.data.records, "status", "basketStatus");
                parseDict(res.data.records);
                // parseDictValue(res.data.records);
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
        let scroll = { x: 2600, y: 445 };
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
                    // getUpdateFormFields={getUpdateFormFields}
                    // setUpdateModal={this.setUpdateModal}
                    // updateRecord={this.handleUpdateRecord} // 不传 就没编辑
                    // deleteRecord={this.handleDeleteRecord} // 不传 就没删除
                    // dtCol={2}
                    dtWidth="800px"
                    pagination={this.state.pagination}
                    dtColumns={columns()} //详情列表
                    centered={true}
                    columns={columns}
                    dataSource={info}
                    scroll={scroll}
                    // rowSelection={rowSelection} //批量选择 操作
                >
                    <div
                        urlPrefix="/basket-info"
                        noUpload={true}
                        title="篮子管理"
                        sucCallback={this.getData}
                    ></div>
                </CurdComponent>
            </div>
        );
    }
}
