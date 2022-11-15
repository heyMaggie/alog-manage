import React from "react";
import { Input, TimePicker } from "antd";

import CurdComponent from "@/components/CurdComponent";
import SelectOption from "@/components/SelectOption";

const getSearchFormFields = () => {
    return [
        {
            label: "用户ID",
            id: "uuserId",
            // initialValue: "",
            component: <Input placeholder="请输入" />,
        },
        {
            label: "证券账户",
            id: "accountId",
            // initialValue: "",
            component: <Input placeholder="请输入" />,
        },
        {
            label: "证券代码",
            id: "securityId",
            // initialValue: "",
            component: <Input placeholder="请输入" />,
        },
        {
            label: "业务类型",
            id: "accountType",
            initialValue: "1",
            component: SelectOption(dict.businessTypeSelect, {
                placeholder: "请选择",
                // allowClear: true,
            }),
        },
    ];
};
const getInsertFormFields = () => {
    return [
        {
            label: "用户ID",
            id: "uuserId",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
                {
                    validator: checkLength(10),
                    trigger: ["change", "blur"],
                },
            ],
            component: <Input placeholder="请输入" />,
        },
        {
            label: "证券账户",
            id: "accountId",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
                {
                    validator: checkLength(12),
                    trigger: ["change", "blur"],
                },
            ],
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
        },
        {
            label: "证券代码",
            id: "securityId",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
                {
                    validator: checkLength(8),
                    trigger: ["change", "blur"],
                },
            ],
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
        },
        {
            label: "证券代码源",
            id: "securityIdSource",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
                {
                    validator: checkLength(4),
                    trigger: ["change", "blur"],
                },
            ],
            component: <Input placeholder="请输入" />,
        },
        {
            label: "持仓类型",
            id: "positionType",
            initialValue: "0",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: SelectOption(dict.positionType, {
                placeholder: "请选择",
                allowClear: false,
                style: {
                    width: 400,
                },
            }),
        },
        {
            label: "持仓数量",
            id: "positionQty",
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
            component: <Input placeholder="请输入" />,
        },
        {
            label: "日初持仓数量",
            id: "originQty",
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
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
        },
        {
            label: "日初开仓均价",
            id: "originOpenPrice",
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
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
        },
        {
            label: "可卖数量",
            id: "freeQty",
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
            component: <Input placeholder="请输入" />,
        },
        {
            label: "冻结数量",
            id: "frozenQty",
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
            component: <Input placeholder="请输入" />,
        },
        {
            label: "平均价格",
            id: "avgPrice",
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
            component: <Input placeholder="请输入" />,
        },
    ];
};
const getUpdateFormFields = () => {
    return [
        {
            label: "用户ID",
            id: "uuserId",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
                {
                    validator: checkLength(10),
                    trigger: ["change", "blur"],
                },
            ],
            component: <Input placeholder="请输入" />,
        },
        {
            label: "证券账户",
            id: "accountId",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
                {
                    validator: checkLength(12),
                    trigger: ["change", "blur"],
                },
            ],
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
        },
        {
            label: "证券代码",
            id: "securityId",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
                {
                    validator: checkLength(8),
                    trigger: ["change", "blur"],
                },
            ],
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
        },
        {
            label: "证券代码源",
            id: "securityIdSource",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
                {
                    validator: checkLength(4),
                    trigger: ["change", "blur"],
                },
            ],
            component: <Input placeholder="请输入" />,
        },
        {
            label: "持仓类型",
            id: "positionType",
            initialValue: "0",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: SelectOption(dict.positionType, {
                placeholder: "请选择",
                allowClear: false,
                style: {
                    width: 400,
                },
            }),
        },
        {
            label: "持仓数量",
            id: "positionQty",
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
            component: <Input placeholder="请输入" />,
        },
        {
            label: "日初持仓数量",
            id: "originQty",
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
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
        },
        {
            label: "日初开仓均价",
            id: "originOpenPrice",
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
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
        },
        {
            label: "可卖数量",
            id: "freeQty",
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
            component: <Input placeholder="请输入" />,
        },
        {
            label: "冻结数量",
            id: "frozenQty",
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
            component: <Input placeholder="请输入" />,
        },
        {
            label: "平均价格",
            id: "avgPrice",
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
            component: <Input placeholder="请输入" />,
        },
        {
            label: "更新时间",
            id: "updateTime",
            initialValue: "",
            component: <Input placeholder="请输入" readOnly disabled />,
        },
    ];
};

let columns = () => {
    return [
        {
            title: "用户ID",
            dataIndex: "uuserId",
            key: "uuserId",
            width: 80,
        },
        {
            title: "证券账户",
            dataIndex: "accountId",
            key: "accountId",
            width: 120,
        },
        {
            title: "证券代码",
            dataIndex: "securityId",
            key: "securityId",
            width: 100,
        },
        {
            title: "证券代码源",
            dataIndex: "securityIdSource",
            key: "securityIdSource",
            width: 120,
        },
        {
            title: "持仓类型",
            dataIndex: "positionTypeValue",
            key: "positionType",
            width: 100,
        },
        {
            title: "持仓数量",
            dataIndex: "positionQty",
            key: "positionQty",
            width: 100,
        },
        {
            title: "日初持仓数量",
            dataIndex: "originQty",
            width: 200,
        },
        {
            title: "日初开仓均价",
            dataIndex: "originOpenPrice",
            width: 250,
        },
        {
            title: "可卖数量",
            dataIndex: "freeQty",
            key: "freeQty",
            width: 100,
        },
        {
            title: "冻结数量",
            dataIndex: "frozenQty",
            key: "frozenQty",
            width: 100,
        },
        {
            title: "平均价格",
            dataIndex: "avgPrice",
            width: 100,
        },
        {
            title: "盈亏",
            dataIndex: "profitAndLoss",
            key: "profitAndLoss",
            width: 180,
        },
        {
            title: "收益率",
            dataIndex: "profitRate",
            key: "profitRate",
            width: 180,
        },
        {
            title: "版本号",
            dataIndex: "version",
            width: 120,
        },
        {
            title: "更新时间",
            dataIndex: "updateTime",
            key: "updateTime",
            width: 180,
        },
    ];
};
let dtColumns = () => {
    return columns();
};
export default class Cccx extends React.PureComponent {
    state = {
        searchLoading: false,
        info: [],
        pagination: { total: 0 },
    };
    handleSearch = (params, pagination) => {
        // console.log("获取搜索栏数据 ", params);
        this.getData(params, pagination);
    };
    getData = (params = {}, pagination = { current: 1, pageSize: 13 }) => {
        params = {
            ...params,
            pageId: pagination.current,
            pageNum: pagination.pageSize,
        };
        // console.log(pagination);
        http.post({
            url: "/user-position/list",
            data: params,
        }).then((res) => {
            console.log(res);
            //解析数据字典
            if (res.data.records && res.data.records.length > 0) {
                res.data.records.forEach((item) => (item.rnd = Math.random()));
                console.log(res.data.records);
                parseDictValue(res.data.records);
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
        // this.setState({ info: msg.content, pagination: pgn });
    };
    handleInsertRecord = (fromData) => {
        console.log("新增接口", fromData);
        let params = {
            UuserId: fromData.uuserId / 1,
            AccountId: fromData.accountId,
            SecurityId: fromData.securityId,
            SecurityIdSource: fromData.securityIdSource,
            PositionType: fromData.positionType / 1,
            PositionQty: fromData.positionQty * 100,
            OriginQty: fromData.originQty * 100,
            OriginOpenPrice: fromData.originOpenPrice * 10000,
            FreeQty: fromData.freeQty * 100,
            FrozenQty: fromData.frozenQty * 100,
            AvgPrice: fromData.avgPrice * 10000,
        };
        http.post({
            url: "/user-position/addUserPosition",
            data: params,
        }).then((res) => {
            let msg = res.message;
            if (res.code == 0) {
                message.success(msg);
                // this.getData();
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
        console.log(form.getFieldsValue(), this.record);
        // return;
        let fromData = form.getFieldsValue();
        let params = {
            Id: this.record.id / 1,
            UuserId: fromData.uuserId,
            AccountId: fromData.accountId,
            SecurityId: fromData.securityId,
            SecurityIdSource: fromData.securityIdSource,
            PositionType: fromData.positionType / 1,
            PositionQty: fromData.positionQty * 100,
            OriginQty: fromData.originQty * 100,
            OriginOpenPrice: fromData.originOpenPrice * 10000,
            FreeQty: fromData.freeQty * 100,
            FrozenQty: fromData.frozenQty * 100,
            AvgPrice: fromData.avgPrice * 10000,
        };
        // 发送更新请求
        http.post({
            url: "/user-position/updateUserPosition",
            data: params,
        }).then((res) => {
            let msg = res.message;
            if (res.code == 0) {
                message.success(msg);
                // this.getData();
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
    // //删除记录
    // handleDeleteRecord = record => {
    //   console.log("删除记录 ", record);
    // };
    //填入更新数据
    setUpdateModal = ({ form, record }) => {
        this.record = record;
        form.setFieldsValue({
            // userName1: record.v_gthth,
            // id: record.id,
            uuserId: record.uuserId,
            accountId: record.accountId,
            securityId: record.securityId,
            securityIdSource: record.securityIdSource,
            positionType: record.positionType + "",
            positionQty: record.positionQty,
            originQty: record.originQty,
            originOpenPrice: record.originOpenPrice,
            freeQty: record.freeQty,
            frozenQty: record.frozenQty,
            avgPrice: record.avgPrice,
            // profitAndLoss: record.profitAndLoss,
            // profitRate: record.profitRate,
            // version: record.version,
            updateTime: record.updateTime,
        });
    };
    componentDidMount() {
        this.getData();
    }
    render() {
        let scroll = { x: 2500, y: 445 };
        let info = this.state.info;
        return (
            <CurdComponent
                // isShowSearchForm={false}
                onSearchClick={this.handleSearch}
                getSearchFormFields={getSearchFormFields}
                searchLoading={this.state.searchLoading}
                isShowInsert={false}
                width="789px"
                rowKey="rnd"
                pagination={this.state.pagination}
                dataSource={info}
                insertBtnText={"新增"} // 不传 就没新增按钮
                getInsertFormFields={getInsertFormFields}
                insertRecord={this.handleInsertRecord}
                getUpdateFormFields={getUpdateFormFields}
                setUpdateModal={this.setUpdateModal}
                updateRecord={this.handleUpdateRecord} // 不传 就没编辑
                // deleteRecord={this.handleDeleteRecord}
                centered={true}
                columns={columns}
                scroll={scroll}
                //dtColumns={dtColumns()} //详情列表
                dtCol={2} //详情列数
                // dtWidth={800} //详情弹窗宽度
            >
                <div
                    urlPrefix="/user-position"
                    noUpload={true}
                    title="持仓信息"
                    sucCallback={this.getData}
                ></div>
            </CurdComponent>
        );
    }
}
