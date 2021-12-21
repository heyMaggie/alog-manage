import { withDynamicImport } from "@/components/DynamicImport";
//引入 main 模块路由
import main from "@/option/modules/main";

import parameter from "@/option/modules/parameter";
// import charts from "@/option/modules/chart";
import updown from "@/option/modules/updown";

import axios from "axios";
//根据环境  自动切换 IP
if (process.env.NODE_ENV == "development") {
    //开发环境
    // axios.defaults.baseURL = "http://192.168.2.105:9605/option";
    // axios.defaults.baseURL = "http://192.168.1.78:9605/option";
    axios.defaults.baseURL = "http://192.168.1.78:9605";
} else {
    //生产环境
    axios.defaults.baseURL = "/optManage";
}
window.baseURL = axios.defaults.baseURL;
//注册 main 模块路由
let routes = [...parameter(), ...updown()];
//动态引入 component对应地址的组件
let res = withDynamicImport(main("/main", routes));
export default res.routes;
