/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import store from '../store/index'
import router from "../router/index";

// 环境的切换
// if (import.meta.env == 'development') {
//     axios.defaults.baseURL = 'http://192.168.31.55:4003/'
    // axios.defaults.baseURL = 'http://192.168.0.155:4003/'
// } else if (import.meta.env == 'production') {
    axios.defaults.baseURL = 'http://124.70.98.183:4003/'
// }
console.log(import.meta.env,'route参数')
// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = store.state.token;
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error);
    })

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况
    error => {
        console.log('sibai',error)
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    router.replace({
                        path: '/login',
                        query: { redirect: router.currentRoute.fullPath }
                    });
                    break;
                // 其他错误，直接抛出错误提示
                default:
                // Toast({
                //     message: error.response.data.message,
                //     duration: 1500,
                //     forbidClick: true
                // });
            }
            return Promise.reject(error.response);
        }
    }
);
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){
    return new Promise((resolve, reject) =>{
        axios.get(url, {
            params: params
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, JSON.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
