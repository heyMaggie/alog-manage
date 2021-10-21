import React from "react";
// import { DatePicker, Select } from "antd";
import ChartComponent from "@/components/ChartComponent";
import SelectOption from "@/components/SelectOption";

let secArr = [
    { key: "0", value: "多核" },
    // { key: "1", value: "买入" },
    // { key: "2", value: "卖出" },
];
export default class network extends React.PureComponent {
    state = {
        info: {},
        formArr: [
            // {
            //     label: "CPU",
            //     id: "cpu",
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
            url: "/base/net",
            data: params,
        }).then((res) => {
            console.log(res);
            let list = res.data;
            let params = {
                theme: "light",
                title: {
                    text: "网络带宽(Mbps)",
                },
                data: list,
                xAxis: {
                    name: "时间",
                },
                yAxis: {
                    name: "带宽",
                },
                // xSeriesUnit:"",  //x轴单位
                ySeriesUnit: "M",
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
        // let info = this.state.info;
        return (
            <div>
                <ChartComponent
                    isShowSearchForm={false}
                    // getSearchFormFields={this.state.formArr}
                    getSearchList={this.getSearchList}
                    dataSource={this.state.info}
                ></ChartComponent>
            </div>
        );
    }
}
