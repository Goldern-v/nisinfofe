import Vue from "Vue";
import sugarPage from "./components/sugar-page";
import "../../assets/css/flex.css";
import "@/assets/css/tinyreset.css";
import "@/assets/css/style.styl";
import "./style/print.styl";
/* eslint-disable no-new */

Vue.prototype.HOSPITAL_ID = process.env.HOSPITAL_ID;
Vue.prototype.HOSPITAL_NAME = process.env.HOSPITAL_NAME;
Vue.prototype.HOSPITAL_NAME_SPACE = process.env.HOSPITAL_NAME_SPACE;
import "@/plugin/tool/formDate";
new Vue({
  el: "#app",
  render: h => h(sugarPage)
});
