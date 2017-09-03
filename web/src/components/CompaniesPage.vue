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
                    <sector-header-row :sector="sector" :years="years" @name-click="toggleSector(sector)"></sector-header-row>
                </thead>
                <template v-if="sector.expanded">
                    <tbody v-for="company in sector.companies">
                        <company-header-row :company="company" :years="years"></company-header-row>
                        <template v-for="indicator in company.indicators">
                            <indicator-diagram-row v-if="indicator.digit && indicator.diagram" @name-click="toggleDiagram(indicator)"
                                                   :indicator="indicator" :years="years"></indicator-diagram-row>
                            <indicator-row :indicator="indicator" :years="years" @name-click="toggleDiagram(indicator)"></indicator-row>
                        </template>
                    </tbody>
                    <tfoot>
                        <sector-footer-row :sector="sector" :years="years"
                                       @collapse="toggleSector(sector)"></sector-footer-row>
                    </tfoot>
                </template>
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
import IndicatorDiagramRow from './table/IndicatorDiagramRow.vue'


export default {
    name: 'companies-page',
    components: {
        AlertLoader, AlertError, CompaniesHeaderRow, CompanyHeaderRow, SectorHeaderRow, SectorFooterRow, IndicatorRow,IndicatorDiagramRow
    },
    data () {
        return {
            companies: store.state.companies,
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
        toggleDiagram: function (indicator) {
            this.$set(indicator,'diagram',!indicator.diagram);
            console.log('diagram:', indicator.id, 'expanded',indicator.diagram);
        },
        toggleSector: function (sector) {
            this.$set(sector,'expanded',!sector.expanded);
            console.log('sector:', sector.id, 'expanded', sector.expanded );
        }
    }
};
</script>


<style rel="stylesheet/scss" lang="scss">

    table.companies {
        width: 1000px;
    }

</style>