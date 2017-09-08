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
            <a :href="stockLink.instrumentUrl | url(instrument.code.toUpperCase())" :target="target">
                <img :src="stockLink.icon | icon" height="12px" width="12px">
            </a>
            <a :href="infoLink.instrumentUrl | url(instrument.id)" :target="target">
                <img :src="infoLink.icon | icon" height="12px" width="12px">
            </a>
            <a :href="divLink.instrumentUrl | url(instrument.code.toLowerCase())" :target="target">
                <img :src="divLink.icon | icon" height="12px" width="12px">
            </a>
            <a :href="stockLink.instrumentUrl | url(instrument.code)" :target="target">
                {{ instrument.code }}
            </a>
        </span>
        <span>&nbsp; &nbsp;</span>
    </span>
</template>

<script>
import { UPDATE_COMPANY_INSTRUMENT } from 'actions/types';
import { composeUrl } from 'actions/utils';

export default {
    name: 'company-instrument',
    props: ['instrument', 'companyName', 'target'],
    data () {
        return {
            model:null,
        }
    },
    computed:{
        type(){
            return this.$store.getters.getInstrumentType(this.instrument.typeId)
        },
        infoLink(){
            return this.$store.getters.infoLink;
        },
        divLink(){
            return this.$store.getters.divLink;
        },
        stockLink(){
            return this.$store.getters.stockLink;
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