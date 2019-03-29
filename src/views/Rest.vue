<template>
    <div class="rest">
        <h1>请假</h1>
        <form action="">
            <label for="start">开始时间</label>
        <input type="text" name="" id="start" v-model="startTime" @focus="openStartPicker">
        <label for="end">结束时间</label>
        <input type="text" id="end" v-model="endTime" @focus="openEndPicker">
        <label for="days">请假天数</label>
        <input type="number" name="" id="days" v-model="restDays">
        <label for="reason">请假事由</label>
        <textarea name="" id="reason" cols="30" rows="10"></textarea>
        <button type="submit">提交</button>
        </form>
        
        <div class="date-picker">

            <mt-datetime-picker
                ref="picker"
                v-model="startTime"
                type="date"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日">
            </mt-datetime-picker>
            <mt-datetime-picker
                ref="picker2"
                v-model="endTime"
                type="date"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日">
            </mt-datetime-picker>
        </div>
    </div>
</template>

<script>
export default {
    name:'rest',
    data:()=>({
        startTime:'',
        endTime:'',
        pickerVisible:'',
        restDays:0
    }),
    methods:{
        openStartPicker() {
        this.$refs.picker.open();
      },
        openEndPicker() {
        this.$refs.picker2.open();
      }
    }
}
</script>

<style lang="scss" scoped>
.rest{
    width: 100vw;
    height: calc(100vh - 66px);
    overflow: hidden;
    overflow-y: auto;
    form{
        width: 90%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
    }    
 }
</style>
