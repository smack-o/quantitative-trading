import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
// import Login from './views/Login.vue';
const ensure = (name: string) => () => import(`./views/${name}.vue`);

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'stgsList' },
      component: Home,
    },
    {
      path: '/stgs',
      component: ensure('Stgs/index'),
      children: [{
        path: '/',
        name: 'stgsList',
        component: ensure('Stgs/list'),
      }, {
        path: 'help',
        name: 'stgsHelp',
        component: ensure('Stgs/help'),
      }, {
        path: 'setting',
        name: 'stgsSetting',
        component: ensure('Stgs/setting'),
      }],
    },
    {
      path: '/user',
      redirect: { name: 'signin' },
      children: [{
        path: 'signin',
        name: 'signin',
        component: ensure('Login'),
      }, {
        path: 'signup',
        name: 'signup',
        component: ensure('Login'),
      }, {
        path: 'reset',
        name: 'reset',
        component: ensure('Login'),
      }],
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ensure('Login'),
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   /* must call `next` */
//   console.log(to)
//   if (to.name === 'login') {
//     next();
//   } else {
//     console.log(111)
//     next();
//   }
// });
export default router;
