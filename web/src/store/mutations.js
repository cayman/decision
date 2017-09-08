/**
 * Created by rustem on 05.09.17.
 */

import Vue from 'vue';
import * as mt from './types';


export default {

    [mt.SET_COMPANIES]: (state, list) => {
        // state.companies.map = list.reduce((items, item)=> {
        //     items[item.id] = item;
        //     return items;
        // }, {});
        state.companies.map = {...list.map(item=>({[item.id]:item}))};

        state.companies.years = Array.from(
            new Set(list.reduce((years, company) => years.concat(company.years), []))
        ).sort();

        state.companies.sectors = list.reduce((sectors, company) => {
            const id = company.sectorId;
            (sectors[id] = sectors[id] || {
                    id,
                    name: company.sectorName,
                    companies: [],
                    opened: false
                }).companies.push(company);
            return sectors;
        }, {});

    },

    [mt.SET_POSTS]: (state, list) => {
        state.posts = list;
    },
    [mt.SET_POST]: (state, post) => {
        const index = state.posts.findIndex(p=>p.id === post.id);
        state.posts.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, post);
    },
    [mt.SET_COMPANY]: (state, model) => {
        state.companies.model = model;
    },
    [mt.SET_COMPANY_LINK]: (state, {company, link})=> {
        if (!company.links) Vue.set(company, 'links', []);
        const index = company.links.findIndex(l=>l.linkId === link.linkId);
        company.links.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, link);

    },
    [mt.SET_INSTRUMENT_LINK]: (state, {instrument, link})=> {
        if (!instrument.links) Vue.set(instrument, 'links', []);
        const index = instrument.links.findIndex(l=>l.linkId === link.linkId);
        instrument.links.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, link);
    },

    [mt.SET_COMPANY_INSTRUMENT]: (state, {company, instrument})=> {
        if (!company.instruments) Vue.set(company, 'instruments', []);
        const index = company.instruments.findIndex(i=>i.typeId === instrument.typeId);
        company.instruments.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, instrument);
    },

    [mt.SET_DICTIONARY]: (state, {name, list}) => {
        Vue.set(state.dictionary,name,list);
    },

    [mt.LOADING]: (state, {name}) => {
        Vue.set(state.loading,name,true);
    },

    [mt.LOADED]: (state, {name, error}) => {
        Vue.set(state.messages,'error',error);
        Vue.set(state.loading,name,false);
        error ? console.error(name,error) : null;
    },
    [mt.TOGGLE]: (state, entity) => {
        Vue.set(entity,'expanded',!entity.expanded);
        console.log('sector:', entity.expanded);
    },


};