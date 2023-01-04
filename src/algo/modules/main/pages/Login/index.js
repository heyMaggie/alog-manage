import React from "react";
import { Form, Input, Button, message, Icon, Checkbox } from "antd";
import { withRouter } from "react-router-dom";
import backImg from "@/img/login.jpg";
import md5 from "js-md5"; //全局引入

const FormItem = Form.Item;
class FormLogin extends React.Component {
    state = {
        refreshLoading: false,
    };

    handleSubmit = () => {
        this.props.form.validateFields((err) => {
            if (!err) {
                let params = this.props.form.getFieldsValue();
                let ps = params.password;
                params.password = md5(params.password);
                // params.oper = "Q";
                // console.log(params);
                http.post({
                    url: "/tell-info/login",
                    data: params,
                }).then((res) => {
                    // console.log(res);
                    // if (res.code == 0) {
                    //     sessionStorage.isLogin = true;
                    //     sessionStorage.userName = params.userName;
                    //     // 0  有   导入导出权限
                    //     // 1  没有 导入导出权限
                    //     sessionStorage.userPrivilege = res.data.userPrivilege;
                    //     // sessionStorage.userPrivilege = 1;
                    //     // sessionStorage.userArr = JSON.stringify(res.data);
                    //     // this.props.history.push("/main/updown/userInfo");
                    //     this.props.history.push("/main/user/userInfo");
                    // } else {
                    //     message.error(res.message || "用户名或密码错误");
                    // }
                    if (res.code == 200) {
                        sessionStorage.isLogin = true;
                        sessionStorage.userName = params.user_id;
                        sessionStorage.ps = ps;
                        // user_type 用户类型， 1-超级管理员，2-普通用户 6 总线超级管理员
                        // 1  没有 导入导出权限
                        if (res.allow == 1) {
                            // this.props.history.push("/main/user/userInfo");
                            localStorage.user_type = res.user_type;
                            this.getUserAuth();
                        } else {
                            message.error("用户名或密码错误");
                        }
                    } else {
                        message.error(res.message || "用户名或密码错误");
                    }
                });
            }
        });
    };
    getUserAuth = (params = {}) => {
        params = {
            user_id: sessionStorage.userName,
            user_type: localStorage.user_type / 1,
        };
        http.post({
            url: "/tell-info/userAuth",
            data: params,
        }).then((res) => {
            // console.log(res);
            //解析数据字典
            if (res.code == 200) {
                sessionStorage.auth = res.auth;
                // console.log(JSON.stringify(JSON.parse(res.auth)));
                this.hasUserInfo = false;
                this.changeMenus(JSON.parse(res.auth));
                // this.props.history.push("/main/user/userInfo");
                if (window.menus.length == 0) {
                    message.info("用户菜单权限为空");
                } else {
                    if (this.hasUserInfo) {
                        this.props.history.push("/main/user/userInfo");
                    } else {
                        let url = "";
                        if (
                            window.menus[0].hasOwnProperty("children") &&
                            window.menus[0].children &&
                            window.menus[0].children.length > 0
                        ) {
                            url = window.menus[0].children[0].path;
                            // console.log(url);
                            this.props.history.push(url);
                        } else {
                            message.info("用户菜单权限为空");
                        }
                    }
                }
            } else {
                message.info("获取用户权限失败");
            }
        });
    };
    changeMenus = () => {
        // console.log("changeMenus-------");
        let auth = sessionStorage.auth;
        // sessionStorage.menusBackup = undefined;
        if (sessionStorage.menusBackup != undefined) {
            window.menus = JSON.parse(sessionStorage.menusBackup);
            // console.log(window.menus);
        }
        if (!auth) {
            console.log("没有权限菜单，显示本地菜单");
            return;
        }
        // let newAuth = auth.replace(/name/g, "title");
        let authMenu = JSON.parse(auth);
        // console.log("authMenu", authMenu);
        // console.log(JSON.stringify(window.menus));
        // console.log(window.menus);
        // authMenu[0].auth = 0;
        // window.menus = menu;
        for (let i = 0; i < window.menus.length; i++) {
            let localItem = window.menus[i];
            // console.log("本地 ", localItem);
            for (let j = 0; j < authMenu.length; j++) {
                let authItem = authMenu[j];
                // console.log("权限 ", authItem);
                if (localItem.title == authItem.name) {
                    localItem.auth = authItem.authReal;
                    //删除 不显示的菜单
                    // console.log(localItem, i, j);
                    if (authItem.authReal != 1) {
                        // console.log("不显示一级 ", localItem);
                        window.menus.splice(i, 1);
                        i--;
                        break;
                    }
                    if (
                        localItem.hasOwnProperty("children") &&
                        authItem.hasOwnProperty("children")
                    ) {
                        let localChild = localItem.children;
                        let authChild = authItem.children;
                        for (let k = 0; k < localChild.length; k++) {
                            let localChildItem = localChild[k];
                            // console.log("local:--- ", k, localChildItem);
                            for (let l = 0; l < authChild.length; l++) {
                                // console.log("authChild: ",authChild[l]);
                                if (localChildItem.title == authChild[l].name) {
                                    localChildItem.auth = authChild[l].authReal;
                                    localChildItem.cmpt = authChild[l].cmpt;
                                    if (
                                        authChild[l].name == "用户管理" &&
                                        authChild[l].authReal == 1
                                    ) {
                                        this.hasUserInfo = true;
                                    }
                                    if (authChild[l].authReal != 1) {
                                        // console.log(
                                        //     "不显示二级菜单 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                        //     localChildItem
                                        // );
                                        localChild.splice(k, 1);
                                        k--;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    break;
                } else if (j == authMenu.length - 1) {
                    // console.log("没有菜单", localItem, i);
                    window.menus.splice(i, 1);
                    i--;
                }
            }
        }
        // console.log(window.menus);
        sessionStorage.activeMenus = JSON.stringify(window.menus);
        // console.log(JSON.stringify(window.menus));
    };
    handleSet = () => {
        console.log("设置");
    };

    componentDidMount() {}
    render() {
        const { getFieldDecorator } = this.props.form;
        message.config({
            duration: 2.0,
            top: 360,
            maxCount: 1,
        });
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                    // background: "#f0f2f5"
                    background: `url(${backImg}) no-repeat center`,
                    backgroundSize: "cover",
                }}
            >
                <Form
                    style={{
                        width: 320,
                        margin: "0 auto",
                        padding: "25px",
                        background: "white",
                        opacity: 1,
                    }}
                >
                    <div
                        style={{
                            marginBottom: "20px",
                            paddingLeft: "33px",
                            fontSize: "18px",
                            fontWeight: "bold",
                            background: "left no-repeat url(./assets/logo.png)",
                            backgroundSize: "25px",
                            // backgroundColor: "rgba(48,128,232,0.3)"
                        }}
                    >
                        算法项目管理系统
                    </div>
                    <FormItem>
                        {/* {getFieldDecorator("userName", { */}
                        {getFieldDecorator("user_id", {
                            // initialValue: "algoAdmin",
                            initialValue: sessionStorage.userName
                                ? sessionStorage.userName
                                : "",
                            // initialValue: "11",
                            // initialValue: "user_read_only",
                            rules: [
                                {
                                    required: true,
                                    message: "用户名不能为空",
                                },
                                {
                                    max: 15,
                                    message: "长度不在范围内",
                                },
                                {
                                    pattern: new RegExp("^\\w+$", "g"),
                                    message: "用户名必须为字母或者数字",
                                },
                            ],
                        })(
                            <Input
                                prefix={<Icon type="user" />}
                                placeholder="请输入用户名"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator("password", {
                            initialValue: sessionStorage.ps
                                ? sessionStorage.ps
                                : "",
                            rules: [],
                        })(
                            <Input
                                prefix={<Icon type="lock" />}
                                type="password"
                                placeholder="请输入密码"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button
                            style={{ width: "100%" }}
                            type="primary"
                            onClick={this.handleSubmit}
                            loading={this.state.refreshLoading}
                        >
                            登录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
export default withRouter(Form.create()(FormLogin));
