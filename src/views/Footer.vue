<template>
<footer>
  <mt-tabbar v-model="selected">
  <mt-tab-item id="news" class="all-change">
    <router-link to="/news">
      <img src="../assets/logo.png">
      <span>消息</span>
    </router-link>
  </mt-tab-item>
  <mt-tab-item id="daily" class="all-change">
    <router-link to="/daily">
      <img src="../assets/logo.png">
      <span>日程</span>
  </router-link>
  </mt-tab-item>
  <mt-tab-item id="oa" class="all-change">
    <router-link to="/oa">
      <img src="../assets/logo.png">
      <span>OA</span>
    </router-link>
  </mt-tab-item>
  <mt-tab-item id="contact" class="all-change">
    <router-link to="/contact">
      <img src="../assets/logo.png">
      <span>通讯</span>
    </router-link>
  </mt-tab-item>
  <mt-tab-item id="me" class="all-change">
    <router-link to="/me">
      <img src="../assets/logo.png">
      <span>我的</span>
    </router-link>
  </mt-tab-item>
</mt-tabbar>
</footer>
</template>
<script>
export default {
name:"tabbar",
data:()=>({selected:"news"}),
  computed:{
  sessionUser(){
    return JSON.parse(sessionStorage.getItem('userInfo'))
  }
 },
 created(){
   this.$store.dispatch('getTCollections',{userName:this.sessionUser.Tname,pwd:this.sessionUser.Tpwd})
 }
}
</script>

<style lang="scss" scoped>
.all-change{
  a{
    display: block;
    display: flex;
    flex-direction: column;
    color: #111;
    text-decoration: none;
    >img{
      display: block;
      width: 40px;
      height: 40px;
      margin: 0 auto;
    }
    >span{
      display: block;
      width: 100%;
      text-align: center;
    }
  }
}
</style>

