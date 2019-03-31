<template>
  <div class="daily">
    <h1>DING!</h1>
    <el-button>111</el-button>
    <Calendar
      v-on:choseDay="clickDay"
      v-on:changeMonth="changeDate"
      v-on:isToday="clickToday"
      :markDate="arr"
      :markDateMore="arr"
    ></Calendar>
  </div>
</template>
<script>
import Calendar from 'vue-calendar-component';
export default {
  name:"daily",
  components:{
    Calendar
  },
  data:()=>({
    arr:[{date:'2018/4/1',className:"mark1"}, {date:'2018/4/13',className:"mark2"}]
  }),
  methods:{
    clickDay(data) {
      console.log(data); //选中某天
    },
    changeDate(data) {
      console.log(data); //左右点击切换月份
    },
    clickToday(data) {
      console.log(data); //跳到了本月
    }

  }
}
</script>
<style lang="scss" scoped>

</style>