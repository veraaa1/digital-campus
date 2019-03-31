<template>
  <div class="login">
    <h1>登录</h1>
    <form action="">
        <label for="username">用户名</label>
        <input type="text" id="username" v-model="userName">
        <label for="pwd">密码</label>
        <input type="password" id="pwd" v-model="pwd">
         <a href="javascript:;" @click="login">登录</a>
    </form>
  </div>
</template>
<script>
export default {
  name:"login",
  data:()=>({
    userName:"",
    pwd:"",
    user:null,
    
  }),
  computed:{
  },
  methods:{
    login(){
      if(this.pwd.trim()&&this.userName.trim())
      this.$store.dispatch('getTCollections',{userName:this.userName,pwd:this.pwd})
       this.$router.push({path:"/news"})
    }
  }
}
</script>
<style lang="scss" scoped>
.login{
    width: 95%;
    margin: 0 auto;
    form{
        display: flex;
        flex-direction: column;
    }
}
</style>