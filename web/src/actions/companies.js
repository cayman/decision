/**
 * Created by rustem on 31.08.17.
 */
import { api } from './api.js'
import store from '../store.js';

export default {
    fetchCompanies(){

        const _companies = store.companies;
        console.log('fetchCompanies',_companies);
        _companies.loading = true;
        _companies.error = null;
        return api.getCompanies()
            .do(list =>console.log('companies:',list))
            .do(list => list.sort((a, b)=>b.weight - a.weight))
            //create map of companies from list
            .do(list => _companies.map = list.reduce((companies, company)=>{
                    companies[company.id]=company;
                    return companies
                },{})
            )
            .do(list => _companies.years = Array.from(new Set(list.reduce((years, company)=>
                years.concat(company.years), []))).sort()
            )
            //create map of sectors from list
            .do(list => _companies.sectors = list.reduce((sectors, company)=> {
                    const id = company.sectorId;
                    (sectors[id] = sectors[id] || {
                            id,
                            name: company.sectorName,
                            companies: [],
                            opened: false
                        }).companies.push(company);
                    return sectors;
                },{})
            )
            .finally(() => _companies.loading = false)
            .subscribe(result => {
                console.log('success loaded companies');
            }, error=> {
                _companies.error = error;
                console.error(error);
            })
    },

    updateCompanyLinks(link,create=false){
        const _companies = store.companies;
        const _company = _companies.map[link.companyId];
        if(!_company) return null;

        _companies.loading = true;
        return api.updateCompanyLinks(link.companyId, create ? null : link.id, link)
            .do(list =>console.log('list:',list))
            .do(list => _company.links=list)
            .finally(() => _companies.loading = false)
            .subscribe(result => {
                console.log('success update company link');
            }, error=> {
                _companies.error = error;
                console.error(error);
            })
    },

    fetchCompany(){
        const _company = store.company;
        console.log('fetchCompany',_company);
        _company.loading = true;
        _company.error = null;
        return api.getCompanies(this.$route.params.id)
            .do(model =>console.log('company:',model))
            .do(model => _company.model = model)
            .finally(() => _company.loading = false)
            .subscribe(result => {
                console.log('success loaded company');
            }, error=> {
                _company.error = error;
                console.error(error);
            })
    }
}