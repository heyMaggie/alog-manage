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

import SearchForm from "@/components/SearchForm";

import SelectOption from "@/components/SelectOption";

// let radioArr = [
//   { value: "1", text: "男" },
//   { value: "2", text: "女" }
// ];
// let checkArr = [
//   { value: "1", text: "篮球" },
//   { value: "2", text: "足球" }
// ];

let secArr = [
  { value: "1", text: "咸鱼一条" },
  { value: "2", text: "风华浪子" },
  { value: "3", text: "北大才子一枚" },
  { value: "4", text: "百度FE" },
  { value: "5", text: "创业者" }
];
class Test5 extends React.PureComponent {
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
      // {
      //   label: "性别",
      //   id: "sex1",
      //   initialValue: "1",
      //   component: RadioGroup(radioArr)
      // },
      // {
      //   label: "爱好",
      //   id: "like",
      //   initialValue: ["1"],
      //   component: CheckboxGroup(checkArr)
      // },
      {
        label: "状态状态状态",
        id: "state1",
        initialValue: ["2"],
        component: SelectOption(secArr)
      },
      {
        label: "用户名字体为",
        id: "userName2",
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
        label: "密码密码",
        id: "password2",
        initialValue: "",
        component: <Input placeholder="请输入密码" />
      }
    ],
    searchLoading: false
  };
  //获取搜索栏数据
  handleSearch = ({ form }) => {
    console.log("获取搜索栏数据");
    console.log(form.getFieldsValue());
    this.setState(
      {
        searchLoading: true
      },
      () => {
        setTimeout(() => {
          this.setState({
            searchLoading: false
          });
        }, 1500);
      }
    );
  };

  componentDidMount() {}
  render() {
    console.log("test5 渲染!！");
    return (
      <div>
        <SearchForm
          fields={this.state.formArr}
          onSearchClick={this.handleSearch}
          searchLoading={this.state.searchLoading}
        ></SearchForm>
        {/* <SearchForm
          fields={this.state.formArr}
          onSearchClick={this.handleSearch}
          searchLoading={this.state.searchLoading}
        ></SearchForm> */}
      </div>
    );
  }
}
export default Test5;
