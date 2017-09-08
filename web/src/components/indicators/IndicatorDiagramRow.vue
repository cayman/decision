<template>
    <tr class="indicator_diagram">
        <td class="indicator_name"  colspan="2">
            <a @click="nameClick">
                {{ indicator.name }}
            </a>

            <div>top:{{ top }}</div>
            <div>max{{ maxValue }}</div>
            <div>min{{ minValue }}</div>
            <div>bottom:{{ bottom }}</div>
            <div>point:{{ point }}</div>
        </td>
        <indicator-svg  :top="top" :max="maxValue" min="minValue":bottom="bottom" :point="point"></indicator-svg>
        <indicator-svg-cell  v-for="year in years" :key="year" :value="indicator.years[year]" :top="top/point" :bottom="bottom/point" :point="point"></indicator-svg-cell>
    </tr>
</template>

<script>
import IndicatorSvgCell from './IndicatorSvgCell.vue'
import IndicatorSvg from './IndicatorSvg.vue'
export default {
    name:'indicator-diagram-row',
    props: ['indicator','years'],
    data () {
        const reduce = (values, method) => Object.keys(values)
                .reduce((aggr,key)=>aggr === null ? values[key] : method(aggr,values[key]),null);

        return {
            maxValue: reduce(this.indicator.years, (maxValue,value) => value > maxValue? value : maxValue),
            minValue: reduce(this.indicator.years, (minValue,value) => value < minValue? value : minValue),
        }
    },
    components: {
        IndicatorSvgCell, IndicatorSvg
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

    .indicator_diagram {
        text-align: center;
    }

</style>