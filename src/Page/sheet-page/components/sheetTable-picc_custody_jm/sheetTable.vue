/*
江门妇幼-PICU监护单
 */
<template>
  <div>
    <div
      class="contant sheetTable-picc_custody_jm"
      :style="data.titleModel.style"
      :class="{ readOnly }"
    >
      <!-- <img class="his-logo"
      src="../../../../common/images/his-logo/厚街医徽.png" />-->
      <img
        src="../../images/仅供查阅.jpg"
        class="readOnly-img no-print"
        v-if="readOnly"
        alt
      />
      <div class="header-con">
        <div class="his-name">{{ HOSPITAL_NAME_SPACE }}</div>
        <div class="title">{{ patientInfo.recordName }}</div>
        <div class="info-con" flex="main:justify">
          <!-- <span>
            科室：{{ patientInfo.realDeptName }}
          </span> -->
          <span>
            床号：{{ patientInfo.bedLabel }}
          </span>
          <span>
            姓名： {{ patientInfo.patientName }}
          </span>
           <span>
            性别：{{ patientInfo.sex }}
          </span>
          <span>
            年龄：{{ patientInfo.age }}
          </span>
          <span>
            住院号：{{ patientInfo.patientId }}
          </span>
          <span>
            入院日期：{{ patientInfo.admissionDate | toymd }}
          </span>
          <span @click="updateSurgeryDate('surgeryDate', '手术日期', patientInfo.surgeryDate)"> 
            手术日期：
            <div
              class="bottom-line1"
              style="
                display:inline-block;
                width: 120px;
                max-width: 200px;
                text-overflow: ellipsis;
                white-space: nowrap;
              "
            >
              {{ surgeryDate | toymd }}
            </div>
          </span>
        </div>
        <table>
          <colgroup>
            <col v-for="i in 19" :key="i" width="5%"/>
          </colgroup>
          <tbody> 
            <tr>
              <td colspan="4">
                <div class="boxLine">
                  <div class="boxTitle">呼吸机型号：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:100%;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj.hxjxh"
                      :data-value="sheetInfo.relObj.hxjxh"
                    />
                  </div>
                </div>
                <div class="boxLine">
                  <div class="boxTitle">气管插管经：</div>
                  <input type="radio" value="口" :ischecked="sheetInfo.relObj.qgcgj == '口'" v-model="sheetInfo.relObj.qgcgj">口
                  <input type="radio" value="鼻" :ischecked="sheetInfo.relObj.qgcgj == '鼻'" v-model="sheetInfo.relObj.qgcgj">鼻
                  <div class="boxTitle" style="margin-left:20px;">口径：</div>
                  <input
                    type="textarea"
                    style="width:35px;"
                    class="bottomInput"
                    v-model="sheetInfo.relObj.kj"
                    :data-value="sheetInfo.relObj.kj"
                  />
                </div>
                <div class="boxLine">
                  <div class="boxTitle">深度：</div>
                  <input
                    type="textarea"
                    style="width:35px;"
                    class="bottomInput"
                    v-model="sheetInfo.relObj.sd"
                    :data-value="sheetInfo.relObj.sd"
                  />mm
                </div>
                <div class="boxLine">
                  <div class="boxTitle">气囊：</div>
                  <input type="radio" value="有" v-model="sheetInfo.relObj.qn" :ischecked="sheetInfo.relObj.qn == '有'">有
                  <input type="radio" value="无" v-model="sheetInfo.relObj.qn" :ischecked="sheetInfo.relObj.qn == '无'">无
                  <div class="boxTitle" style="margin-left:20px;">气囊压：</div>
                  <input
                    type="textarea"
                    style="width:35px;"
                    class="bottomInput"
                    v-model="sheetInfo.relObj.qny"
                    :data-value="sheetInfo.relObj.qny"
                  />cmH2o
                </div>
                <div class="boxLine">
                  <textarea v-model="sheetInfo.relObj.xpwz" :data-value="sheetInfo.relObj.xpwz" @input="(e)=>onXpChang(e)"></textarea>
                </div>
              </td>
              <td colspan="3">
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="鼻氧管"
                    id="deliveryMode2"
                    :ischecked="sheetInfo.relObj.byg==true||'true'?'checked':''"
                    v-model="sheetInfo.relObj.byg"
                  />鼻氧管
                  <input
                    type="checkbox"
                    value="面罩"
                    style="margin-left:20px;"
                    id="deliveryMode2"
                    :ischecked="sheetInfo.relObj.byg==true||'true'?'checked':''"
                    v-model="sheetInfo.relObj.mz"
                  />面罩
                  <input
                    type="checkbox"
                    value="头罩"
                    style="margin-left:20px;"
                    :ischecked="sheetInfo.relObj.byg==true||'true'?'checked':''"
                    v-model="sheetInfo.relObj.tz"
                  />头罩
                </div>
                <!-- <div class="boxLine">
                  <input
                    type="checkbox"
                    value="胃管"
                    id="deliveryMode2"
                    :ischecked="sheetInfo.relObj.wg"
                    :data-value="sheetInfo.relObj.wg"
                    v-model="sheetInfo.relObj.wg"
                  />胃管
                  <input
                    type="checkbox"
                    value="胃肠减压"
                    id="deliveryMode2"
                    style="margin-left:10px;"
                    :ischecked="sheetInfo.relObj.wcjy"
                    :data-value="sheetInfo.relObj.wcjy"
                    v-model="sheetInfo.relObj.wcjy"
                  />胃肠减压
                  <input
                    type="checkbox"
                    value="鼻肠管"
                    id="deliveryMode2"
                    style="margin-left:10px;"
                    :ischecked="sheetInfo.relObj.bcg"
                    :data-value="sheetInfo.relObj.bcg"
                    v-model="sheetInfo.relObj.bcg"
                  />鼻肠管
                </div> -->
              </td>
              <td colspan="4">导管型号：
                <input
                  type="text"
                  class="bottomInput"
                  v-model="sheetInfo.relObj.dgxh"
                  :data-value="sheetInfo.relObj.dgxh"
                />
              </td>
              <td colspan="4">血液抗凝：
                <input
                  type="text"
                  class="bottomInput"
                  v-model="sheetInfo.relObj.xykn"
                  :data-value="sheetInfo.relObj.xykn"
                />
              </td>
              <td colspan="4">血滤器/批号：
                <input
                  type="text"
                  class="bottomInput"
                  v-model="sheetInfo.relObj.xlq"
                  :data-value="sheetInfo.relObj.xlq"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <excel
          :data="data"
          :index="index"
          :length="length"
          :scrollY="scrollY"
          :hasFiexHeader="true"
          :isInPatientDetails="isInPatientDetails"
        >
        </excel>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">

.sheetTable-picc_custody_jm {
  & {
    border-radius: 2px;
    // position: relative;
    background: #FFFFFF;
    box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
    padding: 20px 20px;
    box-sizing: border-box;
    width: 1100px; // 关键
    margin: 0 auto 20px;
    box-sizing: content-box;
    position: relative;
  }
  .boxLine {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
  }
  textarea {
    border: none;
    resize: none;
    cursor: pointer;
    outline:none;
    overflow:hidden; 
    resize:none;
    width: 100%;
    height: 75px;
    font-size: 16px;
  }
  .boxRight {
    flex: 1;
    margin-right: 5px; 
  }
  .header-con {
    text-align: center;

    .his-name {
      font-size: 18px;
      padding: 0 0px;
      text-align: center;
      font-weight: bold;
      font-family: simsun, 'Times New Roman', Georgia, Serif !important;
    }

    .title {
      font-size: 21px;
      padding: 5px 0 5px;
      text-align: center;
      font-weight: bold;
      font-family: simsun, 'Times New Roman', Georgia, Serif !important;
    }

    span {
      margin-right: 4px;
      font-size: 14px;
      color: #000;
    }

    .info-con {
      margin: 8px 0;
      text-align: left;
    }
    table {
      width: 100%;
      text-align: left;
      margin-bottom: -16px;
      td {
        border: 1px solid #000;
        .boxTitle {
          height: 20px;
          line-height: 20px;
        }
        .bottomInput {
          border: none;
          outline: none;
          font-size: 14px;
          height: 20px;
        }
      }
    }
  }

  .add-btn {
    position: absolute;
    top: 60px;
    right: 20px;
  }

  .his-logo {
    position: absolute;
    left: 21px;
    top: 21px;
    height: 44px;
  }

  .diagnosis-con {
    max-width: 340px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &.readOnly {
    pointer-events: none;
  }

  .readOnly-img {
    position: absolute;
    right: 5px;
    top: 5px;
  }
  .footer-data {
    display: flex;
    border: 1px solid #000;
    text-align: left;
    margin-top: 15px;
    padding: 2px;
    input {
      width: 70%;
      border: none;
      outline: none;
    }
  }
  

  .bottomCon {
    position: relative;
    bottom: 40px;
    // transform translateY(-30px)
    // margin-top:-80px;
    width: 100%;
    font-size: 14px;

    input[type='checkbox'] {
      position: relative;
    }

    input[type='checkbox'] {
      -webkit-appearance: none;
      vertical-align: text-top;
      width: 14px;
      height: 14px;
      border: 1px solid #000;
      border-radius: 0px;
      outline: none;
      margin: 1px 3px 0 0;
    }

    .isChecked {
      font-size: 10;
      position: relative;
    }

    .isChecked:before {
      content: '';
      width: 8px;
      transform: rotate(45deg);
      position: absolute;
      top: 7px;
      left: -2px;
      border-top: 2px solid #000;
    }

    .isChecked:after {
      content: '';
      width: 14px;
      transform: rotate(-50deg) translateY(-50%) translateX(50%);
      position: absolute;
      border-top: 1px solid #000;
      top: 10px;
      left: -2px;
    }

    .bottomInput {
      border: none;
      outline: none;
      border-bottom: 1px solid #000;
      font-size: 14px;
      width: 80px;
      text-align: center;
    }
  }

  .table-footer {
    margin-top: 10px !important;
  }
}
</style>
<script>
import excel from "../../components/sheetTable/components/excel/excel.vue";
import bus from "vue-happy-bus";
import sheetInfo from "../config/sheetInfo/index.js";
import $ from "jquery";
import moment from "moment";
import common from "@/common/mixin/common.mixin";
import { updateSheetHeadInfo } from "../../api/index";
export default {
  props: {
    data: Object,
    index: Number,
    length: Number,
    isFirst: Boolean /** 首页 */,
    scrollY: Number,
    isInPatientDetails: Boolean
  },
  mixins: [common],
  data() {
    return {
      bus: bus(this),
      sheetInfo,
      deliveryMode: [],
      createTime:
        (sheetInfo.relObj && sheetInfo.relObj.createTime) ||
        sheetInfo.selectBlock.createTime
    };
  },
  methods: {
    checkboxClicked(e) {
      this.deliveryMode = [e.target.value];
      this.sheetInfo.relObj["deliveryMode"] = e.target.value;
    },
    onXpChang(e){
      e.currentTarget.value = '胸片位置：' + (e.currentTarget.value.split("：")[1] || "")
      this.sheetInfo.relObj.xpwz = e.currentTarget.value 
      console.log(this.sheetInfo.relObj.xpwz);
      console.log(e.currentTarget.value);
    },
    updateSurgeryDate(key, label, autoText) {
      window.openSetTextModal(
        (text) => {
          sheetInfo.relObj[`PageIndex_surgeryDate_${this.index}`] = text;
          this.$message.success(`修改手术日期成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.surgeryDate,
        `修改手术日期`
      );
    },
  },
  computed: {
    patientInfo() {
      return this.sheetInfo.selectBlock || {};
    },
    /** 只读模式 */
    readOnly() {
      return !this.userDeptList
        .map(item => item.code)
        .includes(this.sheetInfo.selectBlock.deptCode);
    },
    surgeryDate() {
      /** 最接近的index */
      let realIndex = 0;
      let keys = Object.keys(sheetInfo.relObj || {});
      for (let i = 0; i < keys.length; i++) {
        let [base, keyIndex] = keys[i].split("PageIndex_surgeryDate_");
        if (keyIndex !== undefined) {
          if (this.index >= keyIndex) {
            if (this.index - keyIndex <= this.index - realIndex) {
              realIndex = keyIndex;
            }
          }
        }
      }
      return (
        (sheetInfo.relObj || {})[`PageIndex_surgeryDate_${realIndex}`] ||
        this.patientInfo.surgeryDate
      );
    },
  },
  filters: {
    toymd(val) {
      return val ? moment(val).format("YYYY年MM月DD日") : "";
    }
  },
  created() {},
  update() {},
  mounted() {},
  destroyed() {} /* fix vue-happy-bus bug */,
  components: {
    excel
  }
};
</script>
