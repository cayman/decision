<template>
    <section class="main">
        <div is="alert-loader" :loading="loading"></div>
        <!--<div is="alert-error" :error="error"></div>-->

        <h2>{{ company.name }}</h2>
        <table class="company">
            <caption> Информация о компании </caption>
            <thead>
                <companies-header-row title="Индикатор" :years="company.years"></companies-header-row>
            </thead>
            <tbody>
                <indicator-row v-for="indicator in company.indicators" :key="indicator.id"
                               :indicator="indicator" :years="company.years"></indicator-row>
            </tbody>
        </table>
    </section>
</template>


<script>
import { FETCH_COMPANY } from '../core/actions';
import store from '../core/store';
import AlertLoader from './AlertLoader.vue'
import AlertError from './AlertError.vue'
import CompaniesHeaderRow from './table/CompaniesHeaderRow.vue'
import IndicatorRow from './table/IndicatorRow.vue'

export default {
    name: 'companies-page',
    components: {
        AlertLoader, AlertError, CompaniesHeaderRow, IndicatorRow
    },
    data () {
        return {
            companies:store.state.companies,
            links:store.state.links,
        }
    },
    computed: {
        company(){
            return this.companies.model;
        },
        loading(){
            return this.companies.loading;
        },
        error(){
            return this.companies.error;
        },
    },
    beforeRouteUpdate (to, from, next) {
        console.log('Companies page');
    //   // обработка изменений параметров пути...
    //   // не забудьте вызывать
        next();
    },
    created () {
        // запрашиваем данные когда реактивное представление уже создано
        this.fetchData()
    },
    watch: {
        // в случае изменения маршрута запрашиваем данные вновь
        '$route': 'fetchData'
    },
    methods: {
        fetchData(){
            store.dispatch(FETCH_COMPANY,this.$route.params.companyId);
        },
    }
};
</script>

<style lang="scss">

    table.company {
        width: 1000px;
    }

</style>