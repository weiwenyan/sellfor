// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Goods from './components/goods/goods';
import Ratings from './components/ratings/ratings';
import Seller from './components/seller/seller';
import './common/style/index.css';
import '../static/css/reset.css';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  routes: [
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/ratings',
      component: Ratings
    },
    {
      path: '/seller',
      component: Seller
    }
  ],
  linkActiveClass: 'active'
});

/* eslint-disable no-new */
new Vue({
  el: 'app',
  router,
  template: '<App/>',
  components: { App }
});

