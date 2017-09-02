<template>
    <div class="links">
        <!--add new link form-->
        <span v-if="form">
            <select v-model="selectedLink">
                <option v-for="link0 in allowedLinks" :value="link0">{{ link0.name }}</option>
            </select>
            <input type="text" size="6" v-model.number.trim="form.param"
                   @keyup.enter="createLink()"
                   @dblclick="openWindow(selectedLink ? selectedLink.search : null)"/>
            <button @click="createLink()">Save</button>
        </span>
        <!--show exist link-->
        <company-link v-for="link in company.links" :key="link.id" :link="link" :name="company.name" @open="openWindow"
                      @update="updateLink" target="_detail"></company-link>
        <!--add new link button-->
        <span @click="toggleAppend()">+</span>
    </div>
</template>

<script>
import {UPDATE_COMPANY_LINK,CREATE_COMPANY_LINK} from '../core/actions';
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
            defaultUrl:'https://www.google.ru/search?q=',
            links: store.state.links.list,
            form: null,
            selectedLink: null,
        }
    },
    computed: {
        allowedLinks: function () {
            return this.links.filter(link =>
              !this.company.links.find(companyLink => companyLink.id === link.id));
        },
    },

    methods: {
        toggleAppend: function () {
            this.form = this.form ? null : {companyId: this.company.id, id: null, param: null};
        },
        openWindow: function (url=this.defaultUrl) {
            console.log('openWindow:', url + this.company.name);
            window.open(url + this.company.name, '_search');
        },
        updateLink: function (link) {
            link.companyId = this.company.id;
            store.dispatch(UPDATE_COMPANY_LINK, link);
        },
        createLink: function () {
            if (this.form && this.selectedLink && this.form.param) {
                this.form.id = this.selectedLink.id;
                store.dispatch(CREATE_COMPANY_LINK, this.form);
                this.form = null;
            }
        },
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .links{
        float:right;width:50%;
        text-align: right;
    }
</style>