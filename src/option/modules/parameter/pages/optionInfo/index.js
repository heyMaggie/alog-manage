import React from "react";
import CurdComponent from "@/components/CurdComponent";
// import SelectOption from "@/components/SelectOption";
import { Input } from "antd";

// const getUpdateFormFields = () => {
//     return []
// };

const columns = (params) => {
    return [
        {
            title: "合约简称",
            dataIndex: "contractName",
            width: 200,
        },
        {
            title: "合约代码",
            dataIndex: "contractCode",
            width: 150,
        },
        // {
        //     title: "合约账户标识码",
        //     dataIndex: "contractAccountCode",
        //     width: 150,
        // },
        {
            title: "合约编码",
            dataIndex: "optionId",
            width: 100,
        },
        {
            title: "证券代码源",
            dataIndex: "optionIdSource",
            width: 160,
        },
        {
            title: "标的资产",
            dataIndex: "usecurityId",
            width: 100,
        },
        {
            title: "合约类型",
            dataIndex: "contractType",
            width: 200,
        },
        {
            title: "合约单位",
            dataIndex: "contractUnit",
            width: 100,
        },
        {
            title: "到期月份",
            dataIndex: "expirateMonth",
            width: 100,
        },
        {
            title: "行权日",
            dataIndex: "exerciseDate",
            width: 150,
        },
        {
            title: "到期日",
            dataIndex: "expirateDate",
            width: 150,
        },
        {
            title: "交收日",
            dataIndex: "deliverDate",
            width: 150,
        },
        // 字典
        {
            title: "行权价格",
            dataIndex: "strikePrice",
            width: 100,
        },
        {
            title: "行权价格间距",
            dataIndex: "strikePriceStep",
            width: 150,
        },
        {
            title: "行权方式",
            dataIndex: "exerciseMethod",
            width: 150,
        },
        {
            title: "交割方式",
            dataIndex: "deliverMethod",
            width: 100,
        },
        {
            title: "最小变动单位",
            dataIndex: "minChangeUnit",
            width: 150,
        },
        {
            title: "期权状态",
            dataIndex: "optionStatus",
            width: 100,
        },
        {
            title: "前收盘价",
            dataIndex: "prevClosePrice",
            width: 100,
        },
        {
            title: "线性浮动比例",
            dataIndex: "floatRatio",
            width: 150,
        },
        {
            title: "认购非线性比例参数1",
            dataIndex: "firstRatioCall",
            width: 200,
        },
        {
            title: "认购非线性比例参数2",
            dataIndex: "secondRatioCall",
            width: 200,
        },
        {
            title: "认沽非线性比例参数1",
            dataIndex: "firstRatioPut",
            width: 200,
        },
        {
            title: "认沽维持保证金参数2",
            dataIndex: "secondRatioPut",
            width: 200,
        },
        {
            title: "限价买数量上限",
            dataIndex: "buyQtyUpperLimit",
            width: 150,
        },
        {
            title: "限价卖数量上限",
            dataIndex: "sellQtyUpperLimit",
            width: 150,
        },
        {
            title: "市价买数量上限",
            dataIndex: "marketBuyQtyUpLimit",
            width: 150,
        },
        {
            title: "市价卖数量上限",
            dataIndex: "marketSellQtyUpLimit",
            width: 150,
        },
        {
            title: "买数量单位",
            dataIndex: "buyQtyUnit",
            width: 120,
        },
        {
            title: "卖数量单位",
            dataIndex: "sellQtyUnit",
            width: 120,
        },
        {
            title: "价格档次",
            dataIndex: "priceTick",
            width: 100,
        },
        {
            title: "涨价限制值",
            dataIndex: "upperLimitPrice",
            width: 120,
        },
        {
            title: "跌价限制值",
            dataIndex: "lowerLimitPrice",
            width: 120,
        },
        {
            title: "昨卖开每张保证金",
            dataIndex: "lastSellMargin",
            width: 200,
        },
        {
            title: "今卖开每张保证金",
            dataIndex: "sellMargin",
            width: 200,
        },
        {
            title: "做市商标识",
            dataIndex: "marketMakeFlag",
            width: 120,
        },
        {
            title: "交易时间组",
            dataIndex: "tradeTimeGroup",
            width: 120,
        },
        {
            title: "当日权利仓上限",
            dataIndex: "dayRightsUpper",
            width: 150,
        },
        {
            title: "当日义务仓上限",
            dataIndex: "dayObligUpper",
            width: 150,
        },
        {
            title: "累计权利仓上限",
            dataIndex: "cumRightsUpper",
            width: 150,
        },
        {
            title: "累计义务仓上限",
            dataIndex: "cumObligUpper",
            width: 150,
        },
        {
            title: "可用的组合策略",
            dataIndex: "availableStrategy",
            width: 280,
        },
        {
            title: "策略自动解除日",
            dataIndex: "autoSplitDay",
            width: 150,
        },
    ];
};
let getSearchFormFields = () => {
    return [
        {
            label: "合约编码",
            id: "optionId",
            component: <Input placeholder="请输入合约编码" />,
        },
        // {
        //     label: "合约代码",
        //     id: "contractCode",
        //     component: <Input placeholder="请输入合约代码" />,
        // },
        // {
        //     label: "合约简称",
        //     id: "contractName",
        //     component: <Input placeholder="请输入合约简称" />,
        // },
        // {
        //     label: "合约账户标识",
        //     id: "contractAccountCode",
        //     component: <Input placeholder="请输入合约账户标识" />,
        // },
    ];
};
export default class uoeSetting extends React.PureComponent {
    state = {
        searchLoading: false,
        selectRow: [],
        info: [],
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
            url: "/tcp/uoeMore/1011",
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
    getData = (params = {}) => {
        // params.token = "";
        http.post({
            // url: "/optionInfo/selectList",
            url: "/optionInfo/selectList",
            data: params,
        }).then((res) => {
            console.log(res);
            //解析数据字典
            if (res.data.length > 0) {
                // parseArrDict(res.data, "optionIdSource", "securityIDSource");
                parseDict(res.data);
                showStip(this);
            } else {
                message.info("查询结果为空");
            }
            this.setState({
                info: res.data,
            });
        });
    };
    handleSearch = (params) => {
        this.getData(params);
    };
    componentDidMount() {
        this.getData();
    }
    // getDataPermissionArr = (number) => {
    //     // console.log(number);
    //     let num = number / 1;
    //     let decStr = num.toString(2);
    //     // console.log(decStr);
    //     // console.log(decStr);
    //     let tmpArr = [];
    //     for (let i = 0; i < decStr.length; i++) {
    //         if (decStr.charAt(i) == 1 && i == decStr.length - 1) {
    //             tmpArr.push("CNSJC");
    //         }
    //         if (decStr.charAt(i) == 1 && i == decStr.length - 2) {
    //             console.log(decStr);
    //             tmpArr.push("CXSJC");
    //         }
    //         if (decStr.charAt(i) == 1 && i == decStr.length - 3) {
    //             tmpArr.push("PNSJC");
    //         }
    //         if (decStr.charAt(i) == 1 && i == decStr.length - 4) {
    //             tmpArr.push("PXSJC");
    //         }
    //         if (decStr.charAt(i) == 1 && i == decStr.length - 5) {
    //             tmpArr.push("KS");
    //         }
    //         if (decStr.charAt(i) == 1 && i == decStr.length - 6) {
    //             tmpArr.push("KKS");
    //         }
    //     }
    //     this.dictArr.push({ key: number, value: tmpArr.toString() });
    //     // console.log(pmArr.reverse());
    //     // return pmArr.reverse();
    // };
    render() {
        let scroll = { x: 2000, y: 445 };
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
                    // isShowSearchForm={false}
                    // btnText2="查全部"
                    onSearchClick={this.handleSearch}
                    getSearchFormFields={getSearchFormFields}
                    // searchLoading={this.state.searchLoading}
                    // insertBtnText={"新增UOE配置"} // 不传 就没新增按钮
                    // getInsertFormFields={getInsertFormFields}
                    // insertRecord={this.handleInsertRecord}
                    // col="2"
                    width="600px"
                    // getUpdateFormFields={getUpdateFormFields}
                    setUpdateModal={this.setUpdateModal}
                    // updateRecord={this.handleUpdateRecord} // 不传 就没编辑
                    // deleteRecord={this.handleDeleteRecord} // 不传 就没删除
                    centered={true}
                    columns={columns}
                    dataSource={info}
                    scroll={scroll}
                    // rowSelection={rowSelection} //批量选择 操作
                ></CurdComponent>
            </div>
        );
    }
}
