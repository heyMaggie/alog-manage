import React, { PureComponent } from "react";
// import PropTypes from "prop-types";
import { Button, Form, Input, Icon } from "antd";
// import { Link, withRouter } from "react-router-dom";
class LoginForm extends PureComponent {
  handleLogin = () => {
    this.props.clickLogin();
  };
  handleRegiste = () => {
    this.props.clickRegiste();
  };
  render() {
    return (
      <Form>
        <Form.Item>
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Button type="primary" onClick={this.handleLogin}>
          登陆
        </Button>
        <Button
          type="primary"
          onClick={this.handleRegiste}
          style={{ marginLeft: "50px" }}
        >
          注册
        </Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {};

export default LoginForm;
