<template>
  <div class="news">
    <h1>{{user}},欢迎来访</h1>
  </div>
</template>
<script>
export default {
  name:"news",
  data:()=>({
    
  }),
 computed:{
   user(){
     return window.sessionStorage.getItem('userName')
   }
 },
}
</script>
<style lang="scss" scoped>

</style>