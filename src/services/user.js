import request from 'utils/request';

export const signup = data => request({
    url: '/users/signup',
    method: 'post',
    data
});

export const userInfo = data => request({
    url: '/users',
    data
});

export const signin = data => request({
    url: '/users/login',
    method: 'post',
    data
});

export const signout = data => request({
    url: '/users/logout',
    data
});
