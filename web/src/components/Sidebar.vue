<template>
    <aside class="sidebar">
        <ul>
            <li><router-link :to="'companies'">Компании</router-link></li>
            <template v-for="sector in sectors.list">
                <li><router-link :to="{ name: 'companies', query: { sector: sector.id }}">{{ sector.name }}</router-link></li>
            </template>
        </ul>
    </aside>
</template>

<script>
import sharedStore from '../store.js';
export default {
    name: 'sidebar',
    data () {
        return {
            sectors:sharedStore.sectors,
        }
    },
    created () {
        // запрашиваем данные когда реактивное представление уже создано
    },
    watch: {
        // в случае изменения маршрута запрашиваем данные вновь
    },
    // beforeRouteUpdate (to, from, next) {
    //   // обработка изменений параметров пути...
    //   // не забудьте вызывать next()
    // }
    methods: {
    }
};
</script>