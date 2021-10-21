import React from "react";
// import { DatePicker, Select } from "antd";
import ChartComponent from "@/components/ChartComponent";
import SelectOption from "@/components/SelectOption";

let secArr = [
    { key: "0", value: "全部" },
    { key: "1", value: "买入" },
    { key: "2", value: "卖出" },
];
export default class disk extends React.PureComponent {
    state = {
        info: {},
        formArr: [
            // {
            //     label: "买卖方向",
            //     id: "side",
            //     initialValue: "0",
            //     component: SelectOption(secArr, { width: "200px" }),
            // },
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
        http.get({
            url: "/base/disk",
            // data: params,
        }).then((res) => {
            console.log(res);
            let list = res.data;
            // console.log(option);
            var option;
            option = {
                xAxis: list.x,
                tooltip: {
                    formatter: "{b} : {c}%",
                },
                toolbox: {
                    feature: {
                        // restore: {},
                        saveAsImage: {},
                    },
                },
                series: [
                    {
                        type: "gauge",
                        detail: { formatter: "{value}%" },
                        data: [{ value: list.y, name: "硬盘使用率" }],
                    },
                ],
            };
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
