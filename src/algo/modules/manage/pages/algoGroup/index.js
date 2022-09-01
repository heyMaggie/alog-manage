import React from "react";
import CurdComponent from "@/components/CurdComponent";
// import SelectOption from "@/components/SelectOption";
import { Input, Button, Modal, Form, Switch, Row, Col } from "antd";
import Table from "@/components/Table";
import styles from "./style.module.less";

let getSearchFormFields = () => {
    return [
        {
            label: "权限ID",
            id: "id",
            component: <Input placeholder="请输入" />,
        },
        {
            label: "算法名称",
            id: "algoName",
            component: <Input placeholder="请输入" />,
        },
    ];
};

class algoGroup extends React.PureComponent {
    columns = (params) => {
        let tab = [
            {
                title: "ID",
                dataIndex: "id",
                width: 200,
            },
            {
                title: "算法权限组名称",
                dataIndex: "groupName",
                width: 200,
            },
            {
                title: "权限",
                dataIndex: "algoProperty",
                width: 200,
            },
            {
                title: "可用算法",
                dataIndex: "algoUsed",
            },
            {
                title: "操作",
                key: "operation",
                fixed: "right",
                width: 100,
                render: (text, record) => (
                    <a
                        onClick={(e) => {
                            this.handleUpdateBtn(record);
                        }}
                    >
                        编辑
                    </a>
                ),
            },
        ];
        if (sessionStorage.userPrivilege == 2) {
            tab.pop();
        }
        return tab;
    };
    columns2 = (params) => {
        return [
            {
                title: "算法ID",
                dataIndex: "id",
                width: 100,
                ellipsis: true,
            },
            {
                title: "算法名称",
                dataIndex: "algoName",
                width: 150,
                ellipsis: true,
            },
            {
                title: "算法厂商",
                dataIndex: "providerName",
                width: 150,
                ellipsis: true,
            },
            {
                title: "算法类型",
                dataIndex: "algorithmType",
                width: 150,
                ellipsis: true,
            },
            {
                title: "是否有权限",
                dataIndex: "isShow",
                width: 150,
                ellipsis: true,
                render: (text, record) => (
                    <div
                        onDoubleClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <Switch
                            checked={record.isShow == 1}
                            size="small"
                            onChange={(e) => {
                                // console.log(text, record);
                                this.onSwitchChange(e, record);
                            }}
                        />
                    </div>
                ),
            },
        ];
    };
    state = {
        searchLoading: false,
        selectRow: [],
        info: [],
        pagination: { total: 0 },
        updateModalVisible: false,
        algoList: [], //算法列表
        modalTitle: "新增算法权限组",
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
        http.post({
            url: "/algo-group-info/addAlgoGroupInfo",
            data: params,
        }).then((res) => {
            console.log(res);
            //解析数据字典
            let msg = res.message;
            if (res.code == 0) {
                message.success(msg);
                this.getData(this.searchParam, this.state.pagination);
                this.setState({
                    updateModalVisible: false,
                });
            } else if (res.code == 20000) {
                message.error(
                    msg.substring(msg.indexOf("[") + 1, msg.lastIndexOf("]"))
                );
                this.setState({
                    updateModalVisible: false,
                });
            } else {
                message.error(msg);
                this.setState({
                    updateModalVisible: false,
                });
            }
        });
    };
    getInsertFormFields = () => {
        return [
            {
                label: "权限",
                id: "AlgoProperty",
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
                label: "算法权限组名称",
                id: "GroupName",
                initialValue: "",
                component: <Input placeholder="请输入" />,
            },
        ];
    };
    getUpdateFormFields = () => {
        return [
            {
                label: "权限",
                id: "AlgoProperty",
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
                label: "算法权限组名称",
                id: "GroupName",
                initialValue: "",
                component: <Input placeholder="请输入" />,
            },
        ];
    };
    //填入更新数据
    setUpdateModal = ({ form, record }) => {
        // console.log(record, form);
        this.record = record;
        form.setFieldsValue({
            Id: record.id,
            AlgoProperty: record.algoProperty,
            GroupName: record.groupName,
        });
    };
    //更新记录
    handleUpdateRecord = ({ form }) => {
        console.log(form.getFieldsValue());
        // return;
        let params = form.getFieldsValue();
        params.id = this.record.id;
        console.log(params);
        // return;
        http.post({
            url: "/algo-group-info/updateAlgoGroupInfo",
            data: params,
        }).then((res) => {
            console.log(res);
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
        });
    };
    // 新增按钮点击事件
    handleInsertBtn = (params) => {
        this.isInsert = true;
        this.isUpdate = false;
        this.setState({
            updateModalVisible: true,
        });
        this.props.form.resetFields();
        this.getAlgoList();
    };

    inputChange = (e) => {
        // e.persist();
        // console.log(e);
        let newAlgoArr = [...this.state.algoList];
        // let newAlgoArr = JSON.parse(JSON.stringify(this.state.algoList));
        newAlgoArr.forEach((item) => (item.isShow = "0"));
        // console.log("0x" + e.target.value);
        // console.log(isNaN("0x" + e.target.value));
        if (!isNaN("0x" + e.target.value)) {
            let val = BigInt("0x" + e.target.value);
            let bin = val.toString(2);
            // console.log(bin);
            let showArr = bin.toString().split("").reverse();
            // console.log(showArr);
            let showLen = showArr.length;
            let algoLen = this.state.algoList.length;
            let minLen = Math.min(showLen, algoLen);
            for (let i = 0; i < minLen; i++) {
                newAlgoArr[i].isShow = showArr[i];
            }
        }
    };
    onSwitchChange = (val, record) => {
        // console.log(val, record);
        let algoArr = [...this.state.algoList];
        for (let i = 0; i < algoArr.length; i++) {
            let algo = algoArr[i];
            if (algo.id == record.id) {
                algo.isShow = val ? 1 : 0;
            }
        }
        this.setState({ algoList: algoArr });
        let showArr = algoArr.map((item) => item.isShow).reverse();
        // console.log(showArr);
        let binStr = showArr.join("");
        //先使用parseInt()函数将二进制转换为十进制，语法“parseInt(string,2);”；然后使用toString()函数将十进制转换为十六进制即可，语法格式“number.toString(16)”。
        let sixteenStr = parseInt(binStr, 2).toString(16);
        console.log(sixteenStr);
        this.props.form.setFieldsValue({ AlgoProperty: sixteenStr });
    };
    // 编辑按钮点击事件
    handleUpdateBtn = (record) => {
        console.log("更新记录", record);
        this.record = record;
        this.isInsert = false;
        this.isUpdate = true;
        this.setState(
            {
                updateModalVisible: true,
            },
            () => {
                this.props.form.setFieldsValue({
                    Id: record.id,
                    AlgoProperty: record.algoProperty,
                    GroupName: record.groupName,
                });
                let val = { target: { value: record.algoProperty } };
                this.inputChange(val);
            }
        );
    };
    //弹窗确定
    handleUpdateModalOk = () => {
        this.props.form.validateFields((err) => {
            if (!err) {
                let data = this.props.form.getFieldsValue();
                // console.log(data);
                if (this.isInsert) {
                    console.log("新增算法组");
                    this.handleInsertRecord(data);
                } else {
                    console.log("修改算法组");
                    this.handleUpdateRecord2(data);
                }
            } else {
                message.error("输入内容不正确,请完善");
            }
        });
    };
    //更新记录
    handleUpdateRecord2 = (params) => {
        console.log(params);
        // return;
        http.post({
            url: "/algo-group-info/updateAlgoGroupInfo",
            data: params,
        }).then((res) => {
            console.log(res);
            let msg = res.message;
            if (res.code == 0) {
                message.success(msg);
                this.setState({
                    updateModalVisible: false,
                });
                // this.getData();
                this.getData(this.searchParam, this.state.pagination);
            } else if (res.code == 20000) {
                message.error(
                    msg.substring(msg.indexOf("[") + 1, msg.lastIndexOf("]"))
                );
                this.setState({
                    updateModalVisible: true,
                });
            } else {
                message.error(msg);
                this.setState({
                    updateModalVisible: true,
                });
            }
        });
    };
    handleUpdateModalCancel = () => {
        this.setState({
            updateModalVisible: false,
        });
    };
    //删除记录
    handleDeleteRecord = (record) => {
        console.log("删除记录 ", record);
    };

    getData = (params = {}, pagination = { current: 1, pageSize: 11 }) => {
        params = {
            ...params,
            pageId: pagination.current,
            pageNum: pagination.pageSize,
        };
        // params.token = "";
        http.post({
            url: "/algo-group-info/list",
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
        this.searchParam = params;
        this.getData(params, pagination);
    };
    getAlgoList = (
        params = {},
        pagination = { current: 1, pageSize: 1000 }
    ) => {
        params = {
            ...params,
            pageId: pagination.current,
            pageNum: pagination.pageSize,
        };
        http.post({
            url: "/algo/list",
            data: params,
        }).then((res) => {
            // console.log(res);
            //解析数据字典
            if (res.data.records && res.data.records.length > 0) {
                parseDict(res.data.records);
                // this.algoList = res.data.records;
                res.data.records.forEach((item) => (item.isShow = "0"));
                this.setState({ algoList: res.data.records });
                // console.log("算法列表", this.state.algoList);
                // showTip(this);
            } else {
                message.info("算法列表为空");
            }
        });
    };

    componentDidMount() {
        this.getData();
        this.getAlgoList();
    }
    render() {
        let scroll = { x: 1000, y: 445 };
        let scroll2 = { x: 1000, y: 500 };
        let info = this.state.info;
        //批量
        let { getFieldDecorator } = this.props.form;
        // const rowSelection = {
        //     selectRow,
        //     onChange: this.handleTableChange,
        // };.
        let modalTitle = "新增算法权限组";
        if (this.isUpdate) {
            modalTitle = "修改算法权限组";
        }
        return (
            <div className={styles.algoGroup}>
                <CurdComponent
                    // rowKey={"index"}
                    // btnText2="查全部"
                    // isShowSearchForm={false}
                    onSearchClick={this.handleSearch}
                    getSearchFormFields={getSearchFormFields}
                    // searchLoading={this.state.searchLoading}
                    insertBtnText={"新增"} // 不传 就没新增按钮
                    // getInsertFormFields={this.getInsertFormFields}
                    // insertRecord={this.handleInsertRecord}
                    hasSearchSlot={true}
                    addBtn={
                        <Button
                            type="primary"
                            icon="plus"
                            onClick={this.handleInsertBtn}
                        >
                            新增权限
                        </Button>
                    }
                    // insertModalText={"新增权限"}
                    // updateModalText={"修改权限"}
                    // col="2"
                    width="600px"
                    pagination={this.state.pagination}
                    // getUpdateFormFields={this.getUpdateFormFields}
                    // setUpdateModal={this.setUpdateModal}
                    // updateRecord={this.handleUpdateRecord} // 不传 就没编辑
                    // deleteRecord={this.handleDeleteRecord} // 不传 就没删除
                    centered={true}
                    columns={this.columns}
                    dataSource={info}
                    scroll={scroll}
                    // rowSelection={rowSelection} //批量选择 操作
                >
                    {/* <div
                        urlPrefix="/security"
                        title="证券信息"
                        sucCallback={this.getData}
                    ></div> */}
                </CurdComponent>
                <Modal
                    title={modalTitle}
                    visible={this.state.updateModalVisible}
                    onOk={this.handleUpdateModalOk}
                    onCancel={this.handleUpdateModalCancel}
                    width={1288}
                    centered
                >
                    <Form
                        layout={"vertical"}
                        style={{ maxHeight: "690px", overflow: "hidden" }}
                    >
                        <Row gutter={[60]}>
                            {this.isUpdate && (
                                <Col span={12}>
                                    <Form.Item
                                        label="ID"
                                        style={{ height: "59px" }}
                                    >
                                        {getFieldDecorator("Id", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "请输入",
                                                },
                                            ],
                                            initialValue: "0",
                                        })(
                                            <Input
                                                placeholder="请输入"
                                                onChange={this.inputChange}
                                                disabled={true}
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                            )}
                            <Col span={12}>
                                <Form.Item
                                    label={
                                        <label title="通过算法组给用户分配权限，客户端只显示用户有权限的算法,算法组最多有32字节,每个字节4位,对应4个算法是否可用(打开:代表有权限,关闭:无权限),点击权限开关,即可设置算法权限">
                                            权限
                                        </label>
                                    }
                                    style={{ height: "59px" }}
                                >
                                    {getFieldDecorator("AlgoProperty", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入",
                                            },
                                            {
                                                message: "请输入16进制正整数",
                                                pattern: /^[A-Fa-f0-9]+$/i,
                                            },
                                            {
                                                validator: checkLength(32),
                                                trigger: ["change", "blur"],
                                            },
                                        ],
                                        initialValue: "0",
                                    })(
                                        <Input
                                            placeholder="请输入"
                                            onChange={this.inputChange}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={this.isInsert ? 12 : 24}>
                                <Form.Item
                                    label={<label>算法权限组名称</label>}
                                    style={{ height: "59px" }}
                                >
                                    {getFieldDecorator("GroupName", {
                                        rules: [
                                            {
                                                required: true,
                                                message: " ",
                                            },
                                            {
                                                validator: checkLength(32),
                                                trigger: ["change", "blur"],
                                            },
                                        ],
                                    })(<Input placeholder="请输入" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <div>
                            <Table
                                rowKey={"id"}
                                columns={this.columns2()}
                                dataSource={this.state.algoList}
                                scroll={scroll2}
                                size="small"
                                // rowSelection={rowSelection}
                                // handlePagination={this.handlePagination}
                                // pagination={this.props.pagination}
                                pagination={false}
                                // pagaSize={pagaSize}
                                // onDoubleClick={this.onDoubleClick}
                                // showDetail={dtColumns.length > 0}
                            ></Table>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(algoGroup);
