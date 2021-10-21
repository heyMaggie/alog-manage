import { withDynamicImport } from "@/components/DynamicImport";
//引入 main 模块路由
import main from "@/modules/main";

//注册 main 模块路由
// let routes = [...trade(), ...parameter()];
let routes = [];
// console.log(routes);
// console.log(main("/main", routes));

//动态引入 component对应地址的组件
let res = withDynamicImport(main("/main", routes));
export default res.routes;
