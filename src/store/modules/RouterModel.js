// import routes from "@/config/routes.js";

const RouterInitialState = {
    path: sessionStorage.currentPath ? sessionStorage.currentPath : null,
    module: null,
    title: null,
    matchedRoutes: null,
    query: null,
    params: null,

    tabs: sessionStorage.tabs ? JSON.parse(sessionStorage.tabs) : [],
    // currentTab: sessionStorage.currentPath ? sessionStorage.currentPath : null,
    routes: window.routes,

    // tabs: [],
    currentTab: null,
    // routes: null,
    currentTabKey: null,
    currentTabQuery: null,
    history: {},
    tabReloading: false, //刷新
    activeMenu: sessionStorage.activeMenu
        ? JSON.parse(sessionStorage.activeMenu)
        : null,
};

const ENTER_ROUTE = "ENTER_ROUTE";
const SET_TITLE = "SET_TITLE";
const CHANGE_TAB = "CHANGE_TAB";
// const STORE_ROUTES = "STORE_ROUTES";
const PUSH_TAB = "PUSH_TAB";
const POP_TAB = "POP_TAB";
const POP_OTHER_TAB = "POP_OTHER_TAB";
const POP_LEFT_TAB = "POP_LEFT_TAB";
const POP_RIGHT_TAB = "POP_RIGHT_TAB";
//刷新
const RElOAD_TAB = "RElOAD_TAB";
const FINISH_RElOAD = "FINISH_RElOAD";

//获取 当前菜单
let getActiveMenu = (roleAuth, path) => {
    // console.log("getActiveMenu ", roleAuth);
    for (let i = 0; i < roleAuth.length; i++) {
        let lv1 = roleAuth[i];
        if (lv1.children) {
            for (let j = 0; j < lv1.children.length; j++) {
                let lv2 = lv1.children[j];
                // console.log(lv2);
                if (lv2.path == path) {
                    // console.log("当前菜单 ", lv2);
                    sessionStorage.activeMenu = JSON.stringify(lv2);
                    return lv2;
                }
            }
        }
    }
};
const RouterModel = (state = RouterInitialState, action) => {
    // console.log(state);
    // console.log(action);
    switch (action.type) {
        case ENTER_ROUTE:
            let { path, routes } = action.payload;
            // console.log(path);
            let menus = sessionStorage.activeMenus;
            if (!menus) {
                menus = [];
            } else {
                menus = JSON.parse(menus);
            }
            // console.log(menus);
            let activeMenu = getActiveMenu(menus, path);
            // console.log(activeMenu);
            let obj = {};
            if (activeMenu) {
                obj.activeMenu = activeMenu;
            }
            // console.log("obj ", obj);
            if (state.tabs.includes(path)) {
                // console.log("已经有了");
                return Object.assign(
                    {},
                    state,
                    {
                        path,
                    },
                    obj
                );
            } else {
                if (state.routes) {
                    return Object.assign(
                        {},
                        state,
                        {
                            path,
                            tabs: [...state.tabs, path],
                        },
                        obj
                    );
                } else {
                    return Object.assign(
                        {},
                        state,
                        {
                            path,
                            tabs: [...state.tabs, path],
                            routes,
                        },
                        obj
                    );
                }
            }
            return state;
        case RElOAD_TAB:
            return Object.assign({}, state, {
                tabReloading: true,
            });
        case FINISH_RElOAD:
            return Object.assign({}, state, {
                tabReloading: false,
            });
        case CHANGE_TAB: //改变tabs
            return Object.assign({}, state, {
                path: action.payload,
            });
        case PUSH_TAB:
            return state;
        case POP_TAB:
            var tabs = [...state.tabs];
            //  action.payload ： 要删除的tab
            var index = tabs.indexOf(action.payload);
            //currentPath：当前激活的tab
            var currentPath = state.path;
            // console.log("当前激活的tab: ", currentPath);
            if (index > -1) {
                //删除tab
                tabs.splice(index, 1);
                //改变 激活的tab
                if (action.payload == currentPath) {
                    let lastIndex = index - 1;
                    if (lastIndex >= 0) {
                        currentPath = tabs[lastIndex];
                    } else {
                        currentPath = tabs[0];
                    }
                }
            }
            return Object.assign({}, state, {
                path: currentPath,
                tabs: tabs,
            });
        case POP_OTHER_TAB:
            var tabs = [...state.tabs];
            //要删除除 所选tab 之外的tab
            var newArr = tabs.filter((item) => item == action.payload);
            return Object.assign({}, state, {
                path: action.payload,
                tabs: newArr,
            });
        case POP_LEFT_TAB:
            var tabs = [...state.tabs];
            var index = tabs.indexOf(action.payload);
            //要删除除 所选tab 左边的tab
            var newArr = tabs.filter((item, idx) => idx >= index);
            var nowIndex = tabs.indexOf(state.path);
            if (nowIndex < index) {
                return Object.assign({}, state, {
                    path: action.payload,
                    tabs: newArr,
                });
            } else {
                return Object.assign({}, state, {
                    tabs: newArr,
                });
            }
        case POP_RIGHT_TAB:
            var tabs = [...state.tabs];
            var index = tabs.indexOf(action.payload);
            //要删除除 所选tab 右边的tab
            var newArr = tabs.filter((item, idx) => idx <= index);
            var nowIndex = tabs.indexOf(state.path);
            if (nowIndex > index) {
                return Object.assign({}, state, {
                    path: action.payload,
                    tabs: newArr,
                });
            } else {
                return Object.assign({}, state, {
                    tabs: newArr,
                });
            }
        default:
            return state;
    }
};
export default RouterModel;
