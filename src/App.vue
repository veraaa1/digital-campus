<template>
  <div id="app">
      <router-view/>
      <Footer v-if="islog"/>
  </div>
</template>
<script>
import Login from './views/Login'
import Footer from './views/Footer'
export default {
  components:{
    Login,
    Footer
  },
  provide(){
    return {
      reload: this.reload
    }
  },
  data:()=>({
    islog:false
  }),
  methods:{
    reload(){
      this.$nextTick(function(){
       this.islog = sessionStorage.getItem('Tcard')?true:false
      })
    }
  },
  // mounted(){
  //   console.log(this.isLogin);
    
  // },
  created(){
    // console.log(this.isLogin);
    
    // console.log(sessionStorage.getItem('Tcard'));
    this.islog = sessionStorage.getItem('Tcard')?true:false
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
