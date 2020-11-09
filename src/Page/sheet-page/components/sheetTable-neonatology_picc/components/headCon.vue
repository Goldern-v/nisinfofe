<template>
  <div class="header-con">
    <div class="info-con">
      <span>
        姓名：
        <div
          class="bottom-line"
          style="min-width: 60px"
          @click="
            updateTetxInfo('patientName', '病人姓名', patientInfo.patientName)
          "
        >
          {{ patientInfo.patientName }}
        </div>
      </span>
      <span>
        性别：
        <div
          class="bottom-line"
          style="min-width: 30px"
          @click="updateTetxInfo('sex', '性别', patientInfo.sex)"
        >
          {{ patientInfo.sex }}
        </div>
      </span>
      <span>
        年龄：
        <div
          class="bottom-line"
          style="min-width: 50px"
          @click="updateTetxInfo('age', '年龄', patientInfo.age)"
        >
          {{ patientInfo.age }}
        </div>
      </span>
      <span @click="updateTetxInfo('bedLabel', '床号', patientInfo.bedLabel)">
        床号：
        <div class="bottom-line" style="min-width: 30px">
          {{ patientInfo.bedLabel }}
        </div>
      </span>
      <span>
        住院号：
        <div class="bottom-line" style="min-width: 30px">
          {{ patientInfo.inpNo }}
        </div>
      </span>
      <span>
        入院日期：
        <div class="bottom-line" style="min-width: 30px">
          {{ patientInfo.admissionDate }}
        </div>
      </span>
    </div>
  </div>
</template>
<script>
import bus from "vue-happy-bus";
import sheetInfo from "../../config/sheetInfo";
import commom from "@/common/mixin/common.mixin";
export default {
  data() {
    return {
      bus: bus(this),
      sheetInfo
    };
  },
  methods: {
    updateTetxInfo(key, label, autoText) {
      window.openSetTextModal(
        text => {
          updateSheetHeadInfo({ [key]: text }).then(res => {
            this.patientInfo[key] = res.data.data[key];
            this.$message.success(`修改${label}成功`);
          });
        },
        autoText,
        `修改${label}`
      );
    }
  },
  computed: {
    patientInfo() {
      return this.sheetInfo.selectBlock || {};
    }
  }
};
</script>
<style lang="stylus" scoped>
.header-con {
  text-align: center;

  span {
    margin-right: 60px;
    font-size: 12px;
    color: #000;
  }

  .info-con {
    // margin: 8px 0;
    text-align: left;
    padding: 3px 0;

    .bottom-line {
      border: none;
      border-bottom: 1px solid #000;
      outline: none;
      padding-left: 5px;
      box-sizing: border-box;
      display: inline-block;
    }
  }
}
</style>