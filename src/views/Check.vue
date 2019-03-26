<template>
  <div class="check">
    <h1>审批</h1>
    <router-link to="/">我审批的</router-link>
    <router-link to="/">我发起的</router-link>
    <div>
        <router-link to="/purchase">采购审批</router-link>
        <router-link to="/kpi">绩效自评</router-link>
        <router-link to="/pact">通用审批</router-link>
        <router-link to="/project">立项申请</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name:"check"
}
</script>
<style lang="scss" scoped>
a{
  padding: 10px;
}
</style>