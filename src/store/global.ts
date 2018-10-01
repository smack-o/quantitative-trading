import { Commit } from 'vuex';
import * as types from './types';


export interface State {
  loading: boolean;
}

const initState: State = {
  loading: false,
  // loadingList: [
  // ],
};

// actions
const actions = {
};

// mutations
const mutations = {
  [types.FAIL](state: State, data: any) {
    console.log(data);
  },
  [types.GLOBAL_LOADING](state: State) {
    state.loading = true;
    // if (loadingList) {

    // }
  },
  [types.GLOBAL_LOADED](state: State) {
    state.loading = false;
  },
};

const getters = {
  loading: (state: State) => state.loading,
};

export default {
  state: initState,
  getters,
  actions,
  mutations,
};
