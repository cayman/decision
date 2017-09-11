<template>
    <section class="main">
        <div is="alert-loader" :loading="loading"></div>

        <h2>{{ company.name }}</h2>
        <table class="company">
            <caption> Информация о компании</caption>
            <companies-header title="Индикатор" :years="company.years"></companies-header>
            <company-indicators :company="company" :years="company.years"></company-indicators>
            <company-posts :company="company" :years="company.years"></company-posts>
        </table>
    </section>
</template>


<script>
    import {FETCH_COMPANY} from 'actions/types';
    import {TOGGLE} from 'store/types';

    import CompaniesHeader from 'components/table/CompaniesHeader.vue';
    import CompanyHeader from 'components/table/CompanyHeader.vue';
    import CompanyIndicators from 'components/table/CompanyIndicators.vue';
    import CompanyPosts from 'components/table/CompanyPosts.vue';

    export default {
        name: 'companies-page',
        components: {
            CompaniesHeader, CompanyHeader, CompanyIndicators, CompanyPosts
        },
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
                this.$store.dispatch(FETCH_COMPANY, companyId);
            },
            toggle(entity){
                this.$store.commit(TOGGLE, entity);
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">

    @import "../assets/style.scss";
    table.company {
        width: 1000px;
        tr {
            td, th {
                border-right: 1px solid $border_color;
                border-bottom: 1px solid $border_color;
                padding: 3px 2px 3px 2px;
            }
        }

    }

</style>