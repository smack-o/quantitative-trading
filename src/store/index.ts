import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import strategy from './modules/strategy';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  mutations,
  modules: {
    user,
    strategy,
  },
});
