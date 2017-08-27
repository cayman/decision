/**
 * Created by rustem on 27.08.17.
 */

const Company =  {
  template:`#page-company`,
  data () {
    return {
      loading: false,
      company: null,
      error: null
    }
  },
  // beforeRouteUpdate (to, from, next) {
  //   // обработка изменений параметров пути...
  //   // не забудьте вызывать next()
  // },
  created () {
    // запрашиваем данные когда реактивное представление уже создано
    this.obs = this.fetchData()
  },
  watch: {
    // в случае изменения маршрута запрашиваем данные вновь
    '$route': 'fetchData'
  },
  methods:{
    fetchData(){
      this.error = this.company = null;
      this.loading = true;
      return getCompanies(this.$route.params.id)
        .do(company =>console.log('company:',company))
        .do(company => this.company = company)
        .finally(() => this.loading = false)
        .subscribe(result => {
          console.log('success loaded companies');
        }, error=> {
          this.error = error;
          console.error(error);
        })
    }
  }
};