<template>
    <div class="check">
        <mt-header title="我审批的" fixed>
            <router-link to="/oa/check/mycheck" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
         <div v-if="type==1" class="detail">
             <div class="check-title">
                        <img src="../assets/caigou.png" alt="">
                        <div>
                            <p>{{single.checkName}}的采购审批</p>
                            <p class="status">{{single.checkStatus===-1?'未通过':single.checkStatus===1?'已审批':'待审批'}}</p>
                        </div>
                    </div>
                    <p><span>采购事由</span><span>{{single.reason}}</span></p>
                    <p><span>期望交付日期</span><span>{{single.deadDate}}</span></p>
                    <p><span>采购类型</span><span>{{single.pType==='tools'?'教学工具':single.pType==='books'?'教学书籍':single.pType==='office'?'办公用品':'硬件设备'}}</span></p>
                    <p><span>名称</span><span>{{single.pName}}</span></p>
                    <p><span>数量</span><span>{{single.pNum}}</span></p>
                    <p><span>单位</span><span>{{single.pPart}}</span></p>
                    <p><span>总价格</span><span>{{(single.pPrice*single.pNum).toFixed(2)}}元</span></p>
                    <p><span>规格</span><span>{{single.pSize}}</span></p>
                    <p><span>支付方式</span><span>{{single.payType ==='alipay'?'支付宝':single.payType ==='wepay'?'微信支付':single.payType ==='money'?'现金':'银行汇款'}}</span></p>
                    <el-button @click="handlePass(single.id,single.reason,'purchase')" style="margin-left: 20%;">通过审批</el-button>
                    <el-button @click="handlecancel(single.id,single.reason,'purchase')">驳回审批</el-button>
        </div>
        
        <div v-if="type==2" class="detail">
            <div class="check-title">
                    <img src="../assets/jixiao.png" alt="">
                    <div>
                        <p>{{single.checkName}}的请假申报需您的审批</p>
                        <p class="status">{{single.checkStatus===-1?'未通过':single.checkStatus===1?'已审批':'待审批'}}</p>
                    </div>
                </div>
                    
                    <p><span>上月教学任务</span><span>{{single.lastMonthTeachMission}}</span>
                    </p>
                    <p><span>实际完成教学任务</span><span>{{single.lastMonthActualMission}}</span></p>
                    <p><span>任务达成率</span><span>{{single.finishRate}}</span></p>
                    <p><span>上月教学任务自评</span><span>{{single.lastMonthSelfEvaluation}}</span></p>
                    <p><span>本月教学任务</span><span>{{single.curMonthTeachMission}}</span></p>
                    <p><span>本月教学计划</span><span>{{single.curMonthTeachPlan}}</span></p>
                    
                     <el-button @click="handlePass(single.id,single.reason,'kpi')" style="margin-left: 20%;">通过审批</el-button>
                    <el-button @click="handlecancel(single.id,single.reason,'kpi')">驳回审批</el-button>
        </div>
        <div v-if="type==3" class="detail">
           <div class="check-title">
                    <img src="../assets/tongyong.png" alt="">
                    <div>
                        <p>{{single.checkName}}的通用审批</p>
                        <p class="status">{{single.checkStatus===-1?'未通过':single.checkStatus===1?'已审批':'待审批'}}</p>
                    </div>
                </div>
                    <p>
                    <span>审批主题</span><span>{{single.content}}</span>
                </p>
                <p>
                    <span>审批详情</span><span>{{single.detail}}</span>
                </p>
                     <el-button @click="handlePass(single.id,single.reason,'genaral')" style="margin-left: 20%;">通过审批</el-button>
                    <el-button @click="handlecancel(single.id,single.reason,'genaral')">驳回审批</el-button>
        </div>
        <div v-if="type==4" class="detail">
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
                <el-button @click="handlePass(single.id,single.reason,'myrest')" style="margin-left: 20%;">通过审批</el-button>
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
        single:null,
        type:1,
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
                         self.type=1
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
                         self.type=2
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
                         console.log(self.single.reason);
                         
                         self.checkList.push(self.single)
                         self.type=3
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
                         self.type=4
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
                         self.type=1
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
                         self.type=2
                    }
                })
                }
                else if(self.$route.params.reason.indexOf('pact*')!==-1)
                {
                    
                    curVal.myapprove.genaral.forEach(function(e,ind){
                        
                    if(e.id == self.$route.params.reason.split('pact*')[1] ){
                         console.log(e);
                         self.single = {...e}
                         self.single.checkName=curVal.Tname
                         self.single.Tcard = curVal.TCardId
                         self.single.id = curVal.id
                         self.single.reason = e.id
                         self.type=3
                    }
                })
                }else{
                    curVal.myrest.forEach(function(e,ind){
                        
                    if(e.id == self.$route.params.reason.split('rest*')[1] ){
                         console.log(e);
                         self.single = {...e}
                         self.single.checkName=curVal.Tname
                         self.single.Tcard = curVal.TCardId
                         self.single.id = curVal.id
                         self.type=4
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
        >button:first-child{
            margin-left: 20%
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
