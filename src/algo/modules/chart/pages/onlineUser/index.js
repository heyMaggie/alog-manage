import React from "react";
// import { DatePicker, Select } from "antd";
import ChartComponent from "@/components/ChartComponent";
import SelectOption from "@/components/SelectOption";
import echarts from "echarts";
// import "echarts/lib/chart/bar";
// import "echarts/lib/chart/line";
// import "echarts/lib/chart/gauge";
// //引入提示框和标题组件
// import "echarts/lib/component/tooltip";
// import "echarts/lib/component/title";
// import "echarts/lib/component/grid";
// import "echarts/lib/component/legend";
// //引入滑动条
// import "echarts/lib/component/dataZoom";
// import "echarts/lib/component/dataZoomInside";
// import "echarts/lib/component/dataZoomSlider";

// import "echarts/lib/component/visualMap";
// import "echarts/lib/component/markLine";

let secArr = [
    { key: "theme1000SnapMktNum", value: "主题1000快照行情数目" },
    { key: "theme1001SnapMktNum", value: "主题1001快照行情数目" },
];
const upColor = '#00da3c';
const downColor = '#ec0000';
function splitData(rawData) {
  let categoryData = [];
  let values = [];
  let volumes = [];
  for (let i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0]);
    values.push(rawData[i]);
    volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1]);
  }
  return {
    categoryData: categoryData,
    values: values,
    volumes: volumes
  };
}
function calculateMA(dayCount, data) {
  var result = [];
  for (var i = 0, len = data.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    var sum = 0;
    for (var j = 0; j < dayCount; j++) {
      sum += data.values[i - j][1];
    }
    result.push(+(sum / dayCount).toFixed(3));
  }
  return result;
}
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
            url: "/tb-online-time/onlineNum",
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
            url: "/tb-session-first/currentOnline",
            // data: params,
        }).then((res) => {
            let count = res.data;
            // console.log("人数 ", count);
            this.getData({}, count);
        });
    };
    getData2 = (params, count = 0) => {
        let rawData = [["2016-01-13",16526.63,16151.41,16123.2,16593.51,153530000],["2016-01-14",16159.01,16379.05,16075.12,16482.05,158830000],["2016-01-15",16354.33,15988.08,15842.11,16354.33,239210000],["2016-01-19",16009.45,16016.02,15900.25,16171.96,144360000],["2016-01-20",15989.45,15766.74,15450.56,15989.45,191870000],["2016-01-21",15768.87,15882.68,15704.66,16038.59,145140000],["2016-01-22",15921.1,16093.51,15921.1,16136.79,145850000],["2016-01-25",16086.46,15885.22,15880.15,16086.46,123250000],["2016-01-26",15893.16,16167.23,15893.16,16185.79,118210000],["2016-01-27",16168.74,15944.46,15878.3,16235.03,138350000],["2016-01-28",15960.28,16069.64,15863.72,16102.14,130120000],["2016-01-29",16090.26,16466.3,16090.26,16466.3,217940000],["2016-02-01",16453.63,16449.18,16299.47,16510.98,114450000],["2016-02-02",16420.21,16153.54,16108.44,16420.21,126210000],["2016-02-03",16186.2,16336.66,15960.45,16381.69,141870000],["2016-02-04",16329.67,16416.58,16266.16,16485.84,131490000],["2016-02-05",16417.95,16204.97,16129.81,16423.63,139010000],["2016-02-08",16147.51,16027.05,15803.55,16147.51,165880000],["2016-02-09",16005.41,16014.38,15881.11,16136.62,127740000],["2016-02-10",16035.61,15914.74,15899.91,16201.89,122290000],["2016-02-11",15897.82,15660.18,15503.01,15897.82,172070000],["2016-02-12",15691.62,15973.84,15691.62,15974.04,132550000],["2016-02-16",16012.39,16196.41,16012.39,16196.41,142030000],["2016-02-17",16217.98,16453.83,16217.98,16486.12,124080000],["2016-02-18",16483.76,16413.43,16390.43,16511.84,104950000],["2016-02-19",16410.96,16391.99,16278,16410.96,134340000],["2016-02-22",16417.13,16620.66,16417.13,16664.24,102240000],["2016-02-23",16610.39,16431.78,16403.53,16610.39,98170000],["2016-02-24",16418.84,16484.99,16165.86,16507.39,93620000],["2016-02-25",16504.38,16697.29,16458.42,16697.98,94120000],["2016-02-26",16712.7,16639.97,16623.91,16795.98,98480000],["2016-02-29",16634.15,16516.5,16510.4,16726.12,126220000],["2016-03-01",16545.67,16865.08,16545.67,16865.56,105050000],["2016-03-02",16851.17,16899.32,16766.32,16900.17,104470000],["2016-03-03",16896.17,16943.9,16820.73,16944.31,91110000],["2016-03-04",16945,17006.77,16898.84,17062.38,106910000],["2016-03-07",16991.29,17073.95,16940.48,17099.25,100290000],["2016-03-08",17050.67,16964.1,16921.51,17072.79,108380000],["2016-03-09",16969.17,17000.36,16947.94,17048.5,116690000],["2016-03-10",17006.05,16995.13,16821.86,17130.11,117570000],["2016-03-11",17014.99,17213.31,17014.99,17220.09,123420000],["2016-03-14",17207.49,17229.13,17161.16,17275.07,96350000],["2016-03-15",17217.15,17251.53,17120.35,17251.7,92830000],["2016-03-16",17249.34,17325.76,17204.07,17379.18,118710000],["2016-03-17",17321.38,17481.49,17297.65,17529.01,117990000],["2016-03-18",17481.49,17602.3,17481.49,17620.58,321230016],["2016-03-21",17589.7,17623.87,17551.28,17644.97,84410000],["2016-03-22",17602.71,17582.57,17540.42,17648.94,95450000],["2016-03-23",17588.81,17502.59,17486.27,17588.81,84240000],["2016-03-24",17485.33,17515.73,17399.01,17517.14,84100000],["2016-03-28",17526.08,17535.39,17493.03,17583.81,70460000],["2016-03-29",17512.58,17633.11,17434.27,17642.81,86160000],["2016-03-30",17652.36,17716.66,17652.36,17790.11,79330000],["2016-03-31",17716.05,17685.09,17669.72,17755.7,102600000],["2016-04-01",17661.74,17792.75,17568.02,17811.48,104890000],["2016-04-04",17799.39,17737,17710.67,17806.38,85230000],["2016-04-05",17718.03,17603.32,17579.56,17718.03,115230000],["2016-04-06",17605.45,17716.05,17542.54,17723.55,99410000],["2016-04-07",17687.28,17541.96,17484.23,17687.28,90120000],["2016-04-08",17555.39,17576.96,17528.16,17694.51,79990000],["2016-04-11",17586.48,17556.41,17555.9,17731.63,107100000],["2016-04-12",17571.34,17721.25,17553.57,17744.43,81020000],["2016-04-13",17741.66,17908.28,17741.66,17918.35,91710000],["2016-04-14",17912.25,17926.43,17885.44,17962.14,84510000],["2016-04-15",17925.95,17897.46,17867.41,17937.65,118160000],["2016-04-18",17890.2,18004.16,17848.22,18009.53,89390000],["2016-04-19",18012.1,18053.6,17984.43,18103.46,89820000],["2016-04-20",18059.49,18096.27,18031.21,18167.63,100210000],["2016-04-21",18092.84,17982.52,17963.89,18107.29,102720000],["2016-04-22",17985.05,18003.75,17909.89,18026.85,134120000],["2016-04-25",17990.94,17977.24,17855.55,17990.94,83770000],["2016-04-26",17987.38,17990.32,17934.17,18043.77,92570000],["2016-04-27",17996.14,18041.55,17920.26,18084.66,109090000],["2016-04-28",18023.88,17830.76,17796.55,18035.73,100920000],["2016-04-29",17813.09,17773.64,17651.98,17814.83,136670000],["2016-05-02",17783.78,17891.16,17773.71,17912.35,80100000],["2016-05-03",17870.75,17750.91,17670.88,17870.75,97060000],["2016-05-04",17735.02,17651.26,17609.01,17738.06,95020000],["2016-05-05",17664.48,17660.71,17615.82,17736.11,81530000],["2016-05-06",17650.3,17740.63,17580.38,17744.54,80020000],["2016-05-09",17743.85,17705.91,17668.38,17783.16,85590000],["2016-05-10",17726.66,17928.35,17726.66,17934.61,75790000],["2016-05-11",17919.03,17711.12,17711.05,17919.03,87390000],["2016-05-12",17711.12,17720.5,17625.38,17798.19,88560000],["2016-05-13",17711.12,17535.32,17512.48,17734.74,86640000],["2016-05-16",17531.76,17710.71,17531.76,17755.8,88440000],["2016-05-17",17701.46,17529.98,17469.92,17701.46,103260000],["2016-05-18",17501.28,17526.62,17418.21,17636.22,79120000],["2016-05-19",17514.16,17435.4,17331.07,17514.16,95530000],["2016-05-20",17437.32,17500.94,17437.32,17571.75,111990000],["2016-05-23",17507.04,17492.93,17480.05,17550.7,87790000],["2016-05-24",17525.19,17706.05,17525.19,17742.59,86480000],["2016-05-25",17735.09,17851.51,17735.09,17891.71,79180000],["2016-05-26",17859.52,17828.29,17803.82,17888.66,68940000],["2016-05-27",17826.85,17873.22,17824.73,17873.22,73190000],["2016-05-31",17891.5,17787.2,17724.03,17899.24,147390000],["2016-06-01",17754.55,17789.67,17664.79,17809.18,78530000],["2016-06-02",17789.05,17838.56,17703.55,17838.56,75560000],["2016-06-03",17799.8,17807.06,17689.68,17833.17,82270000],["2016-06-06",17825.69,17920.33,17822.81,17949.68,71870000],["2016-06-07",17936.22,17938.28,17936.22,18003.23,78750000],["2016-06-08",17931.91,18005.05,17931.91,18016,71260000],["2016-06-09",17969.98,17985.19,17915.88,18005.22,69690000],["2016-06-10",17938.82,17865.34,17812.34,17938.82,90540000],["2016-06-13",17830.5,17732.48,17731.35,17893.28,101690000],["2016-06-14",17710.77,17674.82,17595.79,17733.92,93740000],["2016-06-15",17703.65,17640.17,17629.01,17762.96,94130000],["2016-06-16",17602.23,17733.1,17471.29,17754.91,91950000],["2016-06-17",17733.44,17675.16,17602.78,17733.44,248680000],["2016-06-20",17736.87,17804.87,17736.87,17946.36,99380000],["2016-06-21",17827.33,17829.73,17799.8,17877.84,85130000],["2016-06-22",17832.67,17780.83,17770.36,17920.16,89440000]];
        var data = splitData(rawData);
        console.log(data);
        let option = {
            animation: false,
            legend: {
              top: 10,
              left: 'center',
              data: ['MA5', 'MA10', 'MA20', 'MA30']
            },
            tooltip: {
              trigger: 'axis',
              backgroundColor:"rgb(50,50,50,0.9)",
              axisPointer: {
                type: 'cross'
              },
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
            //   textStyle: {
            //     color: '#000'
            //   },
            //   position: function (pos, params, el, elRect, size) {
            //     const obj = {
            //       top: 10
            //     };
            //     obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            //     return obj;
            //   }
              // extraCssText: 'width: 170px'
            },
            axisPointer: {
              link: [
                {
                  xAxisIndex: 'all'
                }
              ],
              label: {
                backgroundColor: '#777'
              }
            },
            visualMap: {
              show: false,
              seriesIndex: 5,
              dimension: 2,
              pieces: [
                {
                  value: 1,
                  color: downColor
                },
                {
                  value: -1,
                  color: upColor
                }
              ]
            },
            grid: [
              {
                left: '10%',
                right: '8%',
                height: '60%'
              },
              {
                left: '10%',
                right: '8%',
                top: '75%',
                height: '15%'
              },
            //   {
            //     left: '10%',
            //     right: '8%',
            //     top: '85%',
            //     height: '15%'
            //   }
            ],
            xAxis: [
              {
                type: 'category',
                data: data.categoryData,
                boundaryGap: false,
                axisLine: { onZero: false },
                splitLine: { show: false },
                min: 'dataMin',
                max: 'dataMax',
                axisPointer: {
                  z: 100
                }
              },
              {
                type: 'category',
                gridIndex: 1,
                data: data.categoryData,
                boundaryGap: false,
                axisLine: { onZero: false },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                min: 'dataMin',
                max: 'dataMax'
              },
            ],
            yAxis: [
              {
                scale: true,
                splitArea: {
                  show: true
                }
              },
              {
                scale: true,
                gridIndex: 1,
                splitNumber: 2,
                axisLabel: { show: false },
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: false }
              }
            ],
            dataZoom: [
              {
                type: 'inside',
                xAxisIndex: [0, 1],
                start: 0,
                end: 100
              },
            //   {
            //     show: true,
            //     xAxisIndex: [0, 1],
            //     type: 'slider',
            //     top: '85%',
            //     start: 0,
            //     end: 100
            //   }
            ],
            series: [
            //   {
            //     name: 'Dow-Jones index',
            //     type: 'candlestick',
            //     data: data.values,
            //     itemStyle: {
            //       color: upColor,
            //       color0: downColor,
            //       borderColor: undefined,
            //       borderColor0: undefined
            //     },
            //     tooltip: {
            //       formatter: function (param) {
            //         param = param[0];
            //         return [
            //           'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
            //           'Open: ' + param.data[0] + '<br/>',
            //           'Close: ' + param.data[1] + '<br/>',
            //           'Lowest: ' + param.data[2] + '<br/>',
            //           'Highest: ' + param.data[3] + '<br/>'
            //         ].join('');
            //       }
            //     }
            //   },
              {
                name: 'MA5',
                type: 'line',
                data: calculateMA(5, data),
                smooth: true,
                itemStyle: {
                    color: upColor,
                    color0: downColor,
                    borderColor: undefined,
                    borderColor0: undefined
                  },
                lineStyle: {
                  opacity: 0.5
                }
              },
              {
                name: 'MA10',
                type: 'line',
                data: calculateMA(10, data),
                smooth: true,
                lineStyle: {
                  opacity: 0.5
                }
              },
              {
                name: 'MA20',
                type: 'line',
                data: calculateMA(20, data),
                smooth: true,
                lineStyle: {
                  opacity: 0.5
                }
              },
              {
                name: 'MA30',
                type: 'line',
                data: calculateMA(30, data),
                smooth: true,
                lineStyle: {
                  opacity: 0.5
                }
              },
              {
                name: 'Volume',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: data.volumes
              },
            //   {
            //     name: 'Volume',
            //     type: 'bar',
            //     xAxisIndex: 2,
            //     yAxisIndex: 1,
            //     data: data.volumes
            //   }
            ]
        };
        console.log(option);
        // this.setState({
        //     info: option,
        // });
        // console.log(document.getElementById('main'));
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption(option);
        var myChart2 = echarts.init(document.getElementById('main2'));
        
        let option2 =  {
            xAxis: {
              type: 'category',
              data: data.categoryData,
              boundaryGap: false,
              axisLine: { onZero: false },
              axisTick: { show: false },
              splitLine: { show: false },
              axisLabel: { show: false },
              min: 'dataMin',
              max: 'dataMax'
            },
            yAxis: {
              type: 'value',
              show:false
            },
            grid: [
                {
                  left: '10%',
                  right: '8%',
                  top: '5%',
                  height: '80%'
                }
            ],
            tooltip: {
                trigger: "axis",
                backgroundColor:"rgb(50,50,50,0.9)",
                // backgroundColor:"white",
                // textStyle:{
                //     color:"#333"
                // }
                // formatter: function (params) {
                //     return (
                //         params[0].name +
                //         // xunit +
                //         "<br />" +
                //         params[0].marker +
                //         params.seriesName +
                //         ":" +
                //         params[0].value 
                //         // yunit
                //     );
                // },
            },
            dataZoom: [
                {
                    type: "inside",
                    show: false,
                },
            ],
            series: [
              {
                name:"参数",
                data: data.volumes,
                itemStyle: {
                    color: "#61a0a8",
                },
                type: 'bar'
              }
            ]
          };
        myChart2.setOption(option2,"light");
        var myChart3 = echarts.init(document.getElementById('main3'));
        let option3 = JSON.parse(JSON.stringify(option2))
        option3.series[0].itemStyle.color="#749f83"
        myChart3.setOption(option3);
    };
    componentDidMount() {
        // this.getCount();
        this.getData2();
    }

    render() {
        let info = this.state.info;
        return (
            <div>
                <div id="main" style={{width: "1000px",height:"600px"}}></div>
                <div id="main2" style={{width: "1000px",height:"150px"}}></div>
                <div id="main3" style={{width: "1000px",height:"150px"}}></div>
            </div>
        );
    }
}
