const pages = "@/option/modules/main/pages";

const main = (root = "/main", childrenArr) => [
    {
        path: root,
        component: `@/modules/main/pages/Admin`,
        title: "主页", //title 是显示在 浏览器标签上的文字
        children: [...childrenArr],
    },
    {
        path: "/login",
        component: `${pages}/Login`,
        title: "登录",
    },
    {
        path: "/404",
        component: `@/modules/main/pages/Exception/404.js`,
        title: "页面不存在",
    },
];

export default main;
