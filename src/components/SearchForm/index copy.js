import React from "react";
import { Button, Form } from "antd";
import styles from "./index.module.less";
const FormItem = Form.Item;

class SearchForm extends React.PureComponent {
    handleClick = () => {
        let { onSearchClick } = this.props;
        if (typeof onSearchClick == "function") {
            onSearchClick({ form: this.props.form });
        }
    };
    componentDidMount() {
        let { onReady, form } = this.props;
        if (typeof onReady == "function") {
            onReady({ form });
        }
    }
    onKeyup = (e) => {
        if (e.keyCode === 13) {
            this.handleClick();
        }
    };
    render() {
        let {
            fields = [],
            form,
            searchLoading,
            btnText = "查询",
            insertBtnText = "新增",
        } = this.props;
        let { getFieldDecorator } = form;
        // let labelCol = {
        //     xs: 8,
        // };
        // let wrapperCol = {
        //     xs: 24 - labelCol.xs,
        // };
        // let formItemLayout = {
        //     labelCol,
        //     wrapperCol,
        // };
        let right = "right";
        if (insertBtnText) {
            right = "right2";
        }
        // console.log(this.props.children);
        return (
            <div className={styles.searchform}>
                <div className={styles.left}>
                    <Form layout="inline" onKeyUp={this.onKeyup}>
                        {fields.map((item) => {
                            return (
                                <FormItem
                                    key={item.id}
                                    label={item.label}
                                    // {...formItemLayout}
                                >
                                    {getFieldDecorator(
                                        item.id,
                                        item.initialValue
                                            ? {
                                                  initialValue:
                                                      item.initialValue,
                                                  rules: item.rules,
                                              }
                                            : { rules: item.rules }
                                    )(item.component)}
                                </FormItem>
                            );
                        })}
                    </Form>
                </div>
                <div className={styles[right]}>
                    <Button
                        type="ghost"
                        loading={searchLoading}
                        onClick={this.handleClick}
                    >
                        {btnText}
                    </Button>
                    {/* <Button
                        type="primary"
                        icon="plus"
                        style={{ width: "104px", marginLeft: "24px" }}
                        loading={searchLoading}
                        onClick={this.handleClick}
                    >
                        {insertBtnText}
                    </Button> */}
                    {this.props.children}
                </div>
            </div>
        );
    }
}
//解决重复 id 的问题
class IdSearchForm extends React.PureComponent {
    render() {
        let { pageId } = this.props;
        if (pageId) {
            if (!this.formName) {
                this.formName = "search" + pageId;
                this.HocForm = Form.create({ name: this.formName })(SearchForm);
            }
            // console.log("HocSearchForm 渲染 ", formName);
            // let HocForm = Form.create({ name: this.formName })(SearchForm);
            return <this.HocForm {...this.props}></this.HocForm>;
        } else {
            //不带id
            let HocForm = Form.create()(SearchForm);
            return <HocForm {...this.props}></HocForm>;
        }
    }
}
export default IdSearchForm;
// let formName = "search" + parseInt(Math.random() * 100000);
// export default Form.create()(SearchForm);
