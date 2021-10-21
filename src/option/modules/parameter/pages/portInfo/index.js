import React from "react";
import CurdComponent from "@/components/CurdComponent";
// import SelectOption from "@/components/SelectOption";
// import { Input, Tag } from "antd";

const columns = (params) => {
    return [
        {
            title: "端口号",
            dataIndex: "port",
            key: "port",
            width: 100,
        },
        {
            title: "端口说明",
            dataIndex: "portName",
            key: "portName",
            width: 150,
        },
        {
            title: "输入/输出的数据包数量",
            dataIndex: "num",
            key: "num",
            width: 150,
        },
        {
            title: "端口运行状态",
            dataIndex: "statusValue",
            key: "statusValue",
            width: 100,
        },
    ];
};

export default class portInfo extends React.PureComponent {
    state = {
        searchLoading: false,
        selectRow: [],
        info: [],
    };
    getData = () => {
        http.post({
            url: "/tcp/sPortInfo/1021",
        }).then((res) => {
            console.log(res); // {code: 2002, msg: null}
            //解析数据字典
            if (res.data && res.data) {
                parseDict(res.data);
                this.setState({
                    info: res.data,
                });
            }
        });
    };
    componentDidMount() {
        this.getData();
    }
    render() {
        let scroll = { x: 800, y: 445 };
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
                    rowKey={"id"}
                    isShowSearchForm={false}
                    // onSearchClick={this.handleSearch}
                    // getSearchFormFields={getSearchFormFields}
                    // searchLoading={this.state.searchLoading}
                    // isShowInsert={false}
                    // insertBtnText={"新增记录"} // 不传 就没新增按钮
                    // addBtnArr={this.state.addBtnArr}
                    // getInsertFormFields={getInsertFormFields}
                    // insertRecord={this.handleInsertRecord}
                    // getUpdateFormFields={getUpdateFormFields}
                    // setUpdateModal={this.setUpdateModal}
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
