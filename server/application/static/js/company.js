/**
 * Created by rustem on 27.08.17.
 */

const CompanyPage = {
    template: `#company-page`,
    data () {
        return {
            company:sharedStore.company,
            links:sharedStore.links,
        }
    },
    // beforeRouteUpdate (to, from, next) {
    //   // обработка изменений параметров пути...
    //   // не забудьте вызывать next()
    // },
    created () {
        // запрашиваем данные когда реактивное представление уже создано
        this.obs = this.fetchData()
    },
    destroyed () {
        this.obs.unsubscribe();
    },
    watch: {
        // в случае изменения маршрута запрашиваем данные вновь
        '$route': 'fetchData'
    },
    methods: {
        fetchData(){
            this.$root.fetchCompany()
        }
    }
};