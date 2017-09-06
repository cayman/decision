import 'babel-polyfill'
import Vue from 'vue';
import Vuex from 'vuex';
import Notifications from 'vue-notification'

import App from './components/App.vue'
import router from './router'
import store from './store'
import {composeIconUrl} from './actions/utils'

Vue.config.productionTip = false;
Vue.use(Notifications);

Vue.filter('icon', (value, data) => {
    const iconUrl = 'icon/'+ value;
    console.info(value, iconUrl);
    return iconUrl;
});


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

