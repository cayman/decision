/**
 * Created by rustem on 31.08.17.
 */
import { GET, POST } from './api.js'
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/observable/of';

export const FETCH_SECTORS='fetchSectors';
export const FETCH_LINKS='fetchLinks';
export const FETCH_INSTRUMENT_TYPES='fetchInstrumentTypes';
export const FETCH_COMPANIES='fetchCompanies';
export const FETCH_COMPANY='fetchCompany';
export const CREATE_COMPANY_LINK='createCompanyLinks';
export const UPDATE_COMPANY_LINK='updateCompanyLinks';
export const CREATE_COMPANY_INSTRUMENT='createCompanyInstrument';
export const UPDATE_COMPANY_INSTRUMENT='updateCompanyInstrument';


const COMPANIES='companies';
const SECTORS='sectors';
const LINKS='links';
const INSTRUMENT_TYPES='instrumentsTypes';




export function initActions(state, mutations) {

    const actions = {
        [FETCH_SECTORS]:()=>{
            mutations.loading(SECTORS);
            return GET(`sectors`)
                .do(list => console.log(FETCH_SECTORS, list))
                .map(list=>list||[])
                .do(list => mutations.setList(SECTORS,list))
                .subscribe(result => {
                    mutations.loading(SECTORS,true);
                  }, error =>
                    mutations.loading(SECTORS, true, error)
                )
        },
        [FETCH_LINKS]:()=>{
            mutations.loading(LINKS);
            return GET(`links`)
                .do(list => console.log(FETCH_LINKS, list))
                .map(list=>list||[])
                .do(list => mutations.setList(LINKS,list))
                .subscribe(result => {
                    mutations.loading(LINKS,true);
                  }, error =>
                    mutations.loading(LINKS,true, error)
                )
        },
        [FETCH_INSTRUMENT_TYPES]:()=>{
            mutations.loading(INSTRUMENT_TYPES);
            return GET(`instrument_types`)
                .do(list => console.log(FETCH_INSTRUMENT_TYPES, list))
                .map(list=>list||[])
                .do(list => mutations.setList(INSTRUMENT_TYPES,list))
                .subscribe(result => {
                    mutations.loading(INSTRUMENT_TYPES,true);
                  }, error =>
                    mutations.loading(INSTRUMENT_TYPES,true, error)
                )
        },
        [FETCH_COMPANIES]:()=>{
            mutations.loading(COMPANIES);
            return GET(`companies`)
                .do(list => console.log(FETCH_COMPANIES, list))
                .map(list => list ? list.sort((a, b) => b.weight - a.weight) : list)
                .map(list=>list||[])
                .do(list => mutations.setMap(COMPANIES,list))
                .do(list => mutations.extractYears(list))
                .do(list => mutations.extractSectors(list))
                .subscribe(result => {
                    mutations.loading(COMPANIES,true);
                  }, error =>
                    mutations.loading(COMPANIES,true, error)
                )
        },
        [FETCH_COMPANY]:(companyId)=> {
            mutations.loading(COMPANIES);
            return GET(`companies/${companyId}`)
                .do(model => console.log(FETCH_COMPANY, model))
                .do(model => mutations.setModel(COMPANIES,model))
                .subscribe(result => {
                        mutations.loading(COMPANIES,true);
                    }, error =>
                        mutations.loading(COMPANIES,true, error)
                )
        },
        [CREATE_COMPANY_LINK]:(params)=>{
            mutations.loading(COMPANIES);
            return POST(`companies/${params.companyId}/links`, params)
                .do(link => console.log(CREATE_COMPANY_LINK, link))
                .do(link => state.companies.map[link.companyId] || Observable.throw(new Error(`Компания ${link.companyId} не найдена`)))
                .map(link => mutations.updateObjectLink(state.companies.map[link.companyId],link) )
                .do(size=>console.log('new links size', size))
                .subscribe(result => {
                        mutations.loading(COMPANIES,true);
                    }, error =>
                        mutations.loading(COMPANIES,true, error)
                );
        },
        [UPDATE_COMPANY_LINK]:(params)=>{
            mutations.loading(COMPANIES);
            return POST(`companies/${params.companyId}/links/${params.linkId}`, params)
                .do(link => console.log(UPDATE_COMPANY_LINK, link))
                .do(link => state.companies.map[link.companyId] || Observable.throw(new Error(`Компания ${link.companyId} не найдена`)))
                .map(link => mutations.updateObjectLink(state.companies.map[link.companyId],link) )
                .do(size=>console.log('new links size', size))
                .subscribe(result => {
                        mutations.loading(COMPANIES,true);
                    }, error =>
                        mutations.loading(COMPANIES,true, error)
                );
        },
        [CREATE_COMPANY_INSTRUMENT]:(params)=>{
            mutations.loading(COMPANIES);
            return POST(`companies/${params.companyId}/instruments`, params)
                .do(instrument => console.log(CREATE_COMPANY_INSTRUMENT, instrument))
                .do(instrument => state.companies.map[instrument.companyId] || Observable.throw(new Error(`Компания ${instrument.companyId} не найдена`)))
                .map(instrument => mutations.updateCompanyInstrument(state.companies.map[instrument.companyId],instrument) )
                .do(size=>console.log('new instruments size', size))
                .subscribe(result => {
                        mutations.loading(COMPANIES,true);
                    }, error =>
                        mutations.loading(COMPANIES,true, error)
                );
        },
        [UPDATE_COMPANY_INSTRUMENT]:(params)=>{
            mutations.loading(COMPANIES);
            return POST(`companies/${params.companyId}/instruments/${params.id}`, params)
                .do(instrument => console.log(UPDATE_COMPANY_INSTRUMENT, instrument))
                .do(instrument => state.companies.map[instrument.companyId] || Observable.throw(new Error(`Компания ${instrument.companyId} не найдена`)))
                .map(instrument => mutations.updateCompanyInstrument(state.companies.map[instrument.companyId],instrument) )
                .do(size=>console.log('new instruments size', size))
                .subscribe(result => {
                        mutations.loading(COMPANIES,true);
                    }, error =>
                        mutations.loading(COMPANIES,true, error)
                );
        },

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
