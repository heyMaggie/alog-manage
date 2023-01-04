import React from "react";
import CurdComponent from "@/components/CurdComponent";
// import SelectOption from "@/components/SelectOption";
// import Table from "@/components/Table";
// import UploadWrap from "@/components/UploadWrap";
import {
    Input,
    Modal,
    // Switch,
    Button,
    Form,
    message,
    // Tooltip,
    // Icon,
    // Select,
    Tree,
    Popconfirm,
} from "antd";
import styles from "./style.module.less";
import { connect } from "react-redux";

const { TreeNode } = Tree;

class userInfo extends React.PureComponent {
    state = {
        searchLoading: false,
        selectRow: [],
        info: [],
        updateModalVisible: false,
        pagination: { total: 0 },
        // expandedKeys: ["0-0-0", "0-0-1"],
        autoExpandParent: true,
        checkedKeys: [],
        treeData: [],
    };
    onExpand = (expandedKeys) => {
        // console.log("onExpand", expandedKeys);
        this.setState({
            expandedKeys,
            // autoExpandParent: false,
        });
    };
    onCheck = (checkedKeys) => {
        console.log("onCheck", checkedKeys);
        // this.setState({ checkedKeys: checkedKeys.checked });
        this.setState({ checkedKeys: checkedKeys });
    };
    renderTreeNodes = (treeData) => {
        // console.log("renderTreeNodes", data);
        //key={item.key}
        return treeData.map((item) => {
            // console.log(item, item.name);
            if (item.children) {
                return (
                    <TreeNode title={item.name} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            if (item.cmpt) {
                return (
                    <TreeNode title={item.name} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.cmpt)}
                    </TreeNode>
                );
            }
            // console.log(item);
            return <TreeNode key={item.key} title={item.name} />;
        });
    };
    getSearchFormFields = () => {
        return [
            {
                label: <span>角&nbsp;色&nbsp;名&nbsp;称</span>,
                id: "role_name",
                component: <Input placeholder="请输入" />,
            },
        ];
    };
    columns = (params) => {
        let arr = [
            {
                title: "ID",
                dataIndex: "id",
                width: 80,
            },
            {
                title: "角色ID",
                dataIndex: "role_id",
                width: 150,
            },
            {
                title: "角色名称",
                dataIndex: "role_name",
                width: 160,
            },
            {
                title: "权限",
                dataIndex: "role_desc",
            },
            {
                title: "状态",
                dataIndex: "statusValue",
                width: 100,
            },
            {
                title: "创建时间",
                dataIndex: "create_time",
                width: 180,
            },
        ];
        if (this.authObj.isUpdate || this.authObj.isDelete) {
            arr.push({
                title: "操作",
                key: "operation",
                fixed: "right",
                width: 100,
                render: (text, record) => {
                    let updateA = (
                        <a
                            onClick={(e) => {
                                this.handleUpdateBtn(record);
                            }}
                        >
                            编辑
                        </a>
                    );
                    let deleteA = (
                        <Popconfirm
                            title="是否确认删除?"
                            onConfirm={async () =>
                                this.handleDeleteRecord(record)
                            }
                            okText="确认"
                            cancelText="取消"
                        >
                            <a
                                style={{
                                    color: "rgba(240, 95, 94, 1)",
                                    margin:
                                        "0 0 0 " +
                                        (this.authObj.isUpdate
                                            ? "24px"
                                            : "0px"),
                                }}
                            >
                                删除
                            </a>
                        </Popconfirm>
                    );
                    if (record.status == 2) {
                        updateA = (
                            <a
                                style={{
                                    color: "#c0c4cc",
                                }}
                            >
                                编辑
                            </a>
                        );
                        deleteA = (
                            <a
                                style={{
                                    color: "#c0c4cc",
                                    margin:
                                        "0 0 0 " +
                                        (this.authObj.isUpdate
                                            ? "24px"
                                            : "0px"),
                                }}
                            >
                                删除
                            </a>
                        );
                    }
                    return (
                        <div>
                            {this.authObj.isUpdate && updateA}
                            {this.authObj.isDelete && deleteA}
                        </div>
                    );
                },
            });
        }
        return arr;
    };
    //更新记录
    handleInsertRecord = (formData, roleAuth) => {
        let params = {
            oper_type: 1, //oper_type // 操作类型  1-新增， 2-修改   3-删除
            role_id: formData.role_id / 1,
            role_name: formData.role_name,
            role_auth: JSON.stringify(roleAuth),
        };
        console.log(params);
        // return;
        http.post({
            url: "/tell-info/roleModify",
            data: params,
        }).then((res) => {
            // console.log(res);
            if (res.code == 200) {
                message.success("新增成功");
                this.getData();
                this.setState({
                    updateModalVisible: false,
                });
            } else {
                message.error(res.msg || "新增失败");
            }
        });
    };
    //更新记录
    handleUpdateRecord = (formData, roleAuth) => {
        let params = {
            oper_type: 2, //oper_type // 操作类型  1-新增， 2-修改   3-删除
            role_id: formData.role_id / 1,
            role_name: formData.role_name,
            role_auth: JSON.stringify(roleAuth),
        };
        console.log("更新参数:", roleAuth);
        // return;
        http.post({
            url: "/tell-info/roleModify",
            data: params,
        }).then((res) => {
            // console.log(res);
            if (res.code == 200) {
                message.success("修改成功");
                this.getData();
                this.setState({
                    updateModalVisible: false,
                });
            } else {
                message.error(res.msg || "修改失败");
            }
        });
    };
    // 编辑按钮点击事件
    handleUpdateBtn = (record) => {
        // console.log("更新记录", record);
        this.record = record;
        let role_auth = JSON.parse(record.role_auth);
        console.log("更新记录", role_auth);
        this.isInsert = false;
        this.isUpdate = true;
        this.setState(
            {
                updateModalVisible: true,
            },
            () => {
                this.props.form.setFieldsValue({
                    role_id: record.role_id + "",
                    role_name: record.role_name,
                });
                this.getRoleArray(role_auth);
            }
        );
    };

    //删除记录
    handleDeleteRecord = (record) => {
        console.log("删除记录 ", record);
        let params = {
            oper_type: 3, //oper_type // 操作类型  1-新增， 2-修改   3-删除
            role_id: record.role_id / 1,
            // role_name: formData.role_name,
            // role_auth: JSON.stringify(roleAuth),
        };
        console.log(params);
        // return;
        http.post({
            url: "/tell-info/roleModify",
            data: params,
        }).then((res) => {
            // console.log(res);
            if (res.code == 200) {
                message.success("删除成功");
                this.getData();
                // this.setState({
                //     updateModalVisible: false,
                // });
            } else {
                message.error("删除失败");
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
    };
    handleUpdateModalOk = () => {
        let formData = this.props.form.getFieldsValue();
        // console.log(formData);
        // console.log("treedata ", this.state.treeData);
        let roleAuth = this.resetRoleArray(this.state.checkedKeys);
        // console.log(roleAuth);
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.isInsert) {
                    // console.log("新增角色");
                    this.handleInsertRecord(formData, roleAuth);
                } else {
                    // console.log("修改角色");
                    this.handleUpdateRecord(formData, roleAuth);
                }
            }
        });
    };

    //根据 选中数据， 改变 权限数组
    resetRoleArray = (checkArr) => {
        let roleAuth = [...this.state.treeData];
        for (let i = 0; i < roleAuth.length; i++) {
            let lv1 = roleAuth[i];
            if (checkArr.includes(lv1.key)) {
                lv1.auth = 1;
                lv1.authReal = 1;
            } else {
                lv1.auth = 0;
                lv1.authReal = 0;
            }
            if (lv1.children) {
                for (let j = 0; j < lv1.children.length; j++) {
                    let lv2 = lv1.children[j];
                    if (checkArr.includes(lv2.key)) {
                        lv2.auth = 1;
                        lv2.authReal = 1;
                    } else {
                        lv2.auth = 0;
                        lv2.authReal = 0;
                    }
                    if (lv2.cmpt) {
                        for (let k = 0; k < lv2.cmpt.length; k++) {
                            let lv3 = lv2.cmpt[k];
                            if (checkArr.includes(lv3.key)) {
                                lv3.auth = 1;
                                lv1.authReal = 1;
                                lv2.authReal = 1;
                            } else {
                                lv3.auth = 0;
                            }
                        }
                    }
                }
            }
        }
        return roleAuth;
    };
    //根据 选中数据， 改变 权限数组
    getRoleArray = (roleAuth) => {
        let checkArr = [];
        for (let i = 0; i < roleAuth.length; i++) {
            let lv1 = roleAuth[i];
            if (!lv1.key) {
                lv1.key = i + 1 + "";
            }
            if (lv1.auth == 1) {
                checkArr.push(lv1.key);
            }
            if (lv1.children) {
                for (let j = 0; j < lv1.children.length; j++) {
                    let lv2 = lv1.children[j];
                    // lv2.key = lv1.key + "-" + (j + 1);
                    if (!lv2.key) {
                        lv2.key = lv1.key + "-" + (j + 1);
                    }
                    if (lv2.auth == 1) {
                        checkArr.push(lv2.key);
                    }
                    if (lv2.cmpt) {
                        for (let k = 0; k < lv2.cmpt.length; k++) {
                            let lv3 = lv2.cmpt[k];
                            // lv3.key = lv2.key + "-" + (k + 1);
                            if (!lv3.key) {
                                lv3.key = lv2.key + "-" + (k + 1);
                            }
                            if (lv3.auth == 1) {
                                checkArr.push(lv3.key);
                            }
                        }
                    }
                }
            }
        }
        // console.log(checkArr);
        this.setState({ checkedKeys: checkArr });
    };
    handleRoleArray = (roleAuth) => {
        let checkArr = [];
        for (let i = 0; i < roleAuth.length; i++) {
            let lv1 = roleAuth[i];
            lv1.key = i + 1 + "";
            if (lv1.auth == 1) {
                checkArr.push(lv1.key);
            }
            if (lv1.children) {
                for (let j = 0; j < lv1.children.length; j++) {
                    let lv2 = lv1.children[j];
                    lv2.key = lv1.key + "-" + (j + 1);
                    if (lv2.auth == 1) {
                        checkArr.push(lv2.key);
                    }
                    if (lv2.cmpt) {
                        for (let k = 0; k < lv2.cmpt.length; k++) {
                            let lv3 = lv2.cmpt[k];
                            lv3.key = lv2.key + "-" + (k + 1);
                            if (lv3.auth == 1) {
                                checkArr.push(lv3.key);
                            }
                        }
                    }
                }
            }
        }
        this.setState({ checkedKeys: checkArr });
    };
    //获取初始权限 模板
    getRoleAuth = (params = {}, pagination = { current: 1, pageSize: 12 }) => {
        params = {
            user_type: localStorage.user_type / 1,
        };
        // console.log(params);
        http.post({
            url: "/tell-info/roleAuth",
            data: params,
        }).then((res) => {
            // console.log(res);
            if (res.code == 200) {
                if (res.role_auth.length > 0) {
                    let roleAuth = JSON.parse(res.role_auth).list;
                    this.handleRoleArray(roleAuth);
                    // console.log(roleAuth);
                    this.setState({
                        treeData: roleAuth,
                    });
                }
            }
        });
    };
    handleUpdateModalCancel = () => {
        this.setState({
            updateModalVisible: false,
        });
    };
    getData = (params = {}, pagination = { current: 1, pageSize: 12 }) => {
        params = {
            ...params,
            scene: 1,
            role_id: 0,
            // role_name: "",
            page: pagination.current,
            limit: pagination.pageSize,
        };
        // console.log(params);
        http.post({
            url: "/tell-info/roleList",
            // url: "algo-assess/v1/auth/rolelist",
            data: params,
        }).then((res) => {
            // console.log(res);
            //解析数据字典
            if (res.list && res.list.length > 0) {
                let userList = res.list;
                // parseDictValue(userList);
                parseArrDictValue(userList, "status", "authStatus");
            } else {
                message.info("查询结果为空");
            }
            let pgn = {
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: res.total || 0,
            };
            this.setState({
                info: res.list ? res.list : [],
                pagination: pgn,
            });
        });
    };
    handleSearch = (params, pagination) => {
        this.searchParam = params;
        this.getData(params, pagination);
    };
    handleDownload = () => {
        window.location.href = window.baseURL + "/user/download";
    };
    componentDidMount() {
        this.getData();
        this.getRoleAuth();
    }
    render() {
        let scroll = { x: 1000, y: 445 };
        let info = this.state.info;
        let { getFieldDecorator } = this.props.form;
        let modalTitle = "新增角色";
        if (this.isUpdate) {
            modalTitle = "修改角色";
        }
        let cmpt = this.props.activeMenu.cmpt;
        // console.log(cmpt);
        let authObj = {
            isQuery: true,
            isAdd: true,
            isUpload: true,
            isDownload: true,
            isDelete: false,
            isUpdate: true,
        };
        // console.log("cmpt", cmpt);
        if (cmpt) {
            for (let i = 0; i < cmpt.length; i++) {
                let item = cmpt[i];
                // console.log(item);
                if (item.type == 1 && item.auth != 1) {
                    //查询 有权限
                    authObj.isQuery = false;
                }
                if (item.type == 2 && item.auth != 1) {
                    //新增 有权限
                    authObj.isAdd = false;
                }
                if (item.type == 3 && item.auth != 1) {
                    //上传 有权限
                    authObj.isUpload = false;
                }
                if (item.type == 4 && item.auth != 1) {
                    //下载 有权限
                    authObj.isDownload = false;
                }
                // if (item.type == 5 && item.auth != 1) {
                //     //下载报告 有权限 -- 绩效那边
                //     authObj.isExportPdf = false;
                // }
                if (item.type == 6 && item.auth == 1) {
                    //删除 有权限
                    authObj.isDelete = true;
                }
                if (item.type == 7 && item.auth != 1) {
                    //编辑 有权限
                    authObj.isUpdate = false;
                }
            }
        }
        this.authObj = authObj;
        return (
            <div className={styles.userInfo}>
                <CurdComponent
                    pageSize={10}
                    // rowKey={"index"}
                    // isShowSearchForm={false}
                    // btnText2="查全部"
                    onSearchClick={this.handleSearch}
                    getSearchFormFields={this.getSearchFormFields}
                    // searchLoading={this.state.searchLoading}
                    insertBtnText={"新增"} // 不传 就没新增按钮
                    hasSearchSlot={true}
                    addBtn={
                        <Button
                            type="primary"
                            icon="plus"
                            onClick={this.handleInsertBtn}
                        >
                            新增角色
                        </Button>
                    }
                    insertRecord={this.handleInsertRecord}
                    // col="2"
                    width="600px"
                    pagination={this.state.pagination}
                    setUpdateModal={this.setUpdateModal}
                    // updateRecord={this.handleUpdateRecord} // 不传 就没编辑
                    // deleteRecord={this.handleDeleteRecord} // 不传 就没删除
                    centered={true}
                    columns={this.columns}
                    dataSource={info}
                    scroll={scroll}
                    // rowSelection={rowSelection} //批量选择 操作
                >
                    {/* <div
                        urlPrefix="/user"
                        title="角色管理"
                        sucCallback={this.getData}
                    ></div> */}
                </CurdComponent>
                <Modal
                    title={modalTitle}
                    visible={this.state.updateModalVisible}
                    onOk={this.handleUpdateModalOk}
                    onCancel={this.handleUpdateModalCancel}
                    width={788}
                    centered
                >
                    <Form layout={"vertical"}>
                        <div>
                            <div
                                className={styles.rowFlex}
                                style={{
                                    position: "relative",
                                }}
                                id="area"
                            >
                                <Form.Item label="角色ID">
                                    {getFieldDecorator("role_id", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入",
                                            },
                                            {
                                                message: "请输入数字",
                                                pattern: new RegExp("^\\d+$"),
                                            },
                                            // {
                                            //     validator: checkLength(10),
                                            //     trigger: ["change", "blur"],
                                            // },
                                            {
                                                max: 10,
                                                message: "最大长度为10",
                                            },
                                        ],
                                    })(<Input placeholder="请输入" />)}
                                </Form.Item>
                                <div style={{ width: 60 }}></div>
                                <Form.Item
                                    // className={styles.marLose14}
                                    label="角色名称"
                                >
                                    {getFieldDecorator("role_name", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入",
                                            },
                                            {
                                                message: "请检查格式",
                                                pattern: /^\S*$/i,
                                            },
                                            {
                                                max: 10,
                                                // trigger: ["change", "blur"],
                                                message: "最大长度为10",
                                            },
                                        ],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </div>
                        </div>
                        <div>
                            <div className={styles.tit}>
                                <div className={styles.text}>权限</div>
                            </div>
                        </div>
                        <div className={styles.treeWrap}>
                            <Tree
                                checkable
                                className={styles.tree}
                                // checkStrictly={true}
                                onExpand={this.onExpand}
                                // expandedKeys={this.state.expandedKeys}
                                defaultExpandAll={true}
                                autoExpandParent={this.state.autoExpandParent}
                                onCheck={this.onCheck}
                                checkedKeys={this.state.checkedKeys}
                                onSelect={this.onSelect}
                                selectable={false}
                                // selectedKeys={this.state.selectedKeys}
                            >
                                {this.renderTreeNodes(this.state.treeData)}
                            </Tree>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}

// export default Form.create()(userInfo);
const mapStateToProps = (state, ownProps) => {
    return {
        activeMenu: state.RouterModel.activeMenu,
    };
};
export default connect(mapStateToProps, null)(Form.create()(userInfo));
