<template>
  <div class="login">
   
    <el-form label-position="right" label-width="80px" >
      <el-form-item label="用户名">
        <el-input v-model="userName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="pwd" type="password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form>
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