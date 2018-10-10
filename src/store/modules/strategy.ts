import { Commit } from 'vuex';
import * as types from '../types';
import {
  getStgs,
  createStgs,
  updateStgs,
  deleteStgs,
  simulationStgs,
  getStgReports,
} from '@/services/strategy';

export interface State {
  stgs: [];
  reports: {
    report: any,
    details: [],
  };
}

// initial state
const initState: State = {
  stgs: [],
  reports: {
    report: {},
    details: [],
  },
};

// getters
const getters = {
  stgs: (state: State) => state.stgs,
};

// actions
const actions = {
  getStgs(context: { commit: Commit; state: State }) {
    return getStgs().then((result: any) => {
      if (result.success) {
        context.commit(types.GET_STGS_SUCCESS, result.data.data);
        return true;
      }
      context.commit(types.FAIL, result.message);
    });
  },
  createStgs(context: { commit: Commit; state: State }, data: any) {
    return createStgs().then((result: any) => {
      if (result.success) {
        // context.commit(types.CREATE_STGS_SUCCESS, result.data);
        return true;
      }
      context.commit(types.FAIL, result.message);
    });
  },
  deleteStgs(context: { commit: Commit; state: State }, data: { stgid: string }) {
    return deleteStgs(data).then((result: any) => {
      if (result.success) {
        // context.commit(types.CREATE_STGS_SUCCESS, result.data);
        return true;
      }
      context.commit(types.FAIL, result.message);
    });
  },
  getStgReports(context: { commit: Commit; state: State }, data: { reportid: string }) {
    return getStgReports(data).then((result: any) => {
      if (result.success) {
        context.commit(types.GET_REPORTS_SUCCESS, result.data.data);
        return true;
      }
      context.commit(types.FAIL, result.message);
    });
  },
  simulationStgs(context: { commit: Commit; state: State }, data: { stgid: string }) {
    return simulationStgs(data).then((result: any) => {
      if (result.success) {
        // context.commit(types.CREATE_STGS_SUCCESS, result.data);
        return true;
      }
      context.commit(types.FAIL, result.message);
    });
  },
  updateStgs(context: { commit: Commit; state: State }, data: any) {
    return updateStgs({ ...data }).then((result: any) => {
      if (result.success) {
        // context.commit(types.UPDATE_STGS_SUCCESS, result.data);
        return true;
      }
      context.commit(types.FAIL, result.message);
    });
  },
};

// mutations
const mutations = {
  [types.GET_STGS_SUCCESS](state: State, stgs: []) {
    state.stgs = stgs;
  },
  [types.GET_REPORTS_SUCCESS](state: State, reports: any) {
    state.reports = reports;
  },
};

export default {
  state: initState,
  getters,
  actions,
  mutations,
};
