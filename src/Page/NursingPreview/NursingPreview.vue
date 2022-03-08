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
  .right-part {
    >>> #sheet_body_con {
      height: calc(100vh - 64px) !important;
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
import temperatureHD from "@/Page/patientInfo/supPage/temperature/temperatureHD";
import temperatureLCEY from "@/Page/patientInfo/supPage/temperature/temperatureLCEY";
import temperatureGuizhou from "@/Page/patientInfo/supPage/temperature/temperatureGuizhou";
import temperatureJmfy from "@/Page/patientInfo/supPage/temperature/temperatureJmfy";
import temperatureDghl from "@/Page/patientInfo/supPage/temperature/temperatureDghl";
import temperatureBhry from "@/Page/patientInfo/supPage/temperature/temperatureBhry";
import temperatureWuJing from "@/Page/patientInfo/supPage/temperature/temperatureWuJing";
import temperatureWHFK from "@/Page/patientInfo/supPage/temperature/temperatureWHFK";
import temperatureLYXRM from "@/Page/patientInfo/supPage/temperature/temperatureLY";
import temperatureSDLJ from "@/Page/patientInfo/supPage/temperature/temperatureSDLJ";
import sheet from "@/Page/patientInfo/supPage/sheet/sheet.vue"; //护理记录单
import bloodSugar from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar.vue"; //血糖
import bloodOxygen  from "@/Page/patientInfo/supPage/oxygen-sugar/oxygen-sugar"; // 血氧
import rightPart from "@/Page/patientInfo/supPage/record/component/right-part/right-part.vue";
import { getPatientInfo } from "@/api/common.js";
import bus from "vue-happy-bus";
export default {
  data() {
    return {
      bus: bus(this),
      otherComponent: null
    };
  },
  created() {
    // 获取患者信息
    this.getPatientInfo();

    this.$store.commit("closeFullPageRecord");
    this.bus.$on("openOtherForm", data => {
      this.otherComponent =
        data.component == "temperature" ? this.getTemplate() : data.component;
    });
    this.bus.$on("openAssessmentBox", data => {
      this.otherComponent = null;
    });
  },
  methods: {
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
          return temperatureLYXRM;
        case "sdlj":
          return temperatureSDLJ;
        default:
          return temperature;
      }
    },
    // 获取患者信息
    getPatientInfo(){
      getPatientInfo(this.$route.query.patientId, this.$route.query.visitId).then(
        res => {
          let data = res.data.data || {};
          let patientInfo = this.$store.state.sheet.patientInfo;
          //let patientInfo = res.data.data ;
          //优化访问crNursing/nursingPreview无数据问题问题（由于无admissionDate造成）
          patientInfo.admissionDate=data.admissionDate;
          patientInfo.wardCode = data.wardCode;
          this.$store.commit("upPatientInfo", patientInfo);
        }
      );
    }
  },
  components: {
    treeNursingPreview,
    rightPart,
    sheet,
    bloodSugar,
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
    temperatureSDLJ,
  }
};
</script>
