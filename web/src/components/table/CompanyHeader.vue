<template>
    <tbody>
        <tr class="companyHeader">
            <td class="companyHeader__num">
                <router-link :to="{ name: 'company', params: { companyId: company.id }}">{{ company.id }}</router-link>
            </td>
            <td class="companyHeader_caption" :colspan="years.length+2">
                <div class="companyHeader_name">
                    <span @click="nameClick()" >{{ company.name }}</span>
                    <span v-if="company.weight>0" class="weight positive">{{ company.weight | decision }}</span>
                    <span v-else-if="company.weight<0" class="weight negative">{{ company.weight | decision }}</span>
                </div>
                <div class="companyHeader__menu">
                    <company-instruments class="instruments" :company="company"></company-instruments>
                    <span> </span>
                    <company-links  :company="company"></company-links>
                </div>
            </td>
        </tr>
    </tbody>
</template>

<script>
    import CompanyLinks from '../links/CompanyLinks.vue'
    import CompanyInstruments from '../instruments/CompanyInstruments.vue'

    export default {
        name:'company-header',
        components: {
            CompanyLinks,CompanyInstruments
        },
        props: ['company','years'],
        methods: {
            nameClick: function () {
                console.log('nameClick',this.company.name);
                this.$emit('name-click',this.company);
            }
        },
    }
</script>


<style rel="stylesheet/scss" lang="scss">

    @import "../../assets/style.scss";

    .companyHeader {

        tr {
            td:nth-child(1) {
                width: $col1-width;
            }
        }

        &__num{
            width: 20px;
            background-color: #eeeeee;
            font: bold 11px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
        }
        &__caption {
            font: bold 11px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
            background-color: #eeeeee;

            a {
                color: #26405d;
            }
        }
        &__name{
            float:left;
            text-align: left;
        }
        &__menu{
            float:right;
            text-align: right;
        }

    }


</style>