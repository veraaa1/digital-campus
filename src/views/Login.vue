<template>
  <div class="login">
    <h1>登录</h1>
    <form action="">
        <label for="username">用户名</label>
        <input type="text" id="username">
        <label for="pwd">密码</label>
        <input type="password" id="pwd">
        <button type="submit">登录</button>
    </form>
  </div>
</template>
<script>
export default {
  name:"login",
  created(){
   
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