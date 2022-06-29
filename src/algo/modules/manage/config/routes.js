const pages = "@/algo/modules/manage/pages";

const main = (root = "/main/manage") => [
    // {
    //     path: `/main/user/userInfo`,
    //     component: `${pages}/userInfo`,
    //     title: "用户管理",
    // },
    // {
    //     path: `/main/user/stockHolder`,
    //     component: `${pages}/stockHolder`,
    //     title: "股东信息",
    // },
    // {
    //     path: `/main/user/assetInfo`,
    //     component: `${pages}/assetInfo`,
    //     title: "资金信息",
    // },
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
        path: `${root}/algoGroup`,
        component: `${pages}/algoGroup`,
        title: "算法权限组",
    },
    {
        path: `${root}/counterGw`,
        component: `${pages}/counterGw`,
        title: "柜台用户",
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
    {
        path: `${root}/counterInfo`,
        component: `${pages}/counterInfo`,
        title: "柜台信息",
    },
    // {
    //     path: `${root}/securityQuery`,
    //     component: `${pages}/securityQuery`,
    //     title: "证券信息",
    // },
];

export default main;
