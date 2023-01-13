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
            width: 120,
        },
        {
            title: "系统用户名称",
            dataIndex: "operateId",
            key: "operateId",
            width: 160,
        },
        {
            title: "操作模块",
            dataIndex: "operateModule",
            width: 200,
        },
        {
            title: "操作项目",
            dataIndex: "operateItemValue",
            width: 150,
        },
        {
            title: "操作内容",
            dataIndex: "operateContent",
            width: 240,
        },
        {
            title: "操作参数",
            dataIndex: "operateParams",
        },
        {
            title: "时间",
            dataIndex: "createTime",
            key: "createTime",
            width: 200,
        },
    ];
};

export default class uoeSetting extends React.PureComponent {
    state = {
        searchLoading: false,
        selectRow: [],
        info: [],
        pagination: { total: 0 },
        opModuleList: [],
    };
    getSearchFormFields = () => {
        return [
            {
                label: "系统用户名称",
                id: "operateId",
                component: <Input placeholder="请输入" />,
            },
            {
                label: "操作模块",
                id: "operateModule",
                component: SelectOption(this.state.opModuleList, {
                    placeholder: "请选择",
                    allowClear: true,
                }),
            },
            {
                label: "时间",
                id: "createTime",
                initialValue: [],
                component: (
                    <RangePicker
                        showTime
                        placeholder={["开始时间", "结束时间"]}
                        format="YYYY-MM-DD HH:mm:ss"
                        className="rangePicker"
                    />
                ),
            },
        ];
    };
    getData = (params = {}, pagination = { current: 1, pageSize: 13 }) => {
        // console.log(params);
        let startTime = "";
        let endTime = "";
        if (params["createTime"].length) {
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
        this.getData({ createTime: [] });
        this.getOpModuleList();
    }
    //获操作模块名称
    getOpModuleList = (params = {}) => {
        // return;
        http.get({
            url: "/operate-log/operateModule",
            data: params,
        }).then((res) => {
            let idArr = [];
            if (res.data && res.data.length > 0) {
                let dataArr = res.data;
                idArr = dataArr.map((item) => {
                    let obj = {};
                    obj.key = item;
                    obj.value = item;
                    return obj;
                });
                this.setState({
                    opModuleList: idArr,
                });
                // console.log(this.state.opModuleList);
            }
        });
    };
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
                    getSearchFormFields={this.getSearchFormFields}
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
