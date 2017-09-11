<template>
    <tr class="companyPosts" >
        <td>
            <span v-if="post.id"><i class="fa fa-comment-o" aria-hidden="true"></i>{{ post.id }}</span>
            <span v-else><i class="fa fa-comments-o" aria-hidden="true"></i></span>
        </td>
        <td colspan="2">
            <span>{{ post.created }}</span>
        </td>
        <td :colspan="years.length-1">
            <div v-if="model">
                <textarea cols="110" rows="1" v-model="model.text" @dblclick="toggleEditMode()"></textarea>
            </div>
            <div v-else @dblclick="toggleEditMode()">{{ post.text }}</div>
        </td>
        <td>
            <span v-if="model" >
                <button @click="updatePost()">Save</button>
            </span>
            <span v-else>
                <span @click="toggleEditMode()"><i class="fa fa-pencil" aria-hidden="true"></i></span>
                <span @click="toggleAddMode()"><i class="fa fa-plus" aria-hidden="true"></i></span>
            </span>


        </td>
    </tr>
</template>

<script>
    import { UPDATE_POST,CREATE_POST } from 'actions/types';
    export default {
        name:'company-post-row',
        props: ['post','years','rows','first'],
        data () {
            return {
                model: this.post.id ? null : Object.assign({},this.post)
            }
        },
        methods:{
            toggleEditMode() {
                this.model = this.model ? null :  Object.assign({},this.post);
            },
            toggleAddMode() {
                this.$emit('add-post');
            },
            updatePost() {
                if (!this.model || !this.model.text)  return;

                if(this.model.id) {
                    this.$store.dispatch(UPDATE_POST, this.model);
                } else {
                    this.$store.dispatch(CREATE_POST, this.model);
                    this.model = null;
                }

            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "../../assets/style.scss";
    .companyPosts {
        font: $table_base_fonts;
    }

</style>