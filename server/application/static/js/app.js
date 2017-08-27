/**
 * Created by rustem on 27.08.17.
 */
const router = new VueRouter({
  routes:[
    { path: '/companies', component: Companies },
    { path: '/companies/:id', component: Company }
  ]
});

Vue.component('sidebar', {
  template:'#sidebar',
});


new Vue({
  el: '#decision',
  data: {
    message: 'Hello Vue.js!',
    companies: null,
  },
  router,
  filters: {
    price: function (value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
});
