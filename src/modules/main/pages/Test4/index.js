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

import DynamicModal from "@/components/DynamicModal";

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

let secArr = [
  { value: "1", text: "咸鱼一条" },
  { value: "2", text: "风华浪子" },
  { value: "3", text: "北大才子一枚" },
  { value: "4", text: "百度FE" },
  { value: "5", text: "创业者" }
];
class PageModal extends React.PureComponent {
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
    dyVisible: false
  };
  //获取表单数据
  handleDynamicForm = ({ form }) => {
    this.dyform = form;
  };
  handleBtn = () => {
    this.showModal();
  };
  handleOk = () => {
    console.log("确定!");
    let formData = this.dyform.getFieldsValue();
    console.log(formData);
    this.hideModal();
  };
  showModal = () => {
    this.setState({
      dyVisible: true
    });
  };
  hideModal = () => {
    this.setState({
      dyVisible: false
    });
  };
  componentDidMount() {}
  render() {
    console.log("test4 渲染！");
    return (
      <div>
        <Card title="动态弹窗">
          <Button type="primary" onClick={this.handleBtn}>
            显示弹窗
          </Button>
          <DynamicModal
            title="动态弹窗"
            visible={this.state.dyVisible}
            onOk={this.handleOk}
            onCancel={this.hideModal}
            fields={this.state.formArr}
            onReady={this.handleDynamicForm}
            col="2"
            width="630px"
            centered={true}
          ></DynamicModal>
        </Card>
      </div>
    );
  }
}
export default PageModal;
