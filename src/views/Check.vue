<template>
  <div class="check">
    <h1>审批</h1>
    <router-link to="/oa/check/mycreatecheck">我发起的</router-link>
    <router-link to="/oa/check/mycheck">我审批的
    <!-- <mt-badge size="small">30</mt-badge> -->
    </router-link>
    <div>
        <a href="javascript:;" @click="handleChangeType('purchase')">采购审批</a>
        <a href="javascript:;" @click="handleChangeType('kpi')">绩效自评</a>
        <a href="javascript:;" @click="handleChangeType('pact')">通用审批</a>
    </div>
  </div>
</template>
<script>
export default {
  name:"check",
  methods:{
    handleChangeType(type){
      this.$store.dispatch('changeType',type)
      this.$router.push({
        path:`/${type}`
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