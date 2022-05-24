const pages = "@/algo/modules/risk/pages";

const main = (root = "/main/risk") => [
    {
        path: `${root}/riskConfig`,
        component: `${pages}/riskConfig`,
        title: "风控配置",
    },
    // {
    //     path: `${root}/securityQuery`,
    //     component: `${pages}/securityQuery`,
    //     title: "证券信息",
    // },
];

export default main;
