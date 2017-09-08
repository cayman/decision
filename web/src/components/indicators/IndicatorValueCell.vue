<template>
    <td :class="{ empty, digit, negative, zero, selected }">
        <span>{{ value }}</span>
    </td>
</template>

<script>
export default {
    name:'indicator-value-cell',
    props: ['value','digit','last','selected'],
    computed: {
        empty(){
            return !this.value && this.last;
        },
        negative(){
            return this.digit && this.value<0;
        },
        zero(){

        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">


</style>