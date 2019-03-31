<template>
  <div class="news">
    <h1>{{user.Tname}},欢迎来访</h1>
  </div>
</template>
<script>
export default {
  name:"news",
  data:()=>({
    
  }),
 computed:{
   user(){
     return JSON.parse(sessionStorage.getItem('userInfo'))
   }
 },
}
</script>
<style lang="scss" scoped>

</style>