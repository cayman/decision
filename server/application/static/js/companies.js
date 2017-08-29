/**
 * Created by rustem on 27.08.17.
 */

const list = items => Object.keys(items).map(id=>items[id]);

const CompaniesPage = {
    template: `#companies-page`,
    data () {
        return {
            companies:sharedStore.companies,
            links:sharedStore.links,
            expanded:[]
        }
    },
    computed: {
        years: function () {
            return Array.from(new Set(this.companies.list.reduce((years, company)=>
                years.concat(company.years), []))).sort();
        },
    },
    created () {
        // запрашиваем данные когда реактивное представление уже создано
        this.obs = this.fetchData()
    },
    watch: {
        // в случае изменения маршрута запрашиваем данные вновь
        '$route': 'fetchData'
    },
    // beforeRouteUpdate (to, from, next) {
    //   // обработка изменений параметров пути...
    //   // не забудьте вызывать next()
    // }
    methods: {
        fetchData(){
            this.$root.fetchCompanies();
        },
        toggleSector: function (item) {
            item.opened = !item.opened;
            console.log('entity:', item.id, item.opened ? 'expanded' : 'collapsed');
        },
        collapseSector: function (item) {
            item.opened = false;
            console.log('entity:', item.id, 'collapsed');
        },
    }
};
