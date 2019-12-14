import Vue from 'vue'
import App from './App.vue'
import  router  from './router/index'
import store from './store/index'
import "amfe-flexible" // 引入flexible
import './assets/icon/iconfont.css'
// import { } from 'mint-ui';  // 按需引入mint-ui。不需要引入样式，需要在Babel.config进行配置

// console.log(`run in ${process.env.NODE_ENV}`)
//设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.devtools = true;
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
