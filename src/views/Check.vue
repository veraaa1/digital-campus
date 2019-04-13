<template>
  <div class="check">
    <mt-header title="审批" fixed>
            <router-link to="/oa" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="about-me">
          <router-link to="/oa/check/mycreatecheck"><img src="../assets/wofaqide.png"/><p>我发起的</p></router-link>
          <router-link to="/oa/check/mycheck">
          <img src="../assets/woshenpide.png" alt="">
          <p>我审批的</p>
          <!-- <mt-badge size="small">30</mt-badge> -->
          </router-link>
        </div>
    <div class="check-list">
        <a href="javascript:;" @click="handleChangeType('purchase')"><img src="../assets/caigou.png"/><span>采购审批</span></a>
        <a href="javascript:;" @click="handleChangeType('kpi')"><img src="../assets/jixiao.png"/><span>绩效自评</span></a>
        <a href="javascript:;" @click="handleChangeType('pact')"><img src="../assets/tongyong.png"/><span>通用审批</span></a>
    </div>
  </div>
</template>
<script>
export default {
  name:"check",
  methods:{
    handleChangeType(type){
      this.$store.dispatch('changeType',type)
      this.$router.push({
        path:`/${type}`
      })
    } 
  }
}
</script>
<style lang="scss" scoped>
a{
  padding: 10px;
}
.check{
    width: 100vw;
    height: calc(100vh - 66px - 40px);
    margin-top: 40px;
    overflow: hidden;
    overflow-y: auto;
    background-color: #eee;
    >.about-me{
      width: 100%;
      display: flex;
      justify-content: space-around;
      padding: 20px 0;
      background: #fff;
      >a{
        display: flex;
        align-items: center;
        flex-direction: column;
        text-decoration: none;
        color: #707070;
      }
    }
    .check-list{
      width: 100%;
      background-color: #fff;
      margin-top: 20px;
      >a{
        display: block;
        width: 100%;
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #707070;
        border-bottom: 1px solid #eee;
        span{
          padding-left: 20px
        }
      }
    }
}
</style>