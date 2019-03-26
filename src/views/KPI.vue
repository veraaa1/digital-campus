<template>
  <div class="kpi">
    <h1>绩效自评</h1>
    <form action="">
        <label for="last">上月教学任务</label>
        <textarea name="" id="last" cols="30" rows="10"></textarea>
        <label for="real">实际完成教学任务</label>
        <textarea name="" id="real" cols="30" rows="10"></textarea>
        <label for="last">上月教学任务</label>
        <label for="finish-rate">任务达成率</label>
        <input type="text" id="finish-rate">
        <label for="self">上月教学任务自评</label>
        <textarea name="" id="self" cols="30" rows="10"></textarea>
        <label for="now">本月教学任务</label>
        <textarea name="" id="now" cols="30" rows="10"></textarea>
        <label for="plan">本月教学计划</label>
        <textarea name="" id="plan" cols="30" rows="10"></textarea>
        <span>审批人</span>
        <router-link to="/">添加审批人</router-link>
        <button type="submit">提交</button>
    </form>
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
    height: calc(100vh - 66px);
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