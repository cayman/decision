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
                  
                  <company-links :links="company.links"></company-links>
                        
              </td>
           </tr>`
});

Vue.component('company-links', {
  props: ['links', 'years'],
  template:`<div class="links">
                <company-link v-for="link in links" :key="link.id" :link="link" target="_detail"></company-link>
            </div>`
});

Vue.component('company-link', {
  props: ['link', 'target'],
  template:`<a :href="link.url" target="target">
                    <img :src="icon" height="12px" width="12px" >{{ link.name }}
            </a>`,
  computed:{
    icon:function(){
      return 'static/icon/'+this.link.icon;
    }
  },
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