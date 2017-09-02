/**
 * Created by rustem on 31.08.17.
 */
import { initActions } from './actions'

const state = {
    urls: {
        search:'https://www.google.ru/search?q=',
    },
    sectors:{
        list: [],
        loading: false,
        error: null,
    },
    links: {
        list:{},
        loading: false,
        error: null
    },
    instrumentsTypes: {
        list:[],
        loading: false,
        error: null,
    },
    companies: {
        map: {},
        years: [],
        sectors: {},
        model:{},
        loading: false,
        error: null,
    },

};
const loading = (end,error) => end ? (error ?'loaded error' :'loaded  success') :'loading...';


const mutations = {
    loading:(name, end=false,error=null)=>{
        console.info(name,loading(end,error));
        state[name].loading = !end;
        if(state[name].error = error)
            console.error(error);
        console.debug(state[name]);
    },
    setList:(name, list)=>{
        state[name].list = list;
    },


    setModel:(name, model)=>{
        state[name].model = model;
    },

    setMap:(name, list)=>{
        state[name].map = list.reduce((items, item)=>{
            items[item.id]=item;
            return items;
        },{})
    },
    extractYears:(companies)=> {
        state.companies.years = Array.from(
            new Set(companies.reduce((years, company) => years.concat(company.years), []))
        ).sort();
    },
    //create map of sectors from list
    extractSectors:(companies)=> {
        state.companies.sectors = companies.reduce((sectors, company) => {
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

    updateObjectLink:(item, link)=>{
        item.links = item.links || [];
        const index = item.links.findIndex(l=>l.linkId === link.linkId);
        company.links.splice(index>=0?index:0,index>=0?1:0,link);
        return item.links.length;

    },

    updateCompanyInstrument:(company, instrument)=>{
        company.instruments = company.instruments || [];
        const index = company.instruments.findIndex(i=>i.typeId === instrument.typeId);
        company.links.splice(index>=0?index:0,index>=0?1:0,instrument);
        return company.instruments.length;

    },
};

const actions = initActions(state,mutations);

const store = {
        state,
        dispatch:function(name,data){
            console.debug('dispatch',name,data);
            actions.do(name,data);
        }
};

export default store;