<template>
    <div class="departMent">
        <mt-header title="燕山大学" fixed>
        <router-link to="/contact" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
       <mt-search v-model="value"></mt-search>
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
    lists:[],
    value:''
    
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
.mint-search{
  height: auto;
  margin-top: 40px;
  background-color: #eee;
}
.departMent{
  background-color: #eee;
   width: 100vw;
    height: calc(100vh - 66px - 40px -40px);
    overflow: hidden;
    overflow-y: auto;
    
   >ul{
  width: 100%;
  background-color: #fff;
  list-style: none;
  margin-top: 10px;
  >li{
    padding: 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    a{
        width: 100%;
        text-decoration: none;
        color: #111;
        display: flex;
        justify-content: space-between;
        color: #111
    }
  }
   }
}
</style>

