import axios from 'axios';
// import { baseURL } from './config'
import * as pathToRegexp from 'path-to-regexp';

interface Options {
    url: any;
    method?: string;
    data?: any;
    baseURL?: string;
    timeout?: number;
}

const fetch = (options: Options) => {
    const {
        method = 'get',
        data,
        baseURL = '/api',
        timeout = 5000
    } = options;
    let { url } = options;
    axios.defaults.baseURL = baseURL;

    const cloneData = {
        ...data
    };

    try {
        let domin: string = '';

        if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
            domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0];
            url = url.slice(domin.length);
        }

        const match: any[] = pathToRegexp.parse(url);
        url = pathToRegexp.compile(url)(data);
        for (const item of match) {
            if (item instanceof Object && item.name in cloneData) {
                delete cloneData[item.name];
            }
        }
        url = domin + url;
    } catch (e) {
        console.error(e.message);
    }

    const requestOptions = {
        timeout
    };

    switch (method.toLowerCase()) {
        case 'get':
            return axios.get(url, {
                params: cloneData,
                ...requestOptions
            });
        case 'delete':
            return axios.delete(url, {
                data: cloneData,
                ...requestOptions
            });
        case 'post':
            return axios.post(url, cloneData, requestOptions);
        case 'put':
            return axios.put(url, cloneData, requestOptions);
        case 'patch':
            return axios.patch(url, cloneData, requestOptions);
        default:
            return axios(options);
    }
};

export default function request(options: any) {
    return fetch(options).then((response: any) => {
        const { statusText, status } = response;
        const isSuccess = status === 200;
        const msg = statusText;
        return {
            success: isSuccess,
            message: msg,
            status,
            data: response.data
        };
    }).catch((error: any) => {
        const { response } = error;
        let msg;
        let status;
        let otherData = {};
        if (response) {
            const { data, statusText } = response;
            otherData = data;
            status = response.status;
            msg = data.message || statusText;
        } else {
            status = 600;
            msg = 'Network Error';
        }
        return { success: false, status, message: msg, ...otherData };
    });
}
