import { signup as signupS, userInfo, signin as signinS, signout as signoutS } from 'services/user';

export const GET_USERINFO_SUCCESS = 'user/GET_USERINFO_SUCCESS';

export const signup = data => dispatch => signupS(data);
export const getUserInfo = data => dispatch => userInfo(data).then((response) => {
  console.log(response)
  dispatch({
    type: GET_USERINFO_SUCCESS,
    data: response.data.data
  });
});

export const signin = data => dispatch => signinS(data);

export const signout = data => dispatch => signoutS(data);
