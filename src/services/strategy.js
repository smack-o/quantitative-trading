import request from 'utils/request';

export const fetchStgs = data => request({
    url: '/users/stgs',
    data
});

export const postStgs = data => request({
    url: 'stgs/create',
    method: 'post',
    data
});

export const putStgs = data => request({
    url: 'stgs',
    method: 'post',
    data
});
