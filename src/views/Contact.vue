<template>
  <div class="contact">
    <h1>This is an contact,{{user.Tname}}</h1>
    <ul>
      <li><p>{{user.Torgnization}}</p></li>
      <li><router-link to="/contact/department"><span>组织架构</span><span>></span></router-link></li>
      <li><p>所属部门</p><p>{{user.TeachDepartMent}}</p></li>
    </ul>
  </div>
</template>
<script>
export default {
  name:"contact",
  computed:{
    user(){
      return JSON.parse(sessionStorage.getItem('userInfo'))
    },
  }
}
</script>
<style lang="scss" scoped>

</style>