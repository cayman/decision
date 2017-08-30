/**
 * Created by rustem on 27.08.17.
 */
const sharedStore = {
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
        loading: false,
        error: null,
    },
    company: {
        loading: false,
        error: null,
        model:null
    },

};

const router = new VueRouter({
    routes: [
        {  name: 'home', path: '/', components: {
            default: HomePage,
            sidebar: SideBar
        }},
        {  name: 'companies', path: '/companies', components: {
            default: CompaniesPage,
            sidebar: SideBar
        }},
        {  name: 'company', path: '/companies/:companyId', components: {
            default: CompanyPage,
            sidebar: SideBar
        }}
    ]
});

new Vue({
    el: '#decision',
    data: {
        store:sharedStore
    },
    router,
    created () {
        // запрашиваем данные когда реактивное представление уже создано
        this.obs1 = this.fetchLinks();
        this.obs2 = this.fetchSectors();
    },

    destroyed () {
        this.obs1.unsubscribe();
        this.obs2.unsubscribe();
    },
    filters: {
        price: function (value) {
            if (!value) return '';
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    },
    mounted () {
        this.$on('companyLink:create',link=>{
            console.log('companyLink:create',link);
            this.updateCompanyLinks(link,true);
        });
        this.$on('companyLink:update',link=>{
            console.log('companyLink:update',link);
            this.updateCompanyLinks(link);
        });
    },
    methods: {
        fetchSectors(){
            const _sectors = this.store.sectors;
            console.log('fetchSectors',_sectors);
            _sectors.loading = true;
            _sectors.error = null;
            return api.getSectors()
                .do(list =>console.log('sectors:',list))
                .do(list => _sectors.list = list)
                .finally(() => _sectors.loading = false)
                .subscribe(result => {
                    console.log('success loaded sectors');
                }, error=> {
                    _sectors.error = error;
                    console.error(error);
                })
        },
        fetchLinks(){
            const _links = this.store.links;
            console.log('fetchLinks',_links);
            _links.loading = true;
            _links.error = null;
            return api.getLinks()
                .do(list =>console.log('links:',list))
                .do(list => _links.list = list)
                .finally(() => _links.loading = false)
                .subscribe(result => {
                    console.log('success loaded links');
                }, error=> {
                    _links.error = error;
                    console.error(error);
                })
        },
        fetchCompanies(){
            const _companies = this.store.companies;
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
            const _companies = this.store.companies;
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
            const _company = this.store.company;
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
});
