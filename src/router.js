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
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/oa",
      name: "oa",
      component:OA
    },
    {
      path: "/me",
      name: "about",
      component:Me
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
    }
  ]
});
