import 'babel-polyfill'
import Vue from 'vue';
import Vuex from 'vuex';
import Notifications from 'vue-notification';
import Vuetify from 'vuetify';

import 'vuetify/dist/vuetify.min.css';

import App from './components/App.vue'
import router from './router'
import store from './store'
import {composeIconUrl,composeUrl} from './actions/utils'

Vue.config.productionTip = false;
Vue.use(Notifications);
Vue.use(Vuetify);


Vue.filter('url', (baseUrl, params) => {
    const url = composeUrl(baseUrl, params);
    return url;
});

Vue.filter('icon', (value, data) => {
    const iconUrl = composeIconUrl(value);
    return iconUrl;
});

Vue.filter('decision', (value, num=2) => {
    const str = value.toFixed(num);
    return str;
});


import AlertLoader from './components/AlertLoader.vue';
import AlertError from './components/AlertError.vue';





Vue.component(AlertLoader.name, AlertLoader);
Vue.component(AlertError.name, AlertError);


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

