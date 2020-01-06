<template>
  <b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header tabs>
        <b-nav-item v-for="link in menuLinks" :key="link" :href="/#/+link" :active="link==$route.name">{{link}}</b-nav-item>
      </b-nav>
    </b-card-header>
  </b-card>
</template>

<script>
export default {
  name: 'NavigationPanel',
  props: ['menuLinks']
}
</script>

<style scoped>
</style>
