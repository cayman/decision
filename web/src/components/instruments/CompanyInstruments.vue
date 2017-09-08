<template>
    <span class="instruments">
        <!--add new link form-->
        <span v-if="model">
            <select v-model="selectedType">
                <option v-for="type0 in remainingTypes" :value="type0">{{ type0.name }}</option>
            </select>
            <span>Id</span>
            <input type="text" size="6" v-model.number.trim="model.id"
                   @dblclick="openSearchLink(model.id)"/>
            <span>Code</span>
            <input type="text" size="6" v-model.trim="model.code"
                   @dblclick="openSearchLink(model.code)"/>
            <button @click="createInstrument()">Save</button>
        </span>

        <company-instrument v-for="instrument in company.instruments"
                      :key="instrument.typeId" :instrument="instrument"
                      :company-name="company.name" target="_detail"></company-instrument>
        <!--add new instrument button-->
        <span @click="toggleAppendMode()">+I</span>
    </span>
</template>

<script>
import { CREATE_COMPANY_INSTRUMENT } from 'actions/types';
import { composeUrl } from 'actions/utils';
import CompanyInstrument from './CompanyInstrument.vue'

export default {
    name: 'company-instruments',
    props: ['company'],
    components: {
        CompanyInstrument
    },
    data () {
        return {
            model: null,
            selectedType: null,
        }
    },
    computed: {
        infoLink(){
            return this.$store.getters.infoLink;
        },
        types(){
            return this.$store.getters.instrumentTypes;
        },
        remainingTypes() {
            const types =  this.types.filter(_type=>
                    !this.company.instruments.some(instrument => instrument.typeId === _type.id));
            this.selectedType = types.length>0 ? types[0] : null;
            return types;
        }
    },
    mounted() {
      //  console.log(this.foo('hello')); // logs "hello"
    },
    methods: {
        openSearchLink(input) {
            const url = composeUrl(this.infoLink.searchUrl, input || this.company.name);
            window.open(url, '_search');
        },
        toggleAppendMode() {
            this.model = this.model ? null : {companyId: this.company.id, typeId: null, id: null, code:null};
        },
        createInstrument() {
            if (this.model && this.selectedType && this.model.id && this.model.code) {
                this.model.typeId = this.selectedType.id;
                this.$store.dispatch(CREATE_COMPANY_INSTRUMENT, this.model);
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