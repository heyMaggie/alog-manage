const pages = "@/algo/modules/tradeStatistics/pages";

const main = (root = "/main/tradeStatistics") => [
    {
        path: `${root}/regularWay`,
        component: `${pages}/regularWay`,
        title: "普通交易",
    },
    {
        path: `${root}/algorithmicTrad`,
        component: `${pages}/algorithmicTrad`,
        title: "算法交易",
    },
];

export default main;
