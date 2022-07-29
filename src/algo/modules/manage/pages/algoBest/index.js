import React from "react";
import CurdComponent from "@/components/CurdComponent";
import SelectOption from "@/components/SelectOption";
import { Input } from "antd";

let columns = (params) => {
    return [
        {
            title: "ID",
            dataIndex: "securityId",
            key: "securityId",
        },
        {
            title: "算法厂商",
            dataIndex: "securityIdSource",
            key: "securityIdSource",
        },
        {
            title: "算法类型",
            dataIndex: "securityName",
            key: "securityName",
        },
        {
            title: "算法名称",
            dataIndex: "prevClosePx",
            key: "prevClosePx",
        },
        {
            title: "股票代码",
            dataIndex: "securityStatusValue",
            key: "securityStatus",
        },
        {
            title: "股票名称",
            dataIndex: "securityStatusValue",
            key: "securityStatus",
        },
        {
            title: "开仓率",
            dataIndex: "propertyValue",
            key: "property",
        },
        {
            title: "收益率",
            dataIndex: "buyQtyUpperLimit",
            key: "buyQtyUpperLimit",
        },
        {
            title: "基点",
            dataIndex: "buyQtyUnit",
        },
        {
            title: "创建时间",
            dataIndex: "sellQtyUpperLimit",
            key: "sellQtyUpperLimit",
        },
    ];
};

export default class algoBest extends React.PureComponent {
    state = {
        searchLoading: false,
        selectRow: [],
        info: [],
        pagination: { total: 0 },
        providerList: [],
    };
    getSearchFormFields = () => {
        return [
            {
                label: "算法厂商",
                id: "securityId",
                component: SelectOption(this.state.providerList, {
                    placeholder: "请选择",
                    allowClear: true,
                    // onChange: this.inputChange,
                }),
            },
            {
                label: "算法类型",
                id: "securityId4",
                component: SelectOption(dict.algorithmType, {
                    placeholder: "请选择",
                    allowClear: true,
                    // style: {
                    //     width: 400,
                    // },
                }),
            },
            {
                label: "算法",
                id: "securityId3",
                component: <Input placeholder="请输入：接口返回？" />,
            },
            {
                label: "股票",
                id: "securityId2",
                component: <Input placeholder="请输入：接口返回？" />,
            },
        ];
    };

    getInsertFormFields = () => {
        return [
            {
                label: "算法厂商",
                id: "ProviderName",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                // component: <Input placeholder="请输入" />,
                component: SelectOption(this.state.providerList, {
                    placeholder: "请选择",
                    // onChange: this.inputChange,
                }),
            },
            {
                label: "算法类型",
                id: "AlgorithmType",
                initialValue: "1",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: SelectOption(dict.algorithmType, {
                    placeholder: "请选择",
                    // allowClear: true,
                    style: {
                        width: 400,
                    },
                }),
            },
            {
                label: "股票代码",
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
                label: "开仓率",
                id: "prevClosePx",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        message: "请输入0%-100% 之间的数",
                        pattern: new RegExp(
                            "(^(\\d|[1-9]\\d)(\\.\\d{1,2})?$)|(^100$)"
                        ),
                    },
                ],
                component: <Input placeholder="请输入" suffix="%" />,
            },
            {
                label: "收益率",
                id: "securityStatus",
                initialValue: "0",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        message: "请输入0%-100% 之间的数",
                        pattern: new RegExp(
                            "(^(\\d|[1-9]\\d)(\\.\\d{1,2})?$)|(^100$)"
                        ),
                    },
                ],
                component: <Input placeholder="请输入" suffix="%" />,
            },
            {
                label: "基点",
                id: "property",
                initialValue: "0",
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
    getUpdateFormFields = () => {
        return [
            {
                label: "算法厂商",
                id: "ProviderName",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                // component: <Input placeholder="请输入" />,
                component: SelectOption(this.state.providerList, {
                    placeholder: "请选择",
                    // onChange: this.inputChange,
                }),
            },
            {
                label: "算法类型",
                id: "AlgorithmType",
                initialValue: "1",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: SelectOption(dict.algorithmType, {
                    placeholder: "请选择",
                    // allowClear: true,
                    style: {
                        width: 400,
                    },
                }),
            },
            {
                label: "股票代码",
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
                label: "开仓率",
                id: "prevClosePx",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        message: "请输入0%-100% 之间的数",
                        pattern: new RegExp(
                            "(^(\\d|[1-9]\\d)(\\.\\d{1,2})?$)|(^100$)"
                        ),
                    },
                ],
                component: <Input placeholder="请输入" suffix="%" />,
            },
            {
                label: "收益率",
                id: "securityStatus",
                initialValue: "0",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                    {
                        message: "请输入0%-100% 之间的数",
                        pattern: new RegExp(
                            "(^(\\d|[1-9]\\d)(\\.\\d{1,2})?$)|(^100$)"
                        ),
                    },
                ],
                component: <Input placeholder="请输入" suffix="%" />,
            },
            {
                label: "基点",
                id: "property",
                initialValue: "0",
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
            SecurityStatus: fromData.securityStatus * 1,
            HasPriceLimit: fromData.hasPriceLimit * 1,
            LimitType: fromData.limitType * 1,
            Property: fromData.property * 1,
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
            SecurityStatus: fromData.securityStatus * 1,
            HasPriceLimit: fromData.hasPriceLimit * 1,
            LimitType: fromData.limitType * 1,
            Property: fromData.property * 1,
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
                // parseDict(res.data.records);
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
    };
    //获取所有厂商
    getProvider = (params = {}) => {
        // return;
        http.get({
            // url: "/risk/queryRisk",
            url: "/algo/listProvider",
            data: params,
        }).then((res) => {
            console.log(res);
            let idArr = [];
            if (res.data && res.data.length > 0) {
                let dataArr = res.data;
                if (dataArr.length > 0) {
                    idArr = dataArr.map((item) => {
                        let obj = {};
                        // obj.key = item.providerName + "-" + item.uuserId;
                        // obj.value = item.providerName + "-" + item.uuserId;
                        obj.key = item.userName + "-" + item.id;
                        obj.value = item.userName + "-" + item.id;
                        return obj;
                    });
                    // console.log(idArr);
                }
            }
            this.setState({
                providerList: idArr,
            });
        });
    };
    handleSearch = (params, pagination) => {
        this.getData(params, pagination);
    };
    componentDidMount() {
        this.getData();
        this.getProvider();
    }
    render() {
        let scroll = { x: 1200, y: 445 };
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
                    getSearchFormFields={this.getSearchFormFields}
                    // searchLoading={this.state.searchLoading}
                    insertBtnText={"新增"} // 不传 就没新增按钮
                    getInsertFormFields={this.getInsertFormFields}
                    insertRecord={this.handleInsertRecord}
                    // col="2"
                    width="600px"
                    pagination={this.state.pagination}
                    getUpdateFormFields={this.getUpdateFormFields}
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
                        title="算法优选"
                        sucCallback={this.getData}
                    ></div>
                </CurdComponent>
            </div>
        );
    }
}
