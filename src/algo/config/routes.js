import { withDynamicImport } from "@/components/DynamicImport";
//引入 main 模块路由
import main from "@/algo/modules/main";

// import parameter from "@/algo/modules/parameter";
import charts from "@/algo/modules/chart";
// import updown from "@/algo/modules/updown";
import manage from "@/algo/modules/manage";
import risk from "@/algo/modules/risk";
import user from "@/algo/modules/user";
import algostatis from "@/algo/modules/algostatis";
import tradeStatistics from "@/algo/modules/tradeStatistics";
import dashboard from "@/algo/modules/dashboard";

import axios from "axios";
//根据环境  自动切换 IP
if (process.env.NODE_ENV == "development") {
    //开发环境
    // axios.defaults.baseURL = "http://192.168.2.105:20010";
    axios.defaults.baseURL = "http://192.168.2.105:30020";
    // axios.defaults.baseURL = "http://192.168.1.80:20010";
    // axios.defaults.baseURL = "http://192.168.1.81:20010";
    // axios.defaults.baseURL = "http://192.168.1.86:20010";
} else {
    //生产环境
    axios.defaults.baseURL = "/algoManageApi";
}
window.baseURL = axios.defaults.baseURL;
//注册 main 模块路由
// let routes = [...parameter(), ...updown(), ...charts(), ...manage()];
let routes = [
    // ...updown(),
    ...charts(),
    ...user(),
    ...manage(),
    ...risk(),
    ...algostatis(),
    ...tradeStatistics(),
    ...dashboard(),
];
//动态引入 component对应地址的组件
let res = withDynamicImport(main("/main", routes));
export default res.routes;
