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
            duration: 1.5,
            top: 360,
            maxCount: 2,
        });
        // console.log("Admin Render! ", this.props);
        return (
            <Layout>
                <Header style={{ background: "#002140" }}>
                    <HeaderMenu history={this.props.history} />
                </Header>
                <Layout>
                    <SplitPane
                        split="vertical"
                        minSize={150}
                        defaultSize={parseInt(
                            localStorage.getItem("splitPos") || 265
                        )}
                        onChange={(size) =>
                            localStorage.setItem("splitPos", size)
                        }
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
                            {/* <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
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
