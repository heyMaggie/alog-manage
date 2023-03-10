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
                label: <span>???&nbsp;???&nbsp;???&nbsp;???</span>,
                id: "role_name",
                component: <Input placeholder="?????????" />,
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
                title: "????????????",
                dataIndex: "role_id",
                width: 150,
            },
            {
                title: "????????????",
                dataIndex: "role_name",
                width: 160,
            },
            {
                title: "??????",
                dataIndex: "role_desc",
            },
            // {
            //     title: "??????",
            //     dataIndex: "statusValue",
            //     width: 100,
            // },
            {
                title: "????????????",
                dataIndex: "create_time",
                width: 180,
            },
        ];
        if (this.authObj.isUpdate || this.authObj.isDelete) {
            arr.push({
                title: "??????",
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
                            ??????
                        </a>
                    );
                    let deleteA = (
                        <Popconfirm
                            title="???????????????????"
                            onConfirm={async () =>
                                this.handleDeleteRecord(record)
                            }
                            okText="??????"
                            cancelText="??????"
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
                                ??????
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
                                ??????
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
                                ??????
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
    //????????????
    handleInsertRecord = (formData, roleAuth) => {
        let params = {
            oper_type: 1, //oper_type // ????????????  1-????????? 2-??????   3-??????
            role_id: formData.role_id / 1,
            role_name: formData.role_name,
            role_auth: JSON.stringify(roleAuth),
        };
        console.log(params);
        // return;
        http.post({
            // url: "/tell-info/roleModify",
            url: "/tell-info/roleAdd",
            data: params,
        }).then((res) => {
            // console.log(res);
            if (res.code == 200) {
                message.success("????????????");
                this.getData();
                this.setState({
                    updateModalVisible: false,
                });
            } else {
                message.error(res.msg || "????????????");
            }
        });
    };
    //????????????
    handleUpdateRecord = (formData, roleAuth) => {
        let params = {
            oper_type: 2, //oper_type // ????????????  1-????????? 2-??????   3-??????
            role_id: formData.role_id / 1,
            role_name: formData.role_name,
            role_auth: JSON.stringify(roleAuth),
        };
        console.log("????????????:", roleAuth);
        // return;
        http.post({
            url: "/tell-info/roleModify",
            data: params,
        }).then((res) => {
            // console.log(res);
            if (res.code == 200) {
                message.success("????????????");
                this.getData();
                this.setState({
                    updateModalVisible: false,
                });
            } else {
                message.error(res.msg || "????????????");
            }
        });
    };
    // ????????????????????????
    handleUpdateBtn = (record) => {
        // console.log("????????????", record);
        this.record = record;
        let role_auth = JSON.parse(record.role_auth);
        console.log("????????????", role_auth);
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

    //????????????
    handleDeleteRecord = (record) => {
        console.log("???????????? ", record);
        let params = {
            oper_type: 3, //oper_type // ????????????  1-????????? 2-??????   3-??????
            role_id: record.role_id / 1,
            // role_name: formData.role_name,
            // role_auth: JSON.stringify(roleAuth),
        };
        console.log(params);
        // return;
        http.post({
            // url: "/tell-info/roleModify",
            url: "/tell-info/roleDelete",
            data: params,
        }).then((res) => {
            // console.log(res);
            if (res.code == 200) {
                message.success("????????????");
                this.getData();
                // this.setState({
                //     updateModalVisible: false,
                // });
            } else {
                message.error("????????????");
            }
        });
    };
    // ????????????????????????
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
                    // console.log("????????????");
                    this.handleInsertRecord(formData, roleAuth);
                } else {
                    // console.log("????????????");
                    this.handleUpdateRecord(formData, roleAuth);
                }
            }
        });
    };

    //?????? ??????????????? ?????? ????????????
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
    //?????? ??????????????? ?????? ????????????
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
    //?????????????????? ??????
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
                    // let roleAuth = JSON.parse(res.role_auth).list;
                    let roleAuth = JSON.parse(res.role_auth);
                    if (roleAuth.hasOwnProperty("list")) {
                        roleAuth = roleAuth.list;
                    }
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
            //??????????????????
            if (res.list && res.list.length > 0) {
                let userList = res.list;
                // parseDictValue(userList);
                parseArrDictValue(userList, "status", "authStatus");
            } else {
                message.info("??????????????????");
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
        let modalTitle = "????????????";
        let roleDisable = false;
        if (this.isUpdate) {
            modalTitle = "????????????";
            roleDisable = true;
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
                    //?????? ?????????
                    authObj.isQuery = false;
                }
                if (item.type == 2 && item.auth != 1) {
                    //?????? ?????????
                    authObj.isAdd = false;
                }
                if (item.type == 3 && item.auth != 1) {
                    //?????? ?????????
                    authObj.isUpload = false;
                }
                if (item.type == 4 && item.auth != 1) {
                    //?????? ?????????
                    authObj.isDownload = false;
                }
                // if (item.type == 5 && item.auth != 1) {
                //     //???????????? ????????? -- ????????????
                //     authObj.isExportPdf = false;
                // }
                if (item.type == 6 && item.auth == 1) {
                    //?????? ?????????
                    authObj.isDelete = true;
                }
                if (item.type == 7 && item.auth != 1) {
                    //?????? ?????????
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
                    // btnText2="?????????"
                    onSearchClick={this.handleSearch}
                    getSearchFormFields={this.getSearchFormFields}
                    // searchLoading={this.state.searchLoading}
                    insertBtnText={"??????"} // ?????? ??????????????????
                    hasSearchSlot={true}
                    addBtn={
                        <Button
                            type="primary"
                            icon="plus"
                            onClick={this.handleInsertBtn}
                        >
                            ????????????
                        </Button>
                    }
                    insertRecord={this.handleInsertRecord}
                    // col="2"
                    width="600px"
                    pagination={this.state.pagination}
                    setUpdateModal={this.setUpdateModal}
                    // updateRecord={this.handleUpdateRecord} // ?????? ????????????
                    // deleteRecord={this.handleDeleteRecord} // ?????? ????????????
                    centered={true}
                    columns={this.columns}
                    dataSource={info}
                    scroll={scroll}
                    // rowSelection={rowSelection} //???????????? ??????
                >
                    {/* <div
                        urlPrefix="/user"
                        title="????????????"
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
                                <Form.Item label="????????????">
                                    {getFieldDecorator("role_id", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "?????????",
                                            },
                                            {
                                                message: "???????????????",
                                                pattern: new RegExp("^\\d+$"),
                                            },
                                            // {
                                            //     validator: checkLength(10),
                                            //     trigger: ["change", "blur"],
                                            // },
                                            {
                                                max: 10,
                                                message: "???????????????10",
                                            },
                                        ],
                                    })(
                                        <Input
                                            placeholder="?????????"
                                            disabled={roleDisable}
                                        />
                                    )}
                                </Form.Item>
                                <div style={{ width: 60 }}></div>
                                <Form.Item
                                    // className={styles.marLose14}
                                    label="????????????"
                                >
                                    {getFieldDecorator("role_name", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "?????????",
                                            },
                                            {
                                                message: "???????????????",
                                                pattern: /^\S*$/i,
                                            },
                                            {
                                                max: 10,
                                                // trigger: ["change", "blur"],
                                                message: "???????????????10",
                                            },
                                        ],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </div>
                        </div>
                        <div>
                            <div className={styles.tit}>
                                <div className={styles.text}>??????</div>
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
