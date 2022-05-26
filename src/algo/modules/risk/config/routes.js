const pages = "@/algo/modules/risk/pages";

const main = (root = "/main/risk") => [
    {
        path: `${root}/riskConfig`,
        component: `${pages}/riskConfig`,
        title: "风控配置",
    },
    {
        path: `${root}/userRisk`,
        component: `${pages}/userRisk`,
        title: "用户风险统计",
    },
    {
        path: `${root}/algoRisk`,
        component: `${pages}/algoRisk`,
        title: "算法风险统计",
    },
];

export default main;
