<template>
    <tr class="indicatorValues">
        <td class="indicatorValues__num"nowrap>
            <a @click="nameClick()" :class="{ selected }">{{ indicator.id }}</a>
        </td>
        <td class="indicatorValues__name" colspan="2" nowrap>
            <a @click="nameClick()" :class="{ selected }">{{ indicator.name }}</a>
            <span class="unit">({{ unit }})</span>
            <span class="weight positive" v-if="indicator.weight>0">{{ indicator.weight | decision }}</span>
            <span class="weight negative" v-else-if="indicator.weight<0" >{{ indicator.weight | decision }}</span>
        </td>
        <indicator-value  class="indicatorValues__value"  v-for="year in years" :key="year" :value="indicator.years[year]"
                              :selected="selected" :digit="indicator.digit" :last="year == years[years.length - 1]"></indicator-value>
    </tr>
</template>

<script>
    import IndicatorValue from './IndicatorValue.vue'
    export default {
        name:'indicator-row',
        components: {
            IndicatorValue
        },
        props: ['indicator','years', 'selected'],
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
    @import "../../assets/style.scss";

    .indicatorValues {
        &__num{
            width: 20px;
            background-color: #eeeeee;
            font: bold 11px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
        }
        &__name {
            .unit{
                color: #bbb5b5;
            }
            .weight {
                font-size: 7px;
                color: #4f6b72;
            }
            .positive{
                background-color: $positive_background;
                white-space: nowrap
            }
            //
            .negative{
                background-color: $negative_background;
                white-space: nowrap
                /*background-color: #fce9e3;*/
            }
        }
        &__value {
            .empty{
              background-color: $empty_background;
            }
            //
            .positive{
              background-color: $positive_background;
              white-space: nowrap
            }
            //
            .negative{
              background-color: $negative_background;
              white-space: nowrap
              /*background-color: #fce9e3;*/
            }
            //
            .zero{
              background-color: $zero_background;
            }
        }
        
    }


</style>