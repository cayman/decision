<template>
    <tr class="company_header">
        <td class="caption" :colspan="years.length+3">
            <span>{{ company.id }}</span>
            <router-link :to="{ name: 'company', params: { companyId: company.id }}">{{ company.name }}</router-link>
            <span v-if="company.weight>0" class="weight positive">{{ company.weight }}</span>
            <span v-else-if="company.weight<0" class="weight negative">{{ company.weight }}</span>

            <div class="company_buttons"  align="right">
                <company-instruments class="instruments" :company="company"></company-instruments>
                <span> </span>
                <company-links  :company="company"></company-links>

            </div>
        </td>
    </tr>
</template>

<script>
import CompanyLinks from '../CompanyLinks.vue'
import CompanyInstruments from '../CompanyInstruments.vue'

export default {
    name:'company-header-row',
    components: {
        CompanyLinks,CompanyInstruments
    },
    props: ['company','years']
}
</script>


<style rel="stylesheet/scss" lang="scss">
    .company_header {
        .company_buttons{
            float:right;
            text-align: right;
        }
    }
    td.caption {
        font: bold 11px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
        background-color: #eeeeee;

        a {
            color: #26405d;
        }
    }

</style>