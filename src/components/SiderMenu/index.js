import React, { PureComponent } from "react";
import { Menu, Icon } from "antd";
import { withRouter } from "react-router-dom";
// import menus from "../../config/menus";
import { connect } from "react-redux";
import styles from "./index.module.less";

const { SubMenu } = Menu;

class Menus extends PureComponent {
    state = {
        openKeys: [],
    };
    renderMenu = (menuArr) => {
        // console.log("menuArr ", menuArr);
        return menuArr.map((item) => {
            if (item.children) {
                return (
                    <SubMenu
                        title={
                            <span>
                                {/* <Icon type={item.icon || "home"}></Icon> */}
                                <span className={styles[`${item.icon}`]}></span>
                                <span>{item.title}</span>
                            </span>
                        }
                        key={item.path}
                    >
                        {this.renderMenu(item.children)}
                    </SubMenu>
                );
            }
            if (item.icon) {
                return (
                    <Menu.Item
                        key={item.path}
                        onClick={this.handleMenuClick}
                        className="level1"
                    >
                        <div className="iconDiv">
                            <span className={styles[`${item.icon}`]}></span>
                            <span>{item.title}</span>
                        </div>
                    </Menu.Item>
                );
            }
            return (
                <Menu.Item key={item.path} onClick={this.handleMenuClick}>
                    {item.title}
                </Menu.Item>
            );
        });
    };
    handleMenuClick = (menu) => {
        // console.log(this.props);
        this.props.history.push(menu.key);
    };
    //获取应该 展开的子菜单
    getOpenKeys = (menus, selectedKey, firstLevel) => {
        if (menus.length >= 0) {
            for (let i = 0; i < menus.length; i++) {
                const submenu = menus[i];
                // console.log("submenu :", submenu);
                if (submenu.children) {
                    //首层 初始化 展开的菜单
                    if (firstLevel) {
                        this.keys = [];
                    }
                    this.keys.push(submenu.path);
                    let res = this.findPath(submenu.children, selectedKey);
                    if (res.length > 0) {
                        // console.log("找到了 ", selectedKey);
                        // console.log("上级菜单 ", this.keys);
                        break;
                    } else {
                        this.getOpenKeys(submenu.children, selectedKey);
                    }
                }
            }
        }
    };
    findPath = (arr, path) => {
        let res = arr.filter((item) => item.path == path);
        return res;
    };

    onOpenChange = (openKeys) => {
        console.log("openKeys :", openKeys);
        this.setState({
            openKeys: openKeys,
        });
    };
    componentDidMount() {
        // this.setState({
        //   openKeys: t
        // });
    }
    changeMenus = () => {
        // console.log("changeMenus 侧边栏");
        let auth = sessionStorage.auth;
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
        // console.log(JSON.stringify(window.menus));
        // console.log(window.menus);
        // console.log(authMenu);
        // authMenu[0].auth = 0;
        // window.menus = menu;
        for (let i = 0; i < window.menus.length; i++) {
            let localItem = window.menus[i];
            // console.log("本地 ", localItem);
            for (let j = 0; j < authMenu.length; j++) {
                let authItem = authMenu[j];
                // console.log("权限 ", authItem);
                if (localItem.title == authItem.name) {
                    localItem.auth = authItem.auth;
                    //删除 不显示的菜单
                    // console.log(localItem, i, j);
                    if (authItem.auth != 1) {
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
                                    localChildItem.auth = authChild[l].auth;
                                    localChildItem.cmpt = authChild[l].cmpt;
                                    if (authChild[l].auth != 1) {
                                        // console.log("不显示二级菜单 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", localChildItem);
                                        localChild.splice(k, 1);
                                        k--;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    break;
                }
            }
        }
        // console.log(JSON.stringify(window.menus));
    };
    render() {
        // this.changeMenus();
        window.menus = JSON.parse(sessionStorage.activeMenus);
        let { path } = this.props;
        //获取默认 展开菜单
        this.keys = [];
        this.getOpenKeys(window.menus, path, true);
        this.defaultOpenKeys = this.keys ? this.keys : ["/main/option"];
        this.defaultSelectedKeys = path ? [path] : ["/main/algo/buy"];
        // this.defaultOpenKeys = ["/main"];
        // this.defaultSelectedKeys = ["/main/test"];
        // console.log("默认展开菜单 :", this.defaultOpenKeys);
        // console.log("默认选中 :", this.defaultSelectedKeys);
        return (
            <div className={styles.slider}>
                {/* <div className={styles.logo}>
                    <img src="./assets/logo.png" alt="" />
                    <h1>华云信息</h1>
                </div> */}
                <Menu
                    mode="inline"
                    // theme="dark"
                    defaultSelectedKeys={this.defaultSelectedKeys}
                    defaultOpenKeys={this.defaultOpenKeys}
                    // onOpenChange={this.onOpenChange}
                    selectedKeys={this.defaultSelectedKeys}
                    style={{ borderRight: 0 }}
                >
                    {this.renderMenu(window.menus)}
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        path: state.RouterModel.path,
    };
};
export default connect(mapStateToProps, null)(withRouter(Menus));
// export default withRouter(Menus);
