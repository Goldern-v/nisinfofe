// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import "@/assets/element-css/index.css";
import ElementUI from "element-ui";
import { MessageBox, Message, Notification } from "element-ui";

import router from "./router";
// 工具
import "@/plugin/tool/formDate";
var _ = require("lodash");

import store from "./store";
// 日历控件
import "@/assets/vue-event-calendar/style.css";

import "@/assets/css/flex.css";
import "@/assets/font/iconfont.css";
import "@/assets/css/style.styl";
import "@/assets/css/tinyreset.css";
import VueParticles from "vue-particles";
Vue.use(VueParticles);

// 点击效果
require("vue-touch-ripple/component.css");
import VueTouchRipple from "vue-touch-ripple";
Vue.use(VueTouchRipple);

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

// modal
import { SweetModal, SweetModalTab } from "@/plugin/sweet-modal-vue";
Vue.component("SweetModal", SweetModal);
Vue.component("SweetModalTab", SweetModalTab);
// 注册
// 图表echar
import ECharts from "vue-echarts/components/ECharts.vue";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/gauge";
import "echarts/lib/chart/map";
import "echarts/lib/chart/radar";
import "echarts/lib/chart/scatter";
import "echarts/lib/chart/effectScatter";
import "echarts/lib/component/markLine";
import "echarts/lib/component/dataZoom";
import "echarts/lib/component/markArea";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";
import "echarts/lib/component/geo";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/visualMap";
Vue.component("chart", ECharts);
// 二维码生成插件
import VueQriously from "vue-qriously";
Vue.use(VueQriously);
var moment = require("moment");
moment.locale("zh-cn");
// swiper
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper);

import vImageError from "@/common/directives/v-image-error";
Vue.directive("image-error", vImageError);

import axios from "./api/axios";
// 数组方法
import "./plugin/tool/Array";
/* eslint-disable no-new */
import scroll from "@/plugin/vue-seamless-scroll/src/index";
Vue.use(scroll);
import bus from "vue-happy-bus";

// 自动更新模块
import autoUpdate from "@/plugin/autoUpdate/index.js";
autoUpdate();

// 开发接口调试工具
import devTools from "@/plugin/devTools/index.js";

// 消息框
import CRMessageBox from "@/plugin/vue-elementUI-message/index.js";
Vue.prototype.$CRMessageBox = CRMessageBox;

// 模拟后台接口工具
import "@/mock/mock.js";

// 格式化格子
import MaskedInput from "./plugin/vue-text-mask/src/vueTextMask";
Vue.component("masked-input", MaskedInput);

// websockt
import "@/plugin/webSocket";
// import io from 'socket.io-client'

// var socket = io('192.168.1.20:8963/crNursing/message');
//   socket.on('connect', function () {
//     console.log('connect')
//     socket.send('hi');

//     socket.on('message', function (msg) {
//       console.log(msg, 'msg')
//     });
//   });

// let ws=new WebSocket('ws://192.168.1.20:8963/crNursing/message');
/** 公共指令 */
import "./common/directives/common.directive";

/** 时间控件 */
import crDatePicker from "@/components/cr-date-picker/cr-date-picker";
Vue.component("cr-date-picker", crDatePicker);
//添加element-ui2.0表格组件
import { Table as EcrmTable, TableColumn as EcrmTableColumn} from 'ecrm-element-ui';
Vue.component('EcrmTable',EcrmTable)
Vue.component('EcrmTableColumn',EcrmTableColumn)
//组件
import VueContextMenu from 'vue-contextmenu'
Vue.use(VueContextMenu)
/** 环境变量 */
Vue.prototype.HOSPITAL_ID = process.env.HOSPITAL_ID;
Vue.prototype.HOSPITAL_NAME = process.env.HOSPITAL_NAME;
Vue.prototype.HOSPITAL_NAME_SPACE = process.env.HOSPITAL_NAME_SPACE;
let versionInfo = require("./version.json");

global.system = {
  软件名称: versionInfo["软件名称"],
  版本号: versionInfo["版本号"], //devTools.getLastPackagedDate(),
  最近打包时间: versionInfo["最近打包时间"], //devTools.getLastPackagedDate(),
  最近打包人员: versionInfo["最近打包人员"],
  proxyTable: versionInfo["proxyTable"] || "",
  关于: {
    研发单位: "广州宸瑞软件科技有限公司",
    电话: "020-81192725  |  020-81192726",
    邮箱: "gzcr@cr-health.com",
    地址: "广州市海珠区江南大道中180号富力天域中心1301-1314室",
    官网: "http://www.cr-health.com/",
    投递简历: "http://www.cr-health.com/jobs"
  },
  process: process,
  dev: devTools,
  tool: devTools
};

Vue.prototype.$system = global.system;



window.app = new Vue({
  el: "#app",
  data() {
    return {
      bus: bus(this)
    };
  },
  router,
  store,
  template: "<App/>",
  components: { App }
});
document.getElementById("nb-global-spinner").style.display = "none";
// 注册全局方法
Vue.prototype.$setCookie = function setCookie(name, value, expiredays = 30) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie =
    name +
    "=" +
    encodeURI(value) +
    "; path=/" +
    (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
};
Vue.prototype.$_ = _;

Vue.prototype.$getCookie = function (Name) {
  var search = Name + "=";
  var returnvalue = "";
  if (document.cookie.length > 0) {
    var sd = document.cookie.indexOf(search);
    if (sd !== -1) {
      sd += search.length;
      var end = document.cookie.indexOf(";", sd);
      if (end === -1) {
        end = document.cookie.length;
      }
      returnvalue = unescape(document.cookie.substring(sd, end));
    }
  }
  return returnvalue;
};

window.ajaxRequest = config => {
  return axios(config);
};
