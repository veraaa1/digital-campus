<template>
  <div class="project">
    <h1>立项申请</h1>
    <form action="">
        <label for="pro-name">项目名称</label>
        <input type="text" id="pro-name">
        <label for="pro-con">项目概述</label>
        <input type="text" id="pro-con">
        <label for="goal">预期目标</label>
        <input type="text" id="goal">
        <div>
            <div class="birth">
            <span>期望交付日期</span>
            <div @click="openPicker">交付日期选择：{{deadDate}}</div>
        </div>
        <div class="datePicker">
            <mt-datetime-picker
                type="date"
                ref="picker"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                @confirm="handleConfirm"
                :startDate="startDate"
             >
            </mt-datetime-picker>
        </div>
        </div>
        <label for="people">人员需求</label>
        <input type="text" id="people">
        <label for="fund">资金需求</label>
        <input type="text" id="fund">
        <h4>预算明细</h4>
        <label for="pro-detail">预算内容</label>
        <input type="text" name="" id="pro-detail">
        <label for="pro-fund">预算金额</label>
        <input type="text" name="" id="pro-fund">
        <label for="progress">计划进度</label>
        <textarea name="" id="progress" cols="30" rows="10"></textarea>
        <label for="more">备注</label>
        <textarea name="" id="more" cols="30" rows="10" placeholder="请输入"></textarea>
        <span>审批人</span>
        <router-link to="/">添加审批人</router-link>
        <button type="submit">提交</button>
    </form>
  </div>
</template>
<script>
export default {
  name:"project",
  data:()=>({
      deadDate:"", 
      startDate: new Date('2019-01-01'),
  }),
  methods:{
      openPicker () {
     this.$refs.picker.open()
},
handleConfirm (data) {
     this.deadDate = `${data.getFullYear()}年${data.getMonth()+1}月${data.getDate()}日`;   //获取的时间为时间戳，getdata是自己写的一个转换时间的方法
},
  }
}
</script>
<style lang="scss" scoped>
.project{
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