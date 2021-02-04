import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import MyComponent from './components'
import FontAwesome from './components/fontawosome'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import FireInit from './store/fireInit'

import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(MyComponent)
Vue.use(FireInit)
Vue.component('font-icon', FontAwesome)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
