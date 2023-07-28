// Set config defaults when creating the instance
import axios from "axios";

const myAxios = axios.create({
    baseURL: 'http://localhost:8080/api',
    // withCredentials: true
});


myAxios.defaults.withCredentials = true; //默认携带cookie

// Add a request interceptor
myAxios.interceptors.request.use(function (config) {
    console.log('发请求了')
    console.log(config)
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
myAxios.interceptors.response.use(function (response) {
    console.log('收到响应了', response)
    // Do something with response data
    return response.data; //统一的取出data 第一层data 只关注业务的响应
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});
export default myAxios;
