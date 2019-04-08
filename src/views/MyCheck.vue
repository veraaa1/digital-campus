<template>
    <div>
        <mt-header title="我审批的" fixed>
            <router-link to="/oa/check" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="my-check">
            <ul v-if="checkPurchaseList.length">
                <li v-for="item in checkPurchaseList" :key="item.reason">
                     <div>
                    <p>{{item.checkName}}的审批单：</p>
                    <p>{{item.reason}}</p>
                    <p>{{item.deadDate}}</p>
                    <p>{{item.pName}}</p>
                    <p>{{item.pNum}}</p>
                    <p>{{item.pPart}}</p>
                    <p>{{item.pPrice}}</p>
                    <p>{{item.pSize}}</p>
                    <p>{{item.pType}}</p>
                    <p>{{item.payType}}</p>
                    <p>{{item.checkStatus===-1?'未通过':item.checkStatus===1?'已审批':'待审批'}}</p>
                    <router-link :to="`/oa/check/checkdetail/needcheck/reason*${item.reason}`" :item="item" v-if="item.checkStatus==0">立即审批</router-link>
                </div>
                </li>
            </ul>
            <ul v-if="checkKpiList.length">
                <li v-for="item in checkKpiList" :key="item.id">
                     <div>
                    <p>{{item.checkName}}的审批单：</p>
                    <p>上月绩效：{{item.finishRate}}</p>
                    <p>本月教学计划：{{item.curMonthTeachPlan}}</p>
                    <p>{{item.checkStatus===-1?'未通过':item.checkStatus===1?'已审批':'待审批'}}</p>
                    <router-link :to="`/oa/check/checkdetail/needcheck/id*${item.id}`" :item="item" v-if="item.checkStatus==0">立即审批</router-link>
                </div>
                </li>
            </ul>
            <ul v-if="checkGenaralList.length">
                <li v-for="item in checkGenaralList" :key="item.id">
                     <div>
                    <p>{{item.checkName}}的审批单：</p>
                    <p>{{item.content}}</p>
                    <p>{{item.detail}}</p>
                    <p>{{item.file}}</p>
                    <p>{{item.checkStatus===-1?'未通过':item.checkStatus===1?'已审批':'待审批'}}</p>
                    <router-link :to="`/oa/check/checkdetail/needcheck/pact*${item.id}`" :item="item" v-if="item.checkStatus==0">立即审批</router-link>
                </div>
                </li>
            </ul>
            <ul v-if="checkRestList.length">
                <li v-for="item in checkRestList" :key="item.id">
                     <div>
                    <p>{{item.checkName}}的审批单：</p>
                    <p>{{item.startTime}}</p>
                    <p>{{item.endTime}}</p>
                    <p>{{item.restDays}}天</p>
                    <p>{{item.restReason}}</p>
                    <p>当前审批人:{{item.checkMen[0]}}</p>
                    <p>{{item.checkStatus===-1?'未通过':item.checkStatus===1?'已审批':'待审批'}}</p>
                    <!-- 如果当前级审批人等于本人则可以立即审批 -->
                    <router-link :to="`/oa/check/checkdetail/needcheck/pact*${item.id}`" :item="item" v-if="item.checkStatus==0">立即审批</router-link>
                </div>
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
        checkRestList:[]
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
            console.log(this.all,this.user.Tname);
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
                    if(e.checkMen.indexOf(self.user.Tname) === 0){
                        console.log(e);
                         e.checkName=curVal.Tname
                         e.Tcard = curVal.TCardId
                        self.checkRestList.push(e)
                    }
                })
                })
        }
    },
    created(){ 
        var self =this
        this.$nextTick(function(){
           
           
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
                    if(e.checkMen.indexOf(self.user.Tname) === 0){
                        console.log(e);
                         e.checkName=curVal.Tname
                         e.Tcard = curVal.TCardId
                        self.checkRestList.push(e)
                    }
                })
                })
      })
      console.log(self.checkPurchaseList,self.checkKpiListst);
    }
}
</script>

<style lang="scss" scoped>
.my-check{
    height: calc(100vh - 66px - 40px);
    overflow: hidden;
    overflow-y: auto;
    margin-top: 40px;
    li{
        border-bottom: 1px solid #ccc
    }
}
</style>
