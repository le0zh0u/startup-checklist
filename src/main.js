import Vue from 'vue'
import i18n from './i18n'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
