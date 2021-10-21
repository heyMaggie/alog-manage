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

import CurdComponent from "@/components/CurdComponent";
import SelectOption from "@/components/SelectOption";

let secArr = [
  { value: "1", text: "咸鱼一条" },
  { value: "2", text: "风华浪子" },
  { value: "3", text: "北大才子一枚" },
  { value: "4", text: "百度FE" },
  { value: "5", text: "创业者" }
];
const getSearchFormFields = () => {
  return [
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
      label: "状态",
      id: "state1",
      initialValue: ["2"],
      component: SelectOption(secArr)
    },
    {
      label: "用户名",
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
      label: "密码",
      id: "password2",
      initialValue: "",
      component: <Input placeholder="请输入密码" />
    }
  ];
};
const getInsertFormFields = () => {
  return [
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
      label: "状态",
      id: "state1",
      initialValue: ["2"],
      component: SelectOption(secArr)
    },
    {
      label: "用户名",
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
      label: "密码",
      id: "password2",
      initialValue: "",
      component: <Input placeholder="请输入密码" />
    }
  ];
};
const getUpdateFormFields = () => {
  return [
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
      label: "状态",
      id: "state1",
      initialValue: ["2"],
      component: SelectOption(secArr)
    },
    {
      label: "用户名",
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
      label: "密码",
      id: "password2",
      initialValue: "",
      component: <Input placeholder="请输入密码" />
    }
  ];
};

const columns = params => {
  return [
    {
      title: "交易所订单编号",
      width: 130,
      dataIndex: "OrderID",
      key: "OrderID"
    },
    {
      title: "下单的发送方代码",
      width: 150,
      dataIndex: "SenderCompID",
      key: "SenderCompID"
    },
    {
      title: "应用标识",
      dataIndex: "ApplID",
      key: "ApplID",
      width: 100
    },
    {
      title: "申报交易单元",
      dataIndex: "SubmittingPBUID",
      key: "SubmittingPBUID",
      width: 130
    },
    {
      title: "证券代码",
      dataIndex: "SecurityID",
      key: "SecurityID",
      width: 100
    },
    {
      title: "证券代码源",
      dataIndex: "SecurityIDSource",
      key: "SecurityIDSource",
      width: 120
    },
    {
      title: "证券账户",
      dataIndex: "AccountID",
      key: "AccountID",
      width: 120
    },
    {
      title: "订单限定",
      dataIndex: "OrderRestrictions",
      key: "OrderRestrictions",
      width: 120
    },
    {
      title: "买卖方向",
      dataIndex: "Side",
      key: "Side",
      width: 120
    },
    {
      title: "订单类别",
      dataIndex: "OrdType",
      key: "OrdType",
      width: 120
    }
    // {
    //   title: "Action",
    //   key: "operation",
    //   fixed: "right",
    //   width: 100,
    //   render: () => <a>action</a>
    // }
  ];
};

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    OrderID: `OrderID  ${i}`,
    SenderCompID: `SenderCompID  ${i}`,
    ApplID: `ApplID   ${i}`,
    SubmittingPBUID: `SubmittingPBUID  ${i}`,
    SecurityID: `SecurityID  ${i}`,
    SecurityIDSource: `SecurityIDSource  ${i}`,
    OwnerType: `OwnerType   ${i}`,
    ClearingFirm: `ClearingFirm  ${i}`,
    TransactTime: `TransactTime   ${i}`,
    UserInfo: `UserInfo  ${i}`,
    ClOrdID: `ClOrdID  ${i}`,
    AccountID: `AccountID  ${i}`,
    BranchID: `BranchID   ${i}`,
    OrderRestrictions: `OrderRestrictions  ${i}`,
    Side: `Side  ${i}`,
    OrdType: `OrdType   ${i}`,
    OrderQty: `OrderQty  ${i}`,
    LeavesQty: `LeavesQty  ${i}`,
    CumQty: `CumQty  ${i}`,
    OrdStatus: `OrdStatus  ${i}`,
    Price: `Price  ${i}`,
    StopPx: `StopPx   ${i}`,
    MinQty: `MinQty   ${i}`,
    MaxPriceLevels: `MaxPriceLevels   ${i}`,
    TimeInForce: `TimeInForce   ${i}`,
    CashMargin: `CashMargin  ${i}`
  });
}

class Test6 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchLoading: false,
      selectRow: [],
      addBtnArr: [
        { btnText: "批量导入", handleClick: this.hanBtnClick1 },
        { btnText: "批量成交", handleClick: this.hanBtnClick2 }
      ]
    };
  }
  //批量选择
  handleTableChange = selectedRowKeys => {
    console.log("批量选择");
    this.setState({
      selectRow: selectedRowKeys
    });
  };

  //按钮1 点击事件
  hanBtnClick1 = () => {
    console.log("hanBtnClick1");
  };

  hanBtnClick2 = () => {
    console.log("批量成交");
    console.log(this.state.selectRow);
  };

  //获取搜索栏数据
  handleSearch = params => {
    console.log("获取搜索栏数据");
    console.log(params);
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
  handleInsertRecord = params => {
    console.log(params);
  };
  //更新记录
  handleUpdateRecord = ({ form }) => {
    console.log(form.getFieldsValue());
  };
  //删除记录
  handleDeleteRecord = record => {
    console.log("删除记录 ", record);
  };
  //填入更新数据
  setUpdateModal = ({ form, record }) => {
    form.setFieldsValue({
      userName1: record.OrderID,
      password1: record.SenderCompID,
      state1: ["3"],
      userName2: record.SubmittingPBUID,
      password2: record.SecurityID
    });
  };
  componentDidMount() {}
  render() {
    console.log("test6 渲染！");
    let scroll = { x: 1000, y: 445 };
    //批量
    let { selectRow } = this.state;
    const rowSelection = {
      selectRow,
      onChange: this.handleTableChange
    };
    return (
      <div>
        <CurdComponent
          // rowKey={rowKey}
          isShowSearchForm={true}
          onSearchClick={this.handleSearch}
          getSearchFormFields={getSearchFormFields}
          searchLoading={this.state.searchLoading}
          isShowInsert={true}
          insertBtnText={"新增记录"} // 不传 就没新增按钮
          addBtnArr={this.state.addBtnArr}
          getInsertFormFields={getInsertFormFields}
          insertRecord={this.handleInsertRecord}
          getUpdateFormFields={getUpdateFormFields}
          setUpdateModal={this.setUpdateModal}
          updateRecord={this.handleUpdateRecord} // 不传 就没编辑
          deleteRecord={this.handleDeleteRecord} // 不传 就没删除
          centered={true}
          columns={columns}
          dataSource={data}
          scroll={scroll}
          rowSelection={rowSelection} //批量选择 操作
        ></CurdComponent>
      </div>
    );
  }
}
export default Test6;
