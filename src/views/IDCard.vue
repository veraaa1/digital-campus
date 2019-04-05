<template>
    <div>
        <p>{{singlePerson.Tname}}(工号：{{singlePerson.id}})</p>
        <p>{{singlePerson.TeachDepartMent}}</p>
        <p>{{singlePerson.TeachCareer}}</p>
        <p>{{singlePerson.Torgnization}}</p>
        <p>{{singlePerson.Temail}}</p>
        <p>{{singlePerson.Tphone}}</p>
        <p>{{singlePerson.Taddress}}</p>
        <a v-if="$store.state.checkStatus" href="javascript:;" @click="addCheck">添加为审批人</a>
    </div>
</template>

<script>
export default {
name:'idcard',
methods:{
    addCheck(){
        console.log(111);
        
        this.$store.dispatch('checkNameArr',this.singlePerson.Tname)
        this.$router.push({
            path:'/purchase'
        })
    }
},
computed:{
    singlePerson(){
        let arr = this.$store.state.all.filter(e=>e.id==this.$route.params.id)
        return arr[0]
    }
    
}
}

</script>
<style lang="scss" scoped>

</style>

