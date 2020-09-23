import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

// 拖拽插件
import VueDND from 'awe-dnd'

//引入全局配置文件
import $conf from './common/config/config.js'
Vue.prototype.$conf = $conf;
Vue.use(VueDND);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
