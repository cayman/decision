<template>
    <tbody>
        <company-post-row v-if="model" :years="years" :post="model" :rows="posts.length" :first="!!model" ></company-post-row>
        <company-post-row v-for="(post, index) in posts" :key="post.id":years="years" :post="post" :first="!model && index===0"
                          @add-post="toggleAppendMode"></company-post-row>
    </tbody>
</template>

<script>
    import CompanyPostRow from './CompanyPostRow.vue'
    export default {
        name:'company-posts-row',
        props: ['company','years'],
        components: {
            CompanyPostRow
        },
        data () {
            return {
                model: null
            }
        },
        computed: {
            posts(){
                return this.$store.getters.getPosts(this.company.id);
            }
        },
        methods:{
            toggleAppendMode() {
                this.model = this.model ? null : {companyId: this.company.id, userId: 1, id: null, text:null};
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

    .indicator_name {
        .unit{
            color: #bbb5b5;
        }
        .weight {
            font-size: 7px;
            color: #4f6b72;
        }
    }

</style>