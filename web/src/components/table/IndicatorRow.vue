<template>
    <tr class="company_indicator">
        <td class="indicator_name" colspan="3" nowrap>
            <a @click="nameClick()" :class="{ selected:indicator.diagram }">{{ indicator.id }} - {{ indicator.name }}</a>
            <span class="unit">({{ unit }})</span>
            <span class="weight positive" v-if="indicator.weight>0">{{ indicator.weight }}</span>
            <span class="weight negative" v-else-if="indicator.weight<0" >{{ indicator.weight }}</span>
        </td>
        <indicator-value-cell  v-for="year in years" :key="year" :value="indicator.years[year]"
                              :selected="indicator.diagram" :digit="indicator.digit" :last="year == years[years.length - 1]"></indicator-value-cell>
    </tr>
</template>

<script>
    import IndicatorValueCell from './IndicatorValueCell.vue'
    export default {
        name:'indicator-row',
        props: ['indicator','years'],
        components: {
            IndicatorValueCell
        },
        computed: {
            unit(){
                return this.indicator.quantity || '' + this.indicator.unit;
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

    .indicator_name {
        .unit{
            color: #bbb5b5;
        }
        .weight {
            font-size: 7px;
            color: #4f6b72;
        }
    }

</style>