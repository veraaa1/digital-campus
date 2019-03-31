import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    teacherCollections:[],
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
    }
  }
});
