const pages = "@/option/modules/parameter/pages";

const main = (root = "/main/parameter") => [
    {
        path: `${root}/userInfoUpload`,
        component: `${pages}/userInfoUpload`,
        title: "用户信息管理",
    },
    {
        path: `${root}/security`,
        component: `${pages}/security`,
        title: "证券信息管理",
    },
    {
        path: `${root}/assetInfo`,
        component: `${pages}/assetInfo`,
        title: "资金信息管理",
    },
    {
        path: `${root}/feeRateConfig`,
        component: `${pages}/feeRateConfig`,
        title: "费率管理",
    },
    {
        path: `${root}/holdSummary`,
        component: `${pages}/holdSummary`,
        title: "持仓管理",
    },
    {
        path: `${root}/stockHolder`,
        component: `${pages}/stockHolder`,
        title: "股东信息管理",
    },
    {
        path: `${root}/tradeTime`,
        component: `${pages}/tradeTime`,
        title: "交易时间组管理",
    },
    {
        path: `${root}/userConfig`,
        component: `${pages}/userConfig`,
        title: "用户配置信息",
    },
    {
        path: `${root}/userPbuGwConfig`,
        component: `${pages}/userPbuGwConfig`,
        title: "用户网关配置",
    },
    {
        path: `${root}/gwConfig`,
        component: `${pages}/gwConfig`,
        title: "网关配置",
    },
    {
        path: `${root}/pbUid`,
        component: `${pages}/pbUid`,
        title: "用户申报单元",
    },
];

export default main;
