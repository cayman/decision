/**
 * Created by rustem on 05.09.17.
 */

import {Observable} from "rxjs/Observable";
import * as mt from '../store/types';
import * as types from './types';
import {GET,POST}  from './api';

export default {

    [types.FETCH_COMPANIES]: ({commit})=> {
        const name = 'companies';
        commit(mt.LOADING, {name});
        return GET(`companies`)
            .do(list => console.log(types.FETCH_COMPANIES, list))
            .map(list => list ? list.sort((a, b) => b.weight - a.weight) : list)
            .map(list=>list || [])
            .do(list => commit(mt.SET_COMPANIES, list))
            .switchMap(link=> GET(`posts`)
                .do(posts => console.log('loaded', posts))
                .map(posts => commit(mt.SET_POSTS, posts))
            )
            .subscribe(result => commit(mt.LOADED, {name}),
                error => commit(mt.LOADED, {name,
                    error:{title:'Загрузка компании',text:error }
                })
            );
    },
    [types.FETCH_COMPANY]: ({commit},companyId)=> {
        const name = 'company';
        commit(mt.LOADING, {name});
        return GET(`companies/${companyId}`)
            .do(model => console.log(types.FETCH_COMPANY, model))
            .do(model => commit(mt.SET_COMPANY, model))
            .subscribe(result => commit(mt.LOADED, {name}),
                error => commit(mt.LOADED, {name,
                    error:{title:'Загрузка компаний',text:error }
                })
            );
    },
    [types.CREATE_COMPANY_LINK]: ({commit, getters}, params)=> {
        const name = 'link';
        commit(mt.LOADING, {name});
        return POST(`companies/${params.companyId}/links`, params)
            .do(link => console.log(types.CREATE_COMPANY_LINK, link))
            .do(link => getters.getLink(link.linkId) ||
                Observable.throw(new Error(`Ссылка ${link.linkId} не найдена в справочнике`)))
            .switchMap(link=> Observable.of(link.companyId)
                .map(companyId => getters.getCompany(companyId)
                || Observable.throw(new Error(`Компания ${companyId} не найдена`)))
                .map(company => commit(mt.SET_COMPANY_LINK, {company, link}))
            )
            .subscribe(result => commit(mt.LOADED, {name}),
                error => commit(mt.LOADED, {name,
                    error:{title:'Создание ссылки',text:error }
                })
            );
    },
    [types.UPDATE_COMPANY_LINK]: ({commit, getters}, params)=> {
        const name = 'link';
        commit(mt.LOADING, {name});
        return POST(`companies/${params.companyId}/links/${params.linkId}`, params)
            .do(link => console.log(types.UPDATE_COMPANY_LINK, link))
            .do(link => getters.getLink(link.linkId) ||
                Observable.throw(new Error(`Ссылка ${link.linkId} не найдена в справочнике`)))
            .switchMap(link=> Observable.of(link.companyId)
                .map(companyId => getters.getCompany(companyId)
                || Observable.throw(new Error(`Компания ${companyId} не найдена в справочнике`)))
                .map(company => commit(mt.SET_COMPANY_LINK, {company, link}))
            )
            .subscribe(result => commit(mt.LOADED, {name}),
                error => commit(mt.LOADED, {name,
                    error:{title:'Изменение ссылки',text:error }
                })
            );
    }
};