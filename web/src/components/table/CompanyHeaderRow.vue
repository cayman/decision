<template>
    <tr class="company_header">
        <td class="caption_num">
            <router-link :to="{ name: 'company', params: { companyId: company.id }}">{{ company.id }}</router-link>
        </td>
        <td class="caption" :colspan="years.length+2">
            <span @click="nameClick()">{{ company.name }}</span>
            <span v-if="company.weight>0" class="weight positive">{{ company.weight | decision }}</span>
            <span v-else-if="company.weight<0" class="weight negative">{{ company.weight | decision }}</span>

            <div class="company_buttons"  align="right">
                <company-instruments class="instruments" :company="company"></company-instruments>
                <span> </span>
                <company-links  :company="company"></company-links>

            </div>
        </td>
    </tr>
</template>

<script>
import CompanyLinks from '../links/CompanyLinks.vue'
import CompanyInstruments from '../instruments/CompanyInstruments.vue'

export default {
    name:'company-header-row',
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
    .company_header {
        .caption_num{
            width: 20px;
            background-color: #eeeeee;
            font: bold 11px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
        }
        .company_buttons{
            float:right;
            text-align: right;
        }

        td.caption {
            font: bold 11px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
            background-color: #eeeeee;

            a {
                color: #26405d;
            }
        }
    }


</style>