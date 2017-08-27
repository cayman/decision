/**
 * Created by rustem on 27.08.17.
 */

Vue.component('alert-loader', {
  props: ['loading'],
  template:`<img :src="icon" v-show="loading">`,
  computed:{
    icon:function(){
      return 'static/image/ajax-loader.gif'
    }
  },
});

Vue.component('alert-error', {
  props: ['error'],
  template:`<pre v-if="error">{{error}}</pre>`,
});

