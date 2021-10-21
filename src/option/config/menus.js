const menuList = [
    {
        id: "1",
        path: "/main/parameter",
        title: "管理",
        children: [
            {
                id: "1-1",
                icon: "",
                title: "用户信息管理",
                path: "/main/parameter/userInfoUpload",
            },
            {
                id: "1-2",
                icon: "",
                title: "证券信息管理",
                path: "/main/parameter/security",
            },
            {
                id: "1-3",
                icon: "",
                title: "资金信息管理",
                path: "/main/parameter/assetInfo",
            },
            {
                id: "1-4",
                icon: "",
                title: "费率管理",
                path: "/main/parameter/feeRateConfig",
            },
            {
                id: "1-5",
                icon: "",
                title: "持仓管理",
                path: "/main/parameter/holdSummary",
            },
            {
                id: "1-6",
                icon: "",
                title: "股东信息管理",
                path: "/main/parameter/stockHolder",
            },
            {
                id: "1-7",
                icon: "",
                title: "交易时间组管理",
                path: "/main/parameter/tradeTime",
            },
            {
                id: "1-8",
                icon: "",
                title: "用户配置信息",
                path: "/main/parameter/userConfig",
            },
            {
                id: "1-9",
                icon: "",
                title: "用户网关配置",
                path: "/main/parameter/userPbuGwConfig",
            },
            {
                id: "1-10",
                icon: "",
                title: "网关配置",
                path: "/main/parameter/gwConfig",
            },
            {
                id: "1-10",
                icon: "",
                title: "用户申报单元",
                path: "/main/parameter/pbUid",
            },
        ],
    },
    {
        id: "1",
        path: "/main/chart",
        title: "统计图",
        children: [
            {
                id: "2-1",
                icon: "",
                title: "在线人数",
                path: "/main/chart/onlineUser",
            },
            {
                id: "2-2",
                icon: "",
                title: "下单统计",
                path: "/main/chart/order",
            },
            {
                id: "2-3",
                icon: "",
                title: "撤单统计",
                path: "/main/chart/orderCancel",
            },
            {
                id: "2-4",
                icon: "",
                title: "成交统计",
                path: "/main/chart/orderDeal",
            },
            {
                id: "2-5",
                icon: "",
                title: "cpu使用率",
                path: "/main/chart/cpu",
            },
            {
                id: "2-3",
                icon: "",
                title: "内存使用率",
                path: "/main/chart/ram",
            },
            {
                id: "2-4",
                icon: "",
                title: "硬盘使用率",
                path: "/main/chart/disk",
            },
            {
                id: "2-5",
                icon: "",
                title: "网络带宽",
                path: "/main/chart/network",
            },
        ],
    },
];
export default menuList;
