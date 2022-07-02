import React from "react";
import { Modal } from "antd";
import DynamicForm from "@/components/DynamicForm";

// import styles from "./index.module.less";

class DynamicModal extends React.PureComponent {
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
            okText = "确认",
            cancelText = "取消",
            title,
            onOk = () => {},
            onCancel = () => {},
            fields = [],
            col = 1,
            onReady,
            onValueChange,
            ...rest
        } = this.props;
        return (
            <div>
                <Modal
                    title={title}
                    visible={visible}
                    onOk={onOk}
                    onCancel={onCancel}
                    okText={okText}
                    cancelText={cancelText}
                    {...rest}
                >
                    <DynamicForm
                        fields={fields}
                        col={col}
                        onReady={this.handleReady}
                        onValueChange={onValueChange}
                    ></DynamicForm>
                </Modal>
            </div>
        );
    }
}
export default DynamicModal;
