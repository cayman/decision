<template>
    <span class="links">
        <!--add new link form-->
        <span v-if="model">
            <select v-model="selectedLink">
                <option v-for="link0 in remainingLinks" :value="link0">{{ link0.name }}</option>
            </select>
            <input type="text" size="6" v-model.number.trim="model.id"
                   @keyup.enter="createLink()"
                   @dblclick="openSearchLink(model.id)"/>
            <button @click="createLink()">Save</button>
        </span>
        <!--show exist link-->
        <company-link v-for="companyLink in company.links"
                      :key="companyLink.linkId" :company-link="companyLink"
                      :company-name="company.name" target="_detail"></company-link>
        <!--add new link button-->
        <span @click="toggleAppendMode()">+L</span>
    </span>
</template>

<script>
import { mapGetters } from 'vuex';
import { CREATE_COMPANY_LINK } from '../actions';
import { composeUrl } from '../actions/utils';
import CompanyLink from './CompanyLink.vue';

export default {
    name: 'company-links',
    props: ['company'],
    components: {
        CompanyLink
    },
    data () {
        return {
            model: null,
            selectedLink: null,
        }
    },
    computed: {
        ...mapGetters(['urls','getLinksResidual']),
        remainingLinks: function () {
            const links = this.getLinksResidual(this.company.links);
            this.selectedLink = links.length>0 ? links[0] : null;
            return links;
        }
    },
    mounted() {
       // console.log(this.foo('hello')); // logs "hello"
    },
    methods: {
        toggleAppendMode() {
            this.model = this.model ? null : {companyId: this.company.id, linkId: null, id: null};
        },
        openSearchLink(input) {
            const url = composeUrl(this.selectedLink ? this.selectedLink.searchUrl : this.urls.search,
                    input || this.company.name);
            window.open(url, '_search');
        },
        createLink() {
            if (this.model && this.selectedLink && this.model.id) {
                this.model.linkId = this.selectedLink.id;
                this.$store.dispatch(CREATE_COMPANY_LINK, this.model);
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