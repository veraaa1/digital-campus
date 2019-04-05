<template>
  <div class="kpi">
    <mt-header title="绩效自评" fixed>
    <router-link to="/oa/check" slot="left">
        <mt-button icon="back">返回</mt-button>
    </router-link>
    <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="kpi-con">
      <el-form>
      <span>审批人</span>
      <router-link to="/">添加审批人</router-link>
      <el-form-item label="上月教学任务">
        <el-input type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="实际完成教学任务">
        <el-input type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="任务达成率">
        <el-input type="text"></el-input>
      </el-form-item>
      <el-form-item label="上月教学任务自评">
        <el-input type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="本月教学任务">
        <el-input type="textarea"></el-input>
      </el-form-item> 
      <el-form-item label="本月教学计划">
        <el-input type="textarea"></el-input>
      </el-form-item>  
      <el-button type="primary">提交</el-button>
    </el-form>
    </div>
    
  </div>
</template>
<script>
export default {
  name:"kpi"
}
</script>
<style lang="scss" scoped>
.kpi{
    width: 100vw;
    height: calc(100vh - 66px - 40px);
    margin-top: 40px;
    overflow: hidden;
    overflow-y: auto;
    form{
        width: 80%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
    }    
 }
</style>