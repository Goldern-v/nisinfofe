<template>
  <div class="header-con">
    <div class="his-name hospital-whhk">
      <img src="../../../../../../common/images/logo_whhk.png"/>
      <span>{{ HOSPITAL_NAME }}</span>
    </div>
    <div class="title">{{ patientInfo.recordName }}</div>
    <!-- {{sheetInfo.relObj}} -->
    <div class="info-con" flex="main:justify" v-if="sheetInfo.sheetType === 'baby_whhk'">
      <span>
        科别：
        <div class="bottom-line" style="min-width: 120px">{{patientInfo.deptName}}</div>
      </span>
      <span @click="updateTetxInfo('bedLabel', '床号', patientInfo.bedLabel)">
        母亲床号：
        <div class="bottom-line" style="min-width: 50px">{{patientInfo.bedLabel}}</div>
      </span>
      <span @click="updateTetxInfo('patientName', '姓名', patientInfo.patientName)">
        母亲姓名：
        <div class="bottom-line" style="min-width: 70px">{{patientInfo.patientName}}</div>
      </span>
      <span>
        母亲住院号：
        <div class="bottom-line" style="min-width: 80px">{{patientInfo.inpNo}}</div>
      </span>
      <span>
        新生儿性别：
        <input
          type="text"
          v-model="sheetInfo.relObj['xsexb']"
          style="border-bottom: 1px solid #000; width: 70px"
          :data-value="sheetInfo.relObj.xsexb"
        />
      </span>
    </div>
    <div class="info-con" flex="main:justify" v-else>
      <span>
        科别：
        <div class="bottom-line" style="min-width: 120px">{{patientInfo.deptName}}</div>
      </span>
      <span @click="updateTetxInfo('bedLabel', '床号', patientInfo.bedLabel)">
        床号：
        <div class="bottom-line" style="min-width: 50px">{{patientInfo.bedLabel}}</div>
      </span>
      <span @click="updateTetxInfo('patientName', '姓名', patientInfo.patientName)">
        姓名：
        <div class="bottom-line" style="min-width: 70px">{{patientInfo.patientName}}</div>
      </span>
      <span v-if="sheetInfo.sheetType === 'labor_whhk'" @click="updateTetxInfo('sex', '性别', patientInfo.sex)">
        性别：
        <div class="bottom-line" style="min-width: 50px">{{patientInfo.sex}}</div>
      </span>
      <span @click="updateTetxInfo('age', '年龄', patientInfo.age)" v-if="showAge.includes(sheetInfo.sheetType)">
        年龄：
        <div class="bottom-line" style="min-width: 50px">{{patientInfo.age}}</div>
      </span>
      <span>
        住院号：
        <div class="bottom-line" style="min-width: 80px">{{patientInfo.inpNo}}</div>
      </span>
      <div class="item-base" v-if="sheetInfo.sheetType === 'intravenous_whhk'">
        导管类型：
        <div class="item-base">
          <label v-for="item in ['PVC', 'CVC', 'PICC', '其他']" :key="item">
            <input
              type="checkbox"
              :value="item"
              :ischecked="sheetInfo.relObj[item]"
              v-model="sheetInfo.relObj[item]"
            />{{ item }}
          </label>
          <input
            type="text"
            v-model="sheetInfo.relObj.other"
            style="border-bottom: 1px solid #000"
            :data-value="sheetInfo.relObj.other"
          />
        </div>
      </div>
      <template v-if="sheetInfo.sheetType === 'insulin_whhk'">
        <span>
          置管日期：
          <input
            type="text"
            v-model="sheetInfo.relObj.zgrq"
            style="border-bottom: 1px solid #000; width: 110px"
            :data-value="sheetInfo.relObj.zgrq"
          />
        </span>
        <span>
          置管部位：
          <input
            type="text"
            v-model="sheetInfo.relObj.zgbw"
            style="border-bottom: 1px solid #000; width: 120px"
            :data-value="sheetInfo.relObj.zgbw"
          />
        </span>
      </template>
    </div>
    <div class="info-con">
      <span v-if="['obstetriccare_whhk'].includes(sheetInfo.sheetType)" @click="updateDiagnosis('diagnosis', '入院诊断', patientInfo.diagnosis)">
        入院诊断：
        <div
          class="bottom-line"
          style="
            min-width: 1100px;
            min-height: 13px;
            text-overflow: ellipsis;
            white-space: nowrap;
          "
        >
          {{ diagnosis }}
        </div>
      </span>
    </div>
    <div class="info-con" flex="main:justify" v-if="sheetInfo.sheetType === 'intravenous_whhk'">
      <span>
        置管日期：
        <input
          type="text"
          v-model="sheetInfo.relObj.zgrq"
          style="border-bottom: 1px solid #000; width: 110px"
          :data-value="sheetInfo.relObj.zgrq"
        />
      </span>
      <span>
        置管部位：
        <input
          type="text"
          v-model="sheetInfo.relObj.zgbw"
          style="border-bottom: 1px solid #000; width: 120px"
          :data-value="sheetInfo.relObj.zgbw"
        />
      </span>
      <span>
        导管置入长度(厘米)：
        <input
          type="text"
          v-model="sheetInfo.relObj.dgzrcd"
          style="border-bottom: 1px solid #000; width: 80px"
          :data-value="sheetInfo.relObj.dgzrcd"
        />
      </span>
      <span>
        导管外露长度(厘米)：
        <input
          type="text"
          v-model="sheetInfo.relObj.dgwlcd"
          style="border-bottom: 1px solid #000; width: 80px"
          :data-value="sheetInfo.relObj.dgwlcd"
        />
      </span>
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
import bus from "vue-happy-bus";
export default {
  props: {
    patientInfo: Object,
    index: Number
  },
  data() {
    return {
      bus: bus(this),
      sheetInfo,
      showAge: ['labor_whhk'], // 显示年龄
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
    },
    diagnosis() {
      /** 最接近的index */
      let realIndex = 0;
      let keys = Object.keys(sheetInfo.relObj || {});
      for (let i = 0; i < keys.length; i++) {
        let [base, keyIndex] = keys[i].split("PageIndex_diagnosis_");
        if (keyIndex !== undefined) {
          if (this.index >= keyIndex) {
            if (this.index - keyIndex <= this.index - realIndex) {
              realIndex = keyIndex;
            }
          }
        }
      }
      return (
        (sheetInfo.relObj || {})[`PageIndex_diagnosis_${realIndex}`] ||
        this.patientInfo.diagnosis
      );
    },
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
    updateDiagnosis(key, label, autoText) {
      window.openSetTextModal(
        (text) => {
          sheetInfo.relObj[`PageIndex_diagnosis_${this.index}`] = text;
          this.$message.success(`修改入院诊断成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.diagnosis,
        `修改入院诊断`
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
      return moment(val).format("YYYY年MM月");
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
.hospital-whhk {
  display: flex;
  align-items: center;
  margin-left: 28px;
  span {
    font-size: 18px;
    padding: 0 0px;
    text-align: center;
    font-weight: bold;
    font-family: simsun, 'Times New Roman', Georgia, Serif !important;
  }
  img {
    margin-right: 10px;
    width: 50px;
    height: 50px;
  }
}
.item-base {
  display: flex;
  align-items: center;
  font-size: 13px;
  flex-wrap: wrap;
  label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
input[type='text'] {
  border: none;
  outline: none;
  margin: 0;
  text-align: center;
}
</style>
