<template>
    <span class="instruments">
        <!--add new link form-->
        <span v-if="model">
            <select v-model="selectedType">
                <option v-for="type0 in allowedTypes" :value="type0">{{ type0.name }}</option>
            </select>
            <span>Id</span>
            <input type="text" size="6" v-model.number.trim="model.id"
                   @dblclick="openWindow(selectedType ? rbc.searchUrl : null)"/>
            <span>Code</span>
            <input type="text" size="6" v-model.trim="model.code"
                   @dblclick="openWindow(selectedType ? micex.searchUrl : null)"/>
            <button @click="createInstrument()">Save</button>
        </span>

        <company-instrument v-for="instrument in company.instruments"
                      :key="instrument.typeId" :type="getType(instrument.typeId)" :instrument="instrument"
                      :company-name="company.name"target="_detail"></company-instrument>
        <!--add new instrument button-->
        <span @click="toggleAppend()">+I</span>
    </span>
</template>

<script>
import {CREATE_COMPANY_INSTRUMENT} from '../core/actions';
import store from '../core/store';
import CompanyInstrument from './CompanyInstrument.vue'

export default {
    name: 'company-instruments',
    props: ['company'],
    components: {
        CompanyInstrument
    },
    data () {
        return {
            urls: store.state.urls,
            types: store.state.instrumentsTypes.list,
            links: store.state.links.list,
            model: null,
            selectedType: null,
        }
    },
    computed: {
        micex:function(){
            return this.links.find(link=>link.id == 5);
        },
        rbc:function(){
            return this.links.find(link=>link.id == 0);
        },
        allowedTypes: function () {
            const types =  this.types.filter(type =>
              !this.company.instruments.find(instrument => instrument.typeId === type.id));
            this.selectedType = types.length>0 ? types[0] : null;
            return types;
        },
    },

    methods: {

        getType(id){
            return this.types.find(type=>type.id == id)
        },

        toggleAppend: function () {
            this.model = this.model ? null : {companyId: this.company.id, typeId: null, id: null, code:null};

        },
        openWindow: function (url=this.urls.search) {
            console.log('openWindow:', url + this.company.name);
            window.open(url + this.company.name, '_search');
        },
        createInstrument: function () {
            if (this.model && this.selectedType && this.model.id && this.model.code) {
                this.model.typeId = this.selectedType.id;
                store.dispatch(CREATE_COMPANY_INSTRUMENT, this.model);
                this.model = null;
            }
        },
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .instruments{
            text-align: left;
            width: auto;
        }
</style>