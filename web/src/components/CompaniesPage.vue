<template>
    <section class="main">
        <div is="alert-loader" :loading="loading"></div>
        <!--<pre>{{ sectors }}</pre>-->
        <table class="companies">
            <caption>Список компаний</caption>
            <companies-header title="Название" :years="years"></companies-header>
            <template v-for="(sector,key) in sectors">
                <sector-header :sector="sector" :years="years" @name-click="toggle(sector)"></sector-header>
                <template v-for="company in sector.companies">
                    <company-header :company="company" :years="years" @name-click="toggle(company)"></company-header>
                    <template v-if="sector.expanded || company.expanded">
                        <company-indicators :company="company" :years="years"></company-indicators>
                        <company-posts :company="company" :years="years"></company-posts>
                    </template>
                </template>
                <sector-footer :sector="sector" :years="years" @collapse="toggle(sector)"></sector-footer>
            </template>
        </table>
    </section>
</template>

<script>
    import {FETCH_COMPANIES} from 'actions/types';
    import {TOGGLE} from 'store/types';
    import CompaniesHeader from 'components/table/CompaniesHeader.vue';
    import SectorHeader from 'components/table/SectorHeader.vue';
    import CompanyHeader from 'components/table/CompanyHeader.vue';
    import CompanyIndicators from 'components/table/CompanyIndicators.vue';
    import CompanyPosts from 'components/table/CompanyPosts.vue';
    import SectorFooter from 'components/table/SectorFooter.vue';

    export default {
        name: 'companies-page',
        components: {
            CompaniesHeader, SectorHeader, CompanyHeader, CompanyIndicators, CompanyPosts, SectorFooter
        },
        computed: {
            sectors(){
                return this.$store.state.companies.sectors;
            },
            years(){
                return this.$store.state.companies.years;
            },
            loading(){
                return this.$store.state.loading.companies;
            },
        },
        created () {
            // запрашиваем данные когда реактивное представление уже создано
            this.fetchCompanies();
        },
        watch: {
            // в случае изменения маршрута запрашиваем данные вновь
            '$route': 'fetchCompanies'
        },
        beforeRouteUpdate (to, from, next) {
            console.log('Company page');
            //   // обработка изменений параметров пути...
            //   // не забудьте вызывать
            next();
        },
        methods: {
            fetchCompanies(){
                this.$store.dispatch(FETCH_COMPANIES);
            },
            toggle(entity){
                this.$store.commit(TOGGLE, entity);
            }
        }
    };
</script>


<style rel="stylesheet/scss" lang="scss">

    @import "../assets/style.scss";

    table.companies {
        width: 100%;
        padding: 0;
        margin: 0;
        tr {
            td, th {
                    border-right: 1px solid $border_color;
                    border-bottom: 1px solid $border_color;
                    padding: 3px 2px 3px 2px;
            }
        }

    }

</style>