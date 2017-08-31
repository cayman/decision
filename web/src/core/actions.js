/**
 * Created by rustem on 31.08.17.
 */
import api from './api.js'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

export const FETCH_SECTORS='fetchSectors';
export const FETCH_LINKS='fetchLinks';
export const FETCH_COMPANIES='fetchCompanies';
export const FETCH_COMPANY='fetchCompany';
export const CREATE_COMPANY_LINK='createCompanyLinks';
export const UPDATE_COMPANY_LINK='updateCompanyLinks';

export function initActions(state, mutations) {
    const actions = {
        [FETCH_SECTORS]:()=>{
            mutations.sectorsLoading();
            return api.getSectors()
                .do(list => console.log(FETCH_SECTORS, list))
                .do(list => mutations.setSectors(list))
                .subscribe(result => {
                      mutations.sectorsLoading(true);
                  }, error =>
                    mutations.sectorsLoading(true, error)
                )
        },
        [FETCH_LINKS]:()=>{
            mutations.linksLoading();
            return api.getLinks()
                .do(list => console.log(FETCH_LINKS, list))
                .do(list => mutations.setLinks(list))
                .subscribe(result => {
                      mutations.linksLoading(true);
                  }, error =>
                    mutations.linksLoading(true, error)
                )
        },
        [FETCH_COMPANIES]:()=>{
            mutations.companiesLoading();
            return api.getCompanies()
                .do(list => console.log(FETCH_COMPANIES, list))
                .map(list => list ? list.sort((a, b) => b.weight - a.weight) : list)
                .do(list => mutations.setCompanies(list))
                .do(list => mutations.setCompaniesYears(list))
                .do(list => mutations.setCompaniesSectors(list))
                .subscribe(result => {
                      mutations.companiesLoading(true);
                  }, error =>
                    mutations.companiesLoading(true, error)
                )
        },
        [CREATE_COMPANY_LINK]:(link)=>{
            mutations.companiesLoading();
            return api.postLink(link.companyId, null, link)
                .do(list => console.log(CREATE_COMPANY_LINK, list))
                .do(list => mutations.setCompaniesItemLinks(link.companyId, list))
                .subscribe(result => {
                      mutations.companiesLoading(true);
                  }, error =>
                    mutations.companiesLoading(true, error)
                )
        },
        [UPDATE_COMPANY_LINK]:(link)=>{
            mutations.companiesLoading();
            return api.postLink(link.companyId, link.id, link)
                .do(list => console.log(UPDATE_COMPANY_LINK, list))
                .do(list => mutations.setCompaniesItemLinks(link.companyId, list))
                .subscribe(result => {
                      mutations.companiesLoading(true);
                  }, error =>
                    mutations.companiesLoading(true, error)
                )
        },
        [FETCH_COMPANY]:(companyId)=>{
            mutations.companiesLoading();
            return api.getCompany(companyId)
                .do(model => console.log(FETCH_COMPANY, model))
                .do(model => mutations.setCompany(model))
                .subscribe(result => {
                      mutations.companiesLoading(true);
                  }, error =>
                    mutations.companiesLoading(true, error)
                )
        }
    };
    console.log('created actions');
    return {
        do(name,params){
            if(actions[name])
                actions[name](params);
            else
                console.error('wrong action',name);
        }
    }
}
