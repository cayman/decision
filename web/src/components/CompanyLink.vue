<template>
    <span>
        <img :src="icon" height="12px" width="12px" @dblclick="toggleEdit()">
        <span v-if="model">
            <input  type="text" size="6" v-model.number.trim="model.id"
                    @keyup.enter="updateLink()" @dblclick="openWindow()"/>
            <button @click="updateLink()">Save</button>
        </span>
        <a v-else :href="companyUrl" target="target">
            {{ link.name }}
        </a>
    </span>
</template>

<script>
import {UPDATE_COMPANY_LINK} from '../core/actions';
import store from '../core/store';

export default {
    name: 'company-link',
    props: ['link', 'companyLink', 'companyName', 'target'],
    data () {
        return {
            model:null,
    }
    },
    computed:{
        icon:function(){
            return 'icon/'+this.link.icon;
        },
        companyUrl:function(){
            return this.link.companyUrl + this.companyLink.id;
        },
        searchUrl:function(){
            return this.link.searchUrl + this.companyName;
        }
    },
    methods: {
        toggleEdit: function () {
            this.model = this.model ? null : Object.assign({},this.companyLink);
        },
        openWindow: function () {
            console.log('openWindow:', this.searchUrl);
            window.open(this.searchUrl, '_search');
        },
        updateLink:function () {
            store.dispatch(UPDATE_COMPANY_LINK, this.model);
            this.model = null;
        },

    }
}
</script>