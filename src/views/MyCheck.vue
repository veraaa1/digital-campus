<template>
    <div>
        <mt-header title="我审批的" fixed>
            <router-link to="/oa/check" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="my-check">
            <ul>
                <li v-for="item in checkList" :key="item.reason">
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
                    <p>{{item.checkStatus?'已审批':'待审批'}}</p>
                    <router-link :to="`/oa/check/checkdetail/needcheck/${item.reason}`" :item="item" v-if="item.checkStatus!=1">立即审批</router-link>
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
        checkList:[]
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
                curVal.myapprove.forEach(function(e,ind){
                    if(e.checkMen.indexOf(self.user.Tname) != -1){
                        e.checkName=curVal.Tname
                         e.Tcard = curVal.TCardId
                        self.checkList.push(e)
                    }
                })
                })
        }
    },
    created(){ 
        var self =this
        this.$nextTick(function(){
           
            self.all.forEach(function(curVal,index){
                    curVal.myapprove.forEach(function(e,ind){
                    if(e.checkMen.indexOf(self.user.Tname) != -1){
                        console.log(e);
                        
                         e.checkName=curVal.Tname
                         e.Tcard = curVal.TCardId
                        self.checkList.push(e)
                    }
                })
                
                
                })
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
    li{
        border-bottom: 1px solid #ccc
    }
}
</style>
