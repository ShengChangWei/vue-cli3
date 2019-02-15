import axios from 'axios';
import { getToken } from './auth.service';
import { Message } from 'element-ui';

let url: any = '';
if (process.env.NODE_ENV == 'development') {

    url = '/api';

} else {
    url = '';
}

// 创建一个axios
const http = axios.create({

    baseURL: url,
});


/**
 * 请求拦截
 */
http.interceptors.request.use(config => {

    if (config.url !== '/login') {
        config.headers['Authorization'] = getToken();
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

/**
 * 响应拦截
 */
http.interceptors.response.use(
    response => response,
    //成功后的回调
    error => {


        console.log('err' + error); // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }
);


export default http;