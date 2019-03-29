import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    teacherCollections:[]
  },
  mutations: {
    getTCollections(state,collections){
      console.log(collections);
      
      state.teacherCollections = collections
      console.log(state.teacherCollections);
      
    }
  },
  actions: {

    getTCollections({commit},obj){
      console.log(obj);
      var self = this
      axios.get(`http://localhost:3008/teacherCollections?Tname=${obj.userName}&Tpwd=${obj.pwd}`).then(res=>{
        console.log(res.data)
        sessionStorage.setItem('userName',res.data[0].Tname)
        sessionStorage.setItem('pwd',res.data[0].Tpwd)
        commit('getTCollections',res.data)
        console.log(self)
        
       
      })
      
    }
  }
});
