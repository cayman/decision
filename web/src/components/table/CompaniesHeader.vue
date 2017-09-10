<template>
    <thead class="companiesHeader">
        <tr>
            <td colspan="3" class="companiesHeade__name" >{{ title }}</td>
            <td v-for="year in years" class="companiesHeade__year">{{ year }}</td>
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
        &__name{
            background-color: #eeeeee;
        }
        &__year{
            background-color: #eeeeee;
        }

        tr {
            td:nth-child(1) {
                width: ($col1-width + $col2-width + $col3-width);
            }
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