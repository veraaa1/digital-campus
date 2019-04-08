import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./mint-ui"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import FullCalendar from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css'
import Chat from 'vue-beautiful-chat'
import scroll from 'vue-seamless-scroll'
Vue.config.productionTip = false;
Vue.use(Chat)
Vue.use(FullCalendar)
Vue.use(ElementUI);
Vue.use(scroll)
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount("#app");
