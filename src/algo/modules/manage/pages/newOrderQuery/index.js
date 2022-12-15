import React from "react";
import CurdComponent from "@/components/CurdComponent";
import SelectOption from "@/components/SelectOption";
import { Input } from "antd";
import TagLabel from "@/components/Tag";

const getUpdateFormFields = () => {};
const columns = (params) => {
    return [
        {
            title: "母单ID",
            dataIndex: "id",
            width: 100,
        },
        {
            title: "用户名称",
            dataIndex: "userName",
            width: 100,
        },
        {
            title: "篮子ID",
            dataIndex: "basketId",
            width: 120,
        },
        {
            title: "业务类型",
            dataIndex: "businessType",
            width: 100,
        },
        {
            title: "算法类型",
            dataIndex: "algorithmType",
            width: 150,
        },
        {
            title: "算法ID",
            dataIndex: "algorithmId",
            width: 100,
        },
        {
            title: "证券代码",
            dataIndex: "securityId",
            width: 120,
        },
        {
            title: "市场代码",
            dataIndex: "market",
        },
        {
            title: "所有方向",
            dataIndex: "side",
        },
        // {
        //     title: "母单订单数量 ",
        //     dataIndex: "algoOrderQty",
        //     width: 120,
        // },
        {
            title: "算法参数",
            dataIndex: "strategyParam",
            width: 200,
        },
        {
            title: "客户端序列号",
            dataIndex: "seq",
            width: 130,
        },
        {
            title: "算法状态",
            dataIndex: "algorithmStatus",
            width: 170,
        },
        {
            // title: "母单状态",
            title: "订单状态",
            dataIndex: "algoOrdStatus",
            width: 150,
            render: (text, record) => {
                // return (
                //     <TagLabel
                //         record={record.algoOrdStatus}
                //         type="success"
                //     ></TagLabel>
                // );
                if (
                    record.algoOrdStatus.indexOf("0") == 0 ||
                    record.algoOrdStatus.indexOf("2") == 0
                ) {
                    return (
                        <div>
                            <TagLabel
                                record={record.algoOrdStatus}
                                // type="success"
                            ></TagLabel>
                        </div>
                    );
                } else if (
                    record.algoOrdStatus.indexOf("1") == 0 ||
                    record.algoOrdStatus.indexOf("3") == 0 ||
                    record.algoOrdStatus.indexOf("4") == 0
                ) {
                    return (
                        <TagLabel
                            record={record.algoOrdStatus}
                            type="fail"
                        ></TagLabel>
                    );
                } else if (
                    record.algoOrdStatus.indexOf("5") == 0 ||
                    record.algoOrdStatus.indexOf("7") == 0
                ) {
                    return (
                        <TagLabel
                            record={record.algoOrdStatus}
                            type="warn"
                        ></TagLabel>
                    );
                } else if (record.algoOrdStatus.indexOf("6") == 0) {
                    return (
                        <TagLabel
                            record={record.algoOrdStatus}
                            type="success"
                        ></TagLabel>
                    );
                }
                return <TagLabel record={record.algoOrdStatus}></TagLabel>;
            },
        },
        {
            title: "母单在篮子表中的状态",
            dataIndex: "basketStatus",
            width: 180,
        },
        {
            title: "请求用户ID",
            dataIndex: "reqUserId",
            width: 140,
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
            title: "个人账户",
            dataIndex: "userId",
            width: 140,
        },
        {
            title: "算法平台账户",
            dataIndex: "algoUserId",
            width: 130,
        },
        {
            title: "股东账户",
            dataIndex: "accountId",
            width: 140,
        },
        {
            title: "证券代码源",
            dataIndex: "securityIdSource",
            width: 130,
        },
        {
            title: "交易时间",
            dataIndex: "transactTime",
            width: 180,
        },
        {
            title: "母单订单数量 ",
            dataIndex: "algoOrderQty",
            width: 140,
        },
        {
            title: "子单买订单数量 ",
            dataIndex: "buyOrderQty",
            width: 150,
        },
        {
            title: "子单卖订单数量 ",
            dataIndex: "sellOrderQty",
            width: 150,
        },
        {
            title: "累计成交买订单数量 ",
            dataIndex: "buyCumQty",
            width: 170,
        },
        {
            title: "累计成交卖订单数量 ",
            dataIndex: "sellCumQty",
            width: 170,
        },
        {
            title: "子单买撤单数量 ",
            dataIndex: "buyCancelQty",
            width: 160,
        },
        {
            title: "子单卖撤单数量 ",
            dataIndex: "sellCancelQty",
            width: 160,
        },
        {
            title: "累计买撤单成功数量 ",
            dataIndex: "buyCancelledCumQty",
            width: 170,
        },
        {
            title: "累计卖撤单成功数量 ",
            dataIndex: "sellCancelledCumQty",
            width: 170,
        },
        {
            title: "平均买入价格",
            dataIndex: "buyPrice",
            width: 150,
        },
        {
            title: "平均卖出价格",
            dataIndex: "sellPrice",
            width: 150,
        },
        {
            title: "平均买入开仓价格",
            dataIndex: "buyOpenPrice",
            width: 170,
        },
        {
            title: "平均买入平仓价格",
            dataIndex: "buyClosePrice",
            width: 170,
        },
        {
            title: "平均卖出开仓价格",
            dataIndex: "sellOpenPrice",
            width: 170,
        },
        {
            title: "平均卖出平仓价格",
            dataIndex: "sellClosePrice",
            width: 170,
        },

        {
            title: "盈亏",
            dataIndex: "profitAndLoss",
            width: 80,
        },
        {
            title: "收益率",
            dataIndex: "rateOfReturn",
            width: 100,
        },
        {
            title: "成功下单的买入总委托金额",
            dataIndex: "buySuccAmount",
            width: 210,
        },
        {
            title: "成功撤单的买入总委托金额",
            dataIndex: "sellSuccAmount",
            width: 210,
        },
        {
            title: "子单买订单总条数",
            dataIndex: "buyItemTotal",
            width: 160,
        },
        {
            title: "子单卖订单总条数",
            dataIndex: "sellItemTotal",
            width: 170,
        },
        {
            title: "子单买订单成功条数",
            dataIndex: "buyItemCount",
            width: 170,
        },
        {
            title: "子单卖订单成功条数",
            dataIndex: "sellItemCount",
            width: 170,
        },
        {
            title: "累计成交买订单条数",
            dataIndex: "buyItemCum",
            width: 170,
        },
        {
            title: "累计成交卖订单条数",
            dataIndex: "sellItemCum",
            width: 170,
        },

        {
            title: "子单买撤单条数",
            dataIndex: "buyCancelItemCount",
            width: 150,
        },
        {
            title: "子单卖撤单条数",
            dataIndex: "sellCancelItemCount",
            width: 150,
        },
        {
            title: "累计买撤单成功条数",
            dataIndex: "buyCancelledItemCum",
            width: 170,
        },
        {
            title: "累计卖撤单成功条数",
            dataIndex: "sellCancelledItemCum",
            width: 170,
        },
        {
            title: "风控自成交子单数计数",
            dataIndex: "selfExecCount",
            width: 180,
        },
        {
            title: "成交记录ID",
            dataIndex: "version",
            width: 120,
        },
    ];
};
const getSearchFormFields = () => {
    return [
        {
            // label: "母单ID",
            label: <span>母&nbsp;&nbsp;单&nbsp;ID</span>,
            id: "id",
            component: <Input placeholder="请输入" />,
        },
        {
            label: "用户名称",
            // label: <span>用&nbsp;&nbsp;户&nbsp;ID</span>,
            id: "userName",
            component: <Input placeholder="请输入" />,
        },
        {
            // label: "篮子ID",
            label: <span>篮&nbsp;&nbsp;子&nbsp;ID</span>,
            id: "basketId",
            component: <Input placeholder="请输入" />,
        },
        {
            // label: "算法ID",
            label: <span>算&nbsp;&nbsp;法&nbsp;ID</span>,
            id: "algorithmId",
            initialValue: "",
            component: <Input placeholder="请输入" />,
        },
        {
            label: "证券代码",
            id: "securityId",
            initialValue: "",
            component: <Input placeholder="请输入" />,
        },
        {
            label: "业务类型",
            id: "businessType",
            // initialValue: "1",
            component: SelectOption(dict.businessTypeSelect, {
                placeholder: "请选择",
                // allowClear: true,
            }),
        },
    ];
};
export default class newOrderQuery extends React.PureComponent {
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
        // return
    };
    //删除记录
    handleDeleteRecord = (record) => {
        console.log("删除记录 ", record);
    };
    //填入更新数据
    setUpdateModal = ({ form, record }) => {};
    getData = (params = {}, pagination = { current: 1, pageSize: 12 }) => {
        // params.token = "";
        // params.pageId = 1;
        // params.pageNum = 20;
        // if (!params.businessType) {
        //     params.businessType = 1;
        // }
        params = {
            ...params,
            pageId: pagination.current,
            pageNum: pagination.pageSize,
        };
        http.post({
            url: "/new-algo-order/list",
            data: params,
        }).then((res) => {
            console.log(res);
            //解析数据字典
            if (res.data.records && res.data.records.length > 0) {
                parseArrDict(res.data.records, "basketStatus", "bStatus");
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
        // console.log("获取搜索栏数据 ", params);
        this.getData(params, pagination);
    };
    componentDidMount() {
        this.getData();
    }
    render() {
        let scroll = { x: 6000, y: 445 };
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
                    // dtCol={2}
                    dtWidth="800px"
                    dtColumns={columns()} //详情列表
                    // dtCol={2} //详情列数
                    centered={true}
                    columns={columns}
                    dataSource={info}
                    scroll={scroll}
                    // rowSelection={rowSelection} //批量选择 操作
                >
                    <div
                        urlPrefix="/new-algo-order"
                        noUpload={true}
                        title="母单信息"
                        sucCallback={this.getData}
                    ></div>
                </CurdComponent>
            </div>
        );
    }
}
