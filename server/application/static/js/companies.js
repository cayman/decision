/**
 * Created by rustem on 27.08.17.
 */

const list = items => Object.keys(items).map(id=>items[id]);

const Companies =  {
  template:`#page-companies`,
  data () {
    return {
      loading: false,
      companies: null,
      sectors: null,
      years: null,
      error: null,
    }
  },
  created () {
    // запрашиваем данные когда реактивное представление уже создано
    this.obs = this.fetchData()
  },
  watch: {
    // в случае изменения маршрута запрашиваем данные вновь
    '$route': 'fetchData'
  },
  // beforeRouteUpdate (to, from, next) {
  //   // обработка изменений параметров пути...
  //   // не забудьте вызывать next()
  // }
  methods:{
    fetchData(){
      this.error = this.companies = null;
      this.loading = true;
      return getCompanies()
      // .do(companies =>console.log('companies:',companies))
        .do(companies => companies.sort((a, b)=>b.weight - a.weight))
        .do(companies => this.companies = companies)
        //create years
        .do(companies => this.years = Array.from(new Set(companies.reduce((years, company)=>
          years.concat(company.years), []))).sort())
        //create sectors
        .map(companies=> list(companies.reduce((sectors, company)=> {
          const id = company.sector_id;
          (sectors[id] = sectors[id] || {
              id,
              name: company.sector_name,
              companies: [],
              opened: false
            }).companies.push(company);
          return sectors;
        }, {})))
        .do(sectors =>console.log('sectors:', sectors))
        .do(sectors =>this.sectors = sectors)
        .finally(() => this.loading = false)
        .subscribe(result => {
          console.log('success loaded companies');
        }, error=> {
          this.error = error;
          console.error(error);
        })
    },
    toggleEntity: function (item) {
      item.opened = !item.opened;
      console.log('entity:',item.id,item.opened?'expanded':'collapsed');
    },
    collapseEntity: function (item) {
      item.opened = false;
      console.log('entity:',item.id,'collapsed');
    },
  }
};
