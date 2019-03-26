<template>
  <div id="app">
    <router-view />
    <Footer/>
  </div>
</template>
<script>
import Footer from './views/Footer'
export default {
  components:{
    Footer
  }
}
</script>

<style lang="scss">
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0
}

</style>
