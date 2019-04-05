<template>
  <div class="daily">
     <mt-header title="DING" fixed>
    <router-link to="/oa/check" slot="left">
        <mt-button icon="back">返回</mt-button>
    </router-link>
    <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <el-form action="">
      <el-form-item label="活动名称">
        <el-input v-model="currentVal"></el-input>
      </el-form-item>
    </el-form>
    <FullCalendar :events="user.mydayliredords" :config="config" @day-click="clickDay" @event-created="createEvent" @event-selected="onChange"/>
  </div>
</template>
<script>
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/locale/zh-cn'
import {MessageBox} from 'mint-ui'
export default {
  name:"daily",
  components:{
   FullCalendar
  },
  
  data:()=>({
    currentVal:'',
    events: [],
      config: {
        locale: 'zh-cn',
      },
  }),
  methods:{
    onChange(event, jsEvent, view){
     MessageBox('日程',`${event.title}`)
     
    },
    clickDay(data) {
      console.log(data._d.toLocaleDateString()); //选中某天
    },
    createEvent(event){
      event.title = this.currentVal
      event.resource = this.$store.state.teacherCollections.mydayliredords
      console.log(event);
      this.$store.dispatch('addEvent',{title:event.title,start:event.start,end:event.end,allDay:event.allDay})
    }
  },
  computed:{
   user(){
     return this.$store.state.teacherCollections?this.$store.state.teacherCollections:{}
   },
 },
 created(){
  //  this.events = [...this.user.mydayliredords]
 }
}
</script>
<style lang="scss" scoped>
.daily{
    height: calc(100vh - 66px - 40px);
    overflow: hidden;
    overflow-y: auto;
    margin-top: 40px;
}
</style>