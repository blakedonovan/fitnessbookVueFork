import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue, IconsPlugin ,BootstrapVueIcons} from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import store from "@/store/index.js"

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

Vue.use(BootstrapVue);
Vue.config.productionTip = false
Vue.use(BootstrapVueIcons);
Vue.use(VueAxios, axios)

new Vue({

BootstrapVue,
IconsPlugin,
  router,
  store,
 VueAxios,
 VueApexCharts,

  render: h => h(App)
}).$mount('#app')
