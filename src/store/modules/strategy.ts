import { Commit } from 'vuex';
import * as types from '../types';
import {
  getStgs,
  createStgs,
  updateStgs,
  deleteStgs,
} from '@/services/strategy';

import { RequestResult } from '@/utils/request';

export interface State {
  stgs: [];
}

// initial state
const initState: State = {
  stgs: [],
};

// getters
const getters = {
  stgs: (state: State) => state.stgs,
};

// actions
const actions = {
  getStgs(context: { commit: Commit; state: State }) {
    return getStgs().then((result: RequestResult) => {
      if (result.success) {
        context.commit(types.GET_STGS_SUCCESS, result.data.data);
        return true;
      }
      context.commit(types.FAIL, result.message);
    });
  },
  createStgs(context: { commit: Commit; state: State }, data: any) {
    return createStgs().then((result: RequestResult) => {
      if (result.success) {
        // context.commit(types.CREATE_STGS_SUCCESS, result.data);
        return true;
      }
      context.commit('FAIL', result.message);
    });
  },
  deleteStgs(context: { commit: Commit; state: State }, data: { stgid: string }) {
    return deleteStgs(data).then((result: RequestResult) => {
      if (result.success) {
        // context.commit(types.CREATE_STGS_SUCCESS, result.data);
        return true;
      }
      context.commit('FAIL', result.message);
    });
  },
  updateStgs(context: { commit: Commit; state: State }, data: any) {
    return updateStgs({ ...data }).then((result: RequestResult) => {
      if (result.success) {
        // context.commit(types.UPDATE_STGS_SUCCESS, result.data);
        return true;
      }
      context.commit('FAIL', result.message);
    });
  },
};

// mutations
const mutations = {
  [types.GET_STGS_SUCCESS](state: State, stgs: []) {
    state.stgs = stgs;
  },
};

export default {
  state: initState,
  getters,
  actions,
  mutations,
};
