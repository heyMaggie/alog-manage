import React from "react";
import { Card } from "antd";
import BasicTable from "@/components/Table";

const columns = [
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
    title: "订单所有者类型",
    dataIndex: "OwnerType",
    key: "OwnerType",
    width: 120
  },
  {
    title: "结算机构代码",
    dataIndex: "ClearingFirm",
    key: "ClearingFirm",
    width: 120
  },
  {
    title: "委托时间",
    dataIndex: "TransactTime",
    key: "TransactTime",
    width: 120
  },
  { title: "用户私有信息", dataIndex: "UserInfo", key: "UserInfo", width: 120 },
  {
    title: "客户订单编号",
    dataIndex: "ClOrdID",
    key: "ClOrdID",
    width: 120
  },
  {
    title: "证券账户",
    dataIndex: "AccountID",
    key: "AccountID",
    width: 120
  },
  {
    title: "营业部代码",
    dataIndex: "BranchID",
    key: "BranchID",
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
  },
  {
    title: "订单数量",
    dataIndex: "OrderQty",
    key: "OrderQty",
    width: 120
  },
  {
    title: "订单剩余数量",
    dataIndex: "LeavesQty",
    key: "LeavesQty",
    width: 120
  },
  {
    title: "订单状态",
    dataIndex: "OrdStatus",
    key: "OrdStatus",
    width: 120
  },
  {
    title: "价格",
    dataIndex: "Price",
    key: "Price",
    width: 120
  },
  {
    title: "止损价",
    dataIndex: "StopPx",
    key: "StopPx",
    width: 120
  },
  {
    title: "最低成交数量",
    dataIndex: "MinQty",
    key: "MinQty",
    width: 120
  },
  {
    title: "最多成交价位数",
    dataIndex: "MaxPriceLevels",
    key: "MaxPriceLevels",
    width: 130
  },
  {
    title: "订单有效时间类型",
    dataIndex: "TimeInForce",
    key: "TimeInForce",
    width: 150
  },
  {
    title: "信用标识",
    dataIndex: "CashMargin",
    key: "CashMargin",
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

export default class Test extends React.PureComponent {
  state = {
    selectRow: []
  };
  handleTableChange = e => {
    console.log(e);
    console.log("handleTableChange");
  };
  params = {
    page: 1
  };
  getData = () => {
    http
      .ajax({
        url: "/map/bike_list",
        data: {
          params: this.params
        }
      })
      .then(res => {
        console.log(res);
        if (res.code == "2000") {
          console.log("查询成功!");
          // this.setState({
          //   total_count: res.result.total_count
          // });
          // this.renderMap(res.result);
        }
      });
  };
  getData2 = () => {
    http
      .ajax({
        url: "/msg/host"
      })
      .then(res => {
        console.log("查询成功!", res);
        // this.setState({
        //   total_count: res.result.total_count
        // });
      });
  };
  componentDidMount() {
    // this.getData2();
  }
  render() {
    console.log("test1 渲染！ 212");
    let { selectRow } = this.state;
    const rowSelection = {
      selectRow,
      onChange: this.handleTableChange
    };
    return (
      <Card title="集中竞价">
        <BasicTable
          rowKey={"OrderID"}
          columns={columns}
          scroll={{ x: 1500, y: 300 }}
          dataSource={data}
          rowSelection={rowSelection}
        ></BasicTable>
      </Card>
    );
  }
}
