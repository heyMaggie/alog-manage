import React from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { message } from "antd";
window.message = message;
window.showStip = (that, text = "查询成功") => {
    if (!that.isAction) {
        message.success(text);
    }
    that.isAction = false;
};

// import store from "./store/index";
import { connect } from "react-redux";
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";
// 去除 echart 函数
// import {
//     getBarOption,
//     getLineOption,
//     getMulLineOption,
// } from "@/utils/echartOption";
// window.getBarOption = getBarOption;
// window.getLineOption = getLineOption;
// window.getMulLineOption = getMulLineOption;
import { routeModule, parseDict } from "@/utils/util.js";

//引入demo项目路由 与菜单
// import routes from "@/config/routes.js";
// import menus from "@/config/menus";
//引入 期权项目管理系统 的路由 与菜单、字典!
import routes from "@/option/config/routes.js";
import menus from "@/option/config/menus";
import dict from "@/option/config/data_dictionary.js";

if (typeof dict != "undefined") {
    window.dict = dict;
    window.parseDic = parseDict(dict);
}
// console.log(routes);
window.menus = menus;
window.routes = routes;

import "@/style/loading.less";

//给每个路由加  module 属性
routeModule("/main", routes);

class App extends React.Component {
    renderRoute = (routes) => {
        let { enterRoute } = this.props;
        let res = routes.map((route, idx) => {
            // console.log(route);
            if (route.children) {
                return (
                    <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => {
                            // console.log("嵌套路由 ", route);
                            // console.log("props ", props);
                            let { pathname, search } = props.location;
                            enterRoute(pathname);
                            let { component: Component, title: routeTitle } =
                                route;
                            document.title = routeTitle;
                            // console.log(this.renderRoute(route.children));
                            return (
                                <Component {...props} title={route.title}>
                                    <Switch>
                                        {this.renderRoute(route.children)}
                                    </Switch>
                                </Component>
                            );
                        }}
                    ></Route>
                );
            } else {
                return (
                    <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        title={route.title}
                        // routeArr={routeArr}
                        render={(props) => {
                            // console.log("无嵌套路由 :", route);
                            let { history, location, match } = props;
                            let { pathname, search } = location;
                            // console.log("prop111 :", props);
                            let { component: Component, title: routeTitle } =
                                route;
                            document.title = routeTitle;
                            return <Component {...props}></Component>;
                        }}
                    ></Route>
                );
            }
        });

        return res;
    };
    componentDidMount() {
        // console.log("App componentDidMount");
    }
    render() {
        // console.log("App  tabs: ", this.props.tabs);
        return (
            <ConfigProvider locale={zhCN}>
                <Router style={{ height: "100%" }}>
                    <Switch>
                        {/* <Route path="/admin" component={Admin}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/404" component={NotFound}></Route> */}
                        {/* <Switch>
              <Route
                path="/main"
                render={() => (
                  <Main>
                    <Route path="/main/test4" component={Test4}></Route>
                    <Route path="/main/test" component={Test}></Route>
                  </Main>
                )}
              ></Route>
            </Switch> 
            <Route path="/login" component={Login}></Route>*/}
                        {this.renderRoute(routes)}
                        <Redirect to="/login"></Redirect>
                    </Switch>
                </Router>
            </ConfigProvider>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        routes: state.RouterModel.routes,
        // tabs: state.RouterModel.tabs
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        enterRoute: (pathname) => {
            //dispatch({ type: "ENTER_ROUTE", payload: { path: pathname , routes } });
            dispatch({ type: "ENTER_ROUTE", payload: { path: pathname } });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
