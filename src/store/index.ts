import Vue from 'vue';
import Vuex from 'vuex';
import global from './global';
import user from './modules/user';
import strategy from './modules/strategy';
// import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  ...global,
  modules: {
    user,
    strategy,
  },
});
