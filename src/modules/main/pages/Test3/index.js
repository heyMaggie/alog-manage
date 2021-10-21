import React from "react";
import {
  Card,
  Form,
  Button,
  Input,
  Checkbox,
  Radio,
  Select,
  InputNumber
} from "antd";

import DynamicForm from "@/components/DynamicForm";
import RadioGroup from "@/components/RadioGroup";
import CheckboxGroup from "@/components/CheckboxGroup";
import SelectOption from "@/components/SelectOption";
const FormItem = Form.Item;
const Option = Select.Option;

let radioArr = [
  { value: "1", text: "男" },
  { value: "2", text: "女" }
];
let checkArr = [
  { value: "1", text: "篮球" },
  { value: "2", text: "足球" }
];
// Option value="1">咸鱼一条</Option>
// <Option value="2">风华浪子</Option>
// <Option value="3">北大才子一枚</Option>
// <Option value="4">百度FE</Option>
// <Option value="5">创业者</Option>
let secArr = [
  { key: "1", value: "咸鱼一条" },
  { key: "2", value: "风华浪子" },
  { key: "3", value: "北大才子一枚" },
  { key: "4", value: "百度FE" },
  { key: "5", value: "创业者" }
];

class FormRegister extends React.PureComponent {
  state = {
    formArr: [
      {
        label: "用户名",
        id: "userName1",
        initialValue: "",
        rules: [
          {
            required: true,
            message: "用户名不能为空"
          }
        ],
        component: <Input placeholder="请输入用户名" />
      },
      {
        label: "密码",
        id: "password1",
        initialValue: "",
        component: <Input placeholder="请输入密码" />
      },
      {
        label: "性别",
        id: "sex1",
        initialValue: "1",
        component: RadioGroup(radioArr)
      },
      {
        label: "爱好",
        id: "like",
        initialValue: ["1"],
        component: CheckboxGroup(checkArr)
      },
      {
        label: "状态",
        id: "state1",
        initialValue: ["2"],
        component: SelectOption(secArr)
      }
    ],
    abc: 1
  };

  handleDynamicForm = ({ form }) => {
    this.dyform = form;
  };
  handleBtn = () => {
    console.log(this.dyform.getFieldsValue());
  };
  render() {
    console.log("test3 渲染！");
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: 24,
        sm: 12
      }
    };
    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 4
        }
      }
    };
    const rowObject = {
      minRows: 4,
      maxRows: 6
    };
    return (
      <div>
        <Card title="动态表单">
          <DynamicForm
            fields={this.state.formArr}
            onReady={this.handleDynamicForm}
          ></DynamicForm>
          <Button type="primary" onClick={this.handleBtn}>
            获取动态表单值
          </Button>
        </Card>
      </div>
    );
  }
}
const testForm3 = Form.create({ name: "test3" })(FormRegister);

export default testForm3;
