import 'babel-polyfill'
import Vue from 'vue';
import Vuex from 'vuex';
import Notifications from 'vue-notification'

import App from './components/App.vue'
import router from './router'
import store from './store'
import {composeIconUrl,composeUrl} from './actions/utils'

Vue.config.productionTip = false;
Vue.use(Notifications);

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

import CompaniesHeaderRow from './components/table/CompaniesHeaderRow.vue';
import CompanyHeaderRow from './components/table/CompanyHeaderRow.vue';
import CompanyPostsRow from './components/blog/CompanyPostsRow.vue';

import IndicatorRow from './components/indicators/IndicatorRow.vue';
import IndicatorDiagramRow from './components/indicators/IndicatorDiagramRow.vue';

Vue.component(AlertLoader.name, AlertLoader);
Vue.component(AlertError.name, AlertError);
Vue.component(CompaniesHeaderRow.name, CompaniesHeaderRow);
Vue.component(CompanyHeaderRow.name, CompanyHeaderRow);
Vue.component(CompanyPostsRow.name, CompanyPostsRow);
Vue.component(IndicatorRow.name, IndicatorRow);
Vue.component(IndicatorDiagramRow.name, IndicatorDiagramRow);


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

