<template>
    <section class="main">
        <div is="alert-loader" :loading="loading"></div>

        <h2>{{ company.name }}</h2>
        <table class="company">
            <caption> Информация о компании </caption>
            <thead>
                <companies-header-row title="Индикатор" :years="company.years"></companies-header-row>
            </thead>
            <tbody>
                <template v-for="indicator in company.indicators">
                    <indicator-diagram-row v-if="indicator.digit && indicator.expanded" @name-click="toggle(indicator)"
                                           :indicator="indicator" :years="company.years"></indicator-diagram-row>
                    <indicator-row :indicator="indicator" :selected="indicator.expanded" :years="company.years" @name-click="toggle(indicator)"></indicator-row>
                </template>
            </tbody>
        </table>
    </section>
</template>


<script>
import { FETCH_COMPANY } from 'actions/types';
import { TOGGLE } from '../store/types';

export default {
    name: 'companies-page',
    computed: {
        company(){
            return this.$store.state.companies.model;
        },
        loading(){
            return this.$store.state.loading.companies;
        }
    },
    beforeRouteUpdate (to, from, next) {
        console.log('Companies page');
    //   // обработка изменений параметров пути...
    //   // не забудьте вызывать
        next();
    },
    created () {
        // запрашиваем данные когда реактивное представление уже создано
        this.fetchCompany(this.$route.params.companyId);
    },
    watch: {
        // в случае изменения маршрута запрашиваем данные вновь
        '$route'(to) {
            this.fetchCompany(to.params.companyId);
        }
    },
    methods: {
        fetchCompany(companyId){
            this.$store.dispatch(FETCH_COMPANY,companyId);
        },
        toggle(entity){
            this.$store.commit(TOGGLE,entity);
        }
    }
};
</script>

<style lang="scss">

    table.company {
        width: 1000px;
    }

</style>