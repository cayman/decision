<template>
    <section class="main">
        <div is="alert-loader" :loading="company.loading"></div>
        <div is="alert-error" :error="company.error"></div>

        <h2>{{ company.model.name }}</h2>
        <table class="company">
            <caption> Информация о компании </caption>
            <thead>
            <tr is="years-header-row" title="Индикатор" :years="company.model.years"></tr>
            </thead>
            <tbody>
            <tr is="indicator-row" v-for="indicator in company.model.indicators" :key="indicator.id" :indicator="indicator" :years="years"></tr>
            </tbody>
        </table>
    </section>
</template>


<script>
import { bus,vm } from '../main';

export default {
    name: 'companies-page',
    data () {
        return {
            company:vm.store.company,
            links:vm.store.links,
        }
    },
    // beforeRouteUpdate (to, from, next) {
    //   // обработка изменений параметров пути...
    //   // не забудьте вызывать next()
    // },
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
            bus.$emit('company:fetch');
        }
    }
};
</script>