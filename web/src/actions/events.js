/**
 * Created by rustem on 31.08.17.
 */

import companies from './companies.js'

export const bus = new Vue({

});

bus.$on('companies:fetch',()=>{
    companies.fetchCompanies();
});