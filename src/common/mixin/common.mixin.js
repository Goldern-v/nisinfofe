import Cookies from "js-cookie";
import qs from "qs";
import { info } from "@/api/task";
import { $params } from "@/pages/sheet-print/tool/tool";
function number_format(number, decimals, dec_point, thousands_sep) {
  /*
   * 参数说明：
   * number：要格式化的数字
   * decimals：保留几位小数
   * dec_point：小数点符号
   * thousands_sep：千分位符号
   * */
  number = (number + "").replace(/[^0-9+-Ee.]/g, "");
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    dec = typeof dec_point === "undefined" ? "." : dec_point,
    s = "",
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return "" + Math.ceil(n * k) / k;
    };

  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
}
export default {
  computed: {
    hospitalName() {
      return process.env.HOSPITAL_NAME;
    },
    hospitalNameSpace() {
      return process.env.HOSPITAL_NAME_SPACE;
    },
    hospitalLogo() {
      return require("../images/his-logo/厚街医徽.png");
    },
    userDeptList() {
      try {
        return this.$store.state.lesion.deptList;
      } catch (error) {
        return [];
      }
    },
    deptCode() {
      return this.$store.state.lesion.deptCode || this.$route.query.wardCode;
    },
    deptName() {
      return this.$store.state.lesion.deptName || this.$route.query.wardName;
    },
    wardCode() {
      return this.$store.state.lesion.wardCode || this.$route.query.wardCode;
    },
    wardName() {
      return this.$store.state.lesion.wardName || this.$route.query.wardName;
    },
    wih() {
      return this.$store.state.common.wih;
    },
    token() {
      let token;
      try {
        if ($params.token) {
          token = $params.token;
        } else {
          token = Cookies.get("NURSING_USER").split("##")[1];
        }
      } catch (error) {
        token = $params.token;
      }
      let appToken = $params.appToken || '51e827c9-d80e-40a1-a95a-1edc257596e7'
      return `App-Token-Nursing=${appToken}&Auth-Token-Nursing=${token}`;
    },
    authToken() {
      let token;
      try {
        if ($params.token) {
          token = $params.token;
        } else {
          token = Cookies.get("NURSING_USER").split("##")[1];
        }
      } catch (error) {
        token = $params.token;
      }
      return token;
    },
    empNo() {
      try {
        return JSON.parse(localStorage.user).empNo;
      } catch (error) { }
    },
    empName() {
      try {
        return JSON.parse(localStorage.user).empName;
      } catch (error) { }
    },
    userInfo() {
      try {
        return JSON.parse(localStorage.user);
      } catch (error) { }
    },
    isDev() {
      return process.env.NODE_ENV === "development";
    },
    // 管理员 护士长
    isAuditor() {
      try {
        return JSON.parse(localStorage.user).nursingStaff;
      } catch (error) {
        return false;
      }
    },
    // 管理员 护理部
    isAdminOrNursingDepartment() {
      try {
        let userStore = JSON.parse(localStorage.user)
        let isNurseDepartment = userStore.post.indexOf("护理部") != -1;
        let isAdmin = userStore.superuser
        return isNurseDepartment || isAdmin;
      } catch (error) {
        return false;
      }
    },
    // 护理巡视操作权限
    isNursingRoundsAuthority() {
      try {
        let isOk = JSON.parse(localStorage.user).roleManageCodeList
          ? JSON.parse(localStorage.user).roleManageCodeList.filter(
            item => item == "LC_XS_001"
          )
          : [];
        return isOk.length > 0 ? true : false;
      } catch (error) {
        return false;
      }
    },
    // 后台调试工具
    getSYSTEM() {
      return this.$system;
    },
    // 护长 组长
    role_auditor() {
      try {
        return JSON.parse(localStorage.user).auditor;
      } catch (error) {
        return false;
      }
    },
    isPrint() {
      return window.location.href.indexOf("print") > -1;
    },
    systemInfo() {
      return window.system || window.app.$system;
    }
  },
  methods: {
    // 去患者详情页
    async toPatientHome(patientId, visitId) {
      let res = await info(patientId, visitId);
      for (let index in res.data.data) {
        if (!res.data.data[index]) {
          res.data.data[index] = "";
        }
      }
      window.open(
        `/crNursing/home?${qs.stringify({
          patientId: res.data.data.patientId,
          visitId: res.data.data.visitId
        })}`
      );
    },
    // 加载间提示文字
    getLoadingText() {
      let greet = (() => {
        let hour = new Date().getHours();
        let timeRange = [
          { 早上好: [7, 11] },
          { 中午好: [12, 13] },
          { 下午好: [14, 17] },
          { 晚上好: [18, 22] },
          { 深夜的问候: [23, 2 + 24] },
          { 凌晨好: [3, 6] }
        ];
        let text = timeRange.filter(item => {
          let [min, max] = Object.values(item)[0];
          if (hour <= 2) {
            hour += 24;
          }
          return hour <= max && hour >= min;
        });
        console.log(hour, text, Object.keys(text[0]));
        return Object.keys(text[0]) || "今日好";
      })();
      let texts = [
        "工作使我快乐",
        "喝杯茶水,注意休息",
        "每一份辛劳都值得尊重",
        "一份认真,一份感动",
        "愉快地加载中",
        "祝福早日健康",
        "送你花花🌷🌷🌷",
        greet
      ];
      let [max, min] = [texts.length, 0];
      let r = Math.floor(Math.random() * (max - min) + min);
      return texts[r];
    }
  },
  filters: {
    toMoney(val) {
      return number_format(val, 2, ".", ",");
    }
  }
};
