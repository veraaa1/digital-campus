<template>
  <div class="news">
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
      ws:null,
      departList:[],
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
   }
 },
 created(){
   this.$store.dispatch('getTCollections')
    this.$store.state.all.forEach(e=>{
      if(e.TeachDepartMent == this.user.TeachDepartMent){
        this.participants.push({
          id:e.TCardId,
          name:e.Tname,
          imageUrl:'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4'
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
}

</style>