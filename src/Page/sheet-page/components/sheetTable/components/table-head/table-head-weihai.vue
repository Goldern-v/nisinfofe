<template>
  <div class="header-con">
    <div class="his-name">{{HOSPITAL_NAME_SPACE}}</div>
    <div class="title">{{patientInfo.recordName}}</div>
    <!-- {{sheetInfo.relObj}} -->
    <div class="info-con" flex="main:justify" v-if="sheetInfo.sheetType === 'labor_weihai'">
      <span @click="updateTetxInfo('patientName', '病人姓名', patientInfo.patientName)">
        姓名：
        <div class="bottom-line" style="min-width: 70px">{{patientInfo.patientName}}</div>
      </span>
      <span @click="updateTetxInfo('age', '年龄', patientInfo.age)">
        年龄：
        <div class="bottom-line" style="min-width: 50px">{{patientInfo.age}}</div>
      </span>
      <span>
        胎次：
        <input
          style="width: 35px;font-size:13px;text-align: center;"
          class="bottom-line"
          :data-value="sheetInfo.relObj[`taici`]"
          v-model="sheetInfo.relObj[`taici`]"
        />
      </span>
      <span>
        孕周：
        <input
          style="width: 60px;font-size:13px;text-align: center;"
          class="bottom-line"
          :data-value="sheetInfo.relObj[`yunzhou`]"
          v-model="sheetInfo.relObj[`yunzhou`]"
        />
      </span>
      <span>
        病案号：
        <div class="bottom-line" style="min-width: 80px">{{patientInfo.inpNo}}</div>
      </span>
    </div>
    <div class="info-con" flex="main:justify" v-else-if="sheetInfo.sheetType === 'general_item_weihai'">
      <span>
        科别：
        <div class="bottom-line" style="min-width: 120px">{{patientInfo.deptName}}</div>
      </span>
      <span>
        姓名：
        <div class="bottom-line" style="min-width: 70px">{{patientInfo.patientName}}</div>
      </span>
      <span>
        病案号：
        <div class="bottom-line" style="min-width: 80px">{{patientInfo.inpNo}}</div>
      </span>
      <span>
        年龄：
        <div class="bottom-line" style="min-width: 50px">{{patientInfo.age}}</div>
      </span>
      <span>
        床号：
        <div class="bottom-line" style="min-width: 50px">{{patientInfo.bedLabel}}</div>
      </span>
    </div>

    <div class="info-con" flex="main:justify" v-else>
      <span @click="updateTetxInfo('patientName', '病人姓名', patientInfo.patientName)">
        病人姓名：
        <div class="bottom-line" style="min-width: 70px">{{patientInfo.patientName}}</div>
      </span>
      <span @click="updateTetxInfo('sex', '性别', patientInfo.sex)">
        性别：
        <div class="bottom-line" style="min-width: 50px">{{patientInfo.sex}}</div>
      </span>
      <span @click="updateTetxInfo('age', '年龄', patientInfo.age)">
        年龄：
        <div class="bottom-line" style="min-width: 50px">{{patientInfo.age}}</div>
      </span>
      <span v-if="sheetInfo.sheetType === 'post_partum_weihai'">
        孕周：
        <input
          style="width: 60px;font-size:13px;text-align: center;"
          class="bottom-line"
          :data-value="sheetInfo.relObj[`yunzhou`]"
          v-model="sheetInfo.relObj[`yunzhou`]"
        />
      </span>
      <span>
        科室：
        <div class="bottom-line" style="min-width: 120px">{{patientInfo.deptName}}</div>
      </span>
      <template v-if="!['critical2_weihai'].includes(sheetInfo.sheetType)">
        <span @click="updateTetxInfo('bedLabel', '床号', patientInfo.bedLabel)">
          床号：
          <div class="bottom-line" style="min-width: 50px">{{patientInfo.bedLabel}}</div>
        </span>
      </template>
      <span>
        {{sheetInfo.sheetType=='inandout_weihai' ? '病案号：' : '病案号：'}}
        <div class="bottom-line" style="min-width: 80px">{{patientInfo.inpNo}}</div>
      </span>
      <!-- <span>
        ID号：
        <div class="bottom-line" style="min-width: 70px">{{patientInfo.patientId}}</div>
      </span> -->
      <span v-if="['critical_new_weihai', 'internal_eval_weihai', 'inandout_weihai','baby_weihai', 'extracardi_one_weihai', 'extracardi_two_weihai', 'extracardi_three_weihai'].includes(sheetInfo.sheetType)">
        入院日期：
        {{patientInfo.admissionDate | toymd}}
      </span>
      <span v-if="['critical_mahui_weihai', 'extracardi_one_weihai', 'extracardi_two_weihai', 'extracardi_three_weihai'].includes(sheetInfo.sheetType)">
        体重：
        <input
          style="width: 60px;font-size:13px;text-align: center;"
          class="bottom-line"
          :data-value="sheetInfo.relObj[`weight`]"
          v-model="sheetInfo.relObj[`weight`]"
        />
        kg
      </span>
    </div>
    <!-- <div class="info-con" v-if="['extracardi_two_weihai', 'extracardi_three_weihai'].includes(sheetInfo.sheetType)">
      <span class="diagnosis-con" :title="patientInfo.diagnosis" >诊断：{{patientInfo.diagnosis}}</span>
    </div> -->

    <div class="info-con  container" v-if="['extracardi_one_weihai','extracardi_two_weihai', 'extracardi_three_weihai'].includes(sheetInfo.sheetType)" style="flex: 2;">
      <span class="diagnosis-con left" :title="patientInfo.diagnosis" >诊断：<div class="bottom-line">{{patientInfo.diagnosis}}</div></span>
      <span class="right">手术名称：
        <input
        style="flex: 1;font-size:13px;text-align: left;"
        class="bottom-line"
        :data-value="sheetInfo.relObj[`ssmc`]"
        v-model="sheetInfo.relObj[`ssmc`]"
      /></span>
    </div>
    <!-- <div
      class="info-con"
      style="display: flex;align-items: center"
      v-if="[
      'extracardi_two_weihai',
      'extracardi_three_weihai'
      ].includes(sheetInfo.sheetType)"
    >
      <span>手术名称：</span>
      <input
        style="flex: 1;font-size:13px;text-align: left;"
        class="bottom-line"
        :data-value="sheetInfo.relObj[`ssmc`]"
        v-model="sheetInfo.relObj[`ssmc`]"
      />
    </div> -->
    <div
      class="info-con"
      style="display: flex;align-items: center"
      v-if="['extracardi_one_weihai'].includes(sheetInfo.sheetType)"
    >
      <span>1、5%葡萄糖注射液（泵入组）&nbsp;</span>
      <span>2、0.9%氯化钠注射液（泵入组）&nbsp;</span>
      <span>3、去白细胞悬浮红细胞&nbsp;</span>
      <span>4、病毒灭活冰冻血浆&nbsp;</span>
      <span>5、自体血&nbsp;</span>
      <span>6、其他</span>
    </div>
  </div>
</template>


<script>
// le i = ''
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
        const tableData = sheetData.find(list=> list.index === this.index)
        if (tableData) {
          let real_birthday;
          let now_time = moment(
            tableData.bodyModel[0].find(
              item => item.key == "recordDate"
            ).value
          );
          if (!now_time.valueOf())
            return sheetInfo.relObj.age || this.patientInfo.age;
          /** 推导实际出生日期 */
          if (sheetInfo.relObj.age.indexOf("小时") > -1) {
            let h = Number(sheetInfo.relObj.age.replace("小时", ""));
            real_birthday = moment(sheetInfo.selectBlock.createTime
            ).subtract(h, "h");
            let diff = now_time.diff(real_birthday, "d");
            if (diff == 0) {
              return now_time.diff(real_birthday, "h") + "小时";
            } else {
              return diff + "天";
            }
          } else if (sheetInfo.relObj.age.indexOf("天") > -1) {
            let d = Number(sheetInfo.relObj.age.replace("天", ""));
            real_birthday = moment(sheetInfo.selectBlock.createTime
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
      if (this.sheetInfo.sheetType === 'critical_weihai') {
        return;
      }
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
      return moment(val).format("YYYY-MM-DD");
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

.container{
  display: flex;
  .left, .right {
  flex: 1; /* 设置元素的弹性比例为1，平分空间 */
}
}
</style>
