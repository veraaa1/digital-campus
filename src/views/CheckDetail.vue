<template>
    <div class="check-detail">
        <mt-header title="我发起的" fixed>
            <router-link to="/oa/check" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="noNews" v-if="isEmpty">
            <img src="../assets/no.jpg" alt="">
        </div>
        <div class="ul-lists" v-else>
            <ul v-if="lists.myapprove.purchase.length">
            <li v-for="approve in lists.myapprove.purchase" :key="approve.reason">
                <div class="check-title">
                    <img src="../assets/caigou.png" alt="">
                    <div>
                        <p>{{user.Tname}}的采购审批</p>
                        <p class="status">{{approve.checkStatus===-1?'未通过':approve.checkStatus===1?'已审批':'待审批'}}</p>
                    </div>
                </div>
                
                    <p><span>采购事由</span><span>{{approve.reason}}</span></p>
                    <p><span>期望交付日期</span><span>{{approve.deadDate}}</span></p>
                    <p><span>采购类型</span><span>{{approve.pType==='tools'?'教学工具':approve.pType==='books'?'教学书籍':approve.pType==='office'?'办公用品':'硬件设备'}}</span></p>
                    <p><span>名称</span><span>{{approve.pName}}</span></p>
                    <p><span>数量</span><span>{{approve.pNum}}</span></p>
                    <p><span>单位</span><span>{{approve.pPart}}</span></p>
                    <p><span>总价格</span><span>{{(approve.pPrice*approve.pNum).toFixed(2)}}元</span></p>
                    <p><span>规格</span><span>{{approve.pSize}}</span></p>
                    <p><span>支付方式</span><span>{{approve.payType ==='alipay'?'支付宝':approve.payType ==='wepay'?'微信支付':approve.payType ==='money'?'现金':'银行汇款'}}</span></p>
                
                <div class="check-men">
                        
                        <p v-for="items in approve.checkMen" :key="items">{{approve.checkMen.indexOf(items)+1}}级审批人：{{items}}</p>
                    </div>
            </li>
        </ul>
       <ul v-if="lists.myapprove.kpi.length">
                <li v-for="item in user.myapprove.kpi" :key="item.id">
                    <div class="check-title">
                    <img src="../assets/jixiao.png" alt="">
                    <div>
                        <p>{{user.Tname}}的绩效审批</p>
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
                    <div class="check-men">
                        
                        <p v-for="items in item.checkMen" :key="items">{{item.checkMen.indexOf(items)+1}}级审批人：{{items}}</p>
                    </div>
                   </li>
        </ul>
        <ul v-if="lists.myapprove.genaral.length">
            <li v-for="item in user.myapprove.genaral" :key="item.id">
                <div class="check-title">
                    <img src="../assets/tongyong.png" alt="">
                    <div>
                        <p>{{user.Tname}}的通用审批</p>
                        <p class="status">{{item.checkStatus===-1?'未通过':item.checkStatus===1?'已审批':'待审批'}}</p>
                    </div>
                </div>
                <p>
                    <span>审批主题</span><span>{{item.content}}</span>
                </p>
                <p>
                    <span>审批详情</span><span>{{item.detail}}</span>
                </p>
                <div class="check-men">
                        <p v-for="items in item.checkMen" :key="items">{{item.checkMen.indexOf(items)+1}}级审批人：{{items}}</p>
                </div> 
            </li>
        </ul>
         <ul v-if="lists.myrest.length">
            <li v-for="item in user.myrest" :key="item.id">
                <div class="check-title">
                    <img src="../assets/qingjia.png" alt="">
                    <div>
                        <p>{{user.Tname}}的请假申报</p>
                        <p class="status">{{item.checkStatus===-1?'未通过':item.checkStatus===1?'已审批':'待审批'}}</p>
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
                <div class="check-men">
                        <p v-for="items in item.checkMen" :key="items">{{item.checkMen.indexOf(items)+1}}级审批人：{{items}}</p>
                    </div>
                   
            </li>
        </ul>
        </div>
        
    </div>
</template>

<script>
export default {
name:'checkDetail',
data:()=>({
    lists:null,
    isEmpty:true
}),
watch:{
    user(){
        this.lists = this.$store.state.teacherCollections
        console.log(this.lists);
        
    }
},
computed:{
    user(){
        return this.$store.state.teacherCollections
    }
},
created(){
    let self = this
    this.$store.dispatch('getTCollections')
    this.$nextTick(function(){
        self.lists = self.$store.state.teacherCollections
        console.log(self.lists)
        if(self.lists.myapprove.purchase.length == 0&& self.lists.myapprove.kpi.length==0&& self.lists.myapprove.genaral.length==0&&self.lists.myrest.length==0){
            self.isEmpty= true
        }else
        self.isEmpty = false
    })
    
}
}
</script>

<style lang="scss" scoped>
.check-detail{
    background-color: #f6f6f6;
}
.noNews{
    height: calc(100vh - 66px - 40px);
    overflow: hidden;
    overflow-y: auto;
    margin-top: 40px;
    background-color: #f6f6f6;
    display: flex;
    flex-direction: column;
    align-items: center;
    >img{
        width: 70%;
        margin: 0 auto;
        margin-top: 30%
    }
}
.ul-lists{
    height: calc(100vh - 66px - 40px);
    overflow: hidden;
    overflow-y: auto;
    margin-top: 40px;
    list-style: none;
    padding: 10px 0;
    li{
        
        background-color: #fff;
        width: 95%;
        margin: 0 auto;
        border-radius: 3px;
        box-shadow: 3px 3px 30px #eee;
        margin-bottom: 20px;
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
</style>
