const pages = "@/algo/modules/manage/pages";

const main = (root = "/main/user") => [
    {
        path: `${root}/userInfo`,
        component: `${pages}/userInfo`,
        title: "用户管理",
    },
    {
        path: `${root}/stockHolder`,
        component: `${pages}/stockHolder`,
        title: "股东信息",
    },
    {
        path: `${root}/assetInfo`,
        component: `${pages}/assetInfo`,
        title: "资金信息",
    },
];

export default main;
