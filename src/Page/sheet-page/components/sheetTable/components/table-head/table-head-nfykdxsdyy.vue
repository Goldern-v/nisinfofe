<template>
  <div class="header-con">
    <div class="his-name">
      <img src='./images/hospital-name.png'
         height="70"
          width="400"/>

    </div>
    <div class="title">{{patientInfo.recordName}}</div>
    <!-- {{sheetInfo.relObj}} -->
    <div class="info-con">
     <span>
        科室：
        <div class="bottom-line" style="min-width: 455px">{{patientInfo.realDeptName}}</div>
      </span>
      <span>
        病区：
        <div class="bottom-line" style="min-width: 135px">{{patientInfo.deptName}}</div>
      </span>
      </div>
    <div class="info-con" >
      <span @click="updateTetxInfo('patientName', '病人姓名', patientInfo.patientName)">
        姓名：
        <div class="bottom-line" style="min-width: 70px">{{patientInfo.patientName}}</div>
      </span>
      <span @click="updateTetxInfo('sex', '性别', patientInfo.sex)">
        性别：
        <div class="bottom-line" style="min-width: 50px">{{patientInfo.sex}}</div>
      </span>
      <!-- <span @click="updateNeonatology2Age" v-if="sheetInfo.sheetType == 'neonatology2'">
        年龄：
        <div class="bottom-line" style="min-width: 50px">{{neonatology2Age}}</div>
      </span> -->
      <span @click="updateTetxInfo('age', '年龄', patientInfo.age)">
        年龄：
        <div class="bottom-line" style="min-width: 50px">{{patientInfo.age}}</div>
      </span>
      <span @click="updateTetxInfo('bedLabel', '床号', patientInfo.bedLabel)">
        床号：
        <div class="bottom-line" style="min-width: 90px">{{patientInfo.bedLabel}}</div>
      </span>
      <span>
        住院号：
        <div class="bottom-line" style="min-width: 80px">{{patientInfo.inpNo}}</div>
      </span>
      <span>
        诊断：
        <div  class="bottom-line" style="min-width: 480px">{{patientInfo.diagnosis}}</div>
      </span>
      <!-- <span>
        ID号：
        <div class="bottom-line" style="min-width: 70px">{{patientInfo.patientId}}</div>
      </span> -->
      <!-- <span v-if="sheetInfo.sheetType == 'neonatology2'">
        温箱编号：
        <input
          class="bottom-line"
          style="width: 30px"
          @focus="onFocusToAutoComplete($event)"
          @blur="onBlurToAutoComplete"
          v-model="relObj.wxNo"
        />
      </span>-->
      <!-- <span>
        入院日期：
        {{patientInfo.admissionDate | toymd}}
      </span> -->
    </div>

    <!-- <span>入院日期：{{$route.query.admissionDate}}</span> -->
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

<style lang='scss' scoped>
input.bottom-line {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  outline: none;
}
</style>
