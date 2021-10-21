import React from "react";
// import { DatePicker, Select } from "antd";
import ChartComponent from "@/components/ChartComponent";
import SelectOption from "@/components/SelectOption";

let secArr = [
    { key: "theme1000SnapMktNum", value: "主题1000快照行情数目" },
    { key: "theme1001SnapMktNum", value: "主题1001快照行情数目" },
];
export default class onlineUser extends React.PureComponent {
    state = {
        info: {},
        formArr: [
            {
                label: "查询类别",
                id: "qryType",
                initialValue: "theme1000SnapMktNum",
                rules: [
                    {
                        required: true,
                        message: "查询类别不能为空",
                    },
                ],
                component: SelectOption(secArr, { width: "200px" }),
            },
        ],
    };
    getSearchList = (params, form) => {
        console.log(params);
        this.getData(params);
    };
    getData = (params, count = 0) => {
        http.get({
            url: "/session/sessionTime",
            // data: params,
        }).then((res) => {
            // console.log(res);
            let list = res.data;
            let params = {
                theme: "light",
                title: {
                    // text: "用户登录曲线图,当前总登录数：1693",
                    text: "当前时刻总登录数：" + count,
                },
                data: list,
                xAxis: {
                    name: "时间",
                },
                yAxis: {
                    name: "人数",
                },
                // xSeriesUnit:"",  //x轴单位
                ySeriesUnit: "",
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
    getCount = (params) => {
        http.get({
            url: "/session/selectCount",
            // data: params,
        }).then((res) => {
            let count = res.data;
            // console.log("人数 ", count);
            this.getData({}, count);
        });
    };
    componentDidMount() {
        this.getCount();
        // this.getData();
    }

    render() {
        let info = this.state.info;
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
