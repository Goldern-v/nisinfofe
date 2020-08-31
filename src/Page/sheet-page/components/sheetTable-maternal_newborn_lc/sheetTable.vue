<template>
  <div>
    <div class="contant sheetTable-maternal-newborn-lc" :class="{readOnly}">
      <!-- <img class="his-logo"
      src="../../../../common/images/his-logo/厚街医徽.png" />-->
      <img src="../../images/仅供查阅.jpg" class="readOnly-img no-print" v-if="readOnly" alt />
      <div class="header-con">
        <div class="his-name">{{HOSPITAL_NAME_SPACE}}</div>
        <div class="title">{{patientInfo.recordName}}</div>
        <div class="info-con" flex="main:justify">
          <span>
            床号：
            <div
              class="bottom-line"
              style="min-width: 30px"
              @click="updateTetxInfo('bedLabel', '床号', patientInfo.bedLabel)"
            >{{patientInfo.bedLabel}}</div>
          </span>
          <span>
            姓名：
            <div
              class="bottom-line"
              style="min-width: 60px"
              @click="updateTetxInfo('patientName', '病人姓名', patientInfo.patientName)"
            >{{patientInfo.patientName}}</div>
          </span>
          <span>
            住院号：
            <div class="bottom-line" style="min-width: 50px">{{patientInfo.inpNo}}</div>
          </span>
          <span>
            入院日期：
            <div class="bottom-line" style="min-width: 165px">{{patientInfo.admissionDate | toymd}}</div>
          </span>
          <div class="group-input">
            分娩方式：
            <label for="deliveryMode1">
              <input
                type="checkbox"
                value="经阴分娩"
                id="deliveryMode1"
                :ischecked="sheetInfo.relObj.deliveryMode == '经阴分娩'"
                :data-value="sheetInfo.relObj.deliveryMode"
                v-model="deliveryMode"
                @click="checkboxClicked"
              />经阴分娩
            </label>
            <label class="date-input">
              <input
                type="text"
                class="bottom-line bottom-line2"
                :data-value="sheetInfo.relObj.deliveryModeYear"
                v-model="sheetInfo.relObj.deliveryModeYear"
              />年
              <input
                type="text"
                class="bottom-line bottom-line2"
                :data-value="sheetInfo.relObj.deliveryModeMonth"
                v-model="sheetInfo.relObj.deliveryModeMonth"
              />月
              <input
                type="text"
                class="bottom-line bottom-line2"
                :data-value="sheetInfo.relObj.deliveryModeDay"
                v-model="sheetInfo.relObj.deliveryModeDay"
              />日
              <input
                type="text"
                class="bottom-line bottom-line2"
                :data-value="sheetInfo.relObj.deliveryModeHour"
                v-model="sheetInfo.relObj.deliveryModeHour"
              />时
              <input
                type="text"
                class="bottom-line bottom-line2"
                :data-value="sheetInfo.relObj.deliveryModeMin"
                v-model="sheetInfo.relObj.deliveryModeMin"
              />分
            </label>
            <div class="group-input2">
              <label for="deliveryMode2">
                <input
                  type="checkbox"
                  value="剖宫产"
                  id="deliveryMode2"
                  :ischecked="sheetInfo.relObj.deliveryMode == '剖宫产'"
                  :data-value="sheetInfo.relObj.deliveryMode"
                  v-model="deliveryMode"
                  @click="checkboxClicked"
                />剖宫产
              </label>
              <label class="date-input">
                <input
                  type="text"
                  class="bottom-line bottom-line2"
                  :data-value="sheetInfo.relObj.deliveryModeYear2"
                  v-model="sheetInfo.relObj.deliveryModeYear2"
                />年
                <input
                  type="text"
                  class="bottom-line bottom-line2"
                  :data-value="sheetInfo.relObj.deliveryModeMonth2"
                  v-model="sheetInfo.relObj.deliveryModeMonth2"
                />月
                <input
                  type="text"
                  class="bottom-line bottom-line2"
                  :data-value="sheetInfo.relObj.deliveryModeDay2"
                  v-model="sheetInfo.relObj.deliveryModeDay2"
                />日
                <input
                  type="text"
                  class="bottom-line bottom-line2"
                  :data-value="sheetInfo.relObj.deliveryModeHour2"
                  v-model="sheetInfo.relObj.deliveryModeHour2"
                />时
                <input
                  type="text"
                  class="bottom-line bottom-line2"
                  :data-value="sheetInfo.relObj.deliveryModeMin2"
                  v-model="sheetInfo.relObj.deliveryModeMin2"
                />分
              </label>
            </div>
          </div>
        </div>
      </div>
      <excel
        :patientInfo="patientInfo"
        :data="data"
        :index="index"
        :length="length"
        :scrollY="scrollY"
        :hasFiexHeader="true"
        :isInPatientDetails="isInPatientDetails"
      ></excel>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.sheetTable-maternal-newborn-lc {
  & {
    border-radius: 2px;
    // position: relative;
    background: #FFFFFF;
    box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
    padding: 20px 20px;
    box-sizing: border-box;
    width: 1300px; // 关键
    margin: 0 auto 20px;
    box-sizing: content-box;
    position: relative;
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

  .bottom-line {
    display: inline-block;
    // border-bottom 1px solid #000
    padding: 2px 0 2px 2px;
    border-bottom: 1px solid #000 !important;
  }

  .showModal {
    position: relative;

    .bottomInput {
      width: 200px;
    }

    ul {
      z-index: 1000;
      width: 120px;
      position: absolute;
      bottom: 27px;
      left: 80px;
      max-height: 280px;
      overflow: auto;
      background-color: #fff;
      border-radius: 2px;
      border: 1px solid #eee;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }

    li {
      list-style: none;
      line-height: 36px;
      padding: 0 10px;
      margin: 0;
      cursor: pointer;
      color: rgb(72, 106, 98);
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &:hover, &.active {
        background-color: rgb(228, 241, 240);
      }
    }

    ::-webkit-scrollbar {
      display: none;
    }
  }

  .showModal2 {
    ul {
      left: 120px;
    }
  }

  .group-input {
    label {
      margin-right: 20px;
      cursor: pointer;
      position: relative;
    }

    .bottom-line {
      border: none;
      border-bottom: 1px solid #000;
      outline: none;
      padding-left: 5px;
      box-sizing: border-box;
      display: inline-block;
    }

    .bottom-line2 {
      width: 35px;
    }

    input[type='checkbox'] {
      -webkit-appearance: none;
      vertical-align: text-top;
      width: 14px;
      height: 14px;
      border: 1px solid #000;
      border-radius: 0px;
      outline: none;
      margin: 0 6px;
      cursor: pointer;
    }

    input[type='checkbox']:checked {
      font-size: 10;
      position: relative;
    }

    input[type='checkbox']:checked:before {
      content: '';
      width: 8px;
      transform: rotate(45deg);
      position: absolute;
      top: 7px;
      left: -2px;
      border-top: 2px solid blue;
    }

    input[type='checkbox']:checked:after {
      content: '';
      width: 14px;
      transform: rotate(-50deg) translateY(-50%) translateX(50%);
      position: absolute;
      border-top: 2px solid blue;
      top: 10px;
      left: -2px;
    }
  }

  .group-input2 {
    padding-left: 88px;
    padding-top: 7px;

    .date-input {
      padding-left: 17px;
    }
  }
}
</style>
<script>
// import excel from "./components/excel/excel.vue";
import excel from "../../components/sheetTable/components/excel/excel.vue";
import bus from "vue-happy-bus";
import sheetInfo from "../config/sheetInfo/index.js";
import $ from "jquery";
import moment from "moment";
import common from "@/common/mixin/common.mixin";
import { updateSheetHeadInfo } from "../../api/index";
import { multiDictInfo } from "../../api/index";
import { getLastDetail } from "./api/index";
/**
 *
 * @param {*} list 原数组
 * @param {*} key 对应的key
 * @param {*} data 数据源
 */
function setList(list, key, data) {
  list.splice(0, list.length);
  for (let item of data[key]) {
    list.push(item.name);
  }
}

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
      deliveryWay: [], //分娩方式
      showModal: false,
      totalOxytocin: [], //催产素总量
      showModal2: false,
      deliveryMode: []
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
    },
    getData() {
      let list = ["分娩方式", "催产素总量"];
      multiDictInfo(list).then(res => {
        let data = res.data.data;
        setList(this.deliveryWay, "分娩方式", data);
        setList(this.totalOxytocin, "催产素总量", data);
      });
    },
    onFocus(e, type) {
      if (sheetInfo.model == "print") return;
      if (type == "totalOxytocin") {
        this.showModal2 = true;
      } else {
        this.showModal = true;
      }
    },
    onBlur(e, type) {
      if (sheetInfo.model == "print") return;

      if (type == "totalOxytocin") {
        let timeId = setTimeout(() => {
          clearTimeout(timeId);
          this.showModal2 = false;
        }, 400);
      } else {
        let timeId = setTimeout(() => {
          clearTimeout(timeId);
          this.showModal = false;
        }, 400);
      }
    },
    selectedItem(val, type) {
      if (type == "totalOxytocin") {
        sheetInfo.relObj.totalOxytocin = val;
        this.showModal2 = false;
      } else {
        sheetInfo.relObj.deliveryWay = val;
        this.showModal = false;
      }
    },
    // 获取最新一次评估单信息
    getDetail() {
      let data = {
        formCode: "form_borndept_first",
        patientId: this.$route.params.patientId,
        visitId: this.$route.params.visitId
      };
      getLastDetail(data).then(res => {
        if (res.data.data && res.data.data.pageMap) {
          let data = res.data.data.pageMap;
          // 孕
          let ycs_y = data.form_borndept_first_ycs_y || "";
          // 产
          let ycs_c = data.form_borndept_first_ycs_c || "";
          // 孕/产
          if (ycs_y || ycs_c) {
            this.$set(
              this.sheetInfo.relObj,
              "yyc_" + this.index,
              ycs_y + "/" + ycs_c
            );
          }
        }
      });
    },
    checkboxClicked(e) {
      this.deliveryMode = [e.target.value];
      this.sheetInfo.relObj["deliveryMode"] = e.target.value;
      let index = this.deliveryMode == "经阴分娩" ? 2 : "";
      this.sheetInfo.relObj[`deliveryModeYear${index}`] = "";
      this.sheetInfo.relObj[`deliveryModeMonth${index}`] = "";
      this.sheetInfo.relObj[`deliveryModeDay${index}`] = "";
      this.sheetInfo.relObj[`deliveryModeHour${index}`] = "";
      this.sheetInfo.relObj[`deliveryModeMin${index}`] = "";
      console.log(`deliveryModeMin${index}`);
    }
  },
  computed: {
    patientInfo() {
      // return this.sheet.patientInfo
      return this.sheetInfo.selectBlock || {};
    },
    /** 只读模式 */
    readOnly() {
      return !this.userDeptList
        .map(item => item.code)
        .includes(this.sheetInfo.selectBlock.deptCode);
    }
  },
  filters: {
    toymd(val) {
      if (process.env.HOSPITAL_ID == "weixian") {
        return moment(val).format("YYYY-MM-DD");
      } else if (process.env.HOSPITAL_ID == "lingcheng") {
        return moment(val).format("YYYY年MM月DD日 HH时mm分");
      } else {
        return moment(val).format("YYYY年MM月");
      }
    }
  },
  created() {},
  update() {},
  mounted() {
    console.dir(this.sheetInfo);

    this.deliveryMode = [this.sheetInfo.relObj["deliveryMode"]];
    // 获取分娩方式
    this.getData();
    if (this.sheetInfo.relObj && !this.sheetInfo.relObj["yyc_" + this.index]) {
      this.getDetail();
    }
  },
  destroyed() {} /* fix vue-happy-bus bug */,
  components: {
    excel
  }
};
</script>
