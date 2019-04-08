<template>
    <div class="check-detail">
        <mt-header title="我发起的" fixed>
            <router-link to="/oa/check" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="ul-lists">
            <ul v-if="lists.myapprove.purchase.length">
            <li v-for="approve in lists.myapprove.purchase" :key="approve.reason">
                <div>
                    <p>{{approve.reason}}</p>
                    <p>{{approve.deadDate}}</p>
                    <p>{{approve.pName}}</p>
                    <p>{{approve.pNum}}</p>
                    <p>{{approve.pPart}}</p>
                    <p>{{approve.pPrice}}</p>
                    <p>{{approve.pSize}}</p>
                    <p>{{approve.pType}}</p>
                    <p>{{approve.payType}}</p>
                    <div>
                        <span>审批人：</span>
                        <p v-for="items in approve.checkMen" :key="items">{{approve.checkMen.indexOf(items)+1}}级审批人：{{items}}</p>
                    </div>
                    <p>{{approve.checkStatus?'已审批':'待审批'}}</p>
                </div>
            </li>
        </ul>
       <ul v-if="lists.myapprove.kpi.length">
                <li v-for="item in user.myapprove.kpi" :key="item.id">
                     <div>
                    <p>绩效审批单</p>
                    <p>上月绩效：{{item.finishRate}}</p>
                    <p>本月教学计划：{{item.curMonthTeachPlan}}</p>
                    <div>
                        <span>审批人：</span>
                        <p v-for="items in item.checkMen" :key="items">{{item.checkMen.indexOf(items)+1}}级审批人：{{items}}</p>
                    </div>
                    <p>{{item.checkStatus===-1?'未通过':item.checkStatus===1?'已审批':'待审批'}}</p>
                    
                </div>
                </li>
        </ul>
        <ul v-if="lists.myapprove.genaral.length">
            <li v-for="item in user.myapprove.genaral" :key="item.id">
                <p>通用审批单</p>
                <p>
                    {{item.content}}
                </p>
                <p>
                    {{item.detail}}
                </p>
                <div>
                        <span>审批人：</span>
                        <p v-for="items in item.checkMen" :key="items">{{item.checkMen.indexOf(items)+1}}级审批人：{{items}}</p>
                    </div>
                    <p>{{item.checkStatus===-1?'未通过':item.checkStatus===1?'已审批':'待审批'}}</p>
            </li>
        </ul>
         <ul v-if="lists.myrest.length">
            <li v-for="item in user.myrest" :key="item.id">
                <p>请假审批单</p>
                <p>
                    {{item.startTime}}
                </p>
                <p>
                    {{item.endTime}}
                </p>
                <p>{{
                    item.restReason}}</p>
                    <p>{{item.restDays}}天</p>
                <div>
                        <span>审批人：</span>
                        <p v-for="items in item.checkMen" :key="items">{{item.checkMen.indexOf(items)+1}}级审批人：{{items}}</p>
                    </div>
                    <p>{{item.checkStatus===-1?'未通过':item.checkStatus===1?'已审批':'待审批'}}</p>
            </li>
        </ul>
        </div>
        
    </div>
</template>

<script>
export default {
name:'checkDetail',
data:()=>({
    lists:null
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
    console.log(this.lists)
    this.$store.dispatch('getTCollections')
    this.$nextTick(function(){
        this.lists = this.$store.state.teacherCollections
    })
    
}
}
</script>

<style lang="scss" scoped>
.ul-lists{
    height: calc(100vh - 66px - 40px);
    overflow: hidden;
    overflow-y: auto;
    margin-top: 40px;
    li{
        border-bottom: 1px solid #ccc
    }
}
</style>
