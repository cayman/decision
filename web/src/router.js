/**
 * Created by rustem on 31.08.17.
 */

import Vue from 'vue'
import Router from 'vue-router'

import Sidebar from './components/CompaniesPage.vue'
import HomePage from './components/HomePage.vue'
import CompaniesPage from './components/CompaniesPage.vue'
import CompanyPage from './components/CompanyPage.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {  name: 'home', path: '/', components: {
            default: HomePage,
            sidebar: Sidebar
        }},
        {  name: 'companies', path: '/companies', components: {
            default: CompaniesPage,
            sidebar: Sidebar
        }},
        {  name: 'company', path: '/companies/:companyId', components: {
            default: CompanyPage,
            sidebar: Sidebar
        }}
    ]
});
