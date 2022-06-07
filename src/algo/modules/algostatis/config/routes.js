const pages = "@/algo/modules/algostatis/pages";

const main = (root = "/main/algostatis") => [
    {
        path: `${root}/algoStatis`,
        component: `${pages}/algoStatis`,
        title: "算法统计",
        icon: "icon3",
    },
];

export default main;
