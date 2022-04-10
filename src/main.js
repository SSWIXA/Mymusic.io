import Vue from 'vue'
import App from './App.vue'
import './style/reset.css';
import router from './router'
import store from './store'
import axios from 'axios';
import  './http/index.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.prototype.$axios=axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
router.beforeEach((to,from,next) =>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  next();
})