<template>
  <div id="app">
    <router-view />
     <Footer v-if="isLogin"/>
  </div>
</template>
<script>
import Footer from './views/Footer'
export default {
  components:{
    Footer
  },
  computed:{
    isLogin(){
      return sessionStorage.getItem('userName')?true:false
    }
  },
  mounted(){
    console.log(this.isLogin);
    
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
