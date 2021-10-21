import React from "react";
import { Form } from "antd";
const FormItem = Form.Item;
import styles from "./index.module.less";

class DynamicForm extends React.PureComponent {
    componentDidMount() {
        let { form, onReady } = this.props;
        if (typeof onReady == "function") {
            onReady({ form });
        }
    }
    render() {
        // console.log("DynamicForm render");
        let { form, fields = [] } = this.props;
        let { getFieldDecorator } = form;
        let labelCol = {
            xs: this.props.labelCol || 6,
        };
        let wrapperCol = {
            xs: 24 - labelCol.xs,
        };
        let formItemLayout = {
            labelCol,
            wrapperCol,
        };
        // console.log(formItemLayout);
        return (
            <Form layout="horizontal" className={styles.dynamicForm}>
                {fields.map((item, index) => {
                    return (
                        <FormItem
                            className={"col" + this.props.col}
                            key={item.id}
                            label={item.label}
                            {...formItemLayout}
                        >
                            {getFieldDecorator(item.id, {
                                initialValue: item.initialValue
                                    ? item.initialValue
                                    : undefined,
                                rules: item.rules,
                            })(item.component)}
                        </FormItem>
                    );
                })}
            </Form>
        );
    }
}
//解决重复 id 的问题
// let formName = "form" + parseInt(Math.random() * 100000);
export default Form.create()(DynamicForm);
