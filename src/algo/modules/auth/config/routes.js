const pages = "@/algo/modules/auth/pages";

const main = (root = "/main/auth") => [
    {
        path: `${root}/roleManagement`,
        component: `${pages}/roleManagement`,
        title: "角色管理",
    },
    {
        path: `${root}/systemUser`,
        component: `${pages}/systemUser`,
        title: "系统用户",
    },
];

export default main;
