<template>
    <div>
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
            MessageBox.alert('您确定通过此审批？','温馨提示').then(action => {
            this.pass(card,reason,type)
        });
        },
        handlecancel(card,reason,type){
            MessageBox.alert('您确定驳回此审批？','温馨提示').then(action => {
            this.cancel(card,reason,type)
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
               
                    curVal.myapprove.genaral.forEach(function(e,ind){
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

</style>
