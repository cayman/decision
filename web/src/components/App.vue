<template>
    <div id="app">
        <v-app>
            <v-navigation-drawer persistent clipped app v-model="drawer">
                <router-view name="sidebar"></router-view>
            </v-navigation-drawer>

            <v-toolbar class="blue darken-3" dark app clipped-left fixed>
                <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
                    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                    <router-link :to="{ name:'home'}">ResFin</router-link>
                </v-toolbar-title>
                <v-text-field solo prepend-icon="search" placeholder="Search"></v-text-field>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon>apps</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>notifications</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>contacts</v-icon>
                </v-btn>
            </v-toolbar>

            <main>
                <v-container>
                    <v-layout>
                        <v-flex xs12>
                            <router-view></router-view>
                        </v-flex>
                    </v-layout>
                </v-container>
            </main>
        </v-app>

        <notifications group="top" position="top right"/>

    </div>

</template>

<script>
    import {FETCH_LINKS, FETCH_INSTRUMENT_TYPES} from '../actions';

    export default {
        name: 'app',
        data: () => ({
            drawer: true,
        }),
        computed: {
            error(){
                return this.$store.state.messages.error;
            },
            info(){
                return this.$store.state.messages.info;
            },
            loading(){
                return this.$store.state.loading.companies;
            },
        },
        created () {
            // запрашиваем данные когда реактивное представление уже создано
            this.fetchData()
        },
        watch: {
            // в случае изменения маршрута запрашиваем данные вновь
            '$route': 'fetchData',
            'error': function (error) {
                if (error) this.notify(error,'error');
            },
            'info': function (info) {
                if (info) this.notify(info,'info');
            }
        },
        methods: {
            toggleSidenav() {
                this.$refs.sidenav.toggle();
            },
            notify({title,text},type='error'){
                this.$notify({ group: 'top', duration: -1,
                    title,
                    text,
                    type
                })
            },
            fetchData(){
                this.$store.dispatch(FETCH_LINKS);
                this.$store.dispatch(FETCH_INSTRUMENT_TYPES);
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

    @import "../assets/style.scss";


</style>
