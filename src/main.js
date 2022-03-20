import Vue from 'vue'
import App from './App.vue'
import store from './store'
import PaymentList from '@/components/PaymentList.vue'
import myPlugin from './plugins/myplugin'
import vuetify from './plugins/vuetify'

Vue.component('ListComponent', PaymentList)

Vue.use(myPlugin)

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
