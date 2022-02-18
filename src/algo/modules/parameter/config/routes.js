const pages = "@/algo/modules/parameter/pages";

const main = (root = "/main/parameter") => [
    {
        path: `${root}/positionLimit`,
        component: `${pages}/positionLimit`,
        title: "持仓限额",
    },
    {
        path: `${root}/optionInfo`,
        component: `${pages}/optionInfo`,
        title: "期权信息",
    },
    {
        path: `${root}/assetInfo`,
        component: `${pages}/assetInfo`,
        title: "资金信息",
    },
    {
        path: `${root}/capitalFlow`,
        component: `${pages}/capitalFlow`,
        title: "资金流水",
    },
    {
        path: `${root}/optionPositionQuery`,
        component: `${pages}/optionPositionQuery`,
        title: "期权持仓",
    },
    {
        path: `${root}/exerciseRecordQuery`,
        component: `${pages}/exerciseRecordQuery`,
        title: "行权流水",
    },
    {
        path: `${root}/strategyPositionQuery`,
        component: `${pages}/strategyPositionQuery`,
        title: "组合策略流水",
    },
    {
        path: `${root}/newOrderQuery`,
        component: `${pages}/newOrderQuery`,
        title: "订单",
    },
    {
        path: `${root}/cancelOrderQuery`,
        component: `${pages}/cancelOrderQuery`,
        title: "撤单",
    },
    {
        path: `${root}/coverQuery`,
        component: `${pages}/coverQuery`,
        title: "备兑",
    },
    {
        path: `${root}/positionLogQuery`,
        component: `${pages}/positionLogQuery`,
        title: "期权持仓流水",
    },
    {
        path: `${root}/execReport`,
        component: `${pages}/execReport`,
        title: "成交回执",
    },
    {
        path: `${root}/userConfigQuery`,
        component: `${pages}/userConfigQuery`,
        title: "用户配置",
    },
    {
        path: `${root}/stockHolderQuery`,
        component: `${pages}/stockHolderQuery`,
        title: "股东信息",
    },
    {
        path: `${root}/securityQuery`,
        component: `${pages}/securityQuery`,
        title: "证券信息",
    },
    {
        path: `${root}/gwConfigQuery`,
        component: `${pages}/gwConfigQuery`,
        title: "交易网关",
    },
    {
        path: `${root}/tradeTimeQuery`,
        component: `${pages}/tradeTimeQuery`,
        title: "交易时间组",
    },
    {
        path: `${root}/userPbuGwConfigQuery`,
        component: `${pages}/userPbuGwConfigQuery`,
        title: "用户网关",
    },
];

export default main;
