import { fetchStgs } from 'services/strategy';

export const GET_STGS_SUCCESS = 'user/GET_STGS_SUCCESS';

export const getStgs= data => dispatch => fetchStgs(data).then((response) => {
  console.log(response)
  dispatch({
    type: GET_STGS_SUCCESS,
    data: response.data.data
  });
});
