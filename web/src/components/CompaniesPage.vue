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
                <template v-if="sector.expanded">
                    <tbody v-for="company in sector.companies">
                        <company-header-row :company="company" :years="years"></company-header-row>
                        <template v-for="indicator in company.indicators">
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
            </template>
        </table>
    </section>
</template>

<script>
import { mapGetters, mapMutations, mapActions} from 'vuex';
import { FETCH_COMPANIES } from '../actions';
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
    computed: {
        ...mapGetters(['sectors','companies','years']),
        loading(){
            return this.$store.state.loading.companies;
        },
    },
    created () {
        // запрашиваем данные когда реактивное представление уже создано
        this[FETCH_COMPANIES]();
    },
    watch: {
        // в случае изменения маршрута запрашиваем данные вновь
        '$route': FETCH_COMPANIES
    },
    beforeRouteUpdate (to, from, next) {
         console.log('Company page');
         //   // обработка изменений параметров пути...
         //   // не забудьте вызывать
         next();
    },
    methods: {
        ...mapActions([FETCH_COMPANIES]),
        ...mapMutations(['toggle']),

    }
};
</script>


<style rel="stylesheet/scss" lang="scss">

    table.companies {
        width: 1000px;
    }

</style>