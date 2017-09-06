<template>
    <aside class="sidebar">
        <ul>
            <li><router-link :to="{ name:'companies'}">Компании</router-link></li>
            <template v-for="sector in allSectors">
                <li><router-link :to="{ name: 'companies', query: { sector: sector.id }}">{{ sector.name }}</router-link></li>
            </template>
        </ul>
    </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { FETCH_SECTORS } from '../actions';

export default {
    name: 'sidebar',
    computed:{
        ...mapGetters(['allSectors'])
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
        this.fetchSectors()
    },
    methods: {
        ...mapActions([FETCH_SECTORS])
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">

    .sidebar {
        flex: 1;
        border: 1px solid #eee;
    }


</style>
