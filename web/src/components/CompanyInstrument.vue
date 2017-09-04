<template>
    <span>
        <strong @dblclick="toggleEdit()">{{ type.short }}</strong>
        <span v-if="model">
            <input  type="text" size="6" v-model.number.trim="model.id" @dblclick="openWindow()"/>
            <input  type="text" size="6" v-model.number.trim="model.code" @dblclick="openWindow()"/>
            <button @click="updateInstrument()">Save</button>
        </span>
        <span v-else>
            <a :href="codeUrl" target="target">
                <img :src="'icon/' + micex.icon" height="12px" width="12px">
            </a>
            <a :href="instrumentUrl" target="target">
                <img :src="'icon/' + rbc.icon" height="12px" width="12px">
            </a>
            <a :href="codeUrl" target="target">
                {{ instrument.code }}
            </a>
        </span>
        <span>&nbsp; &nbsp;</span>
    </span>
</template>

<script>
import {UPDATE_COMPANY_INSTRUMENT} from '../core/actions';
import store from '../core/store';

export default {
    name: 'company-instrument',
    props: ['type', 'instrument', 'companyName', 'target'],
    data () {
        return {
            model:null,
            links: store.state.links.list
        }
    },
    computed:{
        micex:function(){
            return this.links.find(link=>link.id == 5);
        },
        rbc:function(){
            return this.links.find(link=>link.id == 0);
        },
        codeUrl:function(){
            return this.micex.instrumentUrl + this.instrument.code;
        },
        instrumentUrl:function(){
            return this.rbc.instrumentUrl + this.instrument.id;
        },
        searchUrl:function(){
            return this.rbc.searchUrl + this.companyName;
        }
    },
    methods: {
        toggleEdit: function () {
            this.model = this.model ? null : Object.assign({},this.instrument);
        },
        openWindow: function () {
            console.log('openWindow:', this.searchUrl);
            window.open(this.searchUrl, '_search');
        },
        updateInstrument:function () {
            store.dispatch(UPDATE_COMPANY_INSTRUMENT, this.model);
            this.model = null;
        }

    }
}
</script>