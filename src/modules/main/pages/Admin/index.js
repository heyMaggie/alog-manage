import React from "react";
import styles from "./index.module.less";
import SiderMenu from "@/components/SiderMenu";
import SplitPane from "react-split-pane";
import HeaderMenu from "@/components/Header";
import TabsLayout from "@/components/TabsLayout";
import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";

import { Layout, Breadcrumb } from "antd";

const { Header, Content, Sider } = Layout;

class Admin extends React.PureComponent {
    componentDidMount() {
        setTimeout(() => {
            if (sessionStorage.isLogin != "true") {
                this.props.history.push("/login");
            }
        }, 0);
    }
    render() {
        message.config({
            duration: 2.0,
            top: 360,
            maxCount: 1,
        });
        // console.log("Admin Render! ", this.props);
        let path = this.props.location.pathname;
        let arr = this.props.children.props.children;
        let menuTitle = "";
        let menuPath = "";
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].props.path == path) {
                menuTitle = arr[i].props.title;
                menuPath = arr[i].props.path;
                break;
            }
        }
        // console.log(menuTitle);
        // console.log(menuPath);
        let firstTitle = "首页";
        if (menuPath.indexOf("/main/user") > -1) {
            firstTitle = "用户管理";
        } else if (menuPath.indexOf("/main/manage") > -1) {
            firstTitle = "交易管理";
        } else if (menuPath.indexOf("/main/risk") > -1) {
            firstTitle = "风控管理";
        } else if (menuPath.indexOf("/main/updown") > -1) {
            firstTitle = "数据导入导出";
        } else if (menuPath.indexOf("/main/chart") > -1) {
            firstTitle = "运维监控";
        } else if (menuPath.indexOf("/main/algostatis") > -1) {
            firstTitle = "算法统计";
        }

        return (
            <Layout>
                <Header style={{ background: "#002140" }}>
                    <HeaderMenu history={this.props.history} />
                </Header>
                <Layout>
                    <SplitPane
                        split="vertical"
                        minSize={216}
                        maxSize={216}
                        // defaultSize={parseInt(
                        //     localStorage.getItem("splitPos") || 265
                        // )}
                        defaultSize={216}
                        // onChange={(size) =>
                        //     localStorage.setItem("splitPos", size)
                        // }
                    >
                        <Sider
                            className="menuSlider"
                            width={"auto"}
                            style={{ height: "100%", background: "#eee" }}
                        >
                            <SiderMenu></SiderMenu>
                        </Sider>
                        <Layout
                            //   style={{ padding: "0 0 12px 12px " }}
                            className={styles.mylayout}
                        >
                            <Breadcrumb style={{ margin: "14px 0" }}>
                                <Breadcrumb.Item
                                    style={{ height: "20px", color: "#999" }}
                                >
                                    {firstTitle}
                                </Breadcrumb.Item>
                                <Breadcrumb.Item
                                    style={{ height: "20px", color: "#666" }}
                                >
                                    {menuTitle}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <Content>
                                <TabsLayout></TabsLayout>
                            </Content>
                        </Layout>
                    </SplitPane>
                </Layout>
            </Layout>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    // console.log(state.RouterModel);
    let { path, tabs, routes } = state.RouterModel;
    history;
    return {
        path,
        tabs,
        routes,
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        popTab: (tab) => {
            dispatch({
                type: "POP_TAB",
                paload: tab,
            });
        },
    };
};
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Admin);
export default withRouter(Admin);
