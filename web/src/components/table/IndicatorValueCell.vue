<template>
    <td nowrap :class="{ empty, digit, negative, zero }">
    <span>{{ value }}</span>
</td>
</template>

<script>
export default {
    name:'indicator-value-cell',
    props: ['value','digit','last'],
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
