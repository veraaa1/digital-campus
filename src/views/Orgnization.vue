<template>
<div class="org">
    <mt-header title="燕山大学" fixed>
        <router-link to="/contact" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
       <mt-search v-model="value"></mt-search>
       <ul>
        <li v-for="item in filterMember" :key="item.id">
            <router-link :to="`/contact/orgnization/${item.id}`"><p><span>{{item.Tname}}</span><span>{{item.TeachCareer}}</span></p></router-link>
        </li>
    </ul>
</div>
    
</template>

<script>
export default {
    name:'orgnization',
    data:()=>({
        all:null,
        value:'',
    }),
    computed:{
        user(){
            return JSON.parse(sessionStorage.getItem('userInfo'))
    },
    filterMember(){
        return this.all.filter(e=>e.TeachDepartMent == this.$route.params.org)
    }
    },
    created(){
        this.$store.dispatch('getAll')
        this.all = this.$store.state.all
    }
    
}
</script>
<style lang="scss" scoped>
.mint-search{
  height: auto;
  margin-top: 40px;
  background-color: #eee;
  z-index: 0;
}
.mint-searchbar{
    z-index: 0;
}
.org{
  background-color: #eee;
  height:calc(100vh - 66px - 40px);
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
        display: block;
        width: 100%;
        text-decoration: none;
        color: #111;
       >p{
        display: flex;
        justify-content: space-between;
        span:last-child{
            background-color: #409EFF;
            border-radius: 3px;
            padding: 0 5px;
            color: #fff;
            font-size: 14px;

        }
       }
    }
  }
   }
}
</style>

