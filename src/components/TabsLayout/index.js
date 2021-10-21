import React from "react";
import styles from "./index.module.less";
import { connect } from "react-redux";
import TabComponnet from "./tabComponent";
import { withRouter } from "react-router-dom";

import { Tabs, Dropdown, Menu } from "antd";
const { TabPane } = Tabs;

class TabsLayout extends React.PureComponent {
    getTabsRouteList = () => {
        let { currentPath, tabs, routes } = this.props;
        // console.log("currentPath :", currentPath);
        // console.log("tabs :", tabs);
        // console.log("routes :", routes);
        sessionStorage.currentPath = currentPath;
        sessionStorage.tabs = JSON.stringify(tabs);
        // sessionStorage.routes = JSON.stringify(routes);
        let tabRoute = [];
        for (let i = 0; i < routes.length; i++) {
            // console.log(routes);
            let route = routes[i];
            for (let j = 0; j < tabs.length; j++) {
                let tab = tabs[j];
                // console.log(route);
                // console.log(tab);
                if (tab.indexOf(route.path) > -1) {
                    for (let k = 0; k < route.children.length; k++) {
                        let child = route.children[k];
                        if (child.path == tab) {
                            tabRoute.push(child);
                            break;
                        }
                    }
                }
            }
        }
        return tabRoute;
    };
    onChange = (activeKey) => {
        // console.log("onChange ", activeKey);
        this.props.changeTab(activeKey);
    };
    onTabClick = (activeKey) => {
        // console.log("onTabClick ", activeKey);
    };
    onEdit = (targetKey, action) => {
        // console.log(targetKey);
        // console.log(action);
        this[action](targetKey);
    };
    remove = (targetKey) => {
        // console.log("关闭 ", targetKey);
        this.props.popTab(targetKey);
    };
    handleMenuClick = (e, pane) => {
        //阻止 Dropdown 下拉列表 事件冒泡
        e.domEvent.stopPropagation();
        // console.log(pane);
        switch (e.key) {
            case "1":
                this.reloadTab = pane.path;
                this.props.reloadTab();
                break;
            case "4":
                this.props.popOtherTab(pane.path);
                break;
            case "5":
                this.props.popLeftTab(pane.path);
                break;
            case "6":
                this.props.popRightTab(pane.path);
                break;
            default:
                break;
        }
    };
    componentDidUpdate() {
        if (this.props.currentPath != this.props.location.pathname) {
            this.props.history.push(this.props.currentPath);
        }
    }
    componentDidMount() {
        if (this.props.currentPath != this.props.location.pathname) {
            this.props.history.push(this.props.currentPath);
        }
    }
    render() {
        // console.log(this.props);
        let tabRoute = this.getTabsRouteList();
        // console.log("tabRoute: ", tabRoute);
        // console.log(this.state);
        return (
            <div>
                {tabRoute.length > 0 && (
                    <Tabs
                        hideAdd
                        type="editable-card"
                        onEdit={this.onEdit}
                        onChange={this.onChange}
                        activeKey={this.props.currentPath}
                        className={styles.tablayout}
                    >
                        {tabRoute.map((pane) => {
                            // console.log(pane);
                            let { component: Component } = pane;
                            return (
                                // <TabPane tab={pane.title} key={pane.path}>
                                <TabPane
                                    tab={
                                        <Dropdown
                                            overlay={
                                                <Menu
                                                    onClick={(e) =>
                                                        this.handleMenuClick(
                                                            e,
                                                            pane
                                                        )
                                                    }
                                                >
                                                    <Menu.Item key="1">
                                                        重新加载
                                                    </Menu.Item>
                                                    {/* <Menu.Item key="2">新窗口打开</Menu.Item> */}
                                                    {/* <Menu.Item key="3">关闭这个标签页</Menu.Item> */}
                                                    <Menu.Item key="4">
                                                        关闭其他标签页
                                                    </Menu.Item>
                                                    <Menu.Item key="5">
                                                        关闭左侧标签页
                                                    </Menu.Item>
                                                    <Menu.Item key="6">
                                                        关闭右侧标签页
                                                    </Menu.Item>
                                                </Menu>
                                            }
                                            trigger={["contextMenu"]}
                                        >
                                            <span> {pane.title}</span>
                                        </Dropdown>
                                    }
                                    key={pane.path}
                                >
                                    {/* <Component
                    refresh={this.state.refreshTab == pane.path}
                    finishReload={this.props.finishReload}
                  ></Component> */}
                                    <TabComponnet
                                        component={Component}
                                        tabReloading={
                                            this.props.tabReloading &&
                                            pane.path == this.reloadTab
                                        }
                                        finishReload={this.props.finishReload}
                                    ></TabComponnet>
                                </TabPane>
                            );
                        })}
                    </Tabs>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(state.RouterModel);
    let { path: currentPath, tabs, routes, tabReloading } = state.RouterModel;
    return {
        currentPath,
        tabs,
        routes,
        tabReloading,
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        popTab: (tab) => {
            dispatch({
                type: "POP_TAB",
                payload: tab,
            });
        },
        reloadTab: (tab) => {
            dispatch({
                type: "RElOAD_TAB",
            });
        },
        finishReload: (tab) => {
            dispatch({
                type: "FINISH_RElOAD",
            });
        },
        changeTab: (tab) => {
            dispatch({
                type: "CHANGE_TAB",
                payload: tab,
            });
        },
        popOtherTab: (tab) => {
            dispatch({
                type: "POP_OTHER_TAB",
                payload: tab,
            });
        },
        popLeftTab: (tab) => {
            dispatch({
                type: "POP_LEFT_TAB",
                payload: tab,
            });
        },
        popRightTab: (tab) => {
            dispatch({
                type: "POP_RIGHT_TAB",
                payload: tab,
            });
        },
    };
};
// export default connect(mapStateToProps, mapDispatchToProps)(TabsLayout);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(TabsLayout));
// export default TabsLayout;
