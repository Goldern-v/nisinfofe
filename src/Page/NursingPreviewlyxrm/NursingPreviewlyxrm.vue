<template>
  <div>
    <div class="content NursingPreview">
        <component :is="otherComponent" v-if="otherComponent"></component>
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
import bloodSugarlyxrm from "@/Page/patientInfo/supPage/blood-sugar-lyxrm/blood-sugar-lyxrm.vue"; //血糖
import bloodSugarNfyksdyy from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar_nfyksdyy_guidang";


import { getPatientInfo } from "@/api/common.js";
import { getPatientForm } from "@/Page/patientInfo/supPage/blood-sugar-sdlj/api/index.js"; //获取患者存在表单id
import bus from "vue-happy-bus";
export default {
  data() {
    return {
      bus: bus(this),
      otherComponent: this.getBloodSugar(),
      isBloodSugarSdlj: false //顺德龙江血糖单类型
    };
  },
  created() {
    // 获取患者信息
    this.getPatientInfo();
    //判断顺德龙江血糖单类型
    this.getPatientForm();
    // this.$store.commit("closeFullPageRecord");
    // this.bus.$on("openOtherForm", data => {
    //   this.otherComponent = this.getBloodSugar();
    // });
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
        case "nfyksd":
        return bloodSugarNfyksdyy;
        default:
          return bloodSugarlyxrm;
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
    bloodSugarNfyksdyy,
    bloodSugarlyxrm,
  }
};
</script>
