// 用户管理  ：用户管理、股东信息、3.资金信息
// 交易管理     证券信息  算法管理 订单列表 持仓列表 成交回执  撤单列表   篮子管理
// 风控管理  风控配置， 用户风险统计，算法风险统计
const menuList = [
    {
        id: "4",
        path: "/main/manage",
        title: "用户管理",
        children: [
            {
                id: "4-1",
                icon: "",
                title: "用户管理",
                path: "/main/manage/userInfo",
            },
            {
                id: "4-2",
                icon: "",
                title: "股东信息",
                path: "/main/manage/stockHolder",
            },
            {
                id: "4-3",
                icon: "",
                title: "资金信息",
                path: "/main/manage/assetInfo",
            },
        ],
    },
    {
        id: "1",
        path: "/main/trade",
        title: "交易管理",
        children: [
            {
                id: "1-1",
                icon: "",
                title: "证券信息",
                path: "/main/manage/security",
            },
            {
                id: "1-2",
                icon: "",
                title: "算法管理",
                path: "/main/manage/algoConfig",
            },
            // 订单列表 持仓列表 成交回执  撤单列表   篮子管理
            {
                id: "1-3",
                icon: "",
                title: "订单列表",
                path: "/main/manage/newOrderQuery",
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
        ],
    },
    {
        id: "5",
        path: "/main/risk",
        title: "风控管理",
        children: [
            {
                id: "5-1",
                icon: "",
                title: "风控配置",
                path: "/main/manage/userInfo",
            },
            {
                id: "5-2",
                icon: "",
                title: "用户风险统计",
                path: "/main/manage/optionInfo",
            },
            {
                id: "5-3",
                icon: "",
                title: "算法风险统计",
                path: "/main/manage/assetInfo",
            },
        ],
    },
    {
        id: "2",
        path: "/main/updown",
        title: "数据导入导出",
        children: [
            // {
            //     id: "2-31",
            //     icon: "",
            //     title: "全部信息",
            //     path: "/main/updown/allInfo",
            // },
            {
                id: "2-1",
                icon: "",
                title: "用户信息",
                path: "/main/updown/userInfo",
            },
            // {
            //     id: "2-2",
            //     icon: "",
            //     title: "资金信息",
            //     path: "/main/updown/assetInfo",
            // },
            {
                id: "2-3",
                icon: "",
                title: "股东信息",
                path: "/main/updown/stockHolder",
            },
            // {
            //     id: "2-4",
            //     icon: "",
            //     title: "用户网关",
            //     path: "/main/updown/userPbuGwConfig",
            // },
            {
                id: "2-5",
                icon: "",
                title: "证券信息",
                path: "/main/updown/security",
            },
            {
                id: "2-6",
                icon: "",
                title: "柜台信息",
                path: "/main/updown/counterInfo",
            },
            {
                id: "2-7",
                icon: "",
                title: "算法风控配置",
                path: "/main/updown/riskConfig",
            },
            {
                id: "2-8",
                icon: "",
                title: "算法信息",
                path: "/main/updown/algoInfo",
            },
            // {
            //     id: "2-9",
            //     icon: "",
            //     title: "持仓限额",
            //     path: "/main/updown/positionLimit",
            // },
            // {
            //     id: "2-10",
            //     icon: "",
            //     title: "期权持仓",
            //     path: "/main/updown/optionPosition",
            // },
            // {
            //     id: "2-11",
            //     icon: "",
            //     title: "交易网关",
            //     path: "/main/updown/gwConfig",
            // },
            // {
            //     id: "2-12",
            //     icon: "",
            //     title: "费率配置",
            //     path: "/main/updown/feeRateConfig",
            // },
            // {
            //     id: "2-13",
            //     icon: "",
            //     title: "组合持仓策略",
            //     path: "/main/updown/strategyPosition",
            // },
            // {
            //     id: "2-13",
            //     icon: "",
            //     title: "组合持仓配置",
            //     path: "/main/updown/strategyConfig",
            // },
            // {
            //     id: "2-14",
            //     icon: "",
            //     title: "合约品种持仓",
            //     path: "/main/updown/contractVarietyPos",
            // },
        ],
    },
    // {
    //     id: "3",
    //     path: "/main/chart",
    //     title: "统计图",
    //     children: [
    //         {
    //             id: "3-1",
    //             icon: "",
    //             title: "在线人数",
    //             path: "/main/chart/onlineUser",
    //         },
    //         // {
    //         //     id: "3-2",
    //         //     icon: "",
    //         //     title: "下单统计",
    //         //     path: "/main/chart/order",
    //         // },
    //         // {
    //         //     id: "3-3",
    //         //     icon: "",
    //         //     title: "撤单统计",
    //         //     path: "/main/chart/orderCancel",
    //         // },
    //         // {
    //         //     id: "3-4",
    //         //     icon: "",
    //         //     title: "成交统计",
    //         //     path: "/main/chart/orderDeal",
    //         // },
    //         // {
    //         //     id: "3-5",
    //         //     icon: "",
    //         //     title: "cpu使用率",
    //         //     path: "/main/chart/cpu",
    //         // },
    //         // {
    //         //     id: "3-6",
    //         //     icon: "",
    //         //     title: "内存使用率",
    //         //     path: "/main/chart/ram",
    //         // },
    //         // {
    //         //     id: "3-7",
    //         //     icon: "",
    //         //     title: "硬盘使用率",
    //         //     path: "/main/chart/disk",
    //         // },
    //         // {
    //         //     id: "3-8",
    //         //     icon: "",
    //         //     title: "网络带宽",
    //         //     path: "/main/chart/network",
    //         // },
    //     ],
    // },
];
export default menuList;
