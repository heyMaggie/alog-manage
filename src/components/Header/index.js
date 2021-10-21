import React from "react";
import styles from "./index.module.less";
import { Icon, Modal, Tabs, Form, Input } from "antd";
// import { withRouter } from "react-router-dom";

// import { connect } from "react-redux";

class Header extends React.PureComponent {
    state = {
        showSetting: false,
    };

    handleClick = () => {
        sessionStorage.removeItem("isLogin");
        this.props.history.push("/login");
        if (window.electron && window.electron.ipcRenderer) {
            ipc.send("logout");
        }
        // this.setState({
        //   showSetting: true
        // });
        // this.props.form.setFieldsValue({
        //   jgdw: this.props.config.jgdw,
        //   sldw: this.props.config.sldw
        // });
    };

    handleOk = () => {
        let params = this.props.form.getFieldsValue();
        this.props.setConfig(params);
        localStorage.configObj = JSON.stringify(params);
        this.setState({ showSetting: false });
    };

    handleCancel = () => {
        this.setState({ showSetting: false });
    };
    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4,
            },
            wrapperCol: {
                xs: 24,
                sm: 12,
            },
        };

        return (
            // <div className={styles.head}>
            //     <div className={styles.test}>header</div>
            // </div>
            <div>
                <div className={styles.setting} onClick={this.handleClick}>
                    <Icon type="setting" />
                    {/* <span style={{ paddingLeft: "5px" }}>设置</span> */}
                    <span style={{ paddingLeft: "5px" }}>退出</span>
                </div>
                <div>
                    <Modal
                        title="设置"
                        visible={this.state.showSetting}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        centered
                    >
                        <div>
                            <Tabs defaultActiveKey="1">
                                <Tabs.TabPane tab="交易参数" key="1">
                                    <div>
                                        <Form layout="horizontal">
                                            <Form.Item
                                                label="价格单位"
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator("jgdw", {
                                                    initialValue: "0.0001",
                                                })(
                                                    <Input placeholder="请输入价格单位" />
                                                )}
                                            </Form.Item>
                                            <Form.Item
                                                label="数量单位"
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator("sldw", {
                                                    initialValue: "100",
                                                })(
                                                    <Input placeholder="请输入数量单位" />
                                                )}
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="tab2" key="2">
                                    <div>设置2</div>
                                </Tabs.TabPane>
                            </Tabs>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        config: state.config,
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setConfig: (config) => {
            dispatch({ type: "setConfig", payload: config });
        },
    };
};
// export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Header));
// export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Header));
// export default withRouter(Form.create()(Header));
export default Form.create()(Header);
