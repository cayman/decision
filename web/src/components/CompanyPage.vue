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
                <template v-for="indicator in company.indicators">
                    <indicator-diagram-row v-if="indicator.digit && indicator.expanded" @name-click="toggleDiagram(indicator)"
                                           :indicator="indicator" :years="company.years"></indicator-diagram-row>
                    <indicator-row :indicator="indicator" :selected="indicator.expanded" :years="company.years" @name-click="toggleDiagram(indicator)"></indicator-row>
                </template>
            </tbody>
        </table>
    </section>
</template>


<script>
import { mapGetters, mapActions} from 'vuex';
import { FETCH_COMPANY } from '../actions';
import AlertLoader from './AlertLoader.vue'
import AlertError from './AlertError.vue'
import CompaniesHeaderRow from './table/CompaniesHeaderRow.vue'
import IndicatorRow from './table/IndicatorRow.vue'
import IndicatorDiagramRow from './table/IndicatorDiagramRow.vue'

export default {
    name: 'companies-page',
    components: {
        AlertLoader, AlertError, CompaniesHeaderRow, IndicatorRow, IndicatorDiagramRow
    },
    computed: {
        ...mapGetters(['company']),
        loading(){
            return this.$store.state.loading.companies;
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
        this[FETCH_COMPANY](this.$route.params.companyId);
    },
    watch: {
        // в случае изменения маршрута запрашиваем данные вновь
        '$route'(to) {
            this[FETCH_COMPANY](to.params.companyId);
        }
    },
    methods: {
        ...mapActions([FETCH_COMPANY]),
    }
};
</script>

<style lang="scss">

    table.company {
        width: 1000px;
    }

</style>