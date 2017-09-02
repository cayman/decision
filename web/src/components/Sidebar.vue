<template>
    <aside class="sidebar">
        <ul>
            <li><router-link :to="{ name:'companies'}">Компании</router-link></li>
            <template v-for="sector in sectors.list">
                <li><router-link :to="{ name: 'companies', query: { sector: sector.id }}">{{ sector.name }}</router-link></li>
            </template>
        </ul>
    </aside>
</template>

<script>
import { FETCH_SECTORS } from '../core/actions';
import store from '../core/store';

export default {
    name: 'sidebar',
    data () {
        return {
            sectors: store.state.sectors,
        }
    },
    created () {
        // запрашиваем данные когда реактивное представление уже создано
    },
    watch: {
        // в случае изменения маршрута запрашиваем данные вновь
    },
     beforeRouteUpdate (to, from, next) {
    //   // обработка изменений параметров пути...
        next();
     },
    created () {
        // запрашиваем данные когда реактивное представление уже создано
        this.fetchData()
    },
    methods: {
        fetchData(){
            store.dispatch(FETCH_SECTORS);
        },
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">

    .sidebar {
        flex: 1;
        border: 1px solid #eee;
    }


</style>
