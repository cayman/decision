<template>
    <tr class="companies_header">
        <td colspan="3" class="caption">{{ title }}</td>
        <td v-for="year in years">{{ year }}</td>
    </tr>
</template>

<script>
export default {
    name:'companies-header-row',
    props: ['title','years']
}
</script>


<style rel="stylesheet/scss" lang="scss">
    .companies_header {
        .caption{
            width: 150px;
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