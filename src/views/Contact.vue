<template>
  <div class="contact">
    <mt-search v-model="value"></mt-search>
    
    <ul>
      <li><h3>{{user.Torgnization}}</h3></li>
      <li><router-link to="/contact/department" class="part"><span>组织架构</span><span>></span></router-link></li>
      <li><p>所属部门</p><p>{{user.TeachDepartMent}}</p></li>
    </ul>
    <div class="people">
      <h3>常用联系人</h3>
      <ul>
        <li v-for="item in depart" :key="item.id">
          <span>{{item.TeachCareer}}</span>
          <span>{{item.Tname}}</span>
          <span>></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name:"contact",
  data:()=>({
    value:'',
    depart:[]
  }),
  computed:{
    user(){
      return JSON.parse(sessionStorage.getItem('userInfo'))
    }
  },
  created(){
    this.$store.dispatch('getAll')
    this.$store.state.all.forEach(e=>{if(e.TeachDepartMent == this.user.TeachDepartMent){
        console.log(1);
        
        this.depart.push(e)
      }})
  }
}
</script>
<style lang="scss" scoped>
.mint-search{
  height: auto;
}
.contact{
  background-color: #eee;
   width: 100vw;
    height: calc(100vh - 66px - 40px);
    overflow: hidden;
    overflow-y: auto;
}
.contact>ul{
  width: 100%;
  background-color: #fff;
  list-style: none;
  margin-top: 10px;
  >li{
    padding: 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
  }
  .part{
    width: 100%;
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    color: #111;
    :hover{
      color:#409EFF
    }
  }
}
.people{
  background-color: #fff;
  margin-top: 10px;
  >h3{
    padding: 10px;
  }
  ul{
    list-style: none;
    >li{
      padding: 15px;
      border-top: 1px solid #eee;
      >span:first-child{
        margin-right: 10px;
        background-color: #409EFF;
        padding: 0 5px;
        border-radius: 3px;
        color: #fff;
      }
      >span:last-child{
        padding-left: 202px;
       color: #ccc;
      }
    }
  }
}
</style>