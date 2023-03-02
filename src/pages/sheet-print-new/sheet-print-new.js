import Vue from "Vue";
import ElementUI from 'element-ui';
Vue.use(ElementUI)
import sheetPage from "./components/sheet-page.vue";
import "../../assets/css/flex.css";
import "@/assets/css/tinyreset.css";
import "@/assets/css/style.styl";
import "@/assets/element-css/index.css";
import "./style/print.styl";
import MaskedInput from "@/plugin/vue-text-mask/src/vueTextMask";

Vue.prototype.HOSPITAL_ID = process.env.HOSPITAL_ID;
Vue.prototype.HOSPITAL_NAME = process.env.HOSPITAL_NAME;
Vue.prototype.HOSPITAL_NAME_SPACE = process.env.HOSPITAL_NAME_SPACE;
Vue.prototype.COMPANY_NAME = process.env.COMPANY_NAME;
Vue.prototype.ABOUT_INFO = process.env.ABOUT_INFO;
Vue.component("masked-input", MaskedInput);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(sheetPage)
});
