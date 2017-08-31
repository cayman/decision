<template>
    <span>
        <img :src="icon" height="12px" width="12px" @dblclick="toggleEdit()">
        <span v-if="form">
            <input  type="text" size="6" v-model.number.trim="form.param"
                    @keyup.enter="updateLink()" @dblclick="openWindow()"/>
            <button @click="updateLink()">Save</button>
        </span>
        <a v-else :href="url_param" target="target">
            {{ link.name }}
        </a>
    </span>
</template>

<script>
export default {
    name: 'company-link',
    props: ['link', 'target'],
    data () {
        return {
            form:null
        }
    },
    computed:{
        icon:function(){
            return 'static/icon/'+this.link.icon;
        },
        url_param:function(){
            return this.link.url+this.link.param;
        }
    },
    methods: {
        toggleEdit: function () {
            this.form = this.form ? null : { id:this.link.id, param:this.link.param };
        },
        openWindow: function () {
            this.$emit('open', this.link.search);
        },
        updateLink:function () {
            if(this.form && this.form.param) {
                this.$emit('update', this.form);
                this.form = null;
            }
        },

    }
}
</script>