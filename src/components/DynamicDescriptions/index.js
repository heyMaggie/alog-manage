import React from "react";
import { Modal, Descriptions } from "antd";
// import DynamicForm from "@/components/DynamicForm";

import styles from "./index.module.less";

export default class DynamicDescriptions extends React.PureComponent {
    handleReady = ({ form }) => {
        this.form = form;
        let { onReady } = this.props;
        if (typeof onReady == "function") {
            onReady({ form });
        }
    };
    render() {
        let {
            visible = false,
            title = "详情",
            fields = [],
            column = 1,
            onReady,
            onValueChange,
            record,
            ...rest
        } = this.props;
        let dict = [];
        if (record) {
            for (let i = 0; i < fields.length; i++) {
                let obj = {};
                let item = fields[i];
                obj.key = item.title;
                obj.value = record[item.dataIndex];
                dict.push(obj);
            }
        }
        if (this.props.width) {
            this.width = this.props.width;
        } else {
            this.width = 520;
            if (column == 2) {
                this.width = 800;
            }
            if (column >= 3) {
                this.width = 1200;
            }
        }
        return (
            <Modal
                {...rest}
                // title={title}
                visible={visible}
                centered={true}
                footer={null}
                width={this.width}
            >
                <Descriptions title={title} bordered column={column}>
                    {dict.map((item, index) => (
                        <Descriptions.Item key={index} label={item.key}>
                            <div
                                key={index}
                                style={{ "word-break": "break-word" }}
                            >
                                {item.value}
                            </div>
                        </Descriptions.Item>
                    ))}
                </Descriptions>
            </Modal>
        );
    }
}
