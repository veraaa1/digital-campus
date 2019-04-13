<template>
  <div class="oa">
    <div class="header">
      <h2>燕山大学</h2>
      <p>{{user.Tname}},您好</p>
    </div>
    <div class="cato round">
      <p>快捷服务</p>
      <div>
        <div><router-link to="/oa/check" style="background-color:#409eff"><img src="../assets/zhinengshenpi.png"/></router-link><span>智能审批</span></div>
      <div><a href="javascript:;" @click="handleChangeType('rest')" style="background-color:#5a4dff"><img src="../assets/qingjiashenpi.png"/></a><span>请假申报</span></div>
      <div><router-link to="/oa/attendence" style="background-color:#ffac30"><img src="../assets/diingdiankaoqin.png"/></router-link><span>定点考勤</span></div>
      <div><a href="javascript:;"></a></div>
      </div>
      
    </div>
    <div class="cato"> 
      <p>人事统计</p>
      <div>
        <div><el-button @click="gotoCheck">{{num}}</el-button><span>我审批的</span></div>
      <div><el-button>0</el-button><span>考勤统计</span></div>
      </div>
      
    </div>
    <div class="cato round">
      <p>生活服务</p>
      <div>
        <div><a href="https://bwc.ysu.edu.cn/index.htm" style="background-color:#ff3030"><img src="../assets/anquanbaowei.png"/></a><span>安全保卫</span></div>
        <div><a href="http://www.weihouqin.cn/agent/app/index.php?i=27&c=home&t=33&winzoom=1" style="background-color:#4bbfbf"><img src="../assets/weixiufuwu.png"/></a><span>维修服务</span></div>
        <div><a href="https://rsc.ysu.edu.cn/list.jsp?urltype=tree.TreeTempUrl&wbtreeid=1244" style="background-color:#ff9d30"><img src="../assets/zhigongyiliao.png"/></a><span>职工医疗</span></div>
        <div><a href="https://bwc.ysu.edu.cn/list_list.jsp?urltype=tree.TreeTempUrl&wbtreeid=2018" style="background-color:#ffe430"><img src="../assets/hukoubanli.png"/></a><span>户口办理</span></div>
        <div><a href="https://bwc.ysu.edu.cn/list_list.jsp?urltype=tree.TreeTempUrl&wbtreeid=1993" style="background-color:#5a4dff"><img src="../assets/menjinshouquan.png"/></a><span>门禁授权</span></div>
        <div><a href="https://bwc.ysu.edu.cn/list_list.jsp?urltype=tree.TreeTempUrl&wbtreeid=1993" style="background-color:#ffc330"><img src="../assets/gongjijintiqu.png"/></a><span>公积金提取</span></div>
        <div><a href="https://gjhzc.ysu.edu.cn/cgcj1/ygcg_j_glbf.htm" style="background-color:#5a6abf"><img src="../assets/chuguoshenpi.png"/></a><span>出国审批</span></div>
        <div><a href="https://vis.ysu.edu.cn/index/sjxt.htm" style="background-color:#ff6830"><img src="../assets/shijuexingxiang.png"/></a><span>视觉形象</span></div>
      </div>
      
    </div>
    <div class="cato round">
      <p>网络服务</p>
      <div>
        <div><a href="javascript:;" style="background-color:#409eff"><img src="../assets/shimingrenzheng.png"/></a><span>实名认证</span></div>
      <div><a href="javascript:;" style="background-color:#7c46ff"><img src="../assets/yuanchengdenglu.png"/></a><span>远程登录</span></div>
      <div><a href="javascript:;"></a></div>
      <div><a href="javascript:;"></a></div>
      </div>
    </div>
    <div class="cato">
      <p>行政资源</p>
      <div>
        <div><a href="javascript:;" style="background-color:#ffc330"><img src="../assets/yinzhang.png"/></a><span>学校印章使用</span></div>
      </div>
      
    </div>
  </div>
</template>
<script>
export default {
  name:"oa",
  data:()=>({
    num:0
  }),
  computed:{
   user(){
     return JSON.parse(sessionStorage.getItem('userInfo'))
   },
  all(){
    return this.$store.state.all
  }
 },
 methods:{
   handleChangeType(type){
      this.$store.dispatch('changeType',type)
      this.$router.push({
        path:`/oa/${type}`
      })
    },
    gotoCheck(){
      this.$router.push({
        name:'mycheckneed'
      })
    } 
 },
 created(){
   let self = this
   
   this.$nextTick(function(){
           
           
            self.all.forEach(function(curVal,index){
                    curVal.myapprove.purchase.forEach(function(e,ind){
                    if(e.checkMen.indexOf(self.user.Tname) != -1){
                        
                        self.num+=1
                    }
                })
                curVal.myapprove.kpi.forEach(function(e,ind){
                    if(e.checkMen.indexOf(self.user.Tname) != -1){
                       
                         self.num+=1
                    }
                })
                curVal.myapprove.genaral.forEach(function(e,ind){
                    if(e.checkMen.indexOf(self.user.Tname) != -1){
                       self.num+=1
                    }
                })
                curVal.myapprove.object.forEach(function(e,ind){
                    if(e.checkMen.indexOf(self.user.Tname) != -1){
                        self.num+=1
                    }
                })
                curVal.myrest.forEach(function(e,ind){
                    if(e.checkMen.indexOf(self.user.Tname) !== -1){
                         self.num+=1
                    }
                })
                })
      })
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
    >img{
      width: 36px;
      height: 36px;
    }
    
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

