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

export const deleteStgs = (data: { stgid: string }) => request({
    url: 'stgs/delete',
    method: 'post',
    data,
});
