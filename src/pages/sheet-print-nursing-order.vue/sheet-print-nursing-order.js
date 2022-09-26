import Vue from 'vue'
import sheetPage from './components/sheet-page'
import '../../assets/css/flex.css'
import '@/assets/css/tinyreset.css'
import '@/assets/css/style.styl'
import './style/print.styl'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(sheetPage)
})
