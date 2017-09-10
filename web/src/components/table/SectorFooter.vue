<template>
    <tbody class="sectorFooter">
        <tr>
            <td :colspan="years.length+3" @click="collapseSector">
                <div class="links">{{ sector.name }}</div>
            </td>
        </tr>
    </tbody>
</template>

<script>
export default {
    name:'sector-footer',
    props: ['sector','years'],
    methods: {
        collapseSector: function () {
            this.$emit('collapse')
        }
    },
}
</script>