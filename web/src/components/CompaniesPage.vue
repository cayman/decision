<template>
    <section class="main">
        <pre>{{ loading }}</pre>
        <div is="alert-loader" :loading="loading"></div>
        <!--<div is="alert-error" :error="error"></div>-->

        <!--<pre>{{ sectors }}</pre>-->

        <table class="companies">
            <caption>Список компаний</caption>
            <thead>
                <companies-header-row title="Название" :years="years"></companies-header-row>
            </thead>
            <template v-for="(sector,key) in sectors">
                <thead>
                    <sector-header-row :sector="sector" :years="years" @toggle="toggleSector(sector.id)"></sector-header-row>
                </thead>
                <tbody ng-show="expanded[sector.id]">
                    <template v-for="company in sector.companies">
                        <company-header-row :company="company" :years="years"></company-header-row>
                        <indicator-row v-for="indicator in company.indicators" :key="indicator.id"
                                       :indicator="indicator" :years="years"></indicator-row>
                    </template>
                    <sector-footer-row :sector="sector" :years="years"
                                       @collapse="collapseSector(sector.id)"></sector-footer-row>
                </tbody>
            </template>
        </table>
    </section>
</template>

<script>
import { FETCH_COMPANIES } from '../core/actions';
import store from '../core/store';
import AlertLoader from './AlertLoader.vue'
import AlertError from './AlertError.vue'
import CompaniesHeaderRow from './table/CompaniesHeaderRow.vue'
import SectorHeaderRow from './table/SectorHeaderRow.vue'
import CompanyHeaderRow from './table/CompanyHeaderRow.vue'
import IndicatorRow from './table/IndicatorRow.vue'
import SectorFooterRow from './table/SectorFooterRow.vue'


export default {
    name: 'companies-page',
    components: {
        AlertLoader, AlertError, CompaniesHeaderRow, CompanyHeaderRow, SectorHeaderRow, SectorFooterRow, IndicatorRow
    },
    data () {
        return {
            companies: store.state.companies,
            expanded:{}
        }
    },
    computed: {
        years(){
            return this.companies.years;
        },
        sectors(){
            return this.companies.sectors;
        },
        loading(){
            return this.companies.loading;
        },
        error(){
            return this.companies.error;
        }
    },
    created () {
        // запрашиваем данные когда реактивное представление уже создано
        this.fetchData()
    },
    watch: {
        // в случае изменения маршрута запрашиваем данные вновь
        '$route': 'fetchData'
    },
    beforeRouteUpdate (to, from, next) {
         console.log('Company page');
         //   // обработка изменений параметров пути...
         //   // не забудьте вызывать
         next();
    },
    methods: {
        fetchData(){
            store.dispatch(FETCH_COMPANIES);
        },
        toggleSector: function (id) {
            this.expanded[id] = ! this.expanded[id];
            console.log('sector:', id, this.expanded[id] ? 'expanded' : 'collapsed');
        },
        collapseSector: function (id) {
            this.expanded[id] = false;
            console.log('sector:', id, 'collapsed');
        }
    }
};
</script>


<style rel="stylesheet/scss" lang="scss">

    table.companies {
        width: 1000px;
    }

</style>