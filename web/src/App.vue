<template>
  <div class="container" id="app">
    <header>
      <nav>
        <li>
          <router-link :to="{ name:'home'}"><h1>ResFin</h1></router-link>
        </li>
        <li>
          <router-link :to="{ name:'companies'}">Компании</router-link>
        </li>
      </nav>
      <a class="auth">log in</a>
    </header>

    <div class="main-wrapper">
      <router-view></router-view>
      <router-view name="sidebar"></router-view>
    </div>

    <footer></footer>
    <notifications group="top" position="top right" />

  </div>

</template>

<script>
import { FETCH_LINKS } from './core/actions';
import store from './core/store';

export default {
  name: 'app',
  data () {
    return {
      links: store.state.links,
      sectors: store.state.sectors,
      companies: store.state.companies,
    }
  },

  created () {
    // запрашиваем данные когда реактивное представление уже создано
    this.fetchData()
  },
  watch: {
    // в случае изменения маршрута запрашиваем данные вновь
    '$route': 'fetchData',
    'links.error':function(error) {
      if(error) this.notifyError('Справочника ссылок',error)
    },
    'sectors.error':function(error) {
      if(error) this.notifyError('Справочника секторов',error)
    },
    'companies.error':function(error) {
        if(error) this.notifyError('Компаний',error)
    }
  },
  methods: {
    notifyError(title, error){
      console.log('notifyError');
      this.$notify({
        group: 'top',
        title: 'Ошибка загрузки '+ title,
        text: error.toString(),
        type: 'error',
        duration:-1
      });
    },
    fetchData(){
      store.dispatch(FETCH_LINKS);
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

   @import "assets/style.scss";

  .container {
    display: flex;
    flex-direction: column;
  }



  header {
    display: flex;
    justify-content: space-between;

    nav {
      display: flex;
      align-items: baseline;
    }
  }

  .main-wrapper {
    display: flex;
    flex-direction: row;
    @media (max-width: 600px) {
      flex-direction: column;
    }
  }

  .main {
    flex: 3;
    margin-right: 60px;
    @media (max-width: 600px) {
      margin-right: 0;
      margin-bottom: 60px;
    }
  }

</style>
