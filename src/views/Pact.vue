<template>
  <div class="pact">
    <h1>通用审批</h1>
    <form action="">
        <label for="contact-check">申请内容</label>
        <input type="text" name="" id="contact-check">
        <label for="detail-check">审批详情</label>
        <textarea name="" id="detail-check" cols="30" rows="10"></textarea>
        <label for="add-file">附件</label>
        <input type="file" name="" id="add-file">
        <span>审批人</span>
        <router-link to="/">添加审批人</router-link>
        <button type="submit">提交</button>
    </form>
  </div>
</template>
<script>
export default {
  name:"pact"
}
</script>
<style lang="scss" scoped>
.pact{
    width: 95%;
    margin: 0 auto;
    height: calc(100vh - 66px);
    overflow: hidden;
    overflow-y: auto;
    form{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
}
</style>