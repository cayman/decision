<template>
    <span>
        <img :src="link.icon | icon" height="12px" width="12px" @dblclick="toggleEditMode()">
        <span v-if="model">
            <input  type="text" size="6" v-model.number.trim="model.id"
                    @keyup.enter="updateCompanyLink()" @dblclick="openSearchLink(model.id)"/>
            <button @click="updateCompanyLink()">Save</button>
        </span>
        <a v-else :href="companyUrl" :target="target">
            {{ link.name }}
        </a>
    </span>
</template>

<script>
import { mapGetters } from 'vuex';
import { UPDATE_COMPANY_LINK } from '../actions';
import {  composeUrl } from '../actions/utils';

export default {
    name: 'company-link',
    props: ['companyLink', 'companyName', 'target'],
    data () {
        return {
            model:null
        }
    },
    computed:{
        ...mapGetters(['urls','getLink']),
        link(){
            return this.getLink(this.companyLink.linkId);
        },
        companyUrl(){
            return composeUrl(this.link.companyUrl,this.companyLink.id);
        }
    },
    methods: {
        openSearchLink(input) {
            const url = composeUrl(this.link.searchUrl, input || this.companyName);
            window.open(url, '_search');
        },
        toggleEditMode: function () {
            this.model = this.model ? null : { ...this.companyLink};
        },
        updateCompanyLink:function () {
            this.$store.dispatch(UPDATE_COMPANY_LINK, this.model);
            this.model = null;
        }

    }
}
</script>