<template>
    <span class="links">
        <!--add new link form-->
        <span v-if="model">
            <select v-model="selectedLink">
                <option v-for="link0 in allowedLinks" :value="link0">{{ link0.name }}</option>
            </select>
            <input type="text" size="6" v-model.number.trim="model.id"
                   @keyup.enter="createLink()"
                   @dblclick="openWindow(selectedLink ? selectedLink.searchUrl : null)"/>
            <button @click="createLink()">Save</button>
        </span>
        <!--show exist link-->
        <company-link v-for="companyLink in company.links"
                      :key="companyLink.linkId" :link="getLink(companyLink.linkId)" :company-link="companyLink"
                      :company-name="company.name"target="_detail"></company-link>
        <!--add new link button-->
        <span @click="toggleAppend()">+L</span>
    </span>
</template>

<script>
import {CREATE_COMPANY_LINK} from '../core/actions';
import store from '../core/store';
import CompanyLink from './CompanyLink.vue'

export default {
    name: 'company-links',
    props: ['company'],
    components: {
        CompanyLink
    },
    data () {
        return {
            urls: store.state.urls,
            links: store.state.links.list,
            model: null,
            selectedLink: null,
        }
    },
    computed: {
        allowedLinks: function () {
            const links = this.links.filter(link =>
              !this.company.links.find(companyLink => companyLink.linkId === link.id));
            this.selectedLink = links.length>0 ? links[0] : null;
            return links;
        },
    },

    methods: {

        getLink(id){
            return this.links.find(link=>link.id == id)
        },

        toggleAppend: function () {
            this.model = this.model ? null : {companyId: this.company.id, linkId: null, id: null};

        },
        openWindow: function (url=this.urls.search) {
            console.log('openWindow:', url + this.company.name);
            window.open(url + this.company.name, '_search');
        },
        createLink: function () {
            if (this.model && this.selectedLink && this.model.id) {
                this.model.linkId = this.selectedLink.id;
                store.dispatch(CREATE_COMPANY_LINK, this.model);
                this.model = null;
            }
        },
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .links{
        text-align: left;
        width: auto;
    }
</style>