<template>
    <div class="attendence">
         <mt-header title="DING" fixed>
        <router-link to="/oa" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <span v-if="ifOK" class="range">您的打卡范围以生成</span>
        <div>
            <p class="work"><span class="dote"></span>上班打卡</p>
            <button @click="dingTime('go')">上班打卡</button>
            <p class="time">上班打卡时间：{{goWork}}</p>
        </div>
         <div v-if="goWork">
            <p class="work"><span class="dote"></span>下班打卡</p>
            <button @click="dingTime('leave')">下班打卡</button>
            <p class="time">下班打卡时间：{{leaveWork}}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {MessageBox} from 'mint-ui'
export default {
name:'attendence',
data:()=>({
    goWork:'',
    leaveWork:'',
    ifOK:false
}),
computed:{
    user(){
        return this.$store.state.teacherCollections.myattendencerecords
    }
},
methods:{
    dingTime(type){
        this.$store.dispatch('dingTime','go')
        if(type=='go'){
             MessageBox('DING','上班咯！打卡成功～')
            this.goWork = this.user[0].go
        }else{
            MessageBox('DING','下班咯！打卡成功～')
            this.leaveWork = this.user[0].leave
        }
       
    }
},
mounted(){
    // 创建个创建围栏
    axios.post('https://restapi.amap.com/v4/geofence/meta?key=7a9171ea2feb1523dc2468448c94bb8e',{
        name:'同人精华',
        center:'120.098710,30.301700',
        radius:600,
        repeat: "Mon,Tues,Wed,Thur,Fri,Sat,Sun",
    }).then(res=>{
        console.log(res.data);
        this.ifOK = true
        // console.log(this.ifOk);
    })
}
}
</script>
<style lang="scss" scoped>
.attendence>div{
    padding:20px 0;

}
.range{
    width: 100%;
    display: block;
    text-align: center;
    font-size: 12px;
    color: #777;
    margin-top: 60px;
}
.dote{
    display: inline-block;
    width: 12px;
    height: 12px;
    background-color: #26a2ff;
    border-radius: 50%;
    margin-left: 50px;
    margin-right: 30px;
}
.work{
    color: #777;
    font-size: 14px;
}
.attendence>div button{
    margin: 0 auto;
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background:linear-gradient(#c2e0f7,#26a2ff);
    color:#fff;
    border:none;
    margin-top: 40px;
}
.time{
    width: 100%;
    text-align: center;
    color: #777;
    font-size: 15px;
    padding-top: 20px;
}
</style>

