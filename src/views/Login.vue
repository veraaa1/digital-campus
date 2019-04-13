<template>
  <div class="login">
   <img src="../assets/logo-s.jpg" alt="">
    <el-form label-position="right" label-width="80px" >
      <el-form-item label="工号">
        <el-input v-model="cardId"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="pwd" type="password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="login" :pwd="pwd" :cardId="cardId">登录</el-button>
    </el-form>
    <img src="../assets/school.jpg" alt="">
  </div>
</template>
<script>
import {MessageBox} from 'mint-ui'
export default {
  name:"login",
  data:()=>({
    pwd:"",
    user:null,
    cardId:''
  }),
  inject:['reload'],
  computed:{
  },
  methods:{
    login(){
      if(this.pwd.trim()&&this.cardId.trim())
      {
        console.log(this.$store.state.all.find(e=>e.TCardId == this.cardId));
        
        if(this.$store.state.all.find(e=>e.TCardId == this.cardId && e.Tpwd == this.pwd)){
           sessionStorage.setItem('Tcard',this.cardId)
           sessionStorage.setItem('Tpwd',this.pwd)
           console.log(sessionStorage.getItem('Tpwd'));
             this.reload()
              this.$router.push({
             path:'/news'
           })
           
          
           
        }else{
          MessageBox('工号和密码不匹配，请重新输入','温馨提示')
        }
      }else{
        MessageBox('您输入字段有误,请重新输入','温馨提示')
      }
       
    }
  },
  beforeUpdate(){
    
  }
}
</script>
<style lang="scss" scoped>
.login{
    width: 100%;
    >img:first-child{
      width: 30%;
      margin: 0 auto;
      display: block;
      margin-top: 12%
    }
    form{
      width: 80%;
      margin: 0 auto;
        display: flex;
        flex-direction: column;
        margin-top: 12%
    }
    >img:last-child{
      width: 100%;
      position: absolute;
      bottom: 0;
    }
}
</style>