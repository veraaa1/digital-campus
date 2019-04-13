<template>
    <div class="idcard">
        <div class="show-banner">
            <img src="../assets/return.png" alt="" class="return" @click="returnBack">
            <img src="../assets/peopleImg.jpg" alt="" class="images">
            <div class="introduce">
                <h2>{{singlePerson.Tname}}</h2>
                <p>{{singlePerson.TeachCareer}}({{singlePerson.TeachDepartMent}})</p>
            </div>
        </div>
        <div>
            <p style="border-bottom:3px solid #409EFF;width:90px;text-align:center;margin-left:10px;font-size:20px;padding-bottom:5px;">职工名片</p>
            <ul class="list">
                <li>
                    <p>学校</p>
                   <p>{{singlePerson.Torgnization}}</p>
                </li>
                <li>
                    <p>姓名</p>
                    <p>{{singlePerson.Tname}}</p>
                </li>
                <li>
                    <p>电话</p>
                    <p>{{singlePerson.Tphone}}</p>
                </li>
                <li>
                    <p>邮箱</p>
                    <p>{{singlePerson.Temail}}</p>
                </li>
                <li>
                    <p>部门/学院</p>
                    <p>{{singlePerson.TeachDepartMent}}</p>
                </li>
                <li>
                    <p>职位</p>
                    <p>{{singlePerson.TeachCareer}}</p>
                </li>
            </ul>
        </div>
        <el-button type="primary" v-if="$store.state.checkStatus" href="javascript:;" @click="addCheck">添加为审批人</el-button>
    </div>
</template>

<script>
export default {
name:'idcard',
methods:{
    addCheck(){
        this.$store.dispatch('checkNameArr',this.singlePerson.Tname)
        this.$router.push({
            path:`/${this.$store.state.typeCheck}`
        })
    },
    returnBack(){
        window.history.go(-1)
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
.idcard{
  height:calc(100vh - 66px);
  overflow: hidden;
  overflow-y: auto;
  .show-banner{
      width: 100vw;
      position: relative;
      .images{
          width: 100%;
      }
      .return{
          position: absolute;
          left: 10px;
          top: 10px;
          z-index: 99;
          width: 32px;
          height: 32px;
      }
      .introduce{
          position: absolute;
          bottom: 20px;
          left: 10px;
          p{
              color: #fff;
          }
          h2{
              color: #fff
          }
      }
  }
  .list{
      width: 100%;
      margin: 0 auto;
      list-style: none;
      li{
          padding: 10px;
          border-bottom: 1px solid #eee;
          p:first-child{
              font-size: 12px;
              color: #707070;
          }
      }
  }
}
</style>

