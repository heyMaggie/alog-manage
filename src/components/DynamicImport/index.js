//动态导入单个路由
const DynamicImport = route => {
  let path = route.component;
  let npath = path.replace("@/", "");
  let file = require("@/" + npath).default;
  route.component = file;
  return route;
};
//批量递归动态导入组件
const batchDynamicImport = (routes = []) => {
  routes.forEach((r, idx) => {
    //允许允许末尾没有/
    // r.strict = false;
    if (r.children) {
      r.exact = false;
    } else {
      r.exact = true;
    }
    if (typeof r.component == "string") {
      DynamicImport(r);
    }
    if (r.children) {
      batchDynamicImport(r.children);
    }
  });
};
export const withDynamicImport = routes => {
  let newRoutes = [...routes];
  batchDynamicImport(newRoutes);
  return { routes: newRoutes };
};
