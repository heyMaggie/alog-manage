const pages = "@/algo/modules/chart/pages";

const main = (root = "/main/chart") => [
    {
        path: `${root}/onlineUser`,
        component: `${pages}/onlineUser`,
        title: "在线人数",
    },
    {
        path: `${root}/order`,
        component: `${pages}/order`,
        title: "下单统计",
    },
    {
        path: `${root}/orderCancel`,
        component: `${pages}/orderCancel`,
        title: "撤单统计",
    },
    {
        path: `${root}/orderDeal`,
        component: `${pages}/orderDeal`,
        title: "成交统计",
    },
    {
        path: `${root}/cpu`,
        component: `${pages}/cpu`,
        title: "cpu信息",
    },
    {
        path: `${root}/ram`,
        component: `${pages}/ram`,
        title: "内存信息",
    },
    {
        path: `${root}/disk`,
        component: `${pages}/disk`,
        title: "硬盘使用率",
    },
    {
        path: `${root}/network`,
        component: `${pages}/network`,
        title: "网络带宽",
    },
    {
        path: `${root}/systemMonitor`,
        component: `${pages}/systemMonitor`,
        title: "系统监控",
    },
];

export default main;
