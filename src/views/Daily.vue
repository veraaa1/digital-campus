<template>
  <div class="daily">
     <mt-header title="DING" fixed>
    <router-link to="/oa/check" slot="left">
        <mt-button icon="back">返回</mt-button>
    </router-link>
    <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <el-form action="">
      <el-form-item label="日程" style="width:80%;margin:0 auto;margin-bottom:20px;">
        <el-input v-model="currentVal"></el-input>
      </el-form-item>
    </el-form>
    <FullCalendar :events="user.mydayliredords" :config="config" @day-click="clickDay" @event-created="createEvent" @event-selected="onChange" ref="calendar"/>
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
     MessageBox.confirm(`当前日程为：${event.title}，确认要删除该日程吗？`,'日程').then(action => {
       if(action){
         this.$refs.calendar.$emit('removeEvent',event)
         this.handleDeleteEvent(event.title)         
       }else{

       }
       
      });
    },
    clickDay(data) {
      console.log(data._d.toLocaleDateString()); //选中某天
    },
    createEvent(event){
      if(this.currentVal.trim()){
        event.title = this.currentVal
      event.resource = this.$store.state.teacherCollections.mydayliredords
      console.log(event);
      this.$store.dispatch('addEvent',{title:event.title,start:event.start,end:event.end,allDay:event.allDay})
      }else{
        MessageBox('温馨提示','您还没有编辑日程内容哦～')
      } 
    },
    handleDeleteEvent(title){
      this.$store.dispatch('deleteEvent',title)
    }
  },
  computed:{
   user(){
     return this.$store.state.teacherCollections?this.$store.state.teacherCollections:{}
   },
 },
 created(){
  //  this.events = [...this.user.mydayliredords]
  this.$store.dispatch('getTCollections')
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
.fc-scroller .fc-day-grid-container{
  height: auto!important;
}
</style>