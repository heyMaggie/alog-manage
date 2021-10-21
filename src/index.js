//兼容 依赖
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import Root from "./Root";

import store from "./store/index";
// import configStore from "./store/index";
import { Provider } from "react-redux";
import axios from "./utils/axios";
window.http = axios;

// let store;
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
// render
// ReactDOM.render(
//   <Root onStoreCreated={s => (store = s)}></Root>,
//   document.getElementById("root")
// );

//热更新，状态保持！
if (module.hot) {
    // module.hot.accept("./App", () => {
    //   console.log("App 热更新! ");
    //   const NextApp = require("./App").default;
    //   // let preloadStore = store.getState();
    //   // console.log(preloadStore, 111212);
    //   ReactDOM.render(
    //     <Provider store={store}>
    //       <NextApp />
    //     </Provider>,
    //     document.getElementById("root")
    //   );
    // });
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
