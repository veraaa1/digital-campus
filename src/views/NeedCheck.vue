<template>
    <div>
         <div>
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
                    <el-button @click="pass(single.id)">通过审批</el-button>
                    <el-button>驳回审批</el-button>
                </div>
    </div>
</template>

<script>
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
            console.log(this.all,this.user.Tname);
            var self =this
            this.all.forEach(function(curVal,index){
                curVal.myapprove.forEach(function(e,ind){
                    if(e.checkMen.indexOf(self.user.Tname) != -1){
                         e.checkName=curVal.Tname
                         e.Tcard = curVal.TCardId
                         e.id = curVal.id
                        self.checkList.push(e)
                    }
                })
                })
            this.single = this.checkList.find(e=>e.reason = this.$route.params.reason)
        }
    },
    methods:{
        pass(card){
            this.$store.dispatch('passCheck',card)
        }
    },
    created(){ 
        var self =this
        this.$nextTick(function(){
            self.all.forEach(function(curVal,index){
                curVal.myapprove.forEach(function(e,ind){
                    if(e.checkMen.indexOf(self.user.Tname) != -1){
                         e.checkName=curVal.Tname
                         e.Tcard = curVal.TCardId
                         e.id = curVal.id
                        self.checkList.push(e)
                    }
                })
                })
        this.single = this.checkList.find(e=>e.reason = this.$route.params.reason)
        console.log(this.checkList);
        
      })
    }
}
</script>

<style lang="scss" scoped>

</style>
