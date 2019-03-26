<template>
  <div class="purchase">
    <h1>采购审批</h1>
    <form action="">
        <label for="reason">申请事由</label>
        <input type="text" id="reason">
        <label for="type">采购类型</label>
        <select name="" id="type">
            <option value="office">办公用品</option>
            <option value="tools">教学工具</option>
            <option value="books">教学书籍</option>
            <option value="hardware">硬件设备</option>
        </select>
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
        <span>采购明细</span>
        <label for="name">名称</label>
        <input type="text" id="name">
        <label for="size">规格</label>
        <input type="text" id="size">
        <label for="number">数量</label>
        <input type="number" name="" id="number">
        <label for="part">单位</label>
        <input type="text" id="part">
        <label for="price">价格</label>
        <input type="text" id="price">
        <span>总价格:</span>
        <label for="pay-type">支付方式</label>
        <select name="" id="pay-type">
            <option value="money">现金</option>
            <option value="bank">汇款</option>
            <option value="alipay">支付宝</option>
            <option value="wepay">微信</option>
        </select>
        <label for="more">备注</label>
        <textarea name="" id="more" cols="30" rows="10"></textarea>
        <span>审批人</span>
        <router-link to="/">添加审批人</router-link>
        <button type="submit">提交审批</button>
    </form>
  </div>
</template>
<script>
export default {
  name:"purchase",
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
.purchase{
    height: calc(100vh - 66px);
    overflow: hidden;
    overflow-y: auto;
    >form{
        display: flex;
        flex-direction: column
    }
}
</style>