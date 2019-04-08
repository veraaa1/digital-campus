<template>
  <div class="news">
    <div class="title">
        <p>{{user.Tname}},欢迎您</p>
        <p>{{today}}</p>
        <h2>{{week}}</h2>
    </div>
    
    <div class="banner">
      <Swiper>
       <Slide>
           <img src="https://www.ysu.edu.cn/20190403.jpg" alt="">
       </Slide>
       <Slide>
            <img src="https://www.ysu.edu.cn/20190325.jpg" alt="">
       </Slide>
       <Slide>
            <img src="https://www.ysu.edu.cn/20190311.jpg" alt="">
       </Slide>
      </Swiper>
      
      <div class="gonggao">
        <img src="../assets/gonggao.png" alt="">
        <vue-seamless-scroll :data="listData" :class-option="optionSingleHeight" class="seamless-warp">
        
        <ul class="item">
            <li v-for="item in listData" @click="getData(item)" :key="item.title">
                <span class="title" v-text="item.title"></span><span class="date" v-text="item.date"></span>
            </li>
        </ul>
    </vue-seamless-scroll>
      </div>
    </div>
    <p style="border-bottom:3px solid #409EFF;width:90px;text-align:center;margin-left:10px;font-size:20px;padding-bottom:5px;">燕园系统</p>
    <div class="system">

            <el-button type="primary">个人主页</el-button>
            <el-button type="success">科研系统</el-button>
            <el-button type="warning">教务系统</el-button>
            <el-button type="danger">办公系统</el-button> 
    </div>
    <div class="new">
      <p style="border-bottom:3px solid #409EFF;width:90px;text-align:center;margin-left:10px;font-size:20px;padding-bottom:5px;">校园新闻</p>
      <ul class="news-list">
        <li v-for="item in newsList" :key="item.title">
          <a href="javascript:;">{{item.title}}</a>
          <p style="text-align:right;font-size:10px;color:#707070;margin-top:20px;">{{item.date}}</p>
          <img src="../assets/shoucang.png" alt="" v-if="!item.like" @click="item.like = true">
          <img src="../assets/shoucang (1).png" alt="" v-if="item.like" @click="item.like = false">
        </li>
      </ul>
    </div>
    <beautiful-chat
      :participants="participants"
      :titleImageUrl="titleImageUrl"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :open="openChat"
      :showEmoji="true"
      :showFile="true"
      :showTypingIndicator="showTypingIndicator"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :messageStyling="messageStyling" />
  </div>
</template>
<script>
import { Swiper, Slide } from 'vue-swiper-component';

export default {
  name:"news",
  components:{
    Swiper,
    Slide
  },
data() {
    return {
      
      listData: [{
                'title': '公告1',
                'date': '2017-12-16'
            }, {
                'title': '公告2',
                'date': '2017-12-16'
            }],
            
      newsList:[
        {
          title:'燕山大学主办中国工程教育专业认证辅导答疑会',
          date:'2019-04-04',
          like:false,
        },
         {
          title:'电气工程学院组织志愿者前往黑山窑小学支教',
          date:'2019-04-05',
          like:false,
         },
          {
          title:'河北省高校学报研究会常务理事会（扩大）九届四次会议在燕山大学召开',
          date:'2019-04-06',
          like:false,
        },
         {
          title:'校团委组织开展“美丽海岸 守护沙滩”创卫志愿服务活动',
          date:'2019-04-07',
          like:false,
        },
         {
          title:'燕山大学举办第十五届社团文化展示月开幕式',
          date:'2019-04-08',
          like:false,
        }

      ],
      ws:null,
      departList:[],
      today:'',
      week:'',
      participants: [
        // {
        //   id: 'user1',
        //   name: 'Matteo',
        //   imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4'
        // },
        // {
        //   id: 'user2',
        //   name: 'Support',
        //   imageUrl: 'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4'
        // }
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl: 'http://pic.baike.soso.com/p/20131108/20131108161106-1643559090.jpg',
      messageList: [
          // { type: 'text', author: `me`, data: { text: `Say yes!` } },
          // { type: 'text', author: `user1`, data: { text: `No.` } }
      ], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        launcher: {
          bg: '#4e8cff'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
    }
  },
  methods: {
    getData:function (item) {
                console.log(item.title);
            },
    sendMessage (text) {
      var self = this
      
      
      if (text.length > 0) {
        self.ws.send(JSON.stringify({
          message:text,
          type:'chat'
        }))
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : 
        this.newMessagesCount + 1
        // this.onMessageWasSent({ author: this.user.Tname, type: 'text', data: { text } })
      }
    },
    onMessageWasSent (message) {
      console.log(message);
      this.ws.send(JSON.stringify({
          message:message.data.text,
          type:'chat'
        }))
      // called when the user sends a message
      this.messageList = [ ...this.messageList, message ]
    },
    openChat () {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat () {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    },
    websocketonmessage(e){
      var data = JSON.parse(e.data);
 
                if(data.type === 'chatterList') {
                    
                    
                } else {
                  if(data.type == 'chat'&&data.name!==this.user.Tname)
                   this.messageList = [...this.messageList,{
                     type:'text',
                     author:data.name,
                     data:{text:data.message}
                   }]
                }
    }
  
},
watch:{
  
},
 computed:{
   user(){
     return this.$store.state.all?this.$store.state.all.find(e=>e.TCardId == sessionStorage.getItem('Tcard')):JSON.parse(sessionStorage.getItem('userInfo'))
   },
   optionSingleHeight () {
            return {
                //                       //（什么都不设置默认的）
                 singleHeight: 40,     //（带停顿的）
                waitTime:2500,         //（停顿时间）
                direction: 0  ,        //（从上往下的）
                // direction:2  ,         //（左右的）
                step:1   ,              //（调整速度的）0
                hoverStop:false        //(鼠标停留停止 离开继续运行（反之则停止）)
            }
        }
 },
 created(){
   let day = new Date()
   this.today = `${day.getMonth()+1}月${day.getDate()}日`
   let m = day.getDay()
   this.week = m===1?'Mon.':m===2?'Tues.':m===3?'Wed.':m===4?'Thurs':m===5?'Fri.':m===6?'Sat.':'Sun.'
   this.$store.dispatch('getTCollections')
    this.$store.state.all.forEach(e=>{
      if(e.TeachDepartMent == this.user.TeachDepartMent){
        this.participants.push({
          id:e.TCardId,
          name:e.Tname,
          imageUrl:'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4',
          career:e.TeachCareer
        })
    }})
    this.ws = new WebSocket('ws://129.204.120.66:3047');
    this.ws.onmessage = this.websocketonmessage
    var self = this
    this.ws.onopen = function () {
                self.ws.send(JSON.stringify({
                    name: self.user.Tname,
                    type: 'setname'
                }));
            }
 },
 
}
</script>
<style lang="scss" scoped>
.news{
  height:calc(100vh - 66px);
  overflow: hidden;
  overflow-y: auto;
  .banner img{
    width: 100vw;
  }
  .seamless-warp {
        width: 100%;
        height: 30px;
        overflow: hidden;
        line-height:30px;
        font-size: 12px;
    }
    .gonggao{
      width: 100vw;
      position: relative;
      >img{
        position: absolute;
        left: 10px;
        display: block;
        width: 20px;
        height: 20px;
        margin-top: 7px;
      }
      .item{
        padding-left: 50px;
        list-style: none;
      }
    }
    .system{
      width: 100vw;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 10px;
      margin: 0 auto;
    }
    .system .el-button{
      width: 150px;
      height: 150px;
      margin: 10px;
      font-size:18px;
    }
    .news-list{
      width: 100vw;
      list-style: none;
      padding-top: 10px;
      >li{
         box-shadow: 3px 3px 30px #eee;
         width: 90%;
         border-radius: 5px;
         margin: 0 auto;
         margin-bottom: 10px;
         padding: 5px;
         padding-bottom: 30px;
         position: relative;
         >a{
           color: #707070;
           text-decoration: none;
         }
         
         >img{
           width: 20px;
           height: 20px;
           position: absolute;
           bottom: 2px;
           right: 5px;
         }
      }
     
    }
}

</style>