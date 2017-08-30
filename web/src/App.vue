<template>
  <div class="container" id="app">
    <header>
      <nav>
        <li>
          <router-link :to="'home'"><h1>ResFin</h1></router-link>
        </li>
        <li>
          <router-link :to="'companies'">Компании</router-link>
        </li>
      </nav>
      <a class="auth">log in</a>
    </header>

    <div class="main-wrapper">
      <router-view></router-view>
      <router-view name="sidebar"></router-view>
    </div>

    <footer></footer>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
