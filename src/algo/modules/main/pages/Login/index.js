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
                params.password = md5(params.password);
                // params.oper = "Q";
                console.log(params);
                http.post({
                    url: "/tell-info/login",
                    data: params,
                }).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        sessionStorage.isLogin = true;
                        sessionStorage.userName = params.userName;
                        // 0  有   导入导出权限
                        // 1  没有 导入导出权限
                        sessionStorage.userPrivilege = res.data.userPrivilege;
                        // sessionStorage.userPrivilege = 1;
                        // sessionStorage.userArr = JSON.stringify(res.data);
                        // this.props.history.push("/main/updown/userInfo");
                        this.props.history.push("/main/user/userInfo");
                    } else {
                        message.error(res.message || "用户名或密码错误");
                    }
                });
            }
        });
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
                        {getFieldDecorator("userName", {
                            initialValue: "admin",
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
                            initialValue: "123456",
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
