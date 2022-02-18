import React from "react";
// import { DatePicker, Select } from "antd";
import ChartComponent from "@/components/ChartComponent";
import SelectOption from "@/components/SelectOption";

let secArr = [
    { key: "0", value: "全部" },
    { key: "1", value: "大页内存" },
];
export default class cpu extends React.PureComponent {
    state = {
        info: {},
        formArr: [
            {
                label: "内存类型",
                id: "ram",
                initialValue: "0",
                component: SelectOption(secArr, { width: "200px" }),
            },
        ],
    };
    getSearchList = (params, form) => {
        console.log(params);
        if (params.ram == 0) {
            this.getData(params);
        } else {
            this.getHugeData(params);
        }
    };
    getData = (params) => {
        http.get({
            url: "/sshInfo/ram",
            // data: params,
        }).then((res) => {
            console.log(res);
            let list = res.data;
            let params = {
                theme: "light",
                title: {
                    text: "内存使用率",
                },
                data: list,
                xAxis: {
                    name: "时间",
                },
                yAxis: {
                    name: "使用率",
                },
                // xSeriesUnit:"",  //x轴单位
                ySeriesUnit: "%",
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
    getHugeData = (params) => {
        http.get({
            url: "/option/base/hugePage",
            // data: params,
        }).then((res) => {
            console.log(res);
            let list = res.data;
            let params = {
                theme: "light",
                title: {
                    text: "内存使用率",
                },
                data: list,
                xAxis: {
                    name: "时间",
                },
                yAxis: {
                    name: "使用率",
                },
                // xSeriesUnit:"",  //x轴单位
                ySeriesUnit: "%",
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
