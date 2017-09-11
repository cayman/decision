<template>
    <span class="companyLink">
        <img :src="link.icon | icon" height="12px" width="12px" @dblclick="toggleEditMode()">
        <span v-if="model">
            <input  type="text" size="6" v-model.number.trim="model.id"
                    @keyup.enter="updateCompanyLink()" @dblclick="openSearchLink(model.id)"/>
            <button @click="updateCompanyLink()">Save</button>
        </span>
        <span class="companyLink__name" v-else>
            <a :href="link.companyUrl | url(companyLink.id)" :target="target">
                {{ link.name }}
            </a>
        </span>

    </span>
</template>

<script>
import { UPDATE_COMPANY_LINK } from 'actions';
import {  composeUrl } from 'actions/utils';

export default {
    name: 'company-link',
    props: ['companyLink', 'companyName', 'target'],
    data () {
        return {
            model:null
        }
    },
    computed:{
        link(){
            return this.$store.getters.getLink(this.companyLink.linkId);
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


<style rel="stylesheet/scss" lang="scss">

    @import "../../assets/style.scss";

    .companyLink {
        font: $table_base_fonts;
        border-top: 1px solid $background_color;
        border-left: 1px solid $background_color;
        border-bottom: 1px solid $caption_color4;
        border-right: 1px solid $caption_color4;
        margin-left: 5px;
        padding: 1px;

        &__name{
          //  background-color: $caption_color3;
            width: $col_name_width;
        }
    }


</style>