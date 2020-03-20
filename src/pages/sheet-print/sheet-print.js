import Vue from "Vue";
import sheetPage from "./components/sheet-page";
import "../../assets/css/flex.css";
import "@/assets/css/tinyreset.css";
import "@/assets/css/style.styl";
import "./style/print.styl";

Vue.prototype.HOSPITAL_ID = process.env.HOSPITAL_ID;
Vue.prototype.HOSPITAL_NAME = process.env.HOSPITAL_NAME;
Vue.prototype.HOSPITAL_NAME_SPACE = process.env.HOSPITAL_NAME_SPACE;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(sheetPage)
});
