<template>
    <div class="rest">
        <mt-header title="请假" fixed>
            <router-link to="/oa/check" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <el-form>
            <el-form-item label="审批人">
                <a @click="addCheckPerson">添加审批人</a>
                <ul>
                    <li v-for="item in checkMenlists" :key="item">
                        <p><span>{{item}}</span><span @click="removeCheck(item)">×</span></p>
                    </li>
                </ul>
            </el-form-item>
        <el-form-item label="开始时间">
            <el-input type="text" name="" id="start" v-model="restForm.startTime" @focus="openStartPicker"></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
            <el-input type="text" id="end" v-model="restForm.endTime" @focus="openEndPicker"></el-input>
        </el-form-item>
        <el-form-item label="请假天数">
            <el-input type="number" name="" id="days" v-model="restForm.restDays"></el-input>
        </el-form-item>
        <el-form-item label="请假事由">
            <el-input type="textarea" name="" id="reason" cols="30" rows="10" v-model="restForm.restReason"></el-input>
        </el-form-item>
        <el-button type="primary" @click="confirmRest">提交</el-button>
        </el-form>
        
        <div class="date-picker">

            <mt-datetime-picker
                ref="picker"
                v-model="restForm.startTime"
                type="date"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                @confirm="handleConfirmStart"
                :startDate="pickerStart"
                >
            </mt-datetime-picker>
            <mt-datetime-picker
                ref="picker2"
                v-model="restForm.endTime"
                type="date"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                @confirm="handleConfirm"
                :startDate="pickerStart">
            </mt-datetime-picker>
        </div>
    </div>
</template>

<script>
import {MessageBox} from 'mint-ui'
export default {
    name:'rest',
    data:()=>({
        pickerVisible:'',
        pickerStart:new Date(),
        restForm:{
            id:new Date().getTime(),
            startTime:'',
            endTime:'',
            restDays:0,
            restReason:'',
            checkMen:[],
            checkStatus:[]
        }
    }),
    methods:{
        openStartPicker() {
        console.log(this.startTime);
        
        this.$refs.picker.open();
      },
        openEndPicker() {
        this.$refs.picker2.open();
      },
      handleConfirm (data) {
         this.restForm.endTime = `${data.getFullYear()}年${data.getMonth()+1}月${data.getDate()}日`;
     
    },
     handleConfirmStart (data) {
         this.restForm.startTime = `${data.getFullYear()}年${data.getMonth()+1}月${data.getDate()}日`;
     
    },
    addCheckPerson(){
        this.$store.dispatch('check',true)
        this.$router.push({
            path:'/contact/department'
        })
    },
    removeCheck(item){
        this.$store.dispatch('removeCheckName',item)
    },
    confirmRest(){
        console.log(this.restForm);
        this.$store.dispatch('confirmRest',this.restForm)
        MessageBox.alert('温馨提示','您的请假审批提交成功，已送达审批人').then(action => {
            this.$router.push({
                path:'/oa/check/mycreatecheck'
            })
        });
    },
    },
     computed:{
      checkMenlists(){
          this.restForm.checkMen=[...this.$store.state.checkNameArr]
          return this.$store.state.checkNameArr
      },
      user(){
          return JSON.parse(sessionStorage.getItem('userInfo'))
      }
  },
    mounted(){
        this.$store.dispatch('getAll')
        this.$store.dispatch('clearCheckMenList')
        
        console.log(this.user.TeachDepartMent);
        
         if(this.user.TeachDepartMent==='总部'){
            this.$store.dispatch('autoAddCheck',{career:'校长',department:'总部'})
         }else if(this.user.TeachDepartMent.indexOf('采购'||'财务')!==-1)
         {
             this.$store.dispatch('autoAddCheck',{career:this.user.TeachDepartMent.indexOf('采购')!==-1?'采购主管':'财务主管',department:this.user.TeachDepartMent.indexOf('采购')!==-1?'采购部门':'财务部门'})
            
         }else{
             let arr = ['院长','副院长','院长助理','系主任','系副主任','教授','副教授','讲师','见习讲师','助教']
             this.$store.dispatch('autoAddCheck',{
                        career:arr.indexOf(this.user.TeachCareer)>=3?arr[arr.indexOf(this.user.TeachCareer)-1]:arr[0],
                        department:this.user.TeachDepartMent
                    })
                    this.$store.dispatch('autoAddCheck',{
                        career:arr.indexOf(this.user.TeachCareer)>=3?arr[arr.indexOf(this.user.TeachCareer)-2]:arr[0],
                        department:this.user.TeachDepartMent
                    })
            this.$store.dispatch('autoAddCheck',{
                        career:arr.indexOf(this.user.TeachCareer)>=3?arr[arr.indexOf(this.user.TeachCareer)-3]:arr[0],
                        department:this.user.TeachDepartMent
                    })
         }
             
            
         
        
    }
}
</script>

<style lang="scss" scoped>
.rest{
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
