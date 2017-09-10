<template>
    <tbody class="sectorHeader">
        <tr>
            <th :colspan="years.length+3" >
                <span @click="nameClick()">{{ sector.name }} ({{ sector.companies.length }})</span>
            </th>
        </tr>
    </tbody>
</template>

<script>
export default {
    name:'sector-header',
    props: ['sector','years'],
    methods: {
        nameClick: function () {
            console.log('nameClick',this.sector.name);
            this.$emit('name-click',this.sector);
        }
    },
}
</script>