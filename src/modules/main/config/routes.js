const pages = "@/modules/main/pages";

const main = (root = "/main", childrenArr) => [
    {
        path: root,
        component: `${pages}/Admin`,
        title: "主页", //title 是显示在 浏览器标签上的文字
        children: [
            //   {
            //     path: `${root}/test`,
            //     component: `${pages}/Test`,
            //     title: "集中竞价"
            //   },
            //   {
            //     path: `${root}/test2`,
            //     component: `${pages}/Test2`,
            //     title: "注册表单"
            //   },
            //   {
            //     path: `${root}/test3`,
            //     component: `${pages}/Test3`,
            //     title: "动态表单"
            //   },
            //   {
            //     path: `${root}/test4`,
            //     component: `${pages}/Test4`,
            //     title: "动态弹窗"
            //   },
            //   {
            //     path: `${root}/test5`,
            //     component: `${pages}/Test5`,
            //     title: "搜索栏"
            //   },
            //   {
            //     path: `${root}/test6`,
            //     component: `${pages}/Test6`,
            //     title: "页面组件"
            //   },
            //   {
            //     path: `${root}/test7`,
            //     component: `${pages}/Test7`,
            //     title: "全局仓库"
            //   },
            ...childrenArr,
        ],
    },
    {
        path: "/login",
        component: `${pages}/Login`,
        title: "登录",
    },
    {
        path: "/404",
        component: `${pages}/Exception/404.js`,
        title: "页面不存在",
    },
];

export default main;
