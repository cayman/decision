<template>
    <tr class="company_header">
        <td class="caption" :colspan="years.length+1">
            <span>{{ company.id }}</span>
            <router-link :to="{ name: 'company', params: { companyId: company.id }}">{{ company.name }}</router-link>
            <span v-if="company.weight>0" class="weight positive">{{ company.weight }}</span>
            <span v-else-if="company.weight<0" class="weight negative">{{ company.weight }}</span>

            <company-links :company="company"></company-links>

        </td>
    </tr>
</template>

<script>
import CompaniesLinks from '../CompanyLinks.vue'

export default {
    name:'company-header-row',
    components: {
        CompaniesLinks
    },
    props: ['company','years']
}
</script>


<style>
    /*.company_header {*/
        .links{

            float:right;width:50%;
            text-align: right;
        }
    /*}*/
</style>