import React from "react";
import { Input, Menu } from "antd";
import IpType from "./ipType";
import MacType from "./macType";
import styles from "./style.module.less";

export default class uoeSetting extends React.PureComponent {
    state = {
        searchLoading: false,
        selectRow: [],
        info: [],
        pagination: { total: 0 },
        currentTick: "1",
    };

    handleClick = (e) => {
        this.setState({
            currentTick: e.key,
        });
    };
    render() {
        return (
            <React.Fragment>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.currentTick]}
                    mode="horizontal"
                >
                    <Menu.Item style={{ marginLeft: "12px" }} key="1">
                        mac地址
                    </Menu.Item>
                    <Menu.Item key="2">IP地址</Menu.Item>
                </Menu>
                {this.state.currentTick == "1" ? (
                    <MacType></MacType>
                ) : (
                    <IpType></IpType>
                )}
            </React.Fragment>
        );
    }
}
