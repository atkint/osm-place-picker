

<template>
  <div id="app">
    <NavigationPanel :menuLinks="this.links"/>
    <router-view></router-view>
  </div>
</template>
<script>

import NavigationPanel from './components/NavigationPanel.vue'
export default {
  name: 'App',
  components: {NavigationPanel},
  data() {
    return {
      links: ['AddPlace','AddPerson']
    }
  }
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;*/
}
</style>
