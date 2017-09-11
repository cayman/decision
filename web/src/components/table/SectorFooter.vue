<template>
    <tbody class="sectorFooter">
        <tr>
            <td class="sectorFooter__caption" :colspan="years.length+3" @click="collapseSector">
                <div class="sectorFooter__name">
                    {{ sector.name }}
                    <i class="fa fa-compress" aria-hidden="true" v-if="sector.expanded"></i>
                    <i class="fa fa-expand" aria-hidden="true" v-else></i>
                </div>
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


<style rel="stylesheet/scss" lang="scss">
    @import "../../assets/style.scss";
    .sectorFooter {
        &__caption{
            background-color: $caption_color3;
            font: 12px $table_fonts;
            text-transform: uppercase;
            text-align: right;
        }

        &__name{
        }

    }

</style>