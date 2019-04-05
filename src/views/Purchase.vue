<template>
  <div class="purchase">
    <mt-header title="采购审批" fixed>
    <router-link to="/oa/check" slot="left">
        <mt-button icon="back">返回</mt-button>
    </router-link>
    <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <form action="">
        <span>审批人</span>
        <a @click="addCheckPerson">添加审批人</a>
        <ul>
            <li v-for="item in checkMenlists" :key="item">
                <p>{{item}}<span>×</span></p>
            </li>
        </ul>
        <label for="reason">申请事由</label>
        <el-input type="text" id="reason" v-model="purchaseForm.reason" placeholder="请输入申请事由" @blur="isEmpty(purchaseForm.reason)"></el-input>
        <label for="type">采购类型</label>
        <el-select name="" id="type" v-model="purchaseForm.pType">
            <el-option value="office" label="办公用品">办公用品</el-option>
            <el-option value="tools" label="教学工具">教学工具</el-option>
            <el-option value="books" label="教学书籍">教学书籍</el-option>
            <el-option value="hardware" label="硬件设备">硬件设备</el-option>
        </el-select>
        <div class="birth">
            <span>期望交付日期</span>
            <div @click="openPicker">交付日期选择：{{purchaseForm.deadDate}}</div>
        </div>
        <div class="datePicker">
            <mt-datetime-picker
                type="date"
                ref="picker"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                @confirm="handleConfirm"
                :startDate="purchaseForm.startDate"
             >
            </mt-datetime-picker>
        </div>
        <span>采购明细</span>
        <label for="name">名称</label>
        <el-input type="text" id="name" v-model="purchaseForm.pName" placeholder="请输入名称" @blur="isEmpty(purchaseForm.pName)"></el-input>
        <label for="size">规格</label>
        <el-input type="text" id="size" v-model="purchaseForm.pSize" placeholder="请输入规格" @blur="isEmpty(purchaseForm.pSize)"></el-input>
        <label for="number">数量</label>
        <el-input-number v-model="purchaseForm.pNum" @change="handleChange" :min="1" label="请输入数量" ></el-input-number>
        <label for="part">单位</label>
        <el-input type="text" id="part" v-model="purchaseForm.pPart" placeholder="请输入单位" @blur="isEmpty(purchaseForm.pPart)"></el-input>
        <label for="price">价格</label>
        <el-input type="text" id="price" v-model="purchaseForm.pPrice" placeholder="请输入价格"></el-input>
        <span>总价格:{{(purchaseForm.pNum* purchaseForm.pPrice).toFixed(2)}}元</span>
        <label for="pay-type">支付方式</label>
        <el-select name="" id="pay-type" v-model="purchaseForm.payType">
            <el-option value="money" label="现金">现金</el-option>
            <el-option value="bank" label="汇款">汇款</el-option>
            <el-option value="alipay" label="支付宝">支付宝</el-option>
            <el-option value="wepay" label="微信">微信</el-option>
        </el-select>
        <label for="more">备注</label>
        <el-input type="textarea" name="" id="more" cols="30" rows="10" v-model="purchaseForm.pMore" @blur="isEmpty(purchaseForm.pMore)"></el-input>

        <el-button type="primary" @click="confirmPurchase"
        >提交审批</el-button>
    </form>
  </div>
</template>
<script>
import {MessageBox} from 'mint-ui'
export default {
  name:"purchase",
  data:()=>({
      purchaseForm:{
          startDate: new Date(),
          reason:'',
          pType:'',
          deadDate:"", 
          pName:'',
          pSize:'',
          pNum:'',
          pPart:'',
          pPrice:'',
          payType:'',
          pMore:'',
          checkMen:[]
      }
  }),
  computed:{
      checkMenlists(){
          this.purchaseForm.checkMen=[...this.$store.state.checkNameArr]
          return this.$store.state.checkNameArr
      }
  },
  methods:{
      openPicker () {
     this.$refs.picker.open()
    },
    handleConfirm (data) {
     this.purchaseForm.deadDate = `${data.getFullYear()}年${data.getMonth()+1}月${data.getDate()}日`;   //获取的时间为时间戳，getdata是自己写的一个转换时间的方法
    },
    confirmPurchase(){
        console.log(this.purchaseForm);
        this.$store.dispatch('confirmPurchaseCheck',this.purchaseForm)
        MessageBox.alert('您的采购审批提交成功，已送达审批人','温馨提示').then(action => {
            this.$router.push({
                path:'/oa/check'
            })
        });
    },
    handleChange(value) {
        console.log(value);
      },
    isEmpty(val){
        if(!val){
            this.$message.error('不许为空哦');
        }
    },
    addCheckPerson(){
        this.$store.dispatch('check',true)
        this.$router.push({
            path:'/contact/department'
        })
    }
  },
  mounted(){
      this.$store.dispatch('getAll')
  }
}
</script>
<style lang="scss" scoped>
.purchase{
    height: calc(100vh - 66px - 40px);
    overflow: hidden;
    overflow-y: auto;
    margin-top: 40px;
    >form{
        display: flex;
        flex-direction: column
    }
}
</style>