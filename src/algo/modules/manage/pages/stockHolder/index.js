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
            title: "整型用户ID",
            dataIndex: "uuserId",
            key: "uuserId",
        },
        {
            title: "股东账户ID",
            dataIndex: "accountId",
            key: "accountId",
        },
        {
            title: "市场代码",
            dataIndex: "market",
            key: "market",
        },
        {
            title: "账户类型",
            dataIndex: "accountType",
            key: "accountType",
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
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
    getData = (params) => {
        http.get({
            // url: "/option/assetInfo/selectList",
            url: "/stockHolder/list",
            data: params,
        }).then((res) => {
            console.log(res);
            //解析数据字典
            if (res.data.length > 0) {
                parseDict(res.data);
                this.setState({
                    info: res.data,
                });
            } else {
                message.info("查询结果为空");
            }
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
                    isShowSearchForm={false}
                    // btnText2="查全部"
                    // onSearchClick={this.handleSearch}
                    // getSearchFormFields={getSearchFormFields}
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
