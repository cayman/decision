<template>
    <tr class="indicatorDiagram">
        <td class="indicatorDiagram__name"  colspan="2">
            <a @click="nameClick">
                {{ indicator.name }}
            </a>

            <div>top:{{ top }}</div>
            <div>max{{ maxValue }}</div>
            <div>min{{ minValue }}</div>
            <div>bottom:{{ bottom }}</div>
            <div>point:{{ point }}</div>
        </td>
        <td class="indicatorDiagram__axis">
            <indicator-diagram-axis  :top="top" :max="maxValue" min="minValue":bottom="bottom" :point="point"></indicator-diagram-axis>
        </td>
        <td class="indicatorDiagram__value">
            <indicator-diagram-value  v-for="year in years" :key="year" :value="indicator.years[year]" :top="top/point" :bottom="bottom/point" :point="point"></indicator-diagram-value>
        </td>
    </tr>
</template>

<script>
import IndicatorDiagramAxis from './IndicatorDiagramAxis.vue'
import IndicatorDiagramValue from './IndicatorDiagramValue.vue'
export default {
    name:'indicator-diagram',
    components: {
        IndicatorDiagramValue, IndicatorDiagramAxis
    },
    props: ['indicator','years'],
    data () {
        const reduce = (values, method) => Object.keys(values)
                .reduce((aggr,key)=>aggr === null ? values[key] : method(aggr,values[key]),null);

        return {
            maxValue: reduce(this.indicator.years, (maxValue,value) => value > maxValue? value : maxValue),
            minValue: reduce(this.indicator.years, (minValue,value) => value < minValue? value : minValue),
        }
    },

    computed: {
        top(){
            return this.maxValue > 0 ? this.maxValue : 0;
        },
        bottom(){
            return this.minValue < 0 ? this.minValue : 0;
        },
        point(){
            return (this.top - this.bottom)/100;
        }
    },
    methods:{
        nameClick(){
            this.$emit('name-click',this.indicator);
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">

    .indicatorDiagram {
        text-align: center;

        &__name {}
        &__axis {}
        &__value {}


    }

</style>