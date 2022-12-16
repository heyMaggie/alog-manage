import React from "react";
import CurdComponent from "@/components/CurdComponent";
import SelectOption from "@/components/SelectOption";
import { Input, DatePicker } from "antd";
import styles from "./style.module.less";
import moment from "moment";
const { RangePicker } = DatePicker;
const columns = (params) => {
    return [
        {
            title: "序号",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "用户名称",
            dataIndex: "operateId",
            key: "operateId",
        },
        {
            title: "操作模块",
            dataIndex: "operateModule",
        },
        {
            title: "操作项目",
            dataIndex: "operateItemValue",
        },
        {
            title: "操作内容",
            dataIndex: "operateContent",
        },
        {
            title: "操作参数",
            dataIndex: "operateParams",
        },
        {
            title: "时间",
            dataIndex: "createTime",
            key: "createTime",
            width: 180,
        },
    ];
};
let getSearchFormFields = () => {
    return [
        {
            label: "用户名称",
            id: "operateId",
            component: <Input placeholder="请输入管理员名称" />,
        },
        {
            label: "操作模块",
            id: "operateModule",
            component: <Input placeholder="请选择操作模块" />,
        },
        {
            label: "日期",
            id: "createTime",
            initialValue: [],
            component: (
                <RangePicker
                    style={{ width: 432 }}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                />
            ),
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

    getData = (params = {}, pagination = { current: 1, pageSize: 13 }) => {
        let startTime = "";
        let endTime = "";
        if (params["createTime"]) {
            startTime = moment(params["createTime"][0]).format(
                "YYYY-MM-DD HH:mm:ss"
            );
            endTime = moment(params["createTime"][1]).format(
                "YYYY-MM-DD HH:mm:ss"
            );
        }
        params = {
            operateId: params.operateId,
            operateModule: params.operateModule,
            pageId: pagination.current,
            pageNum: pagination.pageSize,
            startTime,
            endTime,
        };
        http.post({
            // url: "/option/assetInfo/selectList",
            url: "/operate-log/queryPage",
            data: params,
        }).then((res) => {
            console.log(res);
            //解析数据字典
            if (res.data.records && res.data.records.length) {
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
    render() {
        let scroll = { x: 1000, y: 445 };
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
                    // insertBtnText={"新增"} // 不传 就没新增按钮
                    // getInsertFormFields={getInsertFormFields}
                    // insertRecord={this.handleInsertRecord}
                    // col="2"
                    width="789px"
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
                        urlPrefix="/operate-log"
                        title="操作日志"
                        noUpload={true}
                        sucCallback={this.getData}
                    ></div>
                </CurdComponent>
            </div>
        );
    }
}
