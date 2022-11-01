// 用户管理  ：用户管理、股东信息、3.资金信息
// 交易管理     证券信息  算法管理 订单列表 持仓列表 成交回执  撤单列表   篮子管理
// 风控管理  风控配置， 用户风险统计，算法风险统计
const menuList = [
    // {
    //     id: "2",
    //     path: "/main/dashboard",
    //     title: "Dashboard",
    //     icon: "icon8",
    //     // children: [
    //     //     {
    //     //         id: "2-1",
    //     //         icon: "",
    //     //         title: "用户信息",
    //     //         path: "/main/updown/userInfo",
    //     //     },
    //     // ],
    // },
    {
        id: "4",
        path: "/main/user",
        icon: "icon1",
        title: "用户管理",
        children: [
            {
                id: "4-1",
                icon: "",
                title: "用户管理",
                path: "/main/user/userInfo",
            },
            {
                id: "4-2",
                icon: "",
                title: "股东信息",
                path: "/main/user/stockHolder",
            },
            {
                id: "4-3",
                icon: "",
                title: "资金信息",
                path: "/main/user/assetInfo",
            },
            {
                id: "4-4",
                icon: "",
                title: "用户会话",
                path: "/main/user/session",
            },
        ],
    },
    {
        id: "8",
        path: "/main/prod",
        icon: "icon10",
        title: "产品管理",
        children: [
            {
                id: "1-1",
                icon: "",
                title: "证券信息",
                path: "/main/prod/security",
            },
            {
                id: "8-2",
                icon: "",
                title: "券源信息",
                path: "/main/prod/mtradeSecurity",
            },
        ],
    },
    {
        id: "1",
        path: "/main/trade1",
        icon: "icon7",
        title: "交易管理",
        children: [
            // {
            //     id: "1-1",
            //     icon: "",
            //     title: "证券信息",
            //     path: "/main/manage/security",
            // },
            // 订单列表 持仓列表 成交回执  撤单列表   篮子管理
            {
                id: "1-3",
                icon: "",
                title: "母单列表",
                path: "/main/manage/newOrderQuery",
            },
            {
                id: "1-13",
                icon: "",
                title: "子单列表",
                path: "/main/manage/childOrderQuery",
            },
            {
                id: "1-4",
                icon: "",
                title: "持仓列表",
                path: "/main/manage/positionQuery",
            },
            {
                id: "1-5",
                icon: "",
                title: "成交回执",
                path: "/main/manage/execReport",
            },
            {
                id: "1-6",
                icon: "",
                title: "撤单列表",
                path: "/main/manage/cancelOrderQuery",
            },
            {
                id: "1-7",
                icon: "",
                title: "篮子管理",
                path: "/main/manage/basketConfig",
            },
            {
                id: "1-9",
                icon: "",
                title: "文件下单",
                path: "/main/manage/fileOrder",
            },
            {
                id: "1-10",
                icon: "",
                title: "融资合约列表",
                path: "/main/manage/longContract",
            },
            {
                id: "1-11",
                icon: "",
                title: "融券合约列表",
                path: "/main/manage/shortContract",
            },
            {
                id: "1-12",
                icon: "",
                title: "两融资金信息",
                path: "/main/manage/creditAsset",
            },
        ],
    },
    {
        id: "9",
        path: "/main/trade",
        icon: "icon11",
        title: "算法管理",
        children: [
            {
                id: "9-2",
                icon: "",
                title: "算法管理",
                path: "/main/manage/algoConfig",
            },
            {
                id: "9-15",
                icon: "",
                title: "算法权限组",
                path: "/main/manage/algoGroup",
            },
            {
                id: "9-16",
                icon: "",
                title: "算法优选",
                path: "/main/manage/algoBest",
            },
        ],
    },
    {
        id: "10",
        path: "/main/trade2",
        icon: "icon12",
        title: "网关管理",
        children: [
            {
                id: "10-14",
                icon: "",
                title: "柜台用户",
                path: "/main/manage/counterGw",
            },
            {
                id: "10-8",
                icon: "",
                title: "柜台信息",
                path: "/main/manage/counterInfo",
            },
        ],
    },
    {
        id: "5",
        path: "/main/risk",
        icon: "icon2",
        title: "风控管理",
        children: [
            {
                id: "5-1",
                icon: "",
                title: "风控配置",
                path: "/main/risk/riskConfig",
            },
            {
                id: "5-2",
                icon: "",
                title: "用户风险统计",
                path: "/main/risk/userRisk",
            },
            {
                id: "5-3",
                icon: "",
                title: "算法风险统计",
                path: "/main/risk/algoRisk",
            },
        ],
    },
    {
        id: "3",
        path: "/main/chart",
        title: "运维监控",
        icon: "icon5",
        children: [
            {
                id: "3-5",
                icon: "",
                title: "CPU信息",
                path: "/main/chart/cpu",
            },
            {
                id: "3-6",
                icon: "",
                title: "内存信息",
                path: "/main/chart/ram",
            },
            {
                id: "3-1",
                icon: "",
                title: "在线人数",
                path: "/main/chart/onlineUser",
            },
            // {
            //     id: "3-2",
            //     icon: "",
            //     title: "下单统计",
            //     path: "/main/chart/order",
            // },
            // {
            //     id: "3-3",
            //     icon: "",
            //     title: "撤单统计",
            //     path: "/main/chart/orderCancel",
            // },
            // {
            //     id: "3-4",
            //     icon: "",
            //     title: "成交统计",
            //     path: "/main/chart/orderDeal",
            // },
            // {
            //     id: "3-6",
            //     icon: "",
            //     title: "内存使用率",
            //     path: "/main/chart/ram",
            // },
            // {
            //     id: "3-7",
            //     icon: "",
            //     title: "硬盘使用率",
            //     path: "/main/chart/disk",
            // },
            // {
            //     id: "3-8",
            //     icon: "",
            //     title: "网络带宽",
            //     path: "/main/chart/network",
            // },
        ],
    },
    {
        id: "7",
        path: "/main/tradeStatistics",
        title: "交易统计",
        icon: "icon3",
        children: [
            {
                id: "7-1",
                icon: "",
                title: "普通交易",
                path: "/main/tradeStatistics/regularWay",
            },
            {
                id: "7-2",
                icon: "",
                title: "算法交易",
                path: "/main/tradeStatistics/algorithmicTrad",
            },
        ],
    },
    {
        id: "6",
        path: "/main/algostatis",
        title: "算法统计",
        icon: "icon6",
        children: [
            {
                id: "6-1",
                icon: "",
                title: "算法统计",
                path: "/main/algostatis/algoStatis",
            },
        ],
    },
];
export default menuList;
