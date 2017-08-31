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
  body            { font-family: sans-serif; }

  a, h1, h2       { color: #377ba8; }
  h1, h2          { font-family: 'Georgia', serif; margin: 0; }
  h1              { border-bottom: 2px solid #eee; }
  h2              { font-size: 1.2em; }

  .container {
    display: flex;
    flex-direction: column;
  }
  .main-wrapper {
    display: flex;
    flex-direction: row;
  }
  .main {
    flex: 3;
    margin-right: 60px;
  }
  .sidebar {
    flex: 1;
    border: 1px solid #eee;
  }

  @media (max-width: 600px) {
    .main-wrapper {
      flex-direction: column;
    }
    .main {
      margin-right: 0;
      margin-bottom: 60px;
    }
  }


  header {
    display: flex;
    justify-content: space-between;
  }
  header nav {
    display: flex;
    align-items: baseline;
  }
</style>
