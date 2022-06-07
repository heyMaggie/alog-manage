import React from "react";
import {
    SearchForm,
    Input,
    TimePicker,
    Form,
    Button,
    Icon,
    RangePicker,
} from "antd";

import CurdComponent from "@/components/CurdComponent";
// import SelectOption from "@/components/SelectOption";

export default class Cccx extends React.PureComponent {
    state = {
        searchLoading: false,
        info: [],
        pagination: { total: 0 },
        username: "",
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
            }
        });
    };
    render() {
        return (
            <div>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item>
                        <Input
                            prefix={
                                <Icon
                                    type="user"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item>
                        {/* <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" /> */}
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
