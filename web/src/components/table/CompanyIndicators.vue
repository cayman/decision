<template>
    <tbody>
        <template v-for="indicator in company.indicators">
            <indicator-diagram v-if="indicator.digit && indicator.expanded" @name-click="toggle(indicator)"
                                   :indicator="indicator" :years="years"></indicator-diagram>
            <indicator-values :indicator="indicator" :selected="indicator.expanded" :years="years" @name-click="toggle(indicator)"></indicator-values>
        </template>
    </tbody>
</template>

<script>
    import {  TOGGLE  } from 'store/types';
    import IndicatorValues from 'components/indicators/IndicatorValues.vue';
    import IndicatorDiagram from 'components/indicators/IndicatorDiagram.vue';

    export default {
        name: 'company-indicators',
        components: {
            IndicatorDiagram, IndicatorValues
        },
        props: ['company','years'],
        computed: {
        },
        created () {
        },
        methods: {
            toggle(entity){
                this.$store.commit(TOGGLE,entity);
            }
        }
    };
</script>


<style rel="stylesheet/scss" lang="scss">


</style>