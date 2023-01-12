import React from "react";
import CurdComponent from "@/components/CurdComponent";
import SelectOption from "@/components/SelectOption";
import { Input } from "antd";

const columns = (params) => {
    return [
        {
            title: "证券代码",
            dataIndex: "securityId",
            key: "securityId",
        },
        {
            title: "证券代码源",
            dataIndex: "securityIdSourceValue",
            width: 170,
        },
        {
            title: "证券名称",
            dataIndex: "securityName",
            key: "securityName",
        },
        {
            title: "昨收价",
            dataIndex: "prevClosePx",
            key: "prevClosePx",
        },
        {
            title: "证券状态",
            dataIndex: "securityStatusValue",
            key: "securityStatus",
        },
        {
            title: "信用标识",
            dataIndex: "creditTypeValue",
            width: 190,
        },
        {
            title: "股票板块属性",
            dataIndex: "propertyValue",
            key: "property",
        },
        {
            title: "限价买数量上限",
            dataIndex: "buyQtyUpperLimit",
            key: "buyQtyUpperLimit",
        },
        {
            title: "限价买数量单位",
            dataIndex: "buyQtyUnit",
        },
        {
            title: "限价卖数量上限",
            dataIndex: "sellQtyUpperLimit",
            key: "sellQtyUpperLimit",
        },
        {
            title: "限价卖数量单位",
            dataIndex: "sellQtyUnit",
        },
        {
            title: "市价买数量上限",
            dataIndex: "marketBuyQtyUpperLimit",
            key: "marketBuyQtyUpperLimit",
        },
        {
            title: "市价买数量单位",
            dataIndex: "marketBuyQtyUnit",
        },
        {
            title: "市价卖数量上限",
            dataIndex: "marketSellQtyUpperLimit",
            key: "marketSellQtyUpperLimit",
        },
        {
            title: "市价卖数量单位",
            dataIndex: "marketSellQtyUnit",
        },
        {
            title: "是否有涨跌限制",
            dataIndex: "hasPriceLimitValue",
            key: "hasPriceLimit",
        },
        {
            title: "涨跌限制类型",
            dataIndex: "limitTypeValue",
        },
        {
            title: "上涨限价",
            dataIndex: "upperLimitPrice",
            key: "upperLimitPrice",
        },
        {
            title: "下跌限价",
            dataIndex: "lowerLimitPrice",
            key: "lowerLimitPrice",
        },
        {
            title: "更新时间",
            dataIndex: "updateTime",
            key: "updateTime",
            width: 180,
        },
    ];
};
let getSearchFormFields = () => {
    return [
        {
            label: "证券代码",
            id: "securityId",
            component: <Input placeholder="请输入" />,
        },
    ];
};
const getInsertFormFields = () => {
    return [
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
            component: <Input placeholder="请输入" />,
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
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
        },
        {
            label: "证券名称",
            id: "securityName",
            initialValue: "",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
                {
                    validator: checkLength(40),
                    trigger: ["change", "blur"],
                },
            ],
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
        },
        {
            label: "昨收价",
            id: "prevClosePx",
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
            label: "证券状态",
            id: "securityStatus",
            initialValue: "0",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: SelectOption(dict.securityStatus, {
                placeholder: "请选择",
                allowClear: false,
                style: {
                    width: 400,
                },
            }),
        },
        {
            label: "股票板块属性",
            id: "property",
            initialValue: "1",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: SelectOption(dict.property, {
                placeholder: "请选择",
                allowClear: false,
                style: {
                    width: 400,
                },
            }),
        },
        {
            label: "限价买数量上限",
            id: "buyQtyUpperLimit",
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
            label: "限价买数量单位",
            id: "buyQtyUnit",
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
            label: "限价卖数量上限",
            id: "sellQtyUpperLimit",
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
            label: "限价卖数量单位",
            id: "sellQtyUnit",
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
            label: "市价买数量上限",
            id: "marketBuyQtyUpperLimit",
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
            label: "市价买数量单位",
            id: "marketBuyQtyUnit",
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
            label: "市价卖数量上限",
            id: "marketSellQtyUpperLimit",
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
            label: "市价卖数量单位",
            id: "marketSellQtyUnit",
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
            label: "是否有涨跌限制",
            id: "hasPriceLimit",
            initialValue: "0",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: SelectOption(dict.hasPriceLimit, {
                placeholder: "请选择",
                allowClear: false,
                style: {
                    width: 400,
                },
            }),
        },
        {
            label: "涨跌限制类型",
            id: "limitType",
            initialValue: "1",
            rules: [
                {
                    required: true,
                    message: "参数不能为空",
                },
            ],
            component: SelectOption(dict.limitType, {
                placeholder: "请选择",
                allowClear: false,
                style: {
                    width: 400,
                },
            }),
        },
        {
            label: "上涨限价",
            id: "upperLimitPrice",
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
            label: "下跌限价",
            id: "lowerLimitPrice",
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
    return getInsertFormFields();
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

    handleInsertRecord = (fromData) => {
        console.log("新增接口", fromData);
        let params = {
            SecurityId: fromData.securityId,
            SecurityIdSource: fromData.securityIdSource,
            SecurityName: fromData.securityName,
            PrevClosePx: fromData.prevClosePx * 1,
            BuyQtyUpperLimit: fromData.buyQtyUpperLimit * 100,
            SellQtyUpperLimit: fromData.sellQtyUpperLimit * 100,
            MarketBuyQtyUpperLimit: fromData.marketBuyQtyUpperLimit * 100,
            MarketSellQtyUpperLimit: fromData.marketSellQtyUpperLimit * 100,
            SecurityStatus: fromData.securityStatus + "",
            HasPriceLimit: fromData.hasPriceLimit + "",
            LimitType: fromData.limitType + "",
            Property: fromData.property + "",
            UpperLimitPrice: fromData.upperLimitPrice * 10000,
            LowerLimitPrice: fromData.lowerLimitPrice * 10000,
            BuyQtyUnit: fromData.buyQtyUnit * 100,
            SellQtyUnit: fromData.sellQtyUnit * 100,
            MarketBuyQtyUnit: fromData.marketBuyQtyUnit * 100,
            MarketSellQtyUnit: fromData.marketSellQtyUnit * 100,
        };
        http.post({
            url: "/security/addSecurityInfo",
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
        console.log(form.getFieldsValue());
        // return;
        let fromData = form.getFieldsValue();
        let params = {
            Id: this.record.id,
            SecurityId: fromData.securityId,
            SecurityIdSource: fromData.securityIdSource,
            SecurityName: fromData.securityName,
            PrevClosePx: fromData.prevClosePx * 1,
            BuyQtyUpperLimit: fromData.buyQtyUpperLimit * 100,
            SellQtyUpperLimit: fromData.sellQtyUpperLimit * 100,
            MarketBuyQtyUpperLimit: fromData.marketBuyQtyUpperLimit * 100,
            MarketSellQtyUpperLimit: fromData.marketSellQtyUpperLimit * 100,
            SecurityStatus: fromData.securityStatus + "",
            HasPriceLimit: fromData.hasPriceLimit + "",
            LimitType: fromData.limitType + "",
            Property: fromData.property + "",
            UpperLimitPrice: fromData.upperLimitPrice * 10000,
            LowerLimitPrice: fromData.lowerLimitPrice * 10000,
            BuyQtyUnit: fromData.buyQtyUnit * 100,
            SellQtyUnit: fromData.sellQtyUnit * 100,
            MarketBuyQtyUnit: fromData.marketBuyQtyUnit * 100,
            MarketSellQtyUnit: fromData.marketSellQtyUnit * 100,
        };
        // 发送更新请求
        http.post({
            url: "/security/updateSecurityInfo",
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
    //删除记录
    handleDeleteRecord = (record) => {
        console.log("删除记录 ", record);
        // let params = record;
        let params = {
            Id: record.id,
            SecurityId: record.securityId,
            SecurityIdSource: record.securityIdSource,
            SecurityName: record.securityName,
            PrevClosePx: record.prevClosePx * 1,
            BuyQtyUpperLimit: record.buyQtyUpperLimit * 100,
            SellQtyUpperLimit: record.sellQtyUpperLimit * 100,
            MarketBuyQtyUpperLimit: record.marketBuyQtyUpperLimit * 100,
            MarketSellQtyUpperLimit: record.marketSellQtyUpperLimit * 100,
            // SecurityStatus: record.securityStatus + "",
            HasPriceLimit: record.hasPriceLimit + "",
            LimitType: record.limitType + "",
            Property: record.property + "",
            UpperLimitPrice: record.upperLimitPrice * 10000,
            LowerLimitPrice: record.lowerLimitPrice * 10000,
            BuyQtyUnit: record.buyQtyUnit * 100,
            SellQtyUnit: record.sellQtyUnit * 100,
            MarketBuyQtyUnit: record.marketBuyQtyUnit * 100,
            MarketSellQtyUnit: record.marketSellQtyUnit * 100,
        };
        // 0正常, 1停盘, 2退市, 4-ST, 5-*ST,6-上市次日到5日(无涨跌幅), 7-删除
        params.securityStatus = "7";
        console.log("删除参数 ", params);
        // return;
        http.post({
            url: "/security/updateSecurityInfo",
            data: params,
        }).then((res) => {
            let msg = res.message;
            if (res.code == 0) {
                message.success("删除成功");
                // this.getData();
                this.getData(this.searchParam, this.state.pagination);
            } else if (res.code == 20000) {
                message.error(
                    msg.substring(msg.indexOf("[") + 1, msg.lastIndexOf("]"))
                );
            } else {
                message.error("删除失败");
            }
            this.isAction = true;
        });
    };
    //填入更新数据
    setUpdateModal = ({ form, record }) => {
        this.record = record;
        form.setFieldsValue({
            securityId: record.securityId,
            securityIdSource: record.securityIdSource,
            securityName: record.securityName,
            prevClosePx: record.prevClosePx,
            buyQtyUpperLimit: record.buyQtyUpperLimit,
            sellQtyUpperLimit: record.sellQtyUpperLimit,
            marketBuyQtyUpperLimit: record.marketBuyQtyUpperLimit,
            marketSellQtyUpperLimit: record.marketSellQtyUpperLimit,
            securityStatus: record.securityStatus + "",
            hasPriceLimit: record.hasPriceLimit + "",
            limitType: record.limitType + "",
            property: record.property + "",
            upperLimitPrice: record.upperLimitPrice,
            lowerLimitPrice: record.lowerLimitPrice,
            buyQtyUnit: record.buyQtyUnit,
            sellQtyUnit: record.sellQtyUnit,
            marketBuyQtyUnit: record.marketBuyQtyUnit,
            marketSellQtyUnit: record.marketSellQtyUnit,
            // BuyQtyUnit:record.
            // SellQtyUnit:record.
            // MarketBuyQtyUnit:record.
            // MarketSellQtyUnit:record.
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
            url: "/security/list",
            data: params,
        }).then((res) => {
            console.log(res);
            let list;
            //解析数据字典
            if (res.data.records && res.data.records.length > 0) {
                // parseDict(res.data.records);
                parseDictValue(res.data.records);
                list = res.data.records;
                list.forEach((item) => {
                    if (item.creditTypeValue == 0) {
                        item.creditTypeValue = "";
                    }
                });
                // console.log(list);
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
                info: list,
                pagination: pgn,
            });
        });
    };
    handleSearch = (params, pagination) => {
        this.searchParam = params;
        this.getData(params, pagination);
    };
    componentDidMount() {
        this.getData();
    }
    render() {
        let scroll = { x: 3200, y: 445 };
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
                    insertBtnText={"新增"} // 不传 就没新增按钮
                    getInsertFormFields={getInsertFormFields}
                    insertRecord={this.handleInsertRecord}
                    // col="2"
                    width="600px"
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
                        urlPrefix="/security"
                        title="证券信息"
                        sucCallback={this.getData}
                    ></div>
                </CurdComponent>
            </div>
        );
    }
}
