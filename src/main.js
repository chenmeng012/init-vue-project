// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import {router} from './router';
import store from "./store";
import {sync} from 'vuex-router-sync';
import {syncWith} from "./libs/LifecycleManager";

Vue.config.productionTip = false;

sync(store, router);
syncWith(store, router, {
  excludePaths: []
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
