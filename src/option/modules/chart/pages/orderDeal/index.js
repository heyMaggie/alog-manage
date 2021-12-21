import React from "react";
import { Input, AutoComplete } from "antd";
import ChartComponent from "@/components/ChartComponent";
import SelectOption from "@/components/SelectOption";

let secArr = [
    { key: "0", value: "全部" },
    { key: "1", value: "买入" },
    { key: "2", value: "卖出" },
];
export default class orderDeal extends React.PureComponent {
    state = {
        info: {},
        userArr: [],
        securityArr: [],
        // formArr: [
        //     {
        //         label: "用户名",
        //         id: "userId",
        //         // initialValue: "0",
        //         component: (
        //             <AutoComplete
        //                 dataSource={this.state.test}
        //                 placeholder="请输入用户名"
        //             />
        //         ),
        //     },
        //     {
        //         label: "股票",
        //         id: "securityId",
        //         // initialValue: "0",
        //         component: <Input placeholder="请输入股票" />,
        //     },
        //     {
        //         label: "买卖方向",
        //         id: "side",
        //         initialValue: "0",
        //         component: SelectOption(secArr, { width: "200px" }),
        //     },
        // ],
    };
    getSearchList = (params, form) => {
        if (params.side == 0) {
            params.side = "";
        }
        console.log(params);
        if (
            params.userId != "" &&
            !this.state.userArr.includes(params.userId)
        ) {
            this.state.userArr.push(params.userId);
        }
        if (
            params.securityId != "" &&
            !this.state.securityArr.includes(params.securityId)
        ) {
            this.state.securityArr.push(params.securityId);
        }
        this.getData(params);
    };
    getData = (params, count = 0) => {
        http.post({
            url: "/option/orderDeal/countGroup",
            data: params,
        }).then((res) => {
            // console.log(res);
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
                ySeriesUnit: "股",
                gridRight: "10%",
                // level:[200,400,600,800,1000]
            };
            let option = getLineOption(params);
            console.log(option);
            this.setState({
                info: option,
            });
        });
    };
    componentDidMount() {
        this.getData();
    }
    render() {
        let formArr = [
            {
                label: "用户名",
                id: "userId",
                // initialValue: "0",
                component: (
                    <AutoComplete
                        dataSource={this.state.userArr}
                        placeholder="请输入用户名"
                    />
                ),
            },
            {
                label: "股票",
                id: "securityId",
                // initialValue: "0",
                component: <Input placeholder="请输入股票" />,
            },
            {
                label: "买卖方向",
                id: "side",
                initialValue: "0",
                component: SelectOption(secArr, { width: "200px" }),
            },
        ];
        return (
            <div>
                <ChartComponent
                    // isShowSearchForm={false}
                    getSearchFormFields={formArr}
                    getSearchList={this.getSearchList}
                    dataSource={this.state.info}
                ></ChartComponent>
            </div>
        );
    }
}
