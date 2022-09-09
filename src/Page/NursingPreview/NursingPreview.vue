<template>
  <div>
    <div class="content NursingPreview">
      <div class="left-part">
        <treeNursingPreview ref="treeNursingPreview"></treeNursingPreview>
      </div>
      <div class="right-part">
        <component :is="otherComponent" v-if="otherComponent"></component>
        <rightPart v-show="!otherComponent"></rightPart>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.right-part {
  transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
}

>>>.body {
  height: calc(100vh - 60px) !important;
}

>>>.form-contain {
  height: calc(100vh - 21px) !important;
}

>>>.new-btn, >>>.null-btn, >>>.tool-bar, >>>.fixed-icon, >>>.table-fixed-th {
  display: none !important;
}

>>>.tool-contain {
  .item-box {
    display: none !important;
  }
  .select-con + .item-box {
     display: flex !important;
  }

  .item-box.page-select {
    display: flex !important;
  }
  .right-btn {
    pointer-events: none !important;
  }
}

.NursingPreview {
  overflow hidden;
  .right-part {
    >>> #sheet_body_con {
      height: calc(100vh - 0px) !important;
    }
    >>> .sheetTable-contain {
        input {
          pointer-events: none !important;
        }
      }
  }
}

.content {
  .left-part {
    float: left;
    width: 240px;
    background: #FFFFFF;
    border: 1px solid #CBD5DD;
    border-radius: 2px 2px 0 2px;
    height: 100vh !important;
  }

  .right-part {
    margin-left: 240px;
    overflow: auto;
    height: 100vh !important;
  }
}
</style>
<script>
import treeNursingPreview from "@/Page/patientInfo/supPage/record/component/treeNursingPreview.vue"; //树
import temperature from "@/Page/patientInfo/supPage/temperature/temperature"; //体温单
import temperatureHD from "@/Page/patientInfo/supPage/temperature/temperature-huadu";
import temperatureLCEY from "@/Page/patientInfo/supPage/temperature/temperature-liaocheng";
import temperatureGuizhou from "@/Page/patientInfo/supPage/temperature/temperature-guizhou";
import temperatureJmfy from "@/Page/patientInfo/supPage/temperature/temperature-fuyou";
import temperatureDghl from "@/Page/patientInfo/supPage/temperature/temperature-hengli";
import temperatureBhry from "@/Page/patientInfo/supPage/temperature/temperature-beihairenyi";
import temperatureWuJing from "@/Page/patientInfo/supPage/temperature/temperature-wujing";
import temperatureWHFK from "@/Page/patientInfo/supPage/temperature/temperature-whfk";
import temperatureFSXT from "@/Page/patientInfo/supPage/temperature/temperature-fsxt";
import temperatureSDLJ from "@/Page/patientInfo/supPage/temperature/temperature-sdlj";
import temperatureLYXRM from "@/Page/patientInfo/supPage/temperature/temperature-lyxrm";
import temperatureLYYZ from "@/Page/patientInfo/supPage/temperature/temperature-lyyz";
import temperatureWHSL from "@/Page/patientInfo/supPage/temperature/temperature-whsl";
import temperatureNFZXY from "@/Page/patientInfo/supPage/temperature/temperature-nanfangzhongxiyi";
import temperatureFSSY from "@/Page/patientInfo/supPage/temperature/temperature-foshanrenyi";
import temperatureDGXG from "@/Page/patientInfo/supPage/temperature/temperature-xiegang.vue";
import temperatureGDTJ from "@/Page/patientInfo/supPage/temperature/temperature-gdtj.vue";
import sheet from "@/Page/patientInfo/supPage/sheet/sheet.vue"; //护理记录单
import bloodSugar from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar.vue"; //血糖
import bloodSugarBhry from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar_bhry.vue"; //血糖
import bloodSugarFsxt from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar_fsxt.vue"; //血糖
import bloodSugarSdlj from "@/Page/patientInfo/supPage/blood-sugar-sdlj/blood-sugar-sdlj.vue"; //血糖
import bloodOxygen from "@/Page/patientInfo/supPage/oxygen-sugar/oxygen-sugar"; // 血氧
import rightPart from "@/Page/patientInfo/supPage/record/component/right-part/right-part.vue";
import { getPatientInfo } from "@/api/common.js";
import { getPatientForm } from "@/Page/patientInfo/supPage/blood-sugar-sdlj/api/index.js"; //获取患者存在表单id

import bus from "vue-happy-bus";
export default {
  data() {
    return {
      bus: bus(this),
      otherComponent: null,
      isBloodSugarSdlj: false //顺德龙江血糖单类型
    };
  },
  created() {
    // 获取患者信息
    this.getPatientInfo();
    //判断顺德龙江血糖单类型
    this.getPatientForm();
    this.$store.commit("closeFullPageRecord");
    this.bus.$on("openOtherForm", data => {
      this.otherComponent =
        data.component == "temperature"
          ? this.getTemplate()
          : data.component == "bloodSugar"
          ? this.getBloodSugar()
          : data.component;
    });
    this.bus.$on("openAssessmentBox", data => {
      this.otherComponent = null;
    });
  },
  methods: {
    getPatientForm() {
      getPatientForm(
        this.$route.query.patientId,
        this.$route.query.visitId
      ).then(res => {
        let data = res.data.data || {};
        if (data.hisPatSugarList) {
          // 接口儿童单子特有的字段 hisPatSugarList
          // '儿童'
          this.isBloodSugarSdlj = false;
        } else {
          // '成人'
          this.isBloodSugarSdlj = true;
        }
      });
    },
    // 获取各医院的血糖单
    getBloodSugar() {
      switch (process.env.HOSPITAL_ID) {
        case "beihairenyi":
          return bloodSugarBhry;
        case "fsxt":
          return bloodSugarFsxt;
        case "sdlj":
          if (this.isBloodSugarSdlj) {
            return bloodSugarSdlj;
          } else {
            return bloodSugar;
          }

        default:
          return bloodSugar;
      }
    },
    // 获取各医院的体温单
    getTemplate() {
      switch (process.env.HOSPITAL_ID) {
        case "huadu":
          return temperatureHD;
        case "liaocheng":
          return temperatureLCEY;
        case "guizhou":
          return temperatureGuizhou;
        case "fuyou":
          return temperatureJmfy;
        case "hengli":
          return temperatureDghl;
        case "wujing":
          return temperatureWuJing;
        case "beihairenyi":
          return temperatureBhry;
        case "whfk":
          return temperatureWHFK;
        case "lyxrm":
        case "whhk":
          return temperatureLYXRM;
        case "sdlj":
          return temperatureSDLJ;
        case "fsxt":
          return temperatureFSXT;
        case "nanfangzhongxiyi":
          return temperatureNFZXY;
        case "foshanrenyi":
          return temperatureFSSY;
        case "xiegang":
        case "qhwy":
          return temperatureDGXG;
        case "whsl":
          return temperatureWHSL;
        case "lyyz":
          return temperatureLYYZ;
        case "gdtj":
          return temperatureGDTJ;
        default:
          return temperature;
      }
    },
    // 获取患者信息
    getPatientInfo() {
      getPatientInfo(
        this.$route.query.patientId,
        this.$route.query.visitId
      ).then(res => {
        let data = res.data.data || {};
        let patientInfo = this.$store.state.sheet.patientInfo;
        //let patientInfo = res.data.data ;
        //优化访问crNursing/nursingPreview无数据问题问题（由于无admissionDate造成）
        patientInfo.admissionDate = data.admissionDate;
        patientInfo.wardCode = data.wardCode;
        this.$store.commit("upPatientInfo", patientInfo);
      });
    }
  },
  components: {
    treeNursingPreview,
    rightPart,
    sheet,
    bloodSugar,
    bloodSugarBhry,
    bloodSugarFsxt,
    bloodSugarSdlj,
    bloodOxygen,
    temperature,
    temperatureHD,
    temperatureLCEY,
    temperatureGuizhou,
    temperatureJmfy,
    temperatureDghl,
    temperatureWuJing,
    temperatureBhry,
    temperatureWHFK,
    temperatureLYXRM,
    temperatureLYYZ,
    temperatureSDLJ,
    temperatureFSXT,
    temperatureNFZXY,
    temperatureFSSY,
    temperatureDGXG,
    temperatureWHSL,
    temperatureGDTJ
  }
};
</script>
