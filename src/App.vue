<template>
  <div id="app">
<!--      <Nav></Nav>-->
      <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'App',
  components: {
  },
}
</script>
<style lang="scss">
  @import "assets/css/reset";
  body{
    background-color: #f6f6f6;
  }
</style>
