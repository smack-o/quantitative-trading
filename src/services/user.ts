import request from '@/utils/request';

export const signup = (data: any) => request({
    url: '/users/signup',
    method: 'post',
    data,
});

export const getUserInfo = () => request({
    url: '/users',
});

export const signin = (data: any) => request({
    url: '/users/login',
    method: 'post',
    data,
});

export const signout = (data: any) => request({
    url: '/users/logout',
    data,
});
