import Vue from 'vue'
import Notifications from 'vue-notification'

import App from './App.vue'
import router from './router'
import store from './core/store'

Vue.config.productionTip = false;
Vue.use(Notifications);

/* eslint-disable no-new */
new Vue({
    el: '#app',
  render: h => h(App),
  store,
  router,
  created: function () {
    // `this` указывает на экземпляр vm
    console.log('Created vue')
  }
});

