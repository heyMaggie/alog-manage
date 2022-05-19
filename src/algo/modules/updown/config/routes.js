const pages = "@/algo/modules/updown/pages";

const main = (root = "/main/updown") => [
    // {
    //     path: `${root}/allInfo`,
    //     component: `${pages}/allInfo`,
    //     title: "全部信息",
    // },
    {
        path: `${root}/userInfo`,
        component: `${pages}/userInfo`,
        title: "用户信息",
    },
    {
        path: `${root}/security`,
        component: `${pages}/security`,
        title: "证券信息",
    },
    {
        path: `${root}/counterInfo`,
        component: `${pages}/counterInfo`,
        title: "柜台信息",
    },
    // {
    //     path: `${root}/positionLimit`,
    //     component: `${pages}/positionLimit`,
    //     title: "持仓限额",
    // },
    {
        path: `${root}/stockHolder`,
        component: `${pages}/stockHolder`,
        title: "股东信息",
    },
    {
        path: `${root}/algoInfo`,
        component: `${pages}/algoInfo`,
        title: "算法信息",
    },
    {
        path: `${root}/riskConfig`,
        component: `${pages}/riskConfig`,
        title: "算法风控配置",
    },
    {
        path: `${root}/counterGw`,
        component: `${pages}/counterGw`,
        title: "柜台网关",
    },
    // {
    //     path: `${root}/assetInfo`,
    //     component: `${pages}/assetInfo`,
    //     title: "资金信息",
    // },
    // {
    //     path: `${root}/feeRateConfig`,
    //     component: `${pages}/feeRateConfig`,
    //     title: "费率",
    // },
    // {
    //     path: `${root}/optionPosition`,
    //     component: `${pages}/optionPosition`,
    //     title: "期权持仓",
    // },
    // {
    //     path: `${root}/userPbuGwConfig`,
    //     component: `${pages}/userPbuGwConfig`,
    //     title: "用户网关",
    // },
    // {
    //     path: `${root}/gwConfig`,
    //     component: `${pages}/gwConfig`,
    //     title: "交易网关",
    // },
    // {
    //     path: `${root}/strategyPosition`,
    //     component: `${pages}/strategyPosition`,
    //     title: "组合持仓策略",
    // },
    // {
    //     path: `${root}/strategyConfig`,
    //     component: `${pages}/strategyConfig`,
    //     title: "组合持仓配置",
    // },
    // {
    //     path: `${root}/contractVarietyPos`,
    //     component: `${pages}/contractVarietyPos`,
    //     title: "合约品种持仓",
    // },
];

export default main;
