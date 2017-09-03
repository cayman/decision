<template>
    <tr class="sector_header">
        <th :colspan="years.length+1" >
            <span>{{ sector.id }}</span>
            - <span @click="nameClick()">{{ sector.name }} - {{ sector.expanded }}({{ sector.companies.length }})</span>
        </th>
    </tr>
</template>

<script>
export default {
    name:'sector-header-row',
    props: ['sector','years'],
    methods: {
        nameClick: function () {
            console.log('nameClick',this.sector.name);
            this.$emit('name-click',this.sector);
        }
    },
}
</script>