import Vue from "vue";
import Router from "vue-router";
import Daily from "./views/Daily";
import Contact from './views/Contact'
import Me from './views/Me'
import News from './views/News'
import OA from './views/OA'
import Check from './views/Check'
import Purchase from './views/Purchase'
import KPI from './views/KPI'
import Pact from './views/Pact'
import Project from './views/Project'
import Login from './views/Login'
import Rest from './views/Rest'
import Attendence from './views/Attendence'
import Department from './views/DepartMent'
import Orgnization from './views/Orgnization'
import IDCard from './views/IDCard'
import CheckDetail from './views/CheckDetail'
import MyCheck from './views/MyCheck'
import NeedCheck from './views/NeedCheck'
Vue.use(Router);

const router=new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/oa",
      name: "oa",
      component:OA,
    },
    {
      path: "/me",
      name: "about",
      component:Me
    },
    
    {
      path: "/news",
      name: "news",
      component:News
    },
    {
      path: "/",
      name: "login",
      component:Login
    },
    {
      path: "/daily",
      name: "daily",
      component:Daily
    },
    {
      path: "/contact",
      name: "contact",
      component:Contact
    },
    {
      path: "/oa/check",
      name: "check",
      component:Check
    },
    {
      path: "/oa/rest",
      name: "rest",
      component:Rest
    },
    {
      path: "/oa/attendence",
      name: "attendence",
      component:Attendence
    },
    {
      path: "/purchase",
      name: "purchase",
      component:Purchase
    },
    {
      path: "/kpi",
      name: "kpi",
      component:KPI
    },
    {
      path:'/pact',
      name:'pact',
      component:Pact
    },
    {
      path:'/project',
      name:'project',
      component:Project
    },
    {
      path:'/contact/department',
      name:'department',
      component:Department
    },{
      path:'/contact/department/:org',
      name:'org',
      component:Orgnization
    },
    ,{
      path:'/contact/orgnization/:id',
      name:'id',
      component:IDCard
    },
    {
      path:'/oa/check/mycreatecheck',
      name:'mycheck',
      component:CheckDetail
    },{
      path:'/oa/check/mycheck',
      name:'mycheckneed',
      component:MyCheck
    },{
      path:'/oa/check/checkdetail/needcheck/:reason',
      component:NeedCheck
    }
  ]
});

export default router