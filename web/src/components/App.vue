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
import { FETCH_LINKS,FETCH_INSTRUMENT_TYPES} from '../actions';

export default {
  name: 'app',
  data () {
    return {
      messages: this.$store.state.messages,
    }
  },

  created () {
    // запрашиваем данные когда реактивное представление уже создано
    this.fetchData()
  },
  watch: {
    // в случае изменения маршрута запрашиваем данные вновь
    '$route': 'fetchData',
    'messages.links.error':function(error) {
      if(error) this.notifyError('Справочника ссылок',error)
    },
    'messages.sectors.error':function(error) {
      if(error) this.notifyError('Справочника секторов',error)
    },
    'messages.companies.error':function(error) {
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
      this.$store.dispatch(FETCH_LINKS);
      this.$store.dispatch(FETCH_INSTRUMENT_TYPES);
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

   @import "../assets/style.scss";

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
