<template>
  <div class="me">
      <div class="idcard"> 
        <img src="../../node_modules/vue-beautiful-chat/src/assets/chat-icon.png" alt="">
        <h2>{{user.Tname}}</h2>
        <p style="font-size:14px;padding:10px 0;">{{user.Torgnization}}-{{user.TeachCareer}}({{user.TeachDepartMent}})</p>
        <div>
          <img src="../assets/二维码.png" alt="">
        </div>
      </div>
       <p style="border-bottom:3px solid #409EFF;width:90px;text-align:center;margin-left:18px;font-size:20px;padding-bottom:5px;margin-top:10px">详细信息</p>
       <div>
         <ul>
           <li>
             <span>职工号</span><span>{{user.TCardId}}</span>
           </li>
           <li>
             <span>教龄</span><span>{{user.TeachYear}}年</span>
           </li>
           <li>
             <span>邮箱</span><span>{{user.Temail}}</span>
           </li>
           <li>
             <span>电话</span><span>{{user.Tphone}}</span>
           </li>
           <li>
             <span>住址</span><span>{{user.Taddress}}</span>
           </li>
           <li>
             <span>部门</span><span>{{user.TeachDepartMent}}</span>
           </li>
         </ul>
       </div>
       <div class="check" style="margin-top:10px;">
         <ul>
           <li>
             <router-link to="/oa/check/mycreatecheck"><span>我的审批</span><span>></span></router-link>
           </li>
           <li>
             <router-link to="/daily"><span>我的日程</span><span>></span></router-link>
           </li>
           <li>
             <router-link to="/oa/rest"><span>我的请假</span><span>></span></router-link>
           </li>
         </ul>
       </div>
       <div class="check">
         <p><span>设置</span><img src="../assets/设置.png" alt=""></p>
       </div>
  </div>
</template>
<script>
export default {
  name:"me",
  computed:{
    user(){
      return this.$store.state.teacherCollections
    }
  }
}
</script>
<style lang="scss" scoped>
.me{
  width: 100vw;
  height:calc(100vh - 66px);
  overflow: hidden;
  overflow-y: auto;
  background-color: rgb(245, 241, 241);
  padding-bottom: 10px;
}
.me>div>ul{
  width: 100%;
  background-color: #fff;
  list-style: none;
  margin-top: 10px;
  >li{
    padding: 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
  }

}
.idcard{
  width: 90%;
  margin: 0 auto;
  border: 1px solid #eee;
  background-color: #fff;
  box-shadow: 3px 3px 30px #eee;
  border-radius: 5px;
  padding: 10px;
  position: relative;
  margin-top: 10px;
  >img{
    position: absolute;
    right: 10px;
    top: 10px;
    width: 40px;
    height: 40px;
  }
  div{
    width: 100%;
    margin-top: 10px;
  }
}
.check>ul>li>a{
  width: 100%;
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  color: rgb(143, 137, 137)
}
.check>p{
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

