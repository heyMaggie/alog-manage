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
                                <Icon type={item.icon || "home"}></Icon>
                                <span>{item.title}</span>
                            </span>
                        }
                        key={item.path}
                    >
                        {this.renderMenu(item.children)}
                    </SubMenu>
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
    render() {
        // console.log(this.props);
        let { path } = this.props;
        //获取默认 展开菜单
        this.keys = [];
        this.getOpenKeys(window.menus, path, true);

        this.defaultOpenKeys = this.keys ? this.keys : ["/main/option"];
        this.defaultSelectedKeys = path ? [path] : ["/main/option/buy"];
        // this.defaultOpenKeys = ["/main"];
        // this.defaultSelectedKeys = ["/main/test"];
        // console.log("默认展开菜单 :", this.defaultOpenKeys);
        // console.log("默认选中 :", this.defaultSelectedKeys);
        return (
            <div>
                <div className={styles.logo}>
                    <img src="./assets/logo.png" alt="" />
                    <h1>华云信息</h1>
                </div>
                <Menu
                    mode="inline"
                    theme="dark"
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
