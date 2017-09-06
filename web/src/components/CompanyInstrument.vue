<template>
    <span>
        <strong @dblclick="toggleEditModel()">{{ type.short }}</strong>
        <span v-if="model">
            <input type="text" size="6" v-model.number.trim="model.id"
                   @dblclick="openSearchLink(model.id)"/>
            <input type="text" size="6" v-model.number.trim="model.code"
                   @dblclick="openSearchLink(model.code)"/>
            <button @click="updateInstrument()">Save</button>
        </span>
        <span v-else>
            <a :href="stockUrl" :target="target">
                <img :src="stockLink.icon | icon" height="12px" width="12px">
            </a>
            <a :href="infoUrl" :target="target">
                <img :src="infoLink.icon | icon" height="12px" width="12px">
            </a>
            <a :href="stockUrl" :target="target">
                {{ instrument.code }}
            </a>
        </span>
        <span>&nbsp; &nbsp;</span>
    </span>
</template>

<script>
import { mapGetters } from 'vuex';
import { UPDATE_COMPANY_INSTRUMENT } from '../actions';
import { composeUrl, composeIconUrl } from '../actions/utils';

export default {
    name: 'company-instrument',
    props: ['type', 'instrument', 'companyName', 'target'],
    data () {
        return {
            model:null,
        }
    },
    computed:{
        ...mapGetters(['dictLinks', 'infoLink', 'stockLink']),
        stockUrl(){
            return composeUrl(this.stockLink.instrumentUrl,this.instrument.code);
        },
        infoUrl(){
            return composeUrl(this.infoLink.instrumentUrl,this.instrument.id);
        }
    },
    methods: {
        openSearchLink(input) {
            const url = composeUrl(this.infoLink.searchUrl, input || this.company.name);
            window.open(url, '_search');
        },
        toggleEditModel() {
            this.model = this.model ? null : Object.assign({},this.instrument);
        },
        updateInstrument() {
            this.$store.dispatch(UPDATE_COMPANY_INSTRUMENT, this.model);
            this.model = null;
        }
    }
}
</script>