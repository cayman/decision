<template>
    <tr class="sector_footer">
        <td :colspan="years.length+3" @click="collapseSector">
            <div class="links">{{ sector.name }}</div>
        </td>
    </tr>
</template>

<script>
export default {
    name:'sector-footer-row',
    props: ['sector','years'],
    methods: {
        collapseSector: function () {
            this.$emit('collapse')
        }
    },
}
</script>