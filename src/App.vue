<template>
  <!-- <div id="app"> -->
    <v-app>
    <v-main id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-view/> -->
      <Home/>
    </v-main>
    </v-app>
  <!-- </div> -->
</template>

<script>
import Home from './views/Home.vue'
export default {
  components: {
    Home
  },
  data () {
    return {
      links: ''
    }
  },
  mounted () {
    const links = document.querySelectorAll('a')
    links.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault()
        history.pushState({}, '', link.href)
        this.$root.$emit('router-go')
      })
    })
  // window.addEventListener('hashchange', this.setPage);
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
