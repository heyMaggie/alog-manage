import axios from "axios";
import { message } from "antd";
message.config({
    top: 200,
    duration: 1.5,
});

//  https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api
//根据环境  自动切换 IP
// if (process.env.NODE_ENV == "development") {
//   //开发环境
//   axios.defaults.baseURL = "http://192.168.1.55:9012";
//   //   axios.defaults.baseURL = "http://192.168.1.55:9013";
// } else {
//   //生产环境
//   axios.defaults.baseURL = "http://192.168.1.78:9012";
// }
export default class Axios {
    static get(options, showLoading = false) {
        if (showLoading) {
            if (!this.loading) {
                this.loading = document.getElementById("ajaxLoading");
            }
            this.loading.style.display = "block";
        }
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: "get",
                timeout: 5000,
                baseURL: options.baseUrl
                    ? options.baseUrl
                    : axios.defaults.baseURL,
                params: options.data || "",
                headers: {
                    userId: sessionStorage.userName,
                },
            })
                .then((response) => {
                    if (showLoading) {
                        this.loading.style.display = "none";
                    }
                    if (response.status == "200") {
                        let res = response.data;
                        if (
                            res.code == "0" ||
                            res.code == "200" ||
                            (res.code > 200 && res.code < 400) ||
                            res.code == "2000" ||
                            res.code == "10000" ||
                            res.code == "20000"
                        ) {
                            resolve(res);
                        } else {
                            message.info({
                                title: "提示",
                                content:
                                    res.msg || res.message || "获取数据失败",
                            });
                            //失败回调
                            if (typeof options.error == "function") {
                                options.error();
                            }
                            resolve(res);
                        }
                    } else {
                        reject(response.data);
                    }
                })
                .catch((e) => {
                    // console.log(e);
                    message.warning({
                        title: "提示",
                        content: "数据请求失败!",
                    });
                });
        });
    }
    static post(options, showLoading = false) {
        if (showLoading) {
            if (!this.loading) {
                this.loading = document.getElementById("ajaxLoading");
            }
            this.loading.style.display = "block";
        }
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: "post",
                timeout: 5000,
                baseURL: options.baseUrl
                    ? options.baseUrl
                    : axios.defaults.baseURL,
                data: options.data || {},
                headers: {
                    userId: sessionStorage.userName,
                },
            })
                .then((response) => {
                    if (showLoading) {
                        this.loading.style.display = "none";
                    }
                    if (response.status == "200") {
                        let res = response.data;
                        if (!res.hasOwnProperty("code")) {
                            resolve(res);
                            return;
                        }
                        if (
                            res.code == "0" ||
                            res.code == "200" ||
                            (res.code > 200 && res.code < 400) ||
                            res.code == "2000" ||
                            res.code == "10000" ||
                            res.code == "20000"
                        ) {
                            resolve(res);
                        } else {
                            message.info({
                                title: "提示",
                                content:
                                    res.msg || res.message || "获取数据失败",
                                duration: "3",
                            });
                            //失败回调
                            if (typeof options.error == "function") {
                                options.error();
                            }
                        }
                    } else {
                        reject(response.data);
                    }
                })
                .catch((e) => {
                    // console.log(e);
                    message.warning({
                        title: "提示",
                        content: "数据请求失败!",
                    });
                });
        });
    }
    static request(options) {
        return new Promise((resolve, reject) => {
            axios({
                ...options,
                method: options.method || "get",
                url: options.url,
                timeout: 5000,
                baseURL: options.baseUrl
                    ? options.baseUrl
                    : axios.defaults.baseURL,
                data: options.data || {},
                headers: {
                    userId: sessionStorage.userName,
                },
            })
                .then((response) => {
                    if (response.status == "200") {
                        let res = response.data;
                        if (
                            res.code == "0" ||
                            res.code == "200" ||
                            (res.code > 200 && res.code < 400) ||
                            res.code == "2000" ||
                            res.code == "10000"
                        ) {
                            resolve(res);
                        } else {
                            message.info({
                                title: "提示",
                                content:
                                    res.msg || res.message || "获取数据失败",
                            });
                            //失败回调
                            if (typeof options.error == "function") {
                                options.error();
                            }
                        }
                    } else {
                        reject(response.data);
                    }
                })
                .catch((e) => {
                    // console.log(e);
                    message.warning({
                        title: "提示",
                        content: "数据请求失败!",
                    });
                });
        });
    }
}
