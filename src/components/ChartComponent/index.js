import React from "react";
// import { DatePicker, Input } from "antd";
import styles from "./style.module.less";

import SearchForm from "@/components/SearchForm";
import moment from "moment";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/chart/gauge";
//引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/grid";
import "echarts/lib/component/legend";
//引入滑动条
import "echarts/lib/component/dataZoom";
import "echarts/lib/component/dataZoomInside";
import "echarts/lib/component/dataZoomSlider";

import "echarts/lib/component/visualMap";
import "echarts/lib/component/markLine";

export default class ChartComponent extends React.PureComponent {
    //获取搜索栏数据
    handleSearch = ({ form }) => {
        this.searchForm = form;
        let params = this.searchForm.getFieldsValue();
        for (const key in params) {
            if (params[key] instanceof moment) {
                params[key] = params[key].format("YYYYMMDD");
            }
            if (params[key] == undefined) {
                params[key] = "";
            }
        }
        this.props.getSearchList(params, form);
    };

    initEchart = (options) => {
        // console.log(options);
        if (!document.getElementsByClassName(`chartCom${this.pageId}`)[0]) {
            return;
        }
        let theme = options.theme ? options.theme : "default";
        if (this.chart) {
            this.chart.resize();
        } else {
            this.chart = echarts.init(
                document.getElementsByClassName(`chartCom${this.pageId}`)[0],
                theme
            );
        }
        this.chart.setOption(options, true);
    };
    resizeAc = () => {
        if (this.timeOut) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(() => {
            this.initEchart(this.props.dataSource);
        }, 50);
    };
    componentDidMount() {
        window.addEventListener("resize", this.resizeAc);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeAc);
    }
    render() {
        let {
            searchLoading = false,
            isShowSearchForm = true,
            getSearchFormFields,
        } = this.props;
        if (!this.pageId) {
            if (!window.pageId) {
                window.pageId = 1;
            }
            this.pageId = window.pageId;
            window.pageId += 1;
        }
        if (this.props.dataSource.hasOwnProperty("xAxis")) {
            this.initEchart(this.props.dataSource);
        }
        return (
            <div className={styles.chartComponent}>
                {isShowSearchForm && (
                    <div>
                        <div className={styles.wrap}>
                            <SearchForm
                                fields={getSearchFormFields}
                                onSearchClick={this.handleSearch}
                                searchLoading={searchLoading}
                                pageId={this.pageId}
                            ></SearchForm>
                        </div>
                        <div
                            style={{
                                position: "absolute",
                                width: "200%",
                                height: "5px",
                                background: "#ddd",
                                zIndex: "0",
                            }}
                        ></div>
                    </div>
                )}

                <div
                    style={{ height: "700px", padding: "30px" }}
                    className={`chartCom${this.pageId} ` + styles.wrap}
                ></div>
            </div>
        );
    }
}
