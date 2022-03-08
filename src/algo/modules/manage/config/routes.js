const pages = "@/algo/modules/manage/pages";

const main = (root = "/main/manage") => [
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
    {
        path: `${root}/security`,
        component: `${pages}/security`,
        title: "证券信息",
    },
    {
        path: `${root}/algoConfig`,
        component: `${pages}/algoConfig`,
        title: "算法管理",
    },
    {
        path: `${root}/newOrderQuery`,
        component: `${pages}/newOrderQuery`,
        title: "母单列表",
    },
    {
        path: `${root}/childOrderQuery`,
        component: `${pages}/childOrderQuery`,
        title: "子单列表",
    },
    {
        path: `${root}/cancelOrderQuery`,
        component: `${pages}/cancelOrderQuery`,
        title: "撤单列表",
    },
    {
        path: `${root}/positionQuery`,
        component: `${pages}/positionQuery`,
        title: "持仓列表",
    },
    {
        path: `${root}/execReport`,
        component: `${pages}/execReport`,
        title: "成交回执",
    },
    {
        path: `${root}/basketConfig`,
        component: `${pages}/basketConfig`,
        title: "篮子管理",
    },
    // {
    //     path: `${root}/stockHolderQuery`,
    //     component: `${pages}/stockHolderQuery`,
    //     title: "股东信息",
    // },
    // {
    //     path: `${root}/securityQuery`,
    //     component: `${pages}/securityQuery`,
    //     title: "证券信息",
    // },
];

export default main;
