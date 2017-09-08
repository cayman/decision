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
                    <sector-header-row :sector="sector" :years="years" @name-click="toggle(sector)"></sector-header-row>
                </thead>
                <tbody v-for="company in sector.companies">
                    <company-header-row :company="company" :years="years" @name-click="toggle(company)"></company-header-row>
                    <template v-if="sector.expanded || company.expanded" v-for="indicator in company.indicators">
                        <indicator-diagram-row v-if="indicator.digit && indicator.expanded" @name-click="toggle(indicator)"
                                               :indicator="indicator" :years="years"></indicator-diagram-row>
                        <indicator-row :indicator="indicator" :selected="indicator.expanded" :years="years" @name-click="toggle(indicator)"></indicator-row>
                    </template>
                </tbody>
                <tfoot>
                    <sector-footer-row :sector="sector" :years="years"
                                   @collapse="toggle(sector)"></sector-footer-row>
                </tfoot>
            </template>
        </table>
    </section>
</template>

<script>
import { FETCH_COMPANIES } from '../actions';
import {  TOGGLE  } from '../store/types';
import SectorHeaderRow from './sectors/SectorHeaderRow.vue';
import SectorFooterRow from './sectors/SectorFooterRow.vue';

export default {
    name: 'companies-page',
    components: {
        SectorHeaderRow, SectorFooterRow
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
            this.$store.commit(TOGGLE,entity);
        }
    }
};
</script>


<style rel="stylesheet/scss" lang="scss">

    table.companies {
        width: 1000px;

        tr {
            td:nth-child(1){
                width: 20px;
            }
            td:nth-child(2){
                width: 100px;
            }
            td:nth-child(3){
                width: 20px;
            }
        }

    }

</style>