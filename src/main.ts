import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueProgressBar from 'vue-progressbar';

const options = {
  thickness: '3px',
};

Vue.use(VueProgressBar, options);

Vue.use(ElementUI);

Vue.config.productionTip = false;


const initApp = async () => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');

  store.dispatch('getUserInfo');
};

initApp();
