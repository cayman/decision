<template>
    <pre v-if="error">{{error}}</pre>
</template>

<script>
export default {
    name:'alert-error',
    props: ['error'],
}
</script>