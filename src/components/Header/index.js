import React from "react";
import styles from "./index.module.less";
import { Popover, Icon, Input, Form, Modal } from "antd";
// import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";
import md5 from "js-md5"; //全局引入

class Header extends React.PureComponent {
    state = { updateModalVisible: false };

    handleClick = () => {
        sessionStorage.removeItem("isLogin");
        this.props.history.push("/login");
        if (window.electron && window.electron.ipcRenderer) {
            ipc.send("logout");
        }
    };
    handleChangePwd = () => {
        this.setState({ updateModalVisible: true });
    };
    getUpdateFormFields = () => {
        return [
            {
                label: "原密码",
                id: "passwordOld",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: <Input.Password placeholder="请输入" />,
            },
            {
                label: "设置密码",
                id: "password",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: <Input.Password placeholder="请输入" />,
            },
            {
                label: "确认密码",
                id: "password2",
                initialValue: "",
                rules: [
                    {
                        required: true,
                        message: "参数不能为空",
                    },
                ],
                component: <Input.Password placeholder="请输入" />,
            },
        ];
    };
    handleUpdateModalOk = () => {
        let formData = this.props.form.getFieldsValue();
        // console.log("更新记录", formData);
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (formData.password != formData.password2) {
                    message.error("密码与确认密码不一致");
                    return;
                }
                if (formData.passwordOld) {
                    let form = this.props.form;
                    // console.log("passwordOld", formData.passwordOld);
                    this.checkPassword(form).then((res) => {
                        if (res.code == 200) {
                            // console.log("checkPassword 成功");
                            this.updateUser(form);
                        } else {
                            message.error("原密码校验失败");
                        }
                    });
                } else {
                    this.updateUser(form);
                }
            }
        });
    };
    checkPassword = (form) => {
        let formData = form.getFieldsValue();
        let params = {
            user_id: sessionStorage.userName,
            ori_passwd: md5(formData.passwordOld),
        };
        return http.post({
            url: "/tell-info/checkPassword",
            data: params,
        });
    };
    updateUser = (form) => {
        let formData = form.getFieldsValue();
        if (formData.password.length == 0) {
            message.error("密码不能为空");
            return;
        }
        let params = {
            oper_type: 2, //oper_type // 操作类型  1-新增， 2-修改   3-删除
            user_id: sessionStorage.userName,
            // user_name: formData.user_name,
            // role_id: role[0].role_id,
            // role_name: role[0].role_name,
            password: md5(formData.password),
        };
        // console.log(params);
        // return;
        http.post({
            url: "/tell-info/userModify",
            data: params,
        }).then((res) => {
            console.log(res);
            // let msg = res.message;
            if (res.code == 200) {
                message.success("修改密码成功");
                this.setState({ updateModalVisible: false });
                this.props.form.resetFields();
                this.props.history.push("/login");
            } else {
                message.error("修改密码失败");
            }
        });
    };
    handleUpdateModalCancel = () => {
        this.setState({
            updateModalVisible: false,
        });
        this.props.form.resetFields();
    };
    render() {
        let content = (
            <div>
                <div className={styles.item} onClick={this.handleChangePwd}>
                    修改密码
                    <Icon type="right" className={styles.icon} />
                </div>
                <div
                    style={{ borderTop: "solid 1px #DEE0E3" }}
                    className={styles.quit}
                    onClick={this.handleClick}
                >
                    退出登录
                </div>
            </div>
        );
        let { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.flexbox}>
                <div className={styles.left}>
                    <div className={styles.logo}>华云信息</div>
                </div>
                <div className={styles.message}>消息</div>
                <div className={styles.help}>帮助中心</div>
                <div className={styles.right}>
                    <Popover
                        content={content}
                        className={styles.headerPop}
                        style={{ padding: "0!important" }}
                        overlayClassName={styles.headerPop}
                    >
                        <div className={styles.user}>
                            {sessionStorage.userName}
                        </div>
                    </Popover>
                    {/* <div className={styles.out} onClick={this.handleClick}>
                        退出
                    </div> */}
                </div>
                <Modal
                    title={"修改密码"}
                    visible={this.state.updateModalVisible}
                    onOk={this.handleUpdateModalOk}
                    onCancel={this.handleUpdateModalCancel}
                    width={668}
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
                                <Form.Item label="原密码">
                                    {getFieldDecorator("passwordOld", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入",
                                            },
                                            {
                                                message: "请输入数字",
                                                pattern: new RegExp("^\\d+$"),
                                            },
                                            {
                                                validator: checkLength(20),
                                                trigger: ["change", "blur"],
                                            },
                                        ],
                                    })(<Input.Password placeholder="请输入" />)}
                                </Form.Item>
                                <div style={{ width: 60 }}></div>
                                <Form.Item
                                    // className={styles.marLose14}
                                    label="新密码"
                                >
                                    {getFieldDecorator("password", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入",
                                            },
                                        ],
                                    })(<Input.Password placeholder="" />)}
                                </Form.Item>
                                <div style={{ width: 60 }}></div>
                                <Form.Item
                                    // className={styles.marLose14}
                                    label="确认密码"
                                >
                                    {getFieldDecorator("password2", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入",
                                            },
                                        ],
                                    })(<Input.Password placeholder="" />)}
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}
// const mapStateToProps = (state, ownProps) => {
//     return {
//         config: state.config,
//     };
// };
// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         setConfig: (config) => {
//             dispatch({ type: "setConfig", payload: config });
//         },
//     };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Header));
// export default withRouter(Form.create()(Header));
export default Form.create()(Header);
// export default Header;
