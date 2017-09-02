/**
 * Created by rustem on 31.08.17.
 */
import { GET, POST } from './api.js'
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
            if(state.sectors.list && state.sectors.list.length>0) return;
            mutations.sectorsLoading();
            return GET(`sectors`)
                .do(list => console.log(FETCH_SECTORS, list))
                .map(list=>list||[])
                .do(list => mutations.setSectors(list))
                .subscribe(result => {
                      mutations.sectorsLoading(true);
                  }, error =>
                    mutations.sectorsLoading(true, error)
                )
        },
        [FETCH_LINKS]:()=>{
            mutations.linksLoading();
            if(state.links.list && state.links.list.length>0) return;
            return GET(`links`)
                .do(list => console.log(FETCH_LINKS, list))
                .map(list=>list||[])
                .do(list => mutations.setLinks(list))
                .subscribe(result => {
                      mutations.linksLoading(true);
                  }, error =>
                    mutations.linksLoading(true, error)
                )
        },
        [FETCH_COMPANIES]:()=>{
            mutations.companiesLoading();
            return GET(`companies`)
                .do(list => console.log(FETCH_COMPANIES, list))
                .map(list => list ? list.sort((a, b) => b.weight - a.weight) : list)
                .map(list=>list||[])
                .do(list => mutations.setCompanies(list))
                .do(list => mutations.extractYears(list))
                .do(list => mutations.extractSectors(list))
                .subscribe(result => {
                      mutations.companiesLoading(true);
                  }, error =>
                    mutations.companiesLoading(true, error)
                )
        },
        [CREATE_COMPANY_LINK]:(link)=>{
            mutations.companiesLoading();
            return POST(`companies/${link.companyId}/links`, link)
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
            return POST(`companies/${link.companyId}/links/${link.linkId}`, link)
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
            return GET(`companies/${companyId}`)
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
