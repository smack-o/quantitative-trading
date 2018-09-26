import axios from 'axios';
// import { baseURL } from './config'
import pathToRegexp from 'path-to-regexp';
import { loginRouters } from './';

interface FetchOption {
  method?: string;
  data?: object;
  baseURL?: string;
  timeout?: number;
  url?: string;
}

export interface RequestResult {
  success: boolean;
  message: string;
  status: number;
  data: any;
}

const fetch = (options: FetchOption) => {
  const {
    method = 'get',
    data,
    baseURL = '/api',
    timeout = 25000,
  } = options;
  let { url = '' } = options;
  axios.defaults.baseURL = baseURL;

  const cloneData = {
    ...data,
  };

  try {
    let domin = '';

    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0];
      url = url.slice(domin.length);
    }

    const match = pathToRegexp.parse(url);
    url = pathToRegexp.compile(url)(data);
    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name];
      }
    }
    url = domin + url;
  } catch (e) {
    // console.error(e.message);
  }

  const requestOptions = {
    timeout,
  };

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
        ...requestOptions,
      });
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
        ...requestOptions,
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

export default function request(options: object) {
  return fetch(options).then((response: { statusText: string, status: number, data: any }) => {
    const { statusText, status } = response;
    const isSuccess = status === 200;
    const msg = statusText;
    if (response.data.code === '400002') {
      // 400002 未登录状态， 统一跳转登录页
      if (location.pathname.indexOf('/user') < 0) {
        window.location.href = '/user';
        return;
      }
      return {
        success: isSuccess,
        message: msg,
        status,
        data: response.data,
      };
    }
    if (response.data.code === 200 || response.data.status === 'ok') {
      return {
        success: isSuccess,
        message: msg,
        status,
        data: response.data,
      };
    }
    return Promise.reject({ response });
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
    alert(msg);
    return Promise.reject({ success: false, status, message: msg, ...otherData });
  });
}
