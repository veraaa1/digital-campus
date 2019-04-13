<template>
    <div class="check">
        <mt-header title="我审批的" fixed>
            <router-link to="/oa/check/mycheck" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
         <div v-if="single.deadDate">
                    <p>{{single.checkName}}</p>
                    <p>{{single.Tcard}}</p>
                    <p>{{single.reason}}</p>
                    <p>{{single.deadDate}}</p>
                    <p>{{single.pName}}</p>
                    <p>{{single.pNum}}</p>
                    <p>{{single.pPart}}</p>
                    <p>{{single.pPrice}}</p>
                    <p>{{single.pSize}}</p>
                    <p>{{single.pType}}</p>
                    <p>{{single.payType}}</p>
                    <p>{{single.checkStatus===-1?'未通过':single.checkStatus===1?'已审批':'待审批'}}</p>
                    <el-button @click="handlePass(single.id,single.reason,'purchase')">通过审批</el-button>
                    <el-button @click="handlecancel(single.id,single.reason,'purchase')">驳回审批</el-button>
        </div>
        
        <div v-if="single.curMonthTeachPlan">
                    <p>{{single.checkName}}的审批单：</p>
                    <p>{{single.lastMonthTeachMission}}</p>
                    <p>{{single.lastMonthActualMission}}</p>
                    <p>上月绩效：{{single.finishRate}}</p>
                    <p>{{single.lastMonthSelfEvaluation}}</p>
                    <p>{{single.curMonthTeachMission}}</p>
                    <p>本月教学计划：{{single.curMonthTeachPlan}}</p>
                    <p>{{single.checkStatus===-1?'未通过':single.checkStatus===1?'已审批':'待审批'}}</p>
                     <el-button @click="handlePass(single.id,single.reason,'kpi')">通过审批</el-button>
                    <el-button @click="handlecancel(single.id,single.reason,'kpi')">驳回审批</el-button>
        </div>
        <div v-if="single.content">
            <p>{{single.checkName}}的审批单：</p>
            <p>{{single.content}}</p>
            <p>{{single.detail}}</p>
            <p>{{single.file}}</p>
            <p>{{single.checkStatus===-1?'未通过':single.checkStatus===1?'已审批':'待审批'}}</p>
                     <el-button @click="handlePass(single.id,single.reason,'genaral')">通过审批</el-button>
                    <el-button @click="handlecancel(single.id,single.reason,'genaral')">驳回审批</el-button>
        </div>
        <div v-if="single.restReason" class="detail">
             <div class="check-title">
                    <img src="../assets/qingjia.png" alt="">
                    <div>
                        <p>{{single.checkName}}的请假申报需您的审批</p>
                        <p class="status">{{single.checkStatus.indexOf(-1)!==-1?'未通过':single.checkStatus.indexOf(0)!==-1?'待审批':(single.checkStatus.length != 3)?'待审批':'审批通过'}}</p>
                    </div>
                </div>
                <p>
                    <span>开始日期</span><span>{{single.startTime}}</span>
                </p>
                <p>
                    <span>结束日期</span><span>{{single.endTime}}</span>
                </p>
                <p><span>请假事由</span><span>{{single.restReason}}</span></p>
                    <p><span>请假天数</span><span>{{single.restDays}}天</span></p>
                <p><span>当前审批人</span><span>{{single.checkStatus.indexOf(-1)!==-1?'无效审批被驳回':single.checkStatus.length? single.checkStatus[single.checkStatus.length-1] === 0?single.checkMen[single.checkStatus.length-1]:single.checkMen[single.checkStatus.length]:single.checkMen[0]}}</span></p>
                <el-button @click="handlePass(single.id,single.reason,'myrest')">通过审批</el-button>
                    <el-button @click="handlecancel(single.id,single.reason,'myrest')">驳回审批</el-button>
        </div>
    </div>
</template>

<script>
import {MessageBox} from 'mint-ui'
export default {
name:'needCheck',
 data:()=>({
        checkList:[],
        single:null
    }),
computed:{
        user(){
            return JSON.parse(sessionStorage.getItem('userInfo'))
        },
        all(){
        return this.$store.state.all
        }
    },
    watch:{
        all(){
            var self =this
            this.all.forEach(function(curVal,index){
               if(self.$route.params.reason.indexOf('reason*')!==-1)
               {
                 
                    curVal.myapprove.purchase.forEach(function(e,ind){
                    if(e.reason ==self.$route.params.reason.split('reason*')[1] ){
                         console.log(e);
                         self.single = {...e}
                         self.single.checkName=curVal.Tname
                         self.single.Tcard = curVal.TCardId
                         self.single.id = curVal.id
                         self.checkList.push(self.single)
                    }
                })
               }
                else if(self.$route.params.reason.indexOf('id*')!==-1)
                    curVal.myapprove.kpi.forEach(function(e,ind){
                    if(e.id ==self.$route.params.reason.split('id*')[1] ){
                         console.log(e);
                         self.single = {...e}
                         self.single.checkName=curVal.Tname
                         self.single.Tcard = curVal.TCardId
                         self.single.id = curVal.id
                         self.single.reason = e.id
                         self.checkList.push(self.single)
                    }
                })
                else if(self.$route.params.reason.indexOf('pact*')!==-1)
                    curVal.myapprove.genaral.forEach(function(e,ind){
                    if(e.id ==self.$route.params.reason.split('pact*')[1] ){
                         console.log(e);
                         self.single = {...e}
                         self.single.checkName=curVal.Tname
                         self.single.Tcard = curVal.TCardId
                         self.single.id = curVal.id
                         self.single.reason = e.id
                         self.checkList.push(self.single)
                    }
                })
                else{
                    curVal.myrest.forEach(function(e,ind){
                        if(e.id ==self.$route.params.reason.split('rest*')[1] ){
                         console.log(e);
                         self.single = {...e}
                         self.single.checkName=curVal.Tname
                         self.single.Tcard = curVal.TCardId
                         self.single.id = curVal.id
                         self.single.reason = e.id
                         self.checkList.push(self.single)
                    }
                    })
                }
                })
                
            
        }
    },
    methods:{
        pass(card,reason,type){
            // console.log(reason);
            
            this.$store.dispatch('passCheck',{card,reason,type})
        },
        cancel(card,reason,type){
            this.$store.dispatch('cancelCheck',{card,reason,type})
        },
        handlePass(card,reason,type){
            MessageBox.alert('温馨提示','您确定通过此审批？').then(action => {
            this.pass(card,reason,type)
            this.$router.push({
                name:'mycheckneed'
            })
        });
        },
        handlecancel(card,reason,type){
            MessageBox.alert('温馨提示','您确定驳回此审批？').then(action => {
            this.cancel(card,reason,type)
            this.$router.push({
                name:'mycheckneed'
            })
        });
        }
    },
    created(){ 
        var self =this
        console.log(self.$route.params.reason.indexOf('id*'),self.$route.params.reason.indexOf('reason*'));
        
        this.$nextTick(function(){
            self.all.forEach(function(curVal,index){
                if(self.$route.params.reason.indexOf('reason*')!==-1){
                    curVal.myapprove.purchase.forEach(function(e,ind){
                    if(e.reason ==self.$route.params.reason.split('reason*')[1] ){
                         console.log(e);
                         self.single = {...e}
                         self.single.checkName=curVal.Tname
                         self.single.Tcard = curVal.TCardId
                         self.single.id = curVal.id
                    }
                })
                }
                
                else if(self.$route.params.reason.indexOf('id*')!==-1)
                {
               
                    curVal.myapprove.kpi.forEach(function(e,ind){
                    if(e.id ==self.$route.params.reason.split('id*')[1] ){
                         console.log(e);
                         self.single = {...e}
                         self.single.checkName=curVal.Tname
                         self.single.Tcard = curVal.TCardId
                         self.single.id = curVal.id
                    }
                })
                }
                else if(self.$route.params.reason.indexOf('pact*')!==-1)
                {
               
                    curVal.myrest.forEach(function(e,ind){
                        console.log(e.id);
                        
                    if(e.id ==self.$route.params.reason.split('pact*')[1] ){
                         console.log(e);
                         self.single = {...e}
                         self.single.checkName=curVal.Tname
                         self.single.Tcard = curVal.TCardId
                         self.single.id = curVal.id
                    }
                })
                }
                    
                })
        
      })
    }
}
</script>

<style lang="scss" scoped>
.check{
    height: calc(100vh - 66px);
    overflow: hidden;
    overflow-y: auto;
    background-color: #f6f6f6;
   
    }
.detail{
        
        background-color: #fff;
        width: 95%;
        margin: 0 auto;
        border-radius: 3px;
        box-shadow: 3px 3px 30px #eee;
        margin-bottom: 20px;
        padding-bottom: 30px;
        margin-top: 30%;
        >a{
            display: block;
            width: 30%;
            margin: 0 auto;
            background: #ff7400;
            color: #fff;
            padding: 3px 5px;
            border-radius: 3px;
            text-align: center;
            text-decoration: none;
            margin-left: 60%;
            margin-top: 20px;
        }
        .check-title{
            width: 100%;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #eee;
            padding: 10px;
            >div{
                padding-left: 10px;
            }
            .status{
                font-size: 12px;
                color: #707070
            }
        }
        >p{
            width: 90%;
            margin: 0 auto;
            padding: 5px;
            >span:first-child{
                color: #707070;
                font-size: 12px;
            }
            >span:last-child{
                padding-left: 20px;
                font-size: 12px;
            }
        }
}
</style>
