import { fetchStgs, postStgs, putStgs } from 'services/strategy';

export const GET_STGS_SUCCESS = 'user/GET_STGS_SUCCESS';

export const getStgs = data => dispatch => fetchStgs(data).then((response) => {
  console.log(response)
  dispatch({
    type: GET_STGS_SUCCESS,
    data: response.data.data
  });
});

export const createStgs = data => dispatch => postStgs(data).then((response) => {
  console.log(response)
  // dispatch({
  //   type: GET_STGS_SUCCESS,
  //   data: response.data.data
  // });
});

export const updateStgs = data => dispatch => putStgs(data).then((response) => {
  // dispatch({
  //   type: GET_STGS_SUCCESS,
  //   data: response.data.data
  // });
});
