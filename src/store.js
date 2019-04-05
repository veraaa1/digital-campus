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
    },
    autoAddCheck(state,item){
      if(state.checkNameArr.indexOf(item)===-1)
      state.checkNameArr.push(item)
    }
  },
  actions: {

    getTCollections({commit},obj){
      console.log(obj);
      var self = this
      axios.get(`http://localhost:3008/teacherCollections?Tname=${obj.userName}&Tpwd=${obj.pwd}`).then(res=>{
        console.log(res.data)
        sessionStorage.setItem('userInfo',JSON.stringify(res.data[0]))
        commit('getTCollections',res.data[0])
        console.log(self)
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
    }
  }
});
