import React from "react";
// import { DatePicker, Select } from "antd";
import ChartComponent from "@/components/ChartComponent";
import SelectOption from "@/components/SelectOption";

let secArr = [
    { key: "0", value: "全部" },
    { key: "1", value: "买入" },
    { key: "2", value: "卖出" },
];
export default class order extends React.PureComponent {
    state = {
        info: {},
        formArr: [
            {
                label: "买卖方向",
                id: "side",
                initialValue: "0",
                component: SelectOption(secArr, { width: "200px" }),
            },
        ],
    };
    getSearchList = (params, form) => {
        if (params.side == 0) {
            params.side = "";
        }
        console.log(params);
        this.getData(params);
    };
    getData = (params, count = 0) => {
        http.post({
            url: "/order/countGroup",
            data: params,
        }).then((res) => {
            console.log(res);
            let list = res.data;
            let params = {
                theme: "light",
                // title: {
                //     text: "当前时刻总订单数：" + count,
                // },
                data: list,
                xAxis: {
                    name: "时间",
                },
                yAxis: {
                    name: "数量",
                },
                // xSeriesUnit:"",  //x轴单位
                ySeriesUnit: "笔",
                gridRight: "10%",
                // level:[200,400,600,800,1000]
            };
            let option = getLineOption(params);
            // console.log(option);
            this.setState({
                info: option,
            });
        });
    };
    componentDidMount() {
        this.getData();
    }

    render() {
        let info = this.state.info;
        return (
            <div>
                <ChartComponent
                    // isShowSearchForm={false}
                    getSearchFormFields={this.state.formArr}
                    getSearchList={this.getSearchList}
                    dataSource={this.state.info}
                ></ChartComponent>
            </div>
        );
    }
}
