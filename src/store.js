import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    teacherCollections:null,
    all:null,
    checkStatus:false,
    checkNameArr:[]
  },
  mutations: {
    getTCollections(state,collections){
      console.log(collections);
      
      state.teacherCollections = collections
      console.log(state.teacherCollections);
      
    },
    getAll(state,all){
      state.all = all
    },
    check(state,status){
      state.checkStatus=status
    },
    checkNameArr(state,str){
      state.checkNameArr.push(str)
    },
    removeCheckName(state,item){
      state.checkNameArr=state.checkNameArr.filter((e)=>e!=item)
    },
    confirmPurchaseCheck(state,obj){
      state.teacherCollections.myapprove.push(obj)
    },
    addEvent(state,obj){
      state.teacherCollections.mydayliredords.push(obj)
      state.teacherCollections.mydayliredords=[...state.teacherCollections.mydayliredords]
    },
    deleteEvent(state,title){
      state.teacherCollections.mydayliredords=state.teacherCollections.mydayliredords.filter(e=>e.title != title)
    },
    autoAddCheck(state,item){
      if(state.checkNameArr.indexOf(item)===-1)
      state.checkNameArr.push(item)
    },
    // 审批通过
    passCheck(state,card){
      console.log(state.all.find(e=>e.id == card));
      
      state.all.find(e=>e.id == card).myapprove.find(e=>e.checkMen.indexOf(JSON.parse(sessionStorage.getItem('userInfo')).Tname)!= -1).checkStatus  = 1
      state.all = [...state.all]  
    }
  },
  actions: {

    getTCollections({commit}){
      axios.get(`http://localhost:3008/teacherCollections?Tpwd=${sessionStorage.getItem('Tpwd')}&TCardId=${sessionStorage.getItem('Tcard')}`).then(res=>{
        console.log(res.data)
        sessionStorage.setItem('userInfo',JSON.stringify(res.data[0]))
        commit('getTCollections',res.data[0])
      })
      
    },
    getAll({commit}){
      axios.get(`http://localhost:3008/teacherCollections`).then(res=>{
        commit('getAll',res.data)
      })
    },
    check({commit},status){
      commit('check',status)
    },
    checkNameArr({commit},Tname){
      commit('checkNameArr',Tname)
    },
    confirmPurchaseCheck({commit,state},obj){
      let newObj = state.all.find(e=>e.Tname===JSON.parse(sessionStorage.getItem('userInfo')).Tname)
      let approve=[...newObj.myapprove]
      approve.push(obj)
      axios.patch(`http://localhost:3008/teacherCollections/${JSON.parse(sessionStorage.getItem('userInfo')).id}`,{myapprove:approve}).then(res=>{
        commit('confirmPurchaseCheck',obj)
      })
    },
    addEvent({commit,state},obj){
      let newObj = state.all.find(e=>e.Tname===JSON.parse(sessionStorage.getItem('userInfo')).Tname)
      let dayliredords=[...newObj.mydayliredords]
      dayliredords.push(obj)
      axios.patch(`http://localhost:3008/teacherCollections/${JSON.parse(sessionStorage.getItem('userInfo')).id}`,{mydayliredords:dayliredords}).then(res=>{
        commit('addEvent',obj)
      })
    },
    deleteEvent({commit,state},title){
      let newObj = state.all.find(e=>e.Tname===JSON.parse(sessionStorage.getItem('userInfo')).Tname)
      let dayliredords=[...newObj.mydayliredords].filter(e=>e.title!=title)
      axios.patch(`http://localhost:3008/teacherCollections/${JSON.parse(sessionStorage.getItem('userInfo')).id}`,{mydayliredords:dayliredords}).then(res=>{
        commit('deleteEvent',title)
      })
      
    },
    removeCheckName({commit},item){
      commit('removeCheckName',item)
    },
    autoAddCheck({commit,state},type){
      axios.get(`http://localhost:3008/teacherCollections?TeachCareer=${type}`).then(res=>{
        const Tarr = res.data
        const randInd = Math.floor(Math.random(0,1)*Tarr.length)
        console.log(randInd);
        commit('autoAddCheck',Tarr[randInd].Tname)
      })
    },
    // 审批通过
    passCheck({commit,state},card){
      console.log(card);
      
      console.log(state.all.find(e=>e.id == card));
      
      state.all.find(e=>e.id == card).myapprove.find(e=>e.checkMen.indexOf(JSON.parse(sessionStorage.getItem('userInfo')).Tname)!= -1).checkStatus = 1
      state.all.find(e=>e.id == card).myapprove= [...state.all.find(e=>e.id == card).myapprove]
      axios.patch(`http://localhost:3008/teacherCollections/${card}`,{
        myapprove: [...state.all.find(e=>e.id == card).myapprove]
      }).then(res=>{
        commit('passCheck',card)
      })
    }
  }
});
