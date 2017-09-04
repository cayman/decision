<template>
    <tr class="years_header">
        <td colspan="3">{{ title }}</td>
        <td v-for="year in years">{{ year }}</td>
    </tr>
</template>

<script>
export default {
    name:'companies-header-row',
    props: ['title','years']
}
</script>