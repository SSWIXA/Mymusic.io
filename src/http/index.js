import axios from 'axios'
axios.defaults.baseURL='https://nicemusic-api.lxhcool.cn'
// https://nicemusic-api.lxhcool.cn http://localhost:3000/

axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});