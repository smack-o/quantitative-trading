import request from 'utils/request';

export const fetchStgs = data => request({
    url: '/users/stgs',
    data
});
