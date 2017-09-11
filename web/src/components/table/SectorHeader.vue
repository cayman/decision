<template>
    <tbody class="sectorHeader">
        <tr>
            <th :colspan="years.length+3" class="sectorHeader__caption">
                <span class="sectorHeader__name" @click="nameClick()">{{ sector.name }}
                    <i class="fa fa-compress" aria-hidden="true" v-if="sector.expanded"></i>
                    <i class="fa fa-expand" aria-hidden="true" v-else></i>
                </span>
                <span class="sectorHeader__length">({{ sector.companies.length }})</span>
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

<style rel="stylesheet/scss" lang="scss">
    @import "../../assets/style.scss";
    .sectorHeader {
        &__caption{
            width: $col_name_width;
            background-color: $caption_color;
            font: 12px $table_fonts;
            text-transform: uppercase;
            text-align: left;
        }

        &__name{
            font-weight: bold;
        }

        &__length{
        }
    }

</style>