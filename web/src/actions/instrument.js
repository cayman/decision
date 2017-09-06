/**
 * Created by rustem on 05.09.17.
 */

import {Observable} from "rxjs/Observable";
import * as mt from '../store/types';
import * as types from './types';
import {GET,POST}  from './api';

export default {

    [types.CREATE_COMPANY_INSTRUMENT]: ({commit,getters},params)=> {
        const name = 'instrument';
        commit(mt.LOADING, {name});
        return POST(`companies/${params.companyId}/instruments`, params)
            .do(instrument => console.log(types.CREATE_COMPANY_INSTRUMENT, instrument))
            .do(instrument => getters.getInstrumentType('instruments',instrument.typeId)
                || Observable.throw(new Error(`Тип инструмента ${instrument.typeId} не найдена в справочнике`)))
            .switchMap(instrument=> Observer.of(instrument.companyId)
                .map(companyId => getters.getCompany(companyId)
                    || Observable.throw(new Error(`Компания ${companyId} не найдена в справочнике`)))
                .map(company => commit(mt.SET_COMPANY_INSTRUMENT, {company, instrument}))
            )
            .subscribe(result => commit(mt.LOADED, {name}),
                error => commit(mt.LOADED, {name, error})
            );
    },
    [types.UPDATE_COMPANY_INSTRUMENT]: ({commit,getters},params)=> {
        mutations.loading(COMPANIES);
        return POST(`companies/${params.companyId}/instruments/${params.id}`, params)
            .do(instrument => console.log(types.UPDATE_COMPANY_INSTRUMENT, instrument))
            .do(instrument => getters.getInstrumentType('instruments',instrument.typeId) ||
                Observable.throw(new Error(`Тип инструмента ${instrument.typeId} не найдена в справочнике`)))
            .switchMap(instrument=> Observer.of(instrument.companyId)
                .map(companyId => getters.getCompany(companyId)
                || Observable.throw(new Error(`Компания ${companyId} не найдена в справочнике`)))
                .map(company => commit(mt.SET_COMPANY_INSTRUMENT, {company, instrument}))
            )
            .subscribe(result => commit(mt.LOADED, {name}),
                error => commit(mt.LOADED, {name, error})
            );
    }
}