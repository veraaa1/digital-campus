<template>
    <div>
       
        <ul v-if="department.length">
            <li v-for="item in department" :key="item">
                <router-link :to="`/contact/department/${item}`"><span>{{item}}</span><span>></span></router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
name:'department',
data:()=>({
    lists:[]
    
}),
computed:{
    department(){
        let arr=[]
        this.lists=[...this.$store.state.all]
        this.lists.forEach(function(val){
            if(arr.indexOf(val.TeachDepartMent)===-1){
                arr.push(val.TeachDepartMent)
            }
        })
        return arr
    }
},
methods:{

   
},
    created(){
        this.$store.dispatch('getAll')
    },
   

}
</script>

<style lang="scss" scoped>

</style>

