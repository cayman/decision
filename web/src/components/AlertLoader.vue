<template>
    <img :src="icon" v-show="loading">
</template>

<script>
export default {
    name:'alert-loader',
    props: ['loading'],
    data(){
        return{
            icon:'dist/image/ajax-loader.gif'
        }
    },
}
</script>


<style>

</style>