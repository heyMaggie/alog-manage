const pages = "@/algo/modules/oper_manage/pages";

const main = (root = "/main/oper_manage") => [
    {
        path: `${root}/operateLog`,
        component: `${pages}/operateLog`,
        title: "操作日志",
    },
    {
        path: `${root}/blacklist`,
        component: `${pages}/blacklist`,
        title: "黑名单",
    },
];

export default main;
