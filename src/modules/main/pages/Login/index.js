import React from "react";
import { Form, Input, Button, message, Icon, Checkbox } from "antd";
import { withRouter } from "react-router-dom";
import backImg from "@/img/login.jpg";
const FormItem = Form.Item;
class FormLogin extends React.Component {
    state = {
        refreshLoading: false,
    };

    handleSubmit = () => {
        this.props.history.push("/main/test");
    };

    handleSet = () => {
        console.log("设置");
    };
    componentDidMount() {}
    render() {
        const { getFieldDecorator } = this.props.form;
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
                            backgroundSize: "30px",
                            // backgroundColor: "rgba(48,128,232,0.3)"
                        }}
                    >
                        DEMO系统
                    </div>
                    <FormItem>
                        {getFieldDecorator("username", {
                            initialValue: "admin",
                            rules: [
                                {
                                    required: true,
                                    message: "用户名不能为空",
                                },
                                {
                                    min: 3,
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
