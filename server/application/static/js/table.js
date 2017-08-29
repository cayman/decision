/**
 * Created by rustem on 27.08.17.
 */

Vue.component('years-header-row', {
  props: ['title','years'],
  template:`<tr class="years_header">
                <td>{{ title }}</td>
                <td v-for="year in years">{{ year }}</td>
           </tr>`
});

Vue.component('sector-header-row', {
  props: ['sector','years'],
  template:`<tr class="sector_header">
              <th :colspan="years.length+1" v-on:click="toggleSector">
                <span>{{ sector.id }}</span>
                - <span>{{ sector.name }} ({{ sector.companies.length }})</span>
               </th>
            </tr>`,
  methods: {
    toggleSector: function () {
      this.$emit('toggle')
    }
  },

});

Vue.component('sector-footer-row', {
  props: ['sector','years'],
  template:`<tr class="sector_footer">
                <td :colspan="years.length+1" v-on:click="collapseSector">
                    <div class="links">{{ sector.name }}</div>
                </td>
            </tr>`,
  methods: {
    collapseSector: function () {
      this.$emit('collapse')
    }
  },

});

Vue.component('company-header-row', {
  props: ['company','years'],
  template:`<tr class="company_header">
              <td class="caption" :colspan="years.length+1">
                  <span>{{ company.id }}</span>
                  <router-link to="/companies">{{ company.name }}</router-link>
                  <span v-if="company.weight>0" class="weight positive">{{ company.weight }}</span>
                  <span v-else-if="company.weight<0" class="weight negative">{{ company.weight }}</span>
                  
                  <company-links :company="company" ></company-links>
                        
              </td>
           </tr>`,
  methods: {

  }
});

Vue.component('company-links', {
  props: ['company'],
  data () {
    return {
      linkNew:null,
      selected: null,
    }
  },
  template:`<div class="links">
                <span v-if="linkNew">
                    <select v-model="selected">
                        <option v-for="l in company.links" :value="l">{{ l.name }}</option>
                    </select>  
                    <input type="text" size="6" v-model.number.trim="linkNew.param" 
                          @keyup.enter.native="createLink()" @dblclick="openWindow(selected ? selected.search : 'https://www.google.ru/search?q=')"/>
                    <button @click="createLink()">Save</button>
                </span>
                
                <company-link v-for="link in company.links" :key="link.id" :link="link" :name="company.name" @open="openWindow" 
                    @update="updateLink" target="_detail"></company-link>
                <span @click="toggleAppend()" >+</span>
            </div>`,
  methods: {
    toggleAppend: function () {
      this.linkNew = this.linkNew ? null : { company_id:this.company.id,  _link: null, id:null, param:null };
    },
    openWindow: function (url) {
      console.log('openWindow:',url + this.company.name);
      window.open(url + this.company.name, '_search');
    },
    updateLink:function (link) {
        link.company_id = this.company.id;
        console.log('updateLink', link);
        this.$root.$emit('updateLink', link);
    },
    createLink:function () {
        if(this.linkNew && this.selected && this.linkNew.param){
          this.linkNew.id = this.selected.id;
          console.log('createLink',this.linkNew);
          this.$root.$emit('createLink', this.linkNew);
          this.linkNew = null;
        }
    },
  }
});


Vue.component('company-link', {
  props: ['link', 'target'],
  data () {
    return {
      linkEdit:null
    }
  },
  template:`<span><img :src="icon" height="12px" width="12px" @dblclick="toggleEdit()">
                <span v-if="linkEdit">
                    <input  type="text" size="6" v-model.number.trim="linkEdit.param" 
                        @keyup.enter.native="updateLink()" @dblclick="openWindow()"/> 
                    <button @click="updateLink()">Save</button>         
                </span>  
                <a v-else :href="url_param" target="target">
                    {{ link.name }}
                </a>
            </span>`,
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
      this.linkEdit = this.linkEdit ? null : { id:this.link.id, param:this.link.param };
    },
    openWindow: function () {
      this.$emit('open', this.link.search);
    },
    updateLink:function () {
      if(this.linkEdit && this.linkEdit.param) {
        this.$emit('update', this.linkEdit);
        this.linkEdit = null;
      }
    },

  }
});

Vue.component('indicator-row', {
  props: ['indicator','years'],
  template:`<tr class="company_indicator" v-once>
                <td nowrap><a>{{ indicator.name }}</a>
                    <span class="unit">({{ indicator.quantity || '' }}{{ indicator.unit }})</span>
                    <span class="weight positive" v-if="indicator.weight>0">{{ indicator.weight }}</span>
                    <span class="weight negative" v-else-if="indicator.weight<0" >{{ indicator.weight }}</span>
                </td>
                <indicator-value-row  v-for="year in years" :key="year" :value="indicator.years[year]" 
                    :digit="indicator.digit" :last="year == years[years.length - 1]"></indicator-value-row>
            </tr>
           </tr>`,
});


Vue.component('indicator-value-row', {
  props: ['value','digit','last'],
  template:`<td nowrap :class="{ 'empty': !value && last, 'digit': digit, 'negative':digit && value<0,'zero': digit && value===0 }">
                 <span>{{ value }}</span>
            </td>`
  ,
});