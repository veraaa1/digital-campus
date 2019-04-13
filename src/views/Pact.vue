<template>
  <div class="pact">
    <mt-header title="通用审批" fixed>
    <router-link to="/oa/check" slot="left">
        <mt-button icon="back">返回</mt-button>
    </router-link>
    <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="form-con">
      <el-form>
        <el-form-item label="审批人">
            <a @click="addCheckPerson">添加审批人</a>
        <ul>
            <li v-for="item in checkMenlists" :key="item">
                <p><span>{{item}}</span><span @click="removeCheck(item)">×</span></p>
            </li>
        </ul>
      </el-form-item>
        <el-form-item label="申请内容">
          <el-input type="text" v-model="genaralForm.content"></el-input>
        </el-form-item>
        <el-form-item label="审批详情">
          <el-input type="textarea" v-model="genaralForm.detail"></el-input>
        </el-form-item>
        <el-form-item label="附件">
          <el-input type="file" v-model="genaralForm.file"></el-input>
        </el-form-item>
        <el-button type="primary" @click="confirmPact">提交</el-button>
      </el-form>
    </div>
    
  </div>
</template>
<script>
import {MessageBox} from 'mint-ui'
export default {
  name:"pact",
  data:()=>({
    genaralForm:{
      id:new Date().getTime(),
      content:'',
      detail:'',
      file:'',
      checkMen:[],
      checkStatus:0
    }
  }),
  computed:{
      checkMenlists(){
          this.genaralForm.checkMen=[...this.$store.state.checkNameArr]
          return this.$store.state.checkNameArr
      },
       user(){
        return JSON.parse(sessionStorage.getItem('userInfo'))
      }
  },
  methods:{
    addCheckPerson(){
        this.$store.dispatch('check',true)
        this.$router.push({
            path:'/contact/department'
        })
    },
    removeCheck(item){
        this.$store.dispatch('removeCheckName',item)
    },
    confirmPact(){
        console.log(this.genaralForm);
        this.$store.dispatch('confirmPact',this.genaralForm)
        MessageBox.alert('温馨提示','您的审批提交成功，已送达审批人').then(action => {
            this.$router.push({
                path:'/oa/check/mycreatecheck'
            })
        });
    },
  },
  mounted(){
    if(this.$store.state.typeCheck!=='pact')
    this.$store.dispatch('clearCheckMenList')
  }
}
</script>
<style lang="scss" scoped>
.form-con{
    width: 95%;
    margin: 0 auto;
    height: calc(100vh - 66px -40px);
    margin-top: 40px;
    overflow: hidden;
    overflow-y: auto;
    
}
</style>