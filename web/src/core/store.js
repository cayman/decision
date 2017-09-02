/**
 * Created by rustem on 31.08.17.
 */
import { initActions } from './actions'

const state = {
    sectors:{
        list: [],
        loading: false,
        error: null,
    },
    links: {
        list:[],
        loading: false,
        error: null
    },
    companies: {
        map: {},
        years: [],
        sectors: {},
        model:{},
        loading: false,
        error: null,
    }
};
const loading = (end,error) => end ? (error ?'loaded error' :'loaded  success') :'loading...';

const mutations = {
    sectorsLoading:(end=false,error=null)=>{
        console.info('Sector',loading(end,error));
        state.sectors.loading = !end;
        if(state.sectors.error = error)
            console.error(error);
        console.debug(state.sectors);
    },
    linksLoading:(end=false,error=null)=>{
        console.log('Links',loading(end,error));
        state.links.loading = !end;
        if(state.links.error = error)
            console.error(error);
    },
    companiesLoading:(end=false,error=null)=>{
        console.log('Companies',loading(end,error));
        state.companies.loading = !end;
        if(state.companies.error = error)
            console.error(error);
        console.debug(state.companies);
    },
    setLinks:(list)=>{
        state.links.list = list;
    },
    setSectors:(list)=>{
        state.sectors.list = list;
    },
    setCompany:(model)=>{
        state.companies.model = model;
    },
    //create map of companies from list
    setCompanies:(list)=>{
        state.companies.map = list.reduce((companies, company)=>{
            companies[company.id]=company;
            return companies;
        },{})
    },
    //create map of companies from list
    setCompaniesItemLinks:(companyId,list)=>{
        state.companies.map[companyId]=list
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
    }
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