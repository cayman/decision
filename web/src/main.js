import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'

Vue.config.productionTip = false;

export const bus = new Vue();

export const vm = new Vue({
  template: '<App/>',
  router,
  data: {
     store
  },
  created: function () {
    // `this` указывает на экземпляр vm
    console.log('Значение a: ' + this.a)
  }
});

