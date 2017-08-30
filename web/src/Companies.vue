<template>
    <section class="main">
        <pre>{{ companies.loading }}</pre>
        <div is="alert-loader" :loading="companies.loading"></div>
        <div is="alert-error" :error="companies.error"></div>

        <table class="companies">
            <caption> Список компаний </caption>
            <thead>
            <tr is="years-header-row" title="Название" :years="companies.years"></tr>
            </thead>
            <template v-for="(sector,key) in companies.sectors">
                <thead>
                <tr is="sector-header-row" :sector="sector" :years="companies.years" v-on:toggle="toggleSector(sector)"></tr>
                </thead>
                <tbody>
                <template v-for="company in sector.companies">
                    <tr is="company-header-row" :company="company" :years="companies.years" :links="links.list"></tr>
                    <tr is="indicator-row" v-for="indicator in company.indicators" :key="indicator.id" :indicator="indicator" :years="companies.years"></tr>
                </template>
                <tr is="sector-footer-row" :sector="sector" :years="companies.years" v-on:collapse="collapseSector(sector)"></tr>
                </tbody>
            </template>
        </table>
    </section>
</template>

<script>
export default {
    name: 'companies-page',
    data () {
        return {
            companies:sharedStore.companies,
            links:sharedStore.links,
            expanded:[]
        }
    },
    computed: {

    },
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
        }
    }
};
</script>