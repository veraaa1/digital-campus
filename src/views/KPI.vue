<template>
  <div class="kpi">
    <mt-header title="绩效自评" fixed>
    <router-link to="/oa/check" slot="left">
        <mt-button icon="back">返回</mt-button>
    </router-link>
    <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="kpi-con">
      <el-form>
      <el-form-item label="审批人">
            <a @click="addCheckPerson">添加审批人</a>
        <ul>
            <li v-for="item in checkMenlists" :key="item">
                <p><span>{{item}}</span><span @click="removeCheck(item)">×</span></p>
            </li>
        </ul>
      </el-form-item>
      <el-form-item label="上月教学任务">
        <el-input type="textarea" v-model="kpiForm.lastMonthTeachMission"></el-input>
      </el-form-item>
      <el-form-item label="实际完成教学任务">
        <el-input type="textarea" v-model="kpiForm.lastMonthActualMission"></el-input>
      </el-form-item>
      <el-form-item label="任务达成率">
        <el-input type="text" v-model="kpiForm.finishRate"></el-input>
      </el-form-item>
      <el-form-item label="上月教学任务自评">
        <el-input type="textarea" v-model="kpiForm.lastMonthSelfEvaluation"></el-input>
      </el-form-item>
      <el-form-item label="本月教学任务">
        <el-input type="textarea" v-model="kpiForm.curMonthTeachMission"></el-input>
      </el-form-item> 
      <el-form-item label="本月教学计划">
        <el-input type="textarea" v-model="kpiForm.curMonthTeachPlan"></el-input>
      </el-form-item>  
      <el-button type="primary" @click="confirmKpi">提交</el-button>
    </el-form>
    </div>
    
  </div>
</template>
<script>
import {MessageBox} from 'mint-ui'
export default {
  name:"kpi",
  data:()=>({
      kpiForm:{
          id:new Date().getTime(),
          lastMonthTeachMission:'',
          lastMonthActualMission:'',
          finishRate:'',
          lastMonthSelfEvaluation:'',
          curMonthTeachMission:'',
          curMonthTeachPlan:'',
          checkMen:[],
          checkStatus:0
      }
  }),
   computed:{
      checkMenlists(){
          this.kpiForm.checkMen=[...this.$store.state.checkNameArr]
          return this.$store.state.checkNameArr
      },
      user(){
        return JSON.parse(sessionStorage.getItem('userInfo'))
      }
  },
  methods:{
    addCheckPerson(){
        this.$store.dispatch('check',true)
        this.$router.push({
            path:'/contact/department'
        })
    },
    removeCheck(item){
        this.$store.dispatch('removeCheckName',item)
    },
    confirmKpi(){
        console.log(this.kpiForm);
        this.$store.dispatch('confirmKPICheck',this.kpiForm)
        MessageBox.alert('您的绩效审批提交成功，已送达审批人','温馨提示').then(action => {
            this.$router.push({
                path:'/oa/check/mycreatecheck'
            })
        });
    },
  },
  mounted(){
      this.$store.dispatch('clearCheckMenList')
      this.$store.dispatch('getAll')
      this.$store.dispatch('getTCollections')
      if(!this.$store.state.checkNameArr.length)
      {
        console.log(111);
        
       var career = ''
        console.log(this.user.TeachDepartMent);
        if(this.user.TeachDepartMent==='总部'){
          career = '校长'
        }
        else if(this.user.TeachDepartMent.indexOf('部门')!==-1){
          career = this.user.TeachDepartMent.split('部门')[0]+'主管'

        }else if(this.user.TeachDepartMent.indexOf('学院')!==-1){
          const arr = ['院长','副院长','院长助理','系主任','副系主任','教授','副教授','讲师','见习讲师','助教']
          let ind = arr.indexOf(this.user.TeachCareer)
          if(ind){
            career = arr[ind-1]
          }else{
            career = '校长秘书'
          }
        }
        let department = this.user.TeachDepartMent
        console.log(career);
        
        this.$store.dispatch('autoAddCheck',{career,department})
      }
      
  }
}
</script>
<style lang="scss" scoped>
.kpi{
    width: 100vw;
    height: calc(100vh - 66px - 40px);
    margin-top: 40px;
    overflow: hidden;
    overflow-y: auto;
    form{
        width: 80%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
    }    
 }
</style>