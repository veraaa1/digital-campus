<template>
  <div class="oa">
    <h1>This is an oa,{{user.Tname}}</h1>
    <router-link to="/oa/check">审批</router-link>
    <router-link to="/oa/rest">请假</router-link>
    <router-link to="/oa/attendence">考勤</router-link>
  </div>
</template>
<script>
export default {
  name:"oa",
  computed:{
   user(){
     return JSON.parse(sessionStorage.getItem('userInfo'))
   }
 }
}
</script>
<style lang="scss" scoped>
a{
  padding: 10px;
}
</style>

