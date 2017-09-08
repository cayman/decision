<template>
    <tr class="company_posts" >
        <td>
            <span v-if="post.id">{{ post.id }}</span>
            <span v-else> Блог </span>
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
                <span @click="toggleEditMode()">E</span>
                <span @click="toggleAddMode()">A</span>
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