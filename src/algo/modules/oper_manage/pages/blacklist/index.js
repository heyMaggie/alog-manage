import React from "react";
import CurdComponent from "@/components/CurdComponent";
import { Input, Menu } from "antd";
import IpType from "./ipType";
import MacType from "./macType";

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
            <div>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item key="1">mac地址</Menu.Item>
                    <Menu.Item key="2">IP地址</Menu.Item>
                </Menu>
                {this.state.currentTick == "1" ? (
                    <MacType></MacType>
                ) : (
                    <IpType></IpType>
                )}
            </div>
        );
    }
}
