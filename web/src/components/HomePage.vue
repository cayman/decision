<template>
    <section class="main">

        <h1>Добро пожаловать</h1>

    </section>
</template>

<script>
import { FETCH_SECTORS } from '../actions';

export default {
    name: 'home-page',
    data () {
        return {
            intra:'Добро пожаловать',
        }
    },
    beforeRouteUpdate (to, from, next) {
        console.log('Home page');
        //   // обработка изменений параметров пути...
        //   // не забудьте вызывать
        next();
    },
    created () {
        // запрашиваем данные когда реактивное представление уже создано
        this.fetchData()
    },
    methods: {
        fetchData(){
            this.$store.dispatch(FETCH_SECTORS);
        },
    }
};
</script>