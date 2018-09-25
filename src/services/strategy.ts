import request from '@/utils/request';

export const getStgs = () => request({
    url: '/users/stgs',
});

export const createStgs = () => request({
    url: 'stgs/create',
    method: 'post',
});

export const updateStgs = (data: any) => request({
    url: 'stgs',
    method: 'post',
    data,
});
