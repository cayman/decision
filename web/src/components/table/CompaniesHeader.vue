<template>
    <thead class="companiesHeader">
        <tr>
            <td colspan="3" class="companiesHeader__name" >{{ title }}</td>
            <td v-for="year in years" class="companiesHeader__year">{{ year }}</td>
        </tr>
    </thead>
</template>

<script>
export default {
    name:'companies-header',
    props: ['title','years']
}
</script>


<style rel="stylesheet/scss" lang="scss">

    @import "../../assets/style.scss";

    .companiesHeader {
        font: bold $table_base_fonts;

        &__name{
            background-color: $caption_color3;
            width: calc(#{$col_num_width} + #{$col_name_width});
        }
        &__year{
            background-color: $caption_color3;
        }

        tr {
            td:nth-child(1) {
                //width: ($col1-width + $col2-width + $col3-width);
            }
        }
    }


</style>