<template>
  <div class="header-con">
    <div class="his-name">{{ HOSPITAL_NAME_SPACE }}</div>
    <div class="title">{{ patientInfo.recordName }}</div>
    <!-- {{sheetInfo.relObj}} -->
    <div class="info-con" flex="main:justify">
      <span
        @click="
          updateTetxInfo('patientName', '病人姓名', patientInfo.patientName)
        "
      >
        姓名：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.patientName }}
        </div>
      </span>
      <span @click="updateTetxInfo('sex', '性别', patientInfo.sex)">
        性别：
        <div class="bottom-line" style="min-width: 30px">
          {{ patientInfo.sex }}
        </div>
      </span>
      <span @click="updateTetxInfo('age', '年龄', patientInfo.age)">
        年龄：
        <div class="bottom-line" style="min-width: 30px">
          {{ patientInfo.age }}
        </div>
      </span>
      <span
        v-if="
          sheetInfo.sheetType === 'contraction_inhibitor_hl' ||
            sheetInfo.sheetType === 'magnesium_sulphate_hl'
        "
      >
        <span>
          孕/产：
          <input
            class="bottom-line-input"
            :data-value="sheetInfo.relObj['yOrc_' + index]"
            v-model="sheetInfo.relObj['yOrc_' + index]"
          />
        </span>
        <span>
          孕周：
          <input
            class="bottom-line-input"
            :data-value="sheetInfo.relObj['yz_' + index]"
            v-model="sheetInfo.relObj['yz_' + index]"
          />
        </span>
      </span>
      <span
        v-if="
          sheetInfo.sheetType === 'prenatal_hl' ||
            sheetInfo.sheetType === 'obstetrics_hl'
        "
      >
        病区：
        <div class="bottom-line" style="min-width: 100px">
          {{ patientInfo.deptName }}
        </div>
      </span>
      <span v-else>
        科室：
        <div class="bottom-line" style="min-width: 100px">
          {{ patientInfo.deptName }}
        </div>
      </span>
      <span @click="updateTetxInfo('bedLabel', '床号', patientInfo.bedLabel)">
        床号：
        <div class="bottom-line" style="min-width: 40px">
          {{ patientInfo.bedLabel }}
        </div>
      </span>
      <span>
        住院号：
        <div class="bottom-line" style="min-width: 80px">
          {{ patientInfo.inpNo }}
        </div>
      </span>
      <span v-if="sheetInfo.sheetType === 'prenatal_hl'">
        <span>
          孕次：
          <input
            style="width:20px"
            class="bottom-line-input"
            :data-value="sheetInfo.relObj['yc_' + index]"
            v-model="sheetInfo.relObj['yc_' + index]"
          />
        </span>
        <span>
          产次：
          <input
            style="width:20px"
            class="bottom-line-input"
            :data-value="sheetInfo.relObj['cc_' + index]"
            v-model="sheetInfo.relObj['cc_' + index]"
          />
        </span>
        <span>
          孕周：
          <input
            style="width:20px"
            class="bottom-line-input"
            :data-value="sheetInfo.relObj['yz_' + index]"
            v-model="sheetInfo.relObj['yz_' + index]"
          />
          周
          <input
            style="width:20px"
            class="bottom-line-input"
            :data-value="sheetInfo.relObj['yz_date' + index]"
            v-model="sheetInfo.relObj['yz_date' + index]"
          />
          天
        </span>
        <span>
          预产期：
          <masked-input
            type="text"
            class="bottom-line"
            style="width: 120px;"
            :showMask="false"
            v-model="sheetInfo.relObj.ycq_"
            :data-value="sheetInfo.relObj.ycq_"
            :mask="
              () => [
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                '年',
                /\d/,
                /\d/,
                '月',
                /\d/,
                /\d/,
                '日'
              ]
            "
            :guide="true"
            placeholderChar=" "
          ></masked-input>
        </span>
      </span>
      <!-- <span>
        入院日期：
        {{ patientInfo.admissionDate | toymd }}
      </span> -->
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { updateSheetHeadInfo } from "../../../../api/index";
import sheetInfo from "../../../config/sheetInfo";
import { listItem } from "@/api/common.js";
import sheetData from "../../../../sheet.js";
export default {
  props: {
    patientInfo: Object,
    index: Number
  },
  data() {
    return {
      sheetInfo
      // relObj: {
      //   wxNo: ""
      // }
    };
  },
  computed: {
    neonatology2Age() {
      if (this.index == 0) {
        return sheetInfo.relObj.age || this.patientInfo.age;
      } else {
        let real_birthday;
        let now_time = moment(
          sheetData[this.index].bodyModel[0].find(
            item => item.key == "recordDate"
          ).value
        );
        if (!now_time.valueOf())
          return sheetInfo.relObj.age || this.patientInfo.age;
        /** 推导实际出生日期 */
        if (sheetInfo.relObj.age.indexOf("小时") > -1) {
          let h = Number(sheetInfo.relObj.age.replace("小时", ""));
          real_birthday = moment(
            sheetData[0].bodyModel[0].find(item => item.key == "recordDate")
              .value
          ).subtract(h, "h");

          let diff = now_time.diff(real_birthday, "d");
          if (diff == 0) {
            return now_time.diff(real_birthday, "h") + "小时";
          } else {
            return diff + "天";
          }
        } else if (sheetInfo.relObj.age.indexOf("天") > -1) {
          let d = Number(sheetInfo.relObj.age.replace("天", ""));
          real_birthday = moment(
            sheetData[0].bodyModel[0].find(item => item.key == "recordDate")
              .value
          ).subtract(d, "d");
          let diff = now_time.diff(real_birthday, "d");
          if (sheetInfo.relObj.age.indexOf("月") > -1) {
            let arr = sheetInfo.relObj.age.split("月");
            let d = parseInt(arr[1]);
            return arr[0] + "月" + (d + diff) + "天";
          } else {
            return diff + "天";
          }
        } else {
          return sheetInfo.relObj.age || this.patientInfo.age;
        }
      }
    }
  },
  methods: {
    updateBirthDay() {
      window.openSetAuditDateModal(
        date => {
          updateSheetHeadInfo({ birthday: date }).then(res => {
            this.patientInfo.birthday = res.data.data.birthday;
          });
        },
        this.patientInfo.birthday,
        "修改出生日期"
      );
    },
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
    },

    async onFocusToAutoComplete(e) {
      function offset(ele) {
        let { top, left } = ele.getBoundingClientRect();
        return {
          left: left,
          top: top
        };
      }

      let obj = this.relObj;
      let key = "wxNo";
      let res = await listItem("温箱编号");
      let autoComplete = res.data.data.map(item => item.name);
      // let { autoComplete, obj, key } = bind;
      let xy = offset(e.target);

      console.log(xy, autoComplete, obj, key, "autoComplete, obj, key");

      setTimeout(() => {
        window.openAutoComplete({
          style: {
            top: `${xy.top + 40}px`,
            left: `${xy.left}px`
          },
          data: autoComplete,
          callback: function(data) {
            if (data) {
              if (obj[key]) {
                obj[key] = data;
              } else {
                obj[key] = data;
              }
            }
          },
          id: `bedModal`
        });
      });
    },
    onBlurToAutoComplete(e, bind) {
      setTimeout(() => {
        window.closeAutoComplete(`bedModal`);
      }, 400);
    },
    updateNeonatology2Age() {
      if (this.index !== 0) {
        this.$message.warning("请修改第一页护记的年龄，后续页的年龄会动态计算");
      } else {
        window.openSetTextModal(
          text => {
            sheetInfo.relObj.age = text;
            sheetInfo.relObj = { ...sheetInfo.relObj };
            this.$message.success(`修改年龄成功`);
          },
          sheetInfo.relObj.age,
          `修改年龄`
        );
      }
    }
  },
  filters: {
    toymd(val) {
      if (process.env.HOSPITAL_ID == "weixian") {
        return moment(val).format("YYYY-MM-DD");
      } else {
        return moment(val).format("YYYY年MM月");
      }
    }
  },
  created() {
    if (!sheetInfo.relObj.age) {
      sheetInfo.relObj.age = this.patientInfo.age;
    }
  },
  watch: {
    // relObj: {
    //   deep: true,
    //   handler() {
    //     sheetInfo.relObj = this.relObj;
    //   }
    // }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
input.bottom-line {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  outline: none;
}
</style>
