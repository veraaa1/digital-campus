<template>
    <div class="rest">
        <mt-header title="请假" fixed>
            <router-link to="/oa/check" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <el-form>
        <el-form-item label="开始时间">
            <el-input type="text" name="" id="start" v-model="startTime" @focus="openStartPicker"></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
            <el-input type="text" id="end" v-model="endTime" @focus="openEndPicker"></el-input>
        </el-form-item>
        <el-form-item label="请假天数">
            <el-input type="number" name="" id="days" v-model="restDays"></el-input>
        </el-form-item>
        <el-form-item label="请假事由">
            <el-input type="textarea" name="" id="reason" cols="30" rows="10"></el-input>
        </el-form-item>
        <el-button type="primary">提交</el-button>
        </el-form>
        
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
