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
      return JSON.parse(sessionStorage.getItem('userInfo'))?true:false
    },
    sessionUser(){
    return JSON.parse(sessionStorage.getItem('userInfo'))
  }
  },
  mounted(){
    console.log(this.isLogin);
    
  },
  created(){
    this.$store.dispatch('getAll')
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
