<template>
    <tr class="sector_header">
        <th :colspan="years.length+1" @click="toggleSector">
            <span>{{ sector.id }}</span>
            - <span>{{ sector.name }} ({{ sector.companies.length }})</span>
        </th>
    </tr>
</template>

<script>
export default {
    name:'sector-header-row',
    props: ['sector','years'],
    methods: {
        toggleSector: function () {
            this.$emit('toggle')
        }
    },
}
</script>