const pages = "@/option/modules/parameter/pages";

const main = (root = "/main/parameter") => [
    {
        path: `${root}/positionLimit`,
        component: `${pages}/positionLimit`,
        title: "持仓限额管理",
    },
    {
        path: `${root}/optionInfo`,
        component: `${pages}/optionInfo`,
        title: "期权信息管理",
    },
    {
        path: `${root}/assetInfo`,
        component: `${pages}/assetInfo`,
        title: "资金信息管理",
    },
    {
        path: `${root}/capitalFlow`,
        component: `${pages}/capitalFlow`,
        title: "资金流水",
    },
];

export default main;
