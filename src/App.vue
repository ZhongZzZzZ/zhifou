<template>
  <div id="app">
      <Nav></Nav>
      <router-view></router-view>
  </div>
</template>
<script>
import Nav from './components/navBar/nav'
export default {
  name: 'App',
  components: {
    Nav
  },
}
</script>
<style lang="scss">
  @import "assets/css/reset";
  body{
    background-color: #f6f6f6;
  }
</style>
