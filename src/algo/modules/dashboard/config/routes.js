const pages = "@/algo/modules/dashboard/pages";

const main = (root = "/main/dashboard") => [
    {
        path: `${root}`,
        component: `${pages}`,
        title: "dashboard",
    },
];

export default main;
