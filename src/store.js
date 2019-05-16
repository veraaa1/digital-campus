import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    teacherCollections:null,
    all:null,
    checkStatus:false,
    checkNameArr:[],
    typeCheck:'',
    gotoWorkTime:null,
    leaveWorkTime:null
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
      state.teacherCollections.myapprove.puchase.push(obj)
    },
    addEvent(state,obj){
      state.teacherCollections.mydayliredords.push(obj)
      state.teacherCollections.mydayliredords=[...state.teacherCollections.mydayliredords]
    },
    deleteEvent(state,title){
      state.teacherCollections.mydayliredords=state.teacherCollections.mydayliredords.filter(e=>e.title != title)
    },
    // 自动匹配审批人
    autoAddCheck(state,{name,depart}){
      if(state.checkNameArr.indexOf(name)===-1)
      state.checkNameArr.push(name)
    },
    // 清空审批人列表
    clearCheckMenList(state){
      state.checkNameArr = []
    },
    // 审批通过
    passCheck(state,{card,reason,type}){
      // console.log(state.all.find(e=>e.id == card));
      // console.log(state.all.find(e=>e.id == card).myapprove.find(e=>e.reason == reason));
      if(type == 'myrest'){
        let item = state.all.find(e=>e.id == card).myrest[0]
        if(item.checkStatus.length<3){
          item.checkStatus.push(1)
          
        }
      }else{
        let item = state.all.find(e=>e.id == card).myapprove[type][0]
        item.checkStatus = 1
        
      }
      state.all = [...state.all]
      
    },
    // 驳回审批
    cancelCheck(state,{card,reason,type}){
      if(type == 'myrest'){
        let item = state.all.find(e=>e.id == card).myrest[0]
        if(item.checkStatus.length<3){
          item.checkStatus.push(-1)
          
        }
      }else{
      let item = state.all.find(e=>e.id == card).myapprove[type][0]
      item.checkStatus = -1
      }
      state.all = [...state.all] 
    },
    // 绩效审批添加
    confirmKPICheck(state,obj){
      state.teacherCollections.myapprove.kpi.push(obj)
    },
    // 通用审批添加
    confirmPact(state,obj){
      state.teacherCollections.myapprove.genaral.push(obj)
    },
    // 请假审批添加
    confirmRest(state,obj){
      state.teacherCollections.myrest.push(obj)
    },
    // 审批类型
    changeType(state,type){
      state.typeCheck = type
    },
    // 打卡函数
    dingTime(state,enter){
      console.log(enter)
      let obj = null
        if(!state.teacherCollections.myattendencerecords.length){
          obj = {
            go:enter,
            leave:'',
            status:0,
          }
          state.teacherCollections.myattendencerecords.push(obj)
          
        }else{
          state.teacherCollections.myattendencerecords[0].leave = enter
        }
        
       
        
      
    }
  },
  actions: {

    getTCollections({commit}){
      axios.get(`http://129.204.120.66:3088/teacherCollections?Tpwd=${sessionStorage.getItem('Tpwd')}&TCardId=${sessionStorage.getItem('Tcard')}`).then(res=>{
        console.log(res.data)
        sessionStorage.setItem('userInfo',JSON.stringify(res.data[0]))
        commit('getTCollections',res.data[0])
      })
      
    },
    getAll({commit}){
      axios.get(`http://129.204.120.66:3088/teacherCollections`).then(res=>{
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
      let approve={...newObj.myapprove}
      approve.purchase.push(obj)
      axios.patch(`http://129.204.120.66:3088/teacherCollections/${JSON.parse(sessionStorage.getItem('userInfo')).id}`,{myapprove:approve}).then(res=>{
        commit('confirmPurchaseCheck',obj)
      })
    },
    addEvent({commit,state},obj){
      let newObj = state.all.find(e=>e.Tname===JSON.parse(sessionStorage.getItem('userInfo')).Tname)
      let dayliredords=[...newObj.mydayliredords]
      dayliredords.push(obj)
      axios.patch(`http://129.204.120.66:3088/teacherCollections/${JSON.parse(sessionStorage.getItem('userInfo')).id}`,{mydayliredords:dayliredords}).then(res=>{
        commit('addEvent',obj)
      })
    },
    deleteEvent({commit,state},title){
      let newObj = state.all.find(e=>e.Tname===JSON.parse(sessionStorage.getItem('userInfo')).Tname)
      let dayliredords=[...newObj.mydayliredords].filter(e=>e.title!=title)
      axios.patch(`http://129.204.120.66:3088/teacherCollections/${JSON.parse(sessionStorage.getItem('userInfo')).id}`,{mydayliredords:dayliredords}).then(res=>{
        commit('deleteEvent',title)
      })
      
    },
    removeCheckName({commit},item){
      commit('removeCheckName',item)
    },
    // 自动匹配审批人
    autoAddCheck({commit,state},{career,department}){
      console.log(career,department);
      
      axios.get(`http://129.204.120.66:3088/teacherCollections?TeachCareer=${career}&TeachDepartMent=${department}`).then(res=>{
        const Tarr = res.data
        console.log(res.data)
        if(Tarr.length>1){
          const randInd = Math.floor(Math.random(0,1)*Tarr.length)
          let name = Tarr[randInd].Tname
          let depart = department
          commit('autoAddCheck',{name,depart})
        }else if(Tarr.length==1){
          let name = Tarr[0].Tname
          let depart = Tarr[0].TeachDepartMent
          console.log(name,depart);
          
          commit('autoAddCheck',{name,depart})
        }else{

        }
        
      })
    },
    // 清空审批人列表
    clearCheckMenList({commit}){
      commit('clearCheckMenList')
    },
    // 审批通过
    passCheck({commit,state},{card,reason,type}){
      console.log(card);
      console.log(reason,type);
      if(type !== 'genaral'){
        if(type === 'myrest'){
          let item = state.all.find(e=>e.id == card).myrest[0]
          console.log(item)
          item.checkStatus.push(1)
          
          delete item.checkName
          delete item.Tcard
        }else{
          let item = state.all.find(e=>e.id == card).myapprove[type][0]
          item.checkStatus = 1
          
          delete item.checkName
          delete item.Tcard
        }
      
      }else{
        let item = state.all.find(e=>e.id == card).myapprove[type].find(e=>e.id == reason)
      item.checkStatus = 1
      delete item.checkName
      delete item.Tcard
      }
      
      
      // state.all.find(e=>e.id == card).myapprove[type]= [...state.all.find(e=>e.id == card).myapprove[type]]
      // state.all= [...state.all]
      console.log(state.all.find(e=>e.id == card).myapprove[type]);
      if(type!=='genaral'){
        if(type ==='myrest'){
          axios.patch(`http://129.204.120.66:3088/teacherCollections/${card}`,{
        myrest: [...state.all.find(e=>e.id == card).myrest]
      }).then(res=>{
        commit('passCheck',{card,reason,type})
      })
        }else{
          axios.patch(`http://129.204.120.66:3088/teacherCollections/${card}`,{
            myapprove: {...state.all.find(e=>e.id == card).myapprove}
          }).then(res=>{
            commit('passCheck',{card,reason,type})
          })
        }
      }else{
        axios.patch(`http://129.204.120.66:3088/teacherCollections/${card}`,{
        myapprove: {...state.all.find(e=>e.id == card).myapprove}
      }).then(res=>{
        commit('passCheck',{card,reason,type})
      })
      }
    },
    // 驳回审批
    cancelCheck({commit,state},{card,reason,type}){
      if(type !== 'genaral'){
        if(type === 'myrest'){
          let item = state.all.find(e=>e.id == card).myrest[0]
          console.log(item)
          item.checkStatus.push(-1)
          delete item.checkName
          delete item.Tcard
        }else{
          let item = state.all.find(e=>e.id == card).myapprove[type][0]
          item.checkStatus = -1
          delete item.checkName
          delete item.Tcard
        }
      
      }else{
        let item = state.all.find(e=>e.id == card).myapprove[type].find(e=>e.id == reason)
      item.checkStatus = -1
      delete item.checkName
      delete item.Tcard
      }
      
      
      // state.all.find(e=>e.id == card).myapprove[type]= [...state.all.find(e=>e.id == card).myapprove[type]]
      state.all= [...state.all]
      console.log(state.all.find(e=>e.id == card).myapprove[type]);
      if(type!=='genaral'){
        if(type ==='myrest'){
          axios.patch(`http://129.204.120.66:3088/teacherCollections/${card}`,{
        myrest: [...state.all.find(e=>e.id == card).myrest]
      }).then(res=>{
        commit('passCheck',{card,reason,type})
      })
        }else{
          axios.patch(`http://129.204.120.66:3088/teacherCollections/${card}`,{
            myapprove: {...state.all.find(e=>e.id == card).myapprove}
          }).then(res=>{
            commit('passCheck',{card,reason,type})
          })
        }
      }else{
        axios.patch(`http://129.204.120.66:3088/teacherCollections/${card}`,{
        myapprove: {...state.all.find(e=>e.id == card).myapprove}
      }).then(res=>{
        commit('passCheck',{card,reason,type})
      })
      }
      // console.log(state.all.find(e=>e.id == card).myapprove[type]);
      // if(type !== 'genaral'){
      // let item = state.all.find(e=>e.id == card).myapprove[type][0]
      // item.checkStatus = -1
      // delete item.checkName
      // delete item.Tcard
      // }else{
      //   let item = state.all.find(e=>e.id == card).myapprove[type].find(e=>e.id === reason)
      // item.checkStatus = -1
      // delete item.checkName
      // delete item.Tcard
      // }
      // state.all.find(e=>e.id == card).myapprove[type]= [...state.all.find(e=>e.id == card).myapprove[type]]
      // axios.patch(`http://129.204.120.66:3088/teacherCollections/${card}`,{
      //   myapprove: {...state.all.find(e=>e.id == card).myapprove}
      // }).then(res=>{
      //   commit('cancelCheck',{card,reason,type})
      // })
    },
    // 绩效审批添加
    confirmKPICheck({commit,state},obj){
      let newObj = state.all.find(e=>e.Tname===JSON.parse(sessionStorage.getItem('userInfo')).Tname)
      let approve={...newObj.myapprove}
      approve.kpi.push(obj)
      console.log(approve);
      
      axios.patch(`http://129.204.120.66:3088/teacherCollections/${JSON.parse(sessionStorage.getItem('userInfo')).id}`,{myapprove:approve}).then(res=>{
        commit('confirmKPICheck',obj)
      })
    },
     // 通用审批添加
     confirmPact({commit,state},obj){
      let newObj = state.all.find(e=>e.Tname===JSON.parse(sessionStorage.getItem('userInfo')).Tname)
      let approve={...newObj.myapprove}
      approve.genaral.push(obj)
      console.log(approve);
      
      axios.patch(`http://129.204.120.66:3088/teacherCollections/${JSON.parse(sessionStorage.getItem('userInfo')).id}`,{myapprove:approve}).then(res=>{
        commit('confirmPact',obj)
      })
    },
    // 请假审批添加
    confirmRest({commit,state},obj){
      let newObj = state.all.find(e=>e.Tname===JSON.parse(sessionStorage.getItem('userInfo')).Tname)
      newObj.myrest.push(obj)
      let rest = [...newObj.myrest]
      console.log(rest,obj);
      
      axios.patch(`http://129.204.120.66:3088/teacherCollections/${JSON.parse(sessionStorage.getItem('userInfo')).id}`,{myrest:rest}).then(res=>{
        console.log(res.data);
        
        commit('confirmRest',obj)
      })
    },
    // 审批类型
    changeType({commit},type){
      commit('changeType',type)
    },
    // 打卡
    dingTime({commit,state},type){
      let timestamp = (new Date()).getTime().toString().substring(0,10);
      console.log(timestamp);
      axios.get(`https://restapi.amap.com/v4/geofence/status?key=7a9171ea2feb1523dc2468448c94bb8e&diu=${state.teacherCollections.TCardId.substring(0,15)}&locations=120.098710,30.301700,${timestamp}`).then(res=>{
       console.log(res.data.data.fencing_event_list[0].enter_time);
       
          commit('dingTime',res.data.data.fencing_event_list[0].enter_time)
        
      })
    }
  }
});
