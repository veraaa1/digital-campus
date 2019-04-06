<template>
  <div class="news">
    <h1>{{user.Tname}},欢迎来访</h1>
  </div>
</template>
<script>
export default {
  name:"news",

 computed:{
   user(){
     console.log(this.$store.state.all);
     
     return this.$store.state.all?this.$store.state.all.find(e=>e.TCardId == sessionStorage.getItem('Tcard')):JSON.parse(sessionStorage.getItem('userInfo'))
   }
 },
 created(){
   this.$store.dispatch('getTCollections')
 }
}
</script>
<style lang="scss" scoped>

</style>