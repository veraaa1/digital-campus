<template>
  <div class="oa">
    <div class="header">
      <h2>燕山大学</h2>
      <p>{{user.Tname}},您好</p>
    </div>
    <div class="cato round">
      <p>快捷服务</p>
      <div>
        <div><router-link to="/oa/check" style="background-color:#409eff"><img src=""/></router-link><span>智能审批</span></div>
      <div><a href="javascript:;" @click="handleChangeType('rest')" style="background-color:#5a4dff"><img src=""/></a><span>请假申报</span></div>
      <div><router-link to="/oa/attendence" style="background-color:#ffac30"><img src=""/></router-link><span>定点考勤</span></div>
      <div><a href="javascript:;"></a></div>
      </div>
      
    </div>
    <div class="cato"> 
      <p>人事统计</p>
      <div>
        <div><el-button>0</el-button><span>待我审批</span></div>
      <div><el-button>6</el-button><span>考勤统计</span></div>
      </div>
      
    </div>
    <div class="cato round">
      <p>生活服务</p>
      <div>
        <div><a href="javascript:;" style="background-color:#ff3030"><img src=""/></a><span>安全保卫</span></div>
        <div><a href="javascript:;" style="background-color:#4bbfbf"><img src=""/></a><span>维修服务</span></div>
        <div><a href="javascript:;" style="background-color:#ff9d30"><img src=""/></a><span>职工医疗</span></div>
        <div><a href="javascript:;" style="background-color:#ffe430"><img src=""/></a><span>户口办理</span></div>
        <div><a href="javascript:;" style="background-color:#5a4dff"><img src=""/></a><span>门禁授权</span></div>
        <div><a href="javascript:;" style="background-color:#ffc330"><img src=""/></a><span>公积金提取</span></div>
        <div><a href="javascript:;" style="background-color:#5a6abf"><img src=""/></a><span>出国审批</span></div>
        <div><a href="javascript:;" style="background-color:#ff6830"><img src=""/></a><span>视觉形象</span></div>
      </div>
      
    </div>
    <div class="cato round">
      <p>网络服务</p>
      <div>
        <div><a href="javascript:;" style="background-color:#409eff"><img src=""/></a><span>实名认证</span></div>
      <div><a href="javascript:;" style="background-color:#7c46ff"><img src=""/></a><span>远程登录</span></div>
      <div><a href="javascript:;"><img src=""/></a></div>
      <div><a href="javascript:;"><img src=""/></a></div>
      </div>
    </div>
    <div class="cato">
      <p>行政资源</p>
      <div>
        <div><a href="javascript:;" style="background-color:#ffc330"><img src=""/></a><span>学校印章使用</span></div>
      </div>
      
    </div>
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
.header{
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.header>p{
  font-size: 14px;
}
.oa{
  height:calc(100vh - 66px);
  overflow: hidden;
  overflow-y: auto;
}
a{
  padding: 10px;
}
.cato{
  width: 100%;
  border-top: 1px solid #eee;
  >p{
    border-bottom:3px solid #409EFF;
    width:90px;
    text-align:center;
    margin-left:10px;
    font-size:14px;
    padding-bottom:5px;
    margin-top: 10px
  }
  >div{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    
    div{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 10px 10px;
      >span{
        font-size: 12px;
        color: #111
      }
    }
  }
  a,.el-button{
    width:60px;
    height: 60px;
    border-radius: 5px;
    display: inline-block;
    text-align: center;
    color: #fff;
    font-size: 12px;
    text-decoration: none;
    
  }
  .el-button{
    color: #000;
    font-size: 20px;
    margin: 10px
  }
}
.oa .round>div{
  justify-content: space-around
}
</style>

