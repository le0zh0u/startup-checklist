import Vue from 'vue'
import i18n from './i18n'
import App from './App.vue'

import './styles/quasar.styl'
import iconSet from 'quasar/icon-set/fontawesome-v5.js'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import {
  Quasar, 
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QPageScroller,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QInput,
  QRadio,
  QScrollArea,
  QSeparator,
  QCard,
  QCardSection,
  Notify,
} from 'quasar'

Vue.use(Quasar, {
  config: {
    notify: { /* Notify defaults */ }
  },
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QPageScroller,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QInput,
    QRadio,
    QScrollArea,
    QSeparator,
    QCard,
    QCardSection,
  },
  directives: {
  },
  plugins: {
    Notify,
  },
  iconSet: iconSet
 })

Vue.config.productionTip = false

new Vue({
  i18n,
  ...App
}).$mount('#app')
