import { Commit } from 'vuex';
import * as types from '../types';
import {
  signup,
  getUserInfo,
  signin,
  signout,
} from '@/services/user';

import { RequestResult } from '@/utils/request';

export interface State {
  isLogin: boolean;
  userInfo: object;
}

// initial state
const initState: State = {
  isLogin: false,
  userInfo: {},
};

// getters
const getters = {
  userInfo: (state: State) => state.userInfo,
};

// actions
const actions = {
  getUserInfo(context: { commit: Commit; state: State }) {
    return getUserInfo().then((result: RequestResult) => {
      if (result.success) {
          context.commit(types.GET_USERINFO_SUCCESS, result.data);
          return true;
      }
      context.commit(types.FAIL, result.message);
    });
  },
  signin(context: { commit: Commit; state: State }, data: any) {
    return signin({ ...data }).then((result: RequestResult) => {
      if (result.success) {
          context.commit(types.SIGNIN_SUCCESS, result.data);
          return true;
      }
      context.commit('FAIL', result.message);
    });
  },
};

// mutations
const mutations = {
  [types.GET_USERINFO_SUCCESS](state: State, payload: any) {
    console.log(payload);
  },
};

export default {
  state: initState,
  getters,
  actions,
  mutations,
};
