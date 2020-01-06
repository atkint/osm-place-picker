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
      links: ['AddPlace']
    }
  }
}
</script>

<style>
</style>
