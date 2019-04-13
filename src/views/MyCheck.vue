<template>
    <div>
        <mt-header title="我审批的" fixed>
            <router-link to="/oa/check" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="noNews" v-if="isEmpty">
                <img src="../assets/no.jpg" alt="">
        </div>
        <div class="my-check" v-else>
            <ul v-if="checkPurchaseList.length">
                <li v-for="item in checkPurchaseList" :key="item.reason">
                     <div class="check-title">
                        <img src="../assets/caigou.png" alt="">
                        <div>
                            <p>{{item.checkName}}的采购审批</p>
                            <p class="status">{{item.checkStatus===-1?'未通过':item.checkStatus===1?'已审批':'待审批'}}</p>
                        </div>
                    </div>
                    <p><span>采购事由</span><span>{{item.reason}}</span></p>
                    <p><span>期望交付日期</span><span>{{item.deadDate}}</span></p>
                    <p><span>采购类型</span><span>{{item.pType==='tools'?'教学工具':item.pType==='books'?'教学书籍':item.pType==='office'?'办公用品':'硬件设备'}}</span></p>
                    <p><span>名称</span><span>{{item.pName}}</span></p>
                    <p><span>数量</span><span>{{item.pNum}}</span></p>
                    <p><span>单位</span><span>{{item.pPart}}</span></p>
                    <p><span>总价格</span><span>{{(item.pPrice*item.pNum).toFixed(2)}}元</span></p>
                    <p><span>规格</span><span>{{item.pSize}}</span></p>
                    <p><span>支付方式</span><span>{{item.payType ==='alipay'?'支付宝':item.payType ==='wepay'?'微信支付':item.payType ==='money'?'现金':'银行汇款'}}</span></p>
                    
                    <router-link :to="`/oa/check/checkdetail/needcheck/reason*${item.reason}`" :item="item" v-if="item.checkStatus==0">立即审批</router-link>
                </li>
            </ul>
            <ul v-if="checkKpiList.length">
                <li v-for="item in checkKpiList" :key="item.id">
                    <div class="check-title">
                        <img src="../assets/jixiao.png" alt="">
                        <div>
                            <p>{{item.checkName}}的绩效审批</p>
                            <p class="status">{{item.checkStatus===-1?'未通过':item.checkStatus===1?'已审批':'待审批'}}</p>
                        </div>
                    </div>
                    <p><span>上月教学任务</span><span>{{item.lastMonthTeachMission}}</span>
                    </p>
                    <p><span>实际完成教学任务</span><span>{{item.lastMonthActualMission}}</span></p>
                    <p><span>任务达成率</span><span>{{item.finishRate}}</span></p>
                    <p><span>上月教学任务自评</span><span>{{item.lastMonthSelfEvaluation}}</span></p>
                    <p><span>本月教学任务</span><span>{{item.curMonthTeachMission}}</span></p>
                    <p><span>本月教学计划</span><span>{{item.curMonthTeachPlan}}</span></p>
                    <router-link :to="`/oa/check/checkdetail/needcheck/id*${item.id}`" :item="item" v-if="item.checkStatus==0">立即审批</router-link>
                
                </li>
            </ul>
            <ul v-if="checkGenaralList.length">
                <li v-for="item in checkGenaralList" :key="item.id">
                      <div class="check-title">
                    <img src="../assets/tongyong.png" alt="">
                    <div>
                        <p>{{item.checkName}}的通用审批</p>
                        <p class="status">{{item.checkStatus===-1?'未通过':item.checkStatus===1?'已审批':'待审批'}}</p>
                    </div>
                </div>
                    <p>
                    <span>审批主题</span><span>{{item.content}}</span>
                </p>
                <p>
                    <span>审批详情</span><span>{{item.detail}}</span>
                </p>
                    
                    <router-link :to="`/oa/check/checkdetail/needcheck/pact*${item.id}`" :item="item" v-if="item.checkStatus==0">立即审批</router-link>
              
                </li>
            </ul>
            <ul v-if="checkRestList.length">
                <li v-for="item in checkRestList" :key="item.id">
                    
                    <div class="check-title">
                    <img src="../assets/qingjia.png" alt="">
                    <div>
                        <p>{{item.checkName}}的请假申报</p>
                        <p class="status">{{item.checkStatus.indexOf(-1)!==-1?'未通过':item.checkStatus.indexOf(0)!==-1?'待审批':(item.checkStatus.length != 3)?'待审批':'审批通过'}}</p>
                    </div>
                </div>
                <p>
                    <span>开始日期</span><span>{{item.startTime}}</span>
                </p>
                <p>
                    <span>结束日期</span><span>{{item.endTime}}</span>
                </p>
                <p><span>请假事由</span><span>{{item.restReason}}</span></p>
                    <p><span>请假天数</span><span>{{item.restDays}}天</span></p>
                    <p><span>当前审批人</span><span>{{
                        item.checkStatus.indexOf(-1)!==-1?'无效审批被驳回':item.checkStatus.length? item.checkStatus[item.checkStatus.length-1] === 0?item.checkMen[item.checkStatus.length-1]:item.checkMen[item.checkStatus.length]:item.checkMen[0]}}</span></p>
                    <!-- 如果当前级审批人等于本人则可以立即审批 -->
                    <router-link :to="`/oa/check/checkdetail/needcheck/rest*${item.id}`" :item="item" v-if="item.checkStatus.length<3 && (item.checkStatus.length !== item.checkMen.indexOf(user.Tname)+1)">立即审批</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:'myCheck',
    data:()=>({
        checkPurchaseList:[],
        checkKpiList:[],
        checkGenaralList:[],
        checkObjectList:[],
        checkRestList:[],
        isEmpty:true,
        lists:null
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
                curVal.myapprove.purchase.forEach(function(e,ind){
                    if(e.checkMen.indexOf(self.user.Tname) != -1){
                        e.checkName=curVal.Tname
                         e.Tcard = curVal.TCardId
                        self.checkPurchaseList.push(e)
                    }
                })
                curVal.myapprove.kpi.forEach(function(e,ind){
                    if(e.checkMen.indexOf(self.user.Tname) != -1){
                        console.log(e);
                         e.checkName=curVal.Tname
                         e.Tcard = curVal.TCardId
                        self.checkKpiList.push(e)
                    }
                })
                curVal.myapprove.genaral.forEach(function(e,ind){
                    if(e.checkMen.indexOf(self.user.Tname) != -1){
                        console.log(e);
                         e.checkName=curVal.Tname
                         e.Tcard = curVal.TCardId
                        self.checkGenaralList.push(e)
                    }
                })
                curVal.myapprove.object.forEach(function(e,ind){
                    if(e.checkMen.indexOf(self.user.Tname) != -1){
                        console.log(e);
                         e.checkName=curVal.Tname
                         e.Tcard = curVal.TCardId
                        self.checkObjectList.push(e)
                    }
                })
                curVal.myrest.forEach(function(e,ind){
                    if(e.checkMen.indexOf(self.user.Tname)!==-1){
                        console.log(e);
                         e.checkName=curVal.Tname
                         e.Tcard = curVal.TCardId
                        self.checkRestList.push(e)
                    }
                })
                })
                console.log(self.checkRestList);
                
                 if(self.checkPurchaseList.length == 0&& self.checkGenaralList.length==0&& self.checkKpiList.length==0&&self.checkRestList.length==0){
            
                self.isEmpty= true
                }else
                self.isEmpty = false
        }
    },
    created(){ 
        var self =this
        this.$store.dispatch('getTCollections')
        console.log(self.$store.state.teacherCollections);
        
        this.$nextTick(function(){
           
           self.lists = self.$store.state.teacherCollections
            self.all.forEach(function(curVal,index){
                    curVal.myapprove.purchase.forEach(function(e,ind){
                    if(e.checkMen.indexOf(self.user.Tname) != -1){
                        console.log(e);
                         e.checkName=curVal.Tname
                         e.Tcard = curVal.TCardId
                        self.checkPurchaseList.push(e)
                    }
                })
                curVal.myapprove.kpi.forEach(function(e,ind){
                    if(e.checkMen.indexOf(self.user.Tname) != -1){
                        console.log(e);
                         e.checkName=curVal.Tname
                         e.Tcard = curVal.TCardId
                        self.checkKpiList.push(e)
                    }
                })
                curVal.myapprove.genaral.forEach(function(e,ind){
                    if(e.checkMen.indexOf(self.user.Tname) != -1){
                        console.log(e);
                         e.checkName=curVal.Tname
                         e.Tcard = curVal.TCardId
                        self.checkGenaralList.push(e)
                    }
                })
                curVal.myapprove.object.forEach(function(e,ind){
                    if(e.checkMen.indexOf(self.user.Tname) != -1){
                        console.log(e);
                         e.checkName=curVal.Tname
                         e.Tcard = curVal.TCardId
                        self.checkObjectList.push(e)
                    }
                })
                curVal.myrest.forEach(function(e,ind){
                    if(e.checkMen.indexOf(self.user.Tname) !== -1){
                        console.log(e);
                         e.checkName=curVal.Tname
                         e.Tcard = curVal.TCardId
                        self.checkRestList.push(e)
                    }
                })
                })
                if(self.checkPurchaseList.length == 0&& self.checkGenaralList.length==0&& self.checkKpiList.length==0&&self.checkRestList.length==0){
            
                self.isEmpty= true
                }else
                self.isEmpty = false
      })
       
      
    
   
    }
}
</script>

<style lang="scss" scoped>
.my-check{
    height: calc(100vh - 66px - 40px);
    overflow: hidden;
    overflow-y: auto;
    margin-top: 40px;
    background-color: #f6f6f6;
      ul{
   
    list-style: none;
    padding: 10px 0;
    li{
        
        background-color: #fff;
        width: 95%;
        margin: 0 auto;
        border-radius: 3px;
        box-shadow: 3px 3px 30px #eee;
        margin-bottom: 20px;
        padding-bottom: 30px;
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
        >.check-men{
            border-top: 1px solid #eee;
            p{
                font-size: 12px;
                width: 90%;
                margin: 0 auto;
                padding: 10px 0;
            }
        }
    }
}
}
    .noNews{
    height: calc(100vh - 66px - 40px);
    overflow: hidden;
    overflow-y: auto;
    background-color: #f6f6f6;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    >img{
        width: 70%;
        margin: 0 auto;
        margin-top: 30%
    }
 
}
</style>
