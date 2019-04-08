<template>
  <div class="oa">
    <h1>This is an oa,{{user.Tname}}</h1>
    <router-link to="/oa/check">审批</router-link>
    <a href="javascript:;" @click="handleChangeType('rest')">请假</a>
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
 },
 methods:{
   handleChangeType(type){
      this.$store.dispatch('changeType',type)
      this.$router.push({
        path:`/oa/${type}`
      })
    } 
 }
}
</script>
<style lang="scss" scoped>
a{
  padding: 10px;
}
</style>

