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
            dataIndex: "securityIdSource",
            key: "securityIdSource",
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
            dataIndex: "securityStatus",
            key: "securityStatus",
        },
        {
            title: "股票板块属性",
            dataIndex: "property",
            key: "property",
        },
        {
            title: "限价买数量上限",
            dataIndex: "buyQtyUpperLimit",
            key: "buyQtyUpperLimit",
        },
        {
            title: "限价卖数量上限",
            dataIndex: "sellQtyUpperLimit",
            key: "sellQtyUpperLimit",
        },
        {
            title: "市价买数量上限",
            dataIndex: "marketBuyQtyUpperLimit",
            key: "marketBuyQtyUpperLimit",
        },
        {
            title: "市价卖数量上限",
            dataIndex: "marketSellQtyUpperLimit",
            key: "marketSellQtyUpperLimit",
        },
        {
            title: "是否有涨跌限制",
            dataIndex: "hasPriceLimit",
            key: "hasPriceLimit",
        },
        {
            title: "涨跌限制类型",
            dataIndex: "limitType",
            key: "limitType",
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
                    width: 183,
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
                    width: 183,
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
            ],
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
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
            ],
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
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
                    width: 183,
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
                    width: 183,
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
            ],
            component: <Input placeholder="请输入" />,
        },
    ];
};
const getUpdateFormFields = () => {
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
            ],
            component: <Input placeholder="请输入" />,
        },
        {
            label: "证券状态",
            id: "securityStatus",
            initialValue: "",
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
                    width: 183,
                },
            }),
        },
        {
            label: "股票板块属性",
            id: "property",
            initialValue: "",
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
                    width: 183,
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
            ],
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
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
            ],
            component: (
                // <Input placeholder="请输入" readOnly disabled />
                <Input placeholder="请输入" />
            ),
        },
        {
            label: "是否有涨跌限制",
            id: "hasPriceLimit",
            initialValue: "",
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
                    width: 183,
                },
            }),
        },
        {
            label: "涨跌限制类型",
            id: "limitType",
            initialValue: "",
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
                    width: 183,
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
            ],
            component: <Input placeholder="请输入" />,
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

    handleInsertRecord = (fromData) => {
        console.log("新增接口", fromData);
        let params = {
            SecurityId: fromData.securityId,
            SecurityIdSource: fromData.securityIdSource,
            SecurityName: fromData.securityName,
            PrevClosePx: fromData.prevClosePx,
            BuyQtyUpperLimit: fromData.buyQtyUpperLimit,
            SellQtyUpperLimit: fromData.sellQtyUpperLimit,
            MarketBuyQtyUpperLimit: fromData.marketBuyQtyUpperLimit,
            MarketSellQtyUpperLimit: fromData.marketSellQtyUpperLimit,
            SecurityStatus: fromData.securityStatus,
            HasPriceLimit: fromData.hasPriceLimit,
            LimitType: fromData.limitType,
            Property: fromData.property,
            UpperLimitPrice: fromData.upperLimitPrice,
            LowerLimitPrice: fromData.lowerLimitPrice,
            // BuyQtyUnit BuyQtyUnit:fromData.
            // SellQtyUnit SellQtyUnit:fromData.
            // MarketBuyQtyUnit MarketBuyQtyUnit:fromData.
            // MarketSellQtyUnit MarketSellQtyUnit:fromData.
        };
        http.post({
            url: "/security/addSecurityInfo",
            data: params,
        }).then((res) => {
            if (res.code == 0) {
                message.success(res.message);
                this.isAction = true;
                this.getData();
            } else {
                message.error("新增证券信息失败");
                this.isAction = true;
            }
        });
    };
    //更新记录
    handleUpdateRecord = ({ form }) => {
        console.log(form.getFieldsValue());
        // return;
        let fromData = form.getFieldsValue();
        let params = {
            SecurityId: fromData.securityId,
            SecurityIdSource: fromData.securityIdSource,
            SecurityName: fromData.securityName,
            PrevClosePx: fromData.prevClosePx,
            BuyQtyUpperLimit: fromData.buyQtyUpperLimit,
            SellQtyUpperLimit: fromData.sellQtyUpperLimit,
            MarketBuyQtyUpperLimit: fromData.marketBuyQtyUpperLimit,
            MarketSellQtyUpperLimit: fromData.marketSellQtyUpperLimit,
            SecurityStatus: fromData.securityStatus,
            HasPriceLimit: fromData.hasPriceLimit,
            LimitType: fromData.limitType,
            Property: fromData.property,
            UpperLimitPrice: fromData.upperLimitPrice,
            LowerLimitPrice: fromData.lowerLimitPrice,
            // BuyQtyUnit BuyQtyUnit:fromData.
            // SellQtyUnit SellQtyUnit:fromData.
            // MarketBuyQtyUnit MarketBuyQtyUnit:fromData.
            // MarketSellQtyUnit MarketSellQtyUnit:fromData.
        };
        // 发送更新请求
        http.post({
            url: "/security/updateSecurityInfo",
            data: params,
        }).then((res) => {
            if (res.code == 0) {
                message.success(res.message);
                this.isAction = true;
                this.getData();
            } else {
                message.error("修改股东信息失败");
                this.isAction = true;
            }
        });
    };
    //删除记录
    handleDeleteRecord = (record) => {
        console.log("删除记录 ", record);
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
            securityStatus: record.securityStatus,
            hasPriceLimit: record.hasPriceLimit,
            limitType: record.limitType,
            property: record.property,
            upperLimitPrice: record.upperLimitPrice,
            lowerLimitPrice: record.lowerLimitPrice,
            // BuyQtyUnit:record.
            // SellQtyUnit:record.
            // MarketBuyQtyUnit:record.
            // MarketSellQtyUnit:record.
        });
    };
    getData = (params = {}, pagination = { current: 1, pageSize: 11 }) => {
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
            //解析数据字典
            if (res.data.records && res.data.records.length > 0) {
                parseDict(res.data.records);
                // showTip(this);
            } else {
                message.info("查询结果为空");
            }
            let pgn = {
                current: pagination.current,
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
        let scroll = { x: 3000, y: 445 };
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
                    // deleteRecord={this.handleDeleteRecord} // 不传 就没删除
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
